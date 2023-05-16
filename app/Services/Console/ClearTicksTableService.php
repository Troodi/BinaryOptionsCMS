<?php

namespace App\Services\Console;


use App\Models\Symbols\Options\Symbol;
use App\Models\Symbols\Options\Ticks;
use Carbon\Carbon;

class ClearTicksTableService {

    public function clear()
    {
        foreach(Symbol::all() as $symbol){
            $count = Ticks::where('symbol_id', $symbol->id)->get();
            if($count){
                $first = Ticks::where('symbol_id', $symbol->id)->latest()->first();
                if(!$first){
                    continue;
                }
                $id = $first->id;
                Ticks::where('symbol_id', $symbol->id)
                    ->where('created_at', '<', Carbon::now()->subMinutes(2))
                    ->where('id', '<', $id)
                    ->delete();
            }
        }
        dump("Tick table has been cleared");
        return 0;
    }
}