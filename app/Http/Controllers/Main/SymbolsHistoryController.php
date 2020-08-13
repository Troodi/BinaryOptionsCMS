<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Symbols\Options\Symbol;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SymbolsHistoryController extends Controller
{
    public function historyMinute(Request $request){
      $request->validate([
        'aggregate' => 'numeric',
        'fsym' => 'required',
        'tsym' => 'required',
        'toTs' => 'required|numeric',
        'limit' => 'numeric'
      ]);
      $collection = DB::connection('pgsql2')
        ->table(strtoupper($request->fsym).strtoupper($request->tsym).'1M')
        ->where('created_at', '<=', Carbon::createFromTimestamp($request->toTs))
        ->orderBy('created_at', 'desc')
        ->take(2001)
        ->get();
      return $collection = $collection->map(function($collection, $key) {
        return [
          'open' => doubleval($collection->open),
          'high' => doubleval($collection->high),
          'low' => doubleval($collection->low),
          'close' => doubleval($collection->close),
          'time' => Carbon::parse($collection->created_at)->timestamp
        ];
      })->sortBy('time')->values();
    }

    public function getExchanges(Request $request){
      return Symbol::all();
    }
}
