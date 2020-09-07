<?php

namespace App\Http\Controllers\Main;

use App\Events\CloseOptionEvent;
use App\Http\Controllers\Controller;
use App\Jobs\CloseOptionJob;
use App\Models\OpenOrders;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class TradingController extends Controller
{
    public function getAuthToken(Request $request){
      $login = env('TRADINGVIEW_LOGIN');
      $password = env('TRADINGVIEW_PASSWORD');

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

    //php artisan queue:listen --sleep=0
    public function buySymbol(Request $request){
      $price = Cache::get('symbol'.$request->symbol);
      $model = new OpenOrders();
      $model->symbol_id = $request->symbol;
      $model->user_id = 1;
      $model->open_price = $price;
      $model->close_at = Carbon::now()->addSecond(5)->format('Y-m-d H:i:s.u');
      $model->save();
      return response()->json([
        'id' => $model->id,
        'price' => $price,
        'quantity' => $request->amount
      ]);
    }
}
