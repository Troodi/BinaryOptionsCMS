<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Symbols\Options\Ticks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Qiwi\Api\BillPayments;

class TestController extends Controller
{
  public function test(Request $request){
    $billPayments = new BillPayments(env('QIWI_SECRET'));
//    $billId = 2;
//    $fields = [
//      'amount' => 1.00,
//      'currency' => 'RUB',
//      'comment' => 'Account replenishment on the site for the user: info@getoption.pro',
//      'email' => 'info@getoption.pro',
//      'account' => 1,
//    ];
    $response = $billPayments->getBillInfo('f5bf45cf-d2e7-4f79-8212-ee870eb1765d');
    dump($response);
  }
}
