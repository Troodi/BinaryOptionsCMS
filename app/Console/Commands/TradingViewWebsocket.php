<?php

namespace App\Console\Commands;

use App\MarketStatus;
use App\Models\Symbols\Options\Ticks;
use Carbon\Carbon;
use Illuminate\Console\Command;
use App\Models\Symbols\Options\Symbol;
use Illuminate\Support\Facades\Cache;
use WebSocket\Client;

class TradingViewWebsocket extends Command
{
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
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'tradingview:start';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Command description';

  /**
   * Create a new command instance.
   *
   * @return void
   */

  public function __construct()
  {
    parent::__construct();
  }

  private function generateSession() {
    return "qs_".$this->generateRandomString(12);
  }

  private function generateChartSession() {
    return "cs_".$this->generateRandomString(12);
  }

  function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
      $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
  }

  private function sendMessage($func, $args){
    $message = $this->createMessage($func, $args);
    $this->websocket->send($message);
  }

  public function registerTicker($ticker){
    if(in_array($ticker, $this->subscriptions)) {
      return;
    }
    $this->subscriptions[] = $ticker;
    $this->websocket->send($this->createMessage("quote_add_symbols", [$this->session, $ticker, ['flags' => ["force_permission"]]]));
  }

  public function unregisterTicker($ticker){
    $index = array_search($ticker, $this->subscriptions);
    if($index === false){
      return;
    }
    unset($this->subscriptions[$index]);
    sort($this->subscriptions);
  }

  private function resetWebSocket(){
    $this->startTime = microtime(true);
    $this->tickerData = [];
    $this->subscriptions = [];
    $this->session = $this->generateSession();
    $this->sessionStatus = $this->generateSession();
    $this->chartSession = $this->generateChartSession();
    $this->sessionRegistered = false;
    if($this->login and $this->password){
      $wss = "ws://prodata.tradingview.com/socket.io/websocket";
    } else {
      $wss = "ws://prodata.tradingview.com/socket.io/websocket";
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
        if(!Cache::has('latest_websocket_update')) {
          $this->runParsing();
        }
        if(Cache::has('market_update')){
          Cache::forget('market_update');
          $this->runParsing();
        }
        $string = $this->websocket->receive();
        $packets = $this->parseMessages($string);
        foreach($packets as $packet){
          if(is_array($packet) and $packet["~protocol~keepalive~"]){
            $this->sendRawMessage("~h~".$packet["~protocol~keepalive~"]);
          } elseif(isset($packet->session_id)) {
            if($this->login and $this->password) {
              if(file_exists(__DIR__ . '/cookie.txt')){
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, "https://www.tradingview.com/quote_token/");
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
                curl_setopt($ch, CURLOPT_COOKIEFILE, __DIR__ . '/cookie.txt');
                curl_setopt($ch, CURLOPT_COOKIEJAR, __DIR__ . '/cookie.txt');
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_ENCODING, "gzip");
                $auth_token = curl_exec($ch);
                $auth_token = ltrim($auth_token, '"');
                $auth_token = rtrim($auth_token, '"');
              } else {
                $request_headers = [
                  "accept: */*",
                  "accept-encoding: gzip, deflate, br",
                  "accept-language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,lt;q=0.6",
                  "cache-control: no-cache",
                  "content-type: application/x-www-form-urlencoded",
                  "origin: https://www.tradingview.com",
                  "pragma: no-cache",
                  "referer: no-cache",
                  "sec-fetch-dest: empty",
                  "sec-fetch-mode: cors",
                  "sec-fetch-site: same-origin",
                  "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36",
                  "x-language: en",
                  "x-requested-with: XMLHttpRequest"
                ];
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_URL, "https://www.tradingview.com/accounts/signin/");
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
                curl_setopt($ch, CURLOPT_COOKIEFILE, __DIR__ . '/cookie.txt');
                curl_setopt($ch, CURLOPT_COOKIEJAR, __DIR__ . '/cookie.txt');
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_HTTPHEADER, $request_headers);
                curl_setopt($ch, CURLOPT_ENCODING, "gzip");
                curl_setopt($ch, CURLOPT_POSTFIELDS, "feature_source=Header&username=$this->login&password=$this->password&remember=on");
                $curl_exec = curl_exec($ch);
                curl_close($ch);
                $json = json_decode($curl_exec);
                $auth_token = $json->user->auth_token;
              }
              $auth_token = 'unauthorized_user_token';
              $this->sendMessage("set_auth_token", [$auth_token]);
            } else {
              $this->sendMessage("set_auth_token", ["unauthorized_user_token"]);
            }
            $this->sendMessage("quote_create_session", [$this->session]); // Основная сессия для реалтайм котировок
            $this->setMainFields($this->session);
            $this->symbols_all = [];
            MarketStatus::truncate();
            foreach(Symbol::all() as $symbol){
              $name = $symbol->broker.':'.str_replace('/', '', $symbol->symbol);
              $this->map[$name] = $symbol->id;
              $this->registerTicker($name);
              $this->symbols_all[] = $name;
              $model = new MarketStatus;
              $model->symbol_id = $symbol->id;
              $model->market_status = 0;
              $model->save();
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
              if($packet->p[0] == $this->sessionStatus) {
                if($key != 'pro_name' and $key != 'current_session'){
                  continue;
                }
                elseif ($key == 'pro_name') {
                  $this->sendMessage("quote_remove_symbols", [$this->sessionStatus, $value]);
                  $this->sendMessage("quote_add_symbols", [$this->sessionStatus, $value, ['flags' => ["force_permission"]]]);
                  continue;
                }
                elseif ($key == 'current_session'){
                  $this->tickerData[$tickerName][$key] = $value;
                  continue;
                }
              } else {
                $this->tickerData[$tickerName][$key] = $value;
                $this->tickerData[$tickerName]['id'] = $this->map[$tickerName];
              }
            }
            if(isset($this->tickerData[$tickerName]['current_session']) && isset($this->tickerData[$tickerName]['id'])) {
              $status = $this->tickerData[$tickerName]['current_session'];
              $updated = Carbon::now()->format('Y-m-d H:i:s.u');
              $symbol_id = $this->tickerData[$tickerName]['id'];
              MarketStatus::where('symbol_id', $symbol_id)->update(['market_status' => $status, 'updated_at' => $updated]);
            }
            foreach($this->tickerData as $key => $value) {
              if(isset($value['lp'])) {
                if(!isset($this->cacheLP['symbol' . $value['id']])){
                  $this->cacheLP['symbol' . $value['id']] = 0;
                }
                if($this->cacheLP['symbol' . $value['id']] != $value['lp']) {
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

  private function sendRawMessage($message){
    $this->websocket->send($this->prependHeader($message));
  }

  // IO methods
  private function parseMessages($str){
    $packets = [];
    $x = preg_split ( '/~m~(\d+)~m~/', $str);
    foreach($x as $pack){
      if(!strlen($pack)) continue;
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

  private function prependHeader($str){
    return "~m~".strlen($str)."~m~".$str;
  }

  private function createMessage($func, $paramList){
    return $this->prependHeader($this->constructMessage($func, $paramList));
  }

  private function customMessageAllSymbols($session, $symbols){
    $all = '';
    foreach($symbols as $value){
      $all .= '"'.$value.'",';
    }
    $all = rtrim($all, ',');
    $message = '{"m":"quote_add_symbols","p":["'.$session.'",'.$all.',{"flags":["force_permission"]}]}';
    $this->websocket->send($this->prependHeader($message));
  }

  private function customMessageDeleteAllSymbols($session, $symbols){
    $all = '';
    foreach($symbols as $value){
      $all .= '"'.$value.'",';
    }
    $all = rtrim($all, ',');
    $message = '{"m":"quote_remove_symbols","p":["'.$session.'",'.$all.',{"flags":["force_permission"]}]}';
    $this->websocket->send($this->prependHeader($message));
  }

  private function setMainFields($session){
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

  private function constructMessage($func, $paramList){
    return json_encode([
      'm' => $func,
      'p' => $paramList
    ]);
  }

  private function microtimeFormat($data,$format=null,$lng=null)
  {
    $duration = microtime(true) - $data;
    $hours = (int)($duration/60/60);
    $minutes = (int)($duration/60)-$hours*60;
    $seconds = $duration-$hours*60*60-$minutes*60;
    return number_format((float)$seconds, 2, '.', '');
  }

  private function runParsing(){
    echo Carbon::now()->format('Y-m-d H:i:s').': Restart parsing!'.PHP_EOL;
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

  /**
   * Execute the console command.
   *
   * @return int
   */
  public function handle()
  {
    $this->runParsing();
    return 0;
  }
}
