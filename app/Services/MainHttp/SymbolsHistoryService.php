<?php

namespace App\Services\MainHttp;

use App\Http\Controllers\Controller;
use App\MarketStatus;
use App\Models\Symbols\Options\Symbol;
use App\Models\Symbols\Options\Ticks;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class SymbolsHistoryService
{
    public function getExch(Request $request){
        $value = Cache::remember('symbols_all', 5, function () {
            $symbols = Symbol::orderBy('percent', 'desc')->get()->map(function($symbol) {
                $market = MarketStatus::where('symbol_id', $symbol->broker.":".$symbol->symbol);
                if((Carbon::now()->hour >= $symbol->work_to or Carbon::now()->hour < $symbol->work_from) and ($symbol->work_from != $symbol->work_to)){
                    $symbol->percent = 0;
                } elseif(!isset($market) or !$market->count() or $market->first()->market_status != 'market'){ // Если нет статуса
                    $symbol->percent = 0;
                } elseif (!Ticks::where('symbol_id', $symbol->broker.":".$symbol->symbol)->orderBy('created_at')->first()){
                    $symbol->percent = 0;
                } elseif($symbol->status == 0){
                    $symbol->percent = 0;
                }
                return $symbol;
            });
            return $symbols;
        });
        return $value->sortByDesc('percent')->values();
    }
}
