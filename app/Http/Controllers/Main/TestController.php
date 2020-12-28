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
    dump(123);
  }
}
