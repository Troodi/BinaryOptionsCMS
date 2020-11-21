<?php

namespace App\Http\Controllers\Main;

use App\Events\ChangeBalance;
use App\Events\ChangeDemoBalance;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\MarketStatus;
use App\Models\LatestDemoOrder;
use App\Models\LatestOrder;
use App\Models\OpenDemoOrders;
use App\Models\OpenOrders;
use App\Models\Symbols\Options\Symbol;
use App\Models\Symbols\Options\Ticks;
use App\Models\SymbolShortStatistic;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class TradingController extends Controller
{
    public function getAuthToken(Request $request)
    {
      $login = env('TRADINGVIEW_LOGIN');
      $password = env('TRADINGVIEW_PASSWORD');
      if (file_exists(__DIR__ . '/cookie.txt')) {
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
        return $auth_token;
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
        curl_setopt($ch, CURLOPT_POSTFIELDS, "feature_source=Header&username=$login&password=$password&remember=on");
        $curl_exec = curl_exec($ch);
        curl_close($ch);
        $json = json_decode($curl_exec);
        $auth_token = $json->user->auth_token;
        return $auth_token;
      }
    }

    public function buySymbol(Request $request){
      $request->validate([
        'hours' => 'numeric|min:0|max:12',
        'minutes' => 'numeric|min:0|max:59',
        'seconds' => 'numeric|min:0|max:59',
        'symbol' => 'numeric|min:0',
        'amount' => 'numeric|min:1',
        'type' => 'numeric|min:0|max:1',
        'demo' => 'numeric|min:0|max:1',
      ]);
      $symbol = Symbol::where('id', $request->symbol)->firstOrFail();
      if((Carbon::now()->hour >= $symbol->work_to or Carbon::now()->hour < $symbol->work_from) and ($symbol->work_from != $symbol->work_to)){
        return response()->json(['message' => 'В данное время текущий символ не торгуется!'], 422);
      }
      $seconds = $request->hours * 60 * 60 + $request->minutes * 60 + $request->seconds;
      if((Carbon::now()->addSeconds($seconds)->hour > $symbol->work_to or Carbon::now()->addSeconds($seconds)->hour <= $symbol->work_from) and ($symbol->work_from != $symbol->work_to)){
        return response()->json(['message' => 'Время окончания экспирации не может быть позднее времени работы символа!'], 422);
      }
      if($seconds < 30){
        return response()->json(['message' => 'Min 30 seconds'], 422);
      }
      if(!$request->demo) {
        if (Auth::user()->balance - $request->amount < 0) {
          return response()->json(['message' => 'Недостаточно средств'], 422);
        }
      } else {
        if (Auth::user()->demo_balance - $request->amount < 0) {
          return response()->json(['message' => 'Недостаточно средств'], 422);
        }
      }
      $market = MarketStatus::where('symbol_id', $request->symbol);
      if(!isset($market) || !$market->count()){
        return response()->json(['message' => 'Произошла ошибка при выставлении ордера по данной валютной паре, попробуйте выставить ордер позднее! Ошибка #645.'], 422);
      }
      if($market->first()->market_status != 'market'){
        return response()->json(['message' => 'Данный инструмент закрыт для торговли, т.к. его рабочая сессия окончена!'], 422);
      }
      $symbols_all = Cache::remember('symbols_all', 60, function () {
        return Symbol::orderBy('percent', 'desc')->get();
      });
      $fisrt = Ticks::where('symbol_id', $request->symbol)->orderBy('id', 'desc')->first();
      if($fisrt){
        $price = $fisrt->price;
      } else {
        return response()->json(['message' => 'Произошла ошибка при выставлении ордера по данной валютной паре, попробуйте выставить ордер позднее! Ошибка #637.'], 422);
      }
      $hedge = 0;
      if(OpenOrders::where('user_id', Auth::user()->id)->where('symbol_id', $request->symbol)->where('type', '<>', $request->type)->count()){
        $hedge = 1;
      }
      if(!$request->demo) { // Если реальный счет
        $model = new OpenOrders();
        $model->symbol_id = $request->symbol;
        $model->user_id = Auth::user()->id;
        $model->type = $request->type;
        $model->open_price = $price;
        $model->hedging = $hedge;
        $model->percent = $symbols_all->where('id', $request->symbol)->first()->percent;
        $model->close_at = Carbon::now()->addSeconds($seconds)->format('Y-m-d H:i:s.u');
        $model->created_at = Carbon::now()->format('Y-m-d H:i:s.u');
        $model->amount = $request->amount;
        $model->save();
        $model->expiration = $seconds - 1;
        $model->timestamp = Carbon::parse($model->close_at)->timestamp;
        User::where('id', Auth::user()->id)->update(['balance' => DB::raw('balance-' . $request->amount)]);
        broadcast(new ChangeBalance(Auth::user()->balance - $request->amount, Auth::user()));
      } else {
        $model = new OpenDemoOrders();
        $model->symbol_id = $request->symbol;
        $model->user_id = Auth::user()->id;
        $model->type = $request->type;
        $model->open_price = $price;
        $model->hedging = $hedge;
        $model->percent = $symbols_all->where('id', $request->symbol)->first()->percent;
        $model->close_at = Carbon::now()->addSeconds($seconds)->format('Y-m-d H:i:s.u');
        $model->created_at = Carbon::now()->format('Y-m-d H:i:s.u');
        $model->amount = $request->amount;
        $model->save();
        $model->expiration = $seconds - 1;
        $model->timestamp = Carbon::parse($model->close_at)->timestamp;
        User::where('id', Auth::user()->id)->update(['demo_balance' => DB::raw('demo_balance-' . $request->amount)]);
        broadcast(new ChangeDemoBalance(Auth::user()->demo_balance - $request->amount, Auth::user()));
      }
      return $model;
    }

    public function getOpenOrders(Request $request){
      return OpenOrders::where('user_id', Auth::user()->id)->orderBy('id', 'desc')->get()->filter(function ($item) {
        $diff = date_diff(new \DateTime($item->close_at), new \DateTime($item->created_at));
        $item['expiration'] = $diff->s + $diff->i * 60 + $diff->h * 60 * 60;
        return $item;
      })->filter(function ($item) {
        $diff = date_diff(new \DateTime(), new \DateTime($item->created_at));
        $item['timestamp'] = Carbon::parse($item->close_at)->timestamp;
        return $item;
      });
    }

  public function getLatestOrders(Request $request){
    return LatestOrder::where('user_id', Auth::user()->id)->orderBy('id', 'desc')->get()->filter(function ($item) {
      $diff = date_diff(new \DateTime($item->close_at), new \DateTime($item->open_at));
      $item['expiration'] = sprintf("%'.02d", $diff->h).':'.sprintf("%'.02d", $diff->i).':'.sprintf("%'.02d", $diff->s);
      return $item;
    });
  }

  public function getOpenDemoOrders(Request $request){
    return OpenDemoOrders::where('user_id', Auth::user()->id)->orderBy('id', 'desc')->get()->filter(function ($item) {
      $diff = date_diff(new \DateTime($item->close_at), new \DateTime($item->created_at));
      $item['expiration'] = $diff->s + $diff->i * 60 + $diff->h * 60 * 60;
      return $item;
    })->filter(function ($item) {
      $diff = date_diff(new \DateTime(), new \DateTime($item->created_at));
      $item['timestamp'] = Carbon::parse($item->close_at)->timestamp;
      return $item;
    });
  }

  public function getLatestDemoOrders(Request $request){
    return LatestDemoOrder::where('user_id', Auth::user()->id)->orderBy('id', 'desc')->get()->filter(function ($item) {
      $diff = date_diff(new \DateTime($item->close_at), new \DateTime($item->open_at));
      $item['expiration'] = sprintf("%'.02d", $diff->h).':'.sprintf("%'.02d", $diff->i).':'.sprintf("%'.02d", $diff->s);
      return $item;
    });
  }

  public function tradingHistory(Request $request){
    $admin = false;
    if($request->id && Helper::isAdmin()){
      $admin = true;
      $request->validate(['id' => 'numeric|min:1']);
    }
    $id = $admin ? $request->id : Auth::user()->id;
    $history = DB::table('order_history_1')->where('user_id', $id)->get();
    return Datatables::of($history)->make();
  }

  public function demoTradingHistory(Request $request){
    $admin = false;
    if($request->id && Helper::isAdmin()){
      $admin = true;
      $request->validate(['id' => 'numeric|min:1']);
    }
    $id = $admin ? $request->id : Auth::user()->id;
    $history = DB::table('order_demo_history_1')->where('user_id', $id)->get();
    return Datatables::of($history)->make();
  }

  public function refillDemoBalance(Request $request){
    User::where('id', Auth::user()->id)->update(['demo_balance' => 1000]);
    broadcast(new ChangeDemoBalance(1000, Auth::user()));
    return response()->json(['success' => true, 'message' => 'Баланс демо счета успешно восстановлен!']);
  }

  public function ping(Request $request){
    return null;
  }
}
