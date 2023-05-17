<?php

namespace App\Services\Console;

use App\Helpers\Helper;
use App\MarketStatus;
use App\Models\Quote;
use App\Models\Symbols\Options\Symbol;
use App\Models\Symbols\Options\Ticks;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use WebSocket\Client;

class TradingViewWebsocketService
{

    private const MAX_QUOTES_HISTORY = 1000;
    private $session;
    private $sessionStatus;
    private $chartSession;
    private $subscriptions;
    private $websocket;
    public $tickerData;
    private $sessionRegistered;
    private $map;
    private $login;
    private $password;
    private $startTime;
    private $symbols_all = [];
    private $cacheLP = [];
    public $tickerDataUptime;
    private $symbolNumber = 1;
    private $symbolResolved = false;
    private $seriesCompleted = false;

    private $historyCount = 0;

    private $symbolForLoadHistory = 'FX:EURUSD';

    private function generateSession()
    {
        return "qs_" . $this->generateRandomString(12);
    }

    private function generateChartSession()
    {
        return "cs_" . $this->generateRandomString(12);
    }

    function generateRandomString($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    private function sendMessage($func, $args)
    {
        $message = $this->createMessage($func, $args);
        $this->websocket->send($message);
    }

    public function registerTicker($ticker)
    {
        if (in_array($ticker, $this->subscriptions)) {
            return;
        }
        $this->subscriptions[] = $ticker;
        $this->websocket->send($this->createMessage("quote_add_symbols", [$this->session, $ticker, ['flags' => ["force_permission"]]]));
    }

    public function unregisterTicker($ticker)
    {
        $index = array_search($ticker, $this->subscriptions);
        if ($index === false) {
            return;
        }
        unset($this->subscriptions[$index]);
        sort($this->subscriptions);
    }

    private function resetWebSocket()
    {
        Helper::checkMysqlConnection();
        $this->startTime = microtime(true);
        $this->tickerData = [];
        $this->subscriptions = [];
        $this->session = $this->generateSession();
        $this->sessionStatus = $this->generateSession();
        $this->chartSession = $this->generateChartSession();
        $this->sessionRegistered = false;
        if ($this->login and $this->password) {
            $wss = "wss://data.tradingview.com/socket.io/websocket";
        } else {
            $wss = "wss://data.tradingview.com/socket.io/websocket";
        }
        $this->websocket = new Client($wss, [
            'timeout' => 60, // 1 minute time out
            'headers' => [
                'Origin' => 'https://data.tradingview.com',
            ],
        ]);
        Cache::put('latest_websocket_update', true, 30);
        while (true) {
            try {
                if (!Cache::has('latest_websocket_update')) {
                    $this->runParsing();
                }
                if (Cache::has('market_update')) {
                    Cache::forget('market_update');
                    $this->runParsing();
                }
                $string = $this->websocket->receive();
                $packets = $this->parseMessages($string);
                foreach ($packets as $packet) {
                    if (is_array($packet) and $packet["~protocol~keepalive~"]) {
                        $this->sendRawMessage("~h~" . $packet["~protocol~keepalive~"]);
                    } elseif (isset($packet->session_id)) {
                        if ($this->login and $this->password) {
                            $auth_token = $this->getAuthToken();
                            $this->sendMessage("set_auth_token", [$auth_token]);
                        } else {
                            $this->sendMessage("set_auth_token", ["unauthorized_user_token"]);
                        }
                        $this->sendMessage("quote_create_session", [$this->session]); // Основная сессия для реалтайм котировок
                        $this->setMainFields($this->session);
                        $this->symbols_all = [];
                        MarketStatus::truncate();
                        foreach (Symbol::all() as $symbol) {
                            $name = $symbol->broker . ':' . str_replace('/', '', $symbol->symbol);
                            $this->map[$name] = $symbol->id;
                            $this->registerTicker($name);
                            $this->symbols_all[] = $name;
                            MarketStatus::create(['symbol_id' => $name, 'market_status' => 0]); // Тут поменять на строку, уже в переменной $name вроде верное
                        }
                        $this->sendMessage("quote_create_session", [$this->sessionStatus]); // Дополнительная сессия для статуса маркета
                        $this->setMainFields($this->sessionStatus);
                        $this->customMessageAllSymbols($this->sessionStatus, $this->symbols_all);
                        $this->sessionRegistered = true;
                    } elseif (isset($packet->m) && $packet->m === "qsd" && isset($packet->p)) {// && $packet->p[0] === $this->session
                        Cache::put('latest_websocket_update', true, 30);
                        $tticker = $packet->p[1];
                        $tickerName = $tticker->n;
                        $tickerStatus = $tticker->s;
                        $tickerUpdate = $tticker->v;
                        foreach ($tickerUpdate as $key => $value) {
                            if ($packet->p[0] == $this->sessionStatus) {
                                if ($key != 'pro_name' and $key != 'current_session') {
                                    continue;
                                } elseif ($key == 'pro_name') {
                                    $this->sendMessage("quote_remove_symbols", [$this->sessionStatus, $value]);
                                    $this->sendMessage("quote_add_symbols", [$this->sessionStatus, $value, ['flags' => ["force_permission"]]]);
                                    continue;
                                } elseif ($key == 'current_session') {
                                    $this->tickerData[$tickerName][$key] = $value;
                                    continue;
                                }
                            } else {
                                $this->tickerData[$tickerName][$key] = $value;
                                $this->tickerData[$tickerName]['id'] = $this->map[$tickerName];
                            }
                        }
                        var_dump($this->tickerData[$tickerName]);
                        if (isset($this->tickerData[$tickerName]['current_session']) && isset($this->tickerData[$tickerName]['id'])) {
                            $status = $this->tickerData[$tickerName]['current_session'];
                            $updated = Carbon::now()->format('Y-m-d H:i:s.u');
                            $symbol_id = $this->tickerData['broker'].":".$this->tickerData[$tickerName];
                            MarketStatus::where('symbol_id', $symbol_id)->update(['market_status' => $status, 'updated_at' => $updated]);
                        }
                        foreach ($this->tickerData as $key => $value) {
                            if (isset($value['lp'])) {
                                if (!isset($this->cacheLP['symbol' . $value['id']])) {
                                    $this->cacheLP['symbol' . $value['id']] = 0;
                                }
                                if ($this->cacheLP['symbol' . $value['id']] != $value['lp']) {
                                    $this->cacheLP['symbol' . $value['id']] = $value['lp'];
                                    $value_id = $value['id'];
                                    $value_lp = $value['lp'];
                                    $value_created_at = Carbon::now()->format('Y-m-d H:i:s.u');
                                    $model = new Ticks;
                                    $model->symbol_id = $value_id;
                                    $model->price = $value_lp;
                                    $model->created_at = $value_created_at;
                                    $model->save();
                                }
                            }
                        }
                    }
                }
            } catch (\Exception $e) {
                var_dump($e->getMessage());
                $this->runParsing();
            }
        }
    }

    private function resetHistoryWebSocket()
    {
        Helper::checkMysqlConnection();
        $this->startTime = microtime(true);
        $this->tickerData = [];
        $this->subscriptions = [];
        $this->session = $this->generateSession();
        $this->sessionStatus = $this->generateSession();
        $this->chartSession = $this->generateChartSession();
        $this->sessionRegistered = false;
        if ($this->login and $this->password) {
            $wss = "wss://data.tradingview.com/socket.io/websocket";
        } else {
            $wss = "wss://data.tradingview.com/socket.io/websocket";
        }
        $this->websocket = new Client($wss, [
            'timeout' => 60, // 1 minute time out
            'headers' => [
                'Origin' => 'https://data.tradingview.com',
            ],
        ]);
        Cache::put('latest_websocket_update', true, 30);
        while (true) {
            try {
                if (!Cache::has('latest_websocket_update')) {
                    $this->runHistoryParsing($this->symbolForLoadHistory, $this->symbolId);
                }
                if (Cache::has('market_update')) {
                    Cache::forget('market_update');
                    $this->runHistoryParsing($this->symbolForLoadHistory, $this->symbolId);
                }
                $string = $this->websocket->receive();
                $packets = $this->parseMessages($string);
                foreach ($packets as $packet) {
                    if (is_array($packet) and $packet["~protocol~keepalive~"]) {
                        $this->sendRawMessage("~h~" . $packet["~protocol~keepalive~"]);
                    } elseif (isset($packet->session_id)) {
                        if ($this->login and $this->password) {
                            $auth_token = $this->getAuthToken();
                            $this->sendMessage("set_auth_token", [$auth_token]);
                        } else {
                            $this->sendMessage("set_auth_token", ["unauthorized_user_token"]);
                        }
                        $this->sendMessage("chart_create_session", [$this->chartSession]);
                        $this->resolveSymbol($this->symbolForLoadHistory);
                        $this->firstLoadHistoryData();
                        $this->sessionRegistered = true;
                    } elseif (isset($packet->m) && $packet->m === "series_loading" && isset($packet->p)) {
                        dump('Loading');
                    } elseif (isset($packet->m) && $packet->m === "series_completed" && isset($packet->p)) {
                        dump($this->historyCount);
                        if($this->historyCount >= self::MAX_QUOTES_HISTORY) {
                            $this->getMoreData();
                        } else {
                            return;
                        }
                        dump('Completed');
                    } elseif (isset($packet->m) && $packet->m === "timescale_update" && isset($packet->p)) {
                        $this->historyCount = count($packet->p[1]->sds_1->s);
                        $insert = [];
                        foreach($packet->p[1]->sds_1->s as $candleData)
                        {
                            $candle = $candleData->v;
                            $insert[] = [
                                'created_at' => Carbon::createFromTimestamp((int) $candle[0])->format('Y-m-d H:i:s.u'),
                                'open' => $candle[1],
                                'high' => $candle[2],
                                'min' => $candle[3],
                                'close' => $candle[4],
                                'symbol_id' => $this->symbolId
                            ];
                        }
                        Quote::query()->insert($insert);
                    }
                }
            } catch (\Exception $e) {
                var_dump($e->getMessage());
            }
        }
    }

    private function getAuthToken(){
        return 'unauthorized_user_token';
    }

    private function sendRawMessage($message)
    {
        $this->websocket->send($this->prependHeader($message));
    }

    private function parseMessages($str)
    {
        $packets = [];
        $x = preg_split('/~m~(\d+)~m~/', $str);
        foreach ($x as $pack) {
            if (!strlen($pack)) continue;
            $pack = strrev($pack);
            $str = strpos($pack, "}");
            $pack = substr($pack, $str, strlen($pack));
            $pack = strrev($pack);
            if (strpos($pack, '~h~') !== false) {
                $packets[] = ["~protocol~keepalive~" => substr($pack, 3)];
            } else {
                $packets[] = json_decode($pack);
            }
        }
        return $packets;
    }

    private function prependHeader($str)
    {
        return "~m~" . strlen($str) . "~m~" . $str;
    }

    private function createMessage($func, $paramList)
    {
        return $this->prependHeader($this->constructMessage($func, $paramList));
    }

    private function customMessageAllSymbols($session, $symbols)
    {
        $all = '';
        foreach ($symbols as $value) {
            $all .= '"' . $value . '",';
        }
        $all = rtrim($all, ',');
        $message = '{"m":"quote_add_symbols","p":["' . $session . '",' . $all . ',{"flags":["force_permission"]}]}';
        $this->websocket->send($this->prependHeader($message));
    }

    private function customMessageDeleteAllSymbols($session, $symbols)
    {
        $all = '';
        foreach ($symbols as $value) {
            $all .= '"' . $value . '",';
        }
        $all = rtrim($all, ',');
        $message = '{"m":"quote_remove_symbols","p":["' . $session . '",' . $all . ',{"flags":["force_permission"]}]}';
        $this->websocket->send($this->prependHeader($message));
    }

    private function setMainFields($session)
    {
        $this->sendMessage("quote_set_fields", [
            $session,
            "ch",
            "chp",
            "current_session",
            "description",
            "local_description",
            "language",
            "exchange",
            "fractional",
            "is_tradable",
            "lp",
            "minmov",
            "minmove2",
            "original_name",
            "pricescale",
            "pro_name",
            "short_name",
            "type",
            "update_mode",
            "volume",
            "ask",
            "bid",
            "fundamentals",
            "high_price",
            "is_tradable",
            "low_price",
            "open_price",
            "prev_close_price",
            "rch",
            "rchp",
            "rtc",
            "status",
            "basic_eps_net_income",
            "beta_1_year",
            "earnings_per_share_basic_ttm",
            "industry",
            "market_cap_basic",
            "price_earnings_ttm",
            "sector",
            "volume",
            "dividends_yield"
        ]);
    }

    private function constructMessage($func, $paramList)
    {
        return json_encode([
            'm' => $func,
            'p' => $paramList
        ]);
    }

    private function microtimeFormat($data, $format = null, $lng = null)
    {
        $duration = microtime(true) - $data;
        $hours = (int)($duration / 60 / 60);
        $minutes = (int)($duration / 60) - $hours * 60;
        $seconds = $duration - $hours * 60 * 60 - $minutes * 60;
        return number_format((float)$seconds, 2, '.', '');
    }

    public function resolveSymbol($tickerName)
    {
        $this->symbolResolved = false;
        $this->sessionRegistered = false;

        $this->sendMessage("resolve_symbol", [
            $this->chartSession,
            "sds_sym_" . ($this->symbolNumber),
            '={"symbol":"' . $tickerName . '","adjustment":"splits"}'
        ]);
    }

    public function firstLoadHistoryData()
    {

        $this->sendMessage("create_series", [
            $this->chartSession,
            "sds_1",
            "s1",
            "sds_sym_" . ($this->symbolNumber),
            '1',
            self::MAX_QUOTES_HISTORY,
            ""
        ]);
    }

    public function getMoreData()
    {
        $this->sendMessage("request_more_data", [
            $this->chartSession,
            "sds_" . ($this->symbolNumber),
            self::MAX_QUOTES_HISTORY
        ]);
    }

    private function runParsing()
    {
        echo Carbon::now()->format('Y-m-d H:i:s') . ': Restart parsing!' . PHP_EOL;
        $this->subscriptions = [];
        $this->session = null;
        $this->sessionStatus = null;
        $this->chartSession = null;
        $this->subscriptions = null;
        $this->websocket = null;
        $this->tickerData = null;
        $this->sessionRegistered = null;
        $this->map = null;
        $this->login = null;
        $this->password = null;
        $this->startTime = null;
        $this->symbols_all = [];
        $this->cacheLP = [];
        $this->tickerDataUptime = null;
        $this->login = env('TRADINGVIEW_LOGIN');
        $this->password = env('TRADINGVIEW_PASSWORD');
        $this->resetWebSocket();
    }

    public function runHistoryParsing($symbolForLoad, $id = 0)
    {
        $this->symbolForLoadHistory = $symbolForLoad;
        $this->symbolId = $id;
        echo Carbon::now()->format('Y-m-d H:i:s') . ': Restart parsing!' . PHP_EOL;
        $this->subscriptions = [];
        $this->session = null;
        $this->sessionStatus = null;
        $this->chartSession = null;
        $this->subscriptions = null;
        $this->websocket = null;
        $this->tickerData = null;
        $this->sessionRegistered = null;
        $this->map = null;
        $this->login = null;
        $this->password = null;
        $this->startTime = null;
        $this->symbols_all = [];
        $this->cacheLP = [];
        $this->tickerDataUptime = null;
        $this->login = env('TRADINGVIEW_LOGIN');
        $this->password = env('TRADINGVIEW_PASSWORD');
        $this->resetHistoryWebSocket();
    }

    public function run()
    {
        $this->runParsing();
        dump("Parsing successfully");
        return 0;
    }
}
