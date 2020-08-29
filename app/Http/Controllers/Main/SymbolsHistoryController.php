<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Symbols\Options\Symbol;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SymbolsHistoryController extends Controller
{
    public function getExchanges(Request $request){
      return Symbol::orderBy('percent', 'desc')->get();
    }
}
