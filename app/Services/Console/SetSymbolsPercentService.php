<?php

namespace App\Services\Console;

use App\Events\ChangeSymbol;
use App\Models\Symbols\Options\Symbol;
use App\Models\SymbolShortStatistic;
use Carbon\Carbon;

class SetSymbolsPercentService {

    public function calculatePercent(){

        foreach(Symbol::all() as $symbol){
            $stat = SymbolShortStatistic::where('symbol_id', $symbol->broker.":".$symbol->symbol)->get();
            $count = $stat->count();
            if($count){
//                $id = SymbolShortStatistic::where('symbol_id', $symbol->broker.":".$symbol->symbol)->latest()->first()->id;
                SymbolShortStatistic::where('symbol_id', $symbol->broker.":".$symbol->symbol)
                    ->where('created_at', '<', Carbon::now()->subMinutes(30))
                    ->delete();
            }
            if($count >= 10){
                $profit_count = $stat->filter(function ($value, $key) {
                    return $value->profit > $value->amount;
                })->count();
                $percent = intval(100 - ($profit_count / $count * 100)); // 130 т.к. на 30 процентов будет повышена доходность, чтобы не была слишком низкой
                if($percent < $symbol->min_percent){
                    $percent = $symbol->min_percent;
                }
                elseif($percent > $symbol->max_percent){
                    $percent = $symbol->max_percent;
                }
                Symbol::where("symbol", $symbol->symbol)->update(['percent' => $percent]);
            } else {
                Symbol::where("symbol", $symbol->symbol)->update(['percent' => $symbol->fixed_percent]);
            }
        }
        broadcast(new ChangeSymbol(Symbol::all()));
        dump("Percents has been calculated");
        return 0;
    }
}