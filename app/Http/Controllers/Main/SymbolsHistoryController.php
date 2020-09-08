<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Symbols\Options\Symbol;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class SymbolsHistoryController extends Controller
{
    public function getExchanges(Request $request){
      $value = Cache::remember('users', 60, function () {
        return Symbol::orderBy('percent', 'desc')->get();
      });
      return $value;
    }
}
