<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Symbols\Options\Ticks;
use Illuminate\Http\Request;

class TestController extends Controller
{
  public function test(Request $request){
    return Ticks::where('symbol_id', $request->symbol)->orderBy('id', 'desc')->first();
  }
}
