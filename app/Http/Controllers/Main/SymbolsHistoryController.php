<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Symbols\Options\Symbol;
use Illuminate\Http\Request;

class SymbolsHistoryController extends Controller
{
    public function histoMinute(Request $request){
      $request->validate([
        'aggregate' => 'numeric',
        'fsym' => 'required',
        'tsym' => 'required',
        'toTs' => 'required|numeric',
        'limit' => 'numeric'
      ]);
    }

    public function getExchanges(Request $request){
      return Symbol::all();
    }
}
