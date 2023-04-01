<?php

namespace App\Services;

use App\Events\ChangeSymbol;
use App\Models\Symbols\Options\Symbol;
use App\Models\SymbolShortStatistic;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class SetSymbolsPercentService {

    public function calculatePercent(){

        foreach(Symbol::all() as $symbol){
            $stat = SymbolShortStatistic::where('symbol_id', $symbol->id)->get();
            $count = $stat->count();
            if($count){
                $id = SymbolShortStatistic::where('symbol_id', $symbol->id)->latest()->first()->id;
                SymbolShortStatistic::where('symbol_id', $symbol->id)
                    ->where('created_at', '<', Carbon::now()->subMinutes(30))
                    ->where('id', '<', $id)
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
                Symbol::where('id', $symbol->id)->update(['percent' => $percent]);
            } else {
                Symbol::where('id', $symbol->id)->update(['percent' => $symbol->fixed_percent]);
            }
        }
        broadcast(new ChangeSymbol(Symbol::all()));
        return 0;
    }
}