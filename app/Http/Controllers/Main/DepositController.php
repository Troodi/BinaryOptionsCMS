<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Promocode;
use Illuminate\Http\Request;

class DepositController extends Controller
{
    public function getDepositPromocodes(Request $request){
      return Promocode::where('public_code', 2)->orderBy('bonus_size', 'desc')->get();
    }
}
