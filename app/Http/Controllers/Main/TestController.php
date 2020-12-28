<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Symbols\Options\Ticks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Ixudra\Curl\Facades\Curl;
use Qiwi\Api\BillPayments;

class TestController extends Controller
{
  public function test(Request $request){
    $orderId = 123;
    $amount = 1;
    $request = Curl::to("https://yoomoney.ru/quickpay/confirm.xml?receiver=41001828768205&quickpay-form=shop&targets=&sum=$amount&label=$orderId")
      ->get();
    $link = str_replace('Found. Redirecting to ', '', $request);
  }
}
