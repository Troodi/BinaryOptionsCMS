<?php

namespace App\Services\Console;


use App\Models\Symbols\Options\Symbol;
use App\Models\SymbolShortStatistic;
use Carbon\Carbon;

class ClearLatestStatService {

    public function clear()
    {
        foreach(Symbol::all() as $symbol){
            SymbolShortStatistic::where('symbol_id', $symbol->id)
                ->where('created_at', '<', Carbon::now()->subMinutes(30))
                ->delete();
        }
        dump("Latest stat has been cleared");
        return 0;
    }
}