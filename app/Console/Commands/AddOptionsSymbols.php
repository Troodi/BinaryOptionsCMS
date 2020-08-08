<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class AddOptionsSymbols extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'options:add {symbol}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $symbol = $this->argument('symbol');
        if(!$symbol){
          $this->line('Symbol needed! Use --symbol={pair} flag.');
        }
        $timeframes = ['Ticks', '1S', '3S', '5S', '10S', '15S', '30S', '1M', '3M', '5M', '10M', '15M', '30M'];
        foreach($timeframes as $timeframe) {
          $finalSymbol = $symbol.$timeframe;
          Artisan::call("make:model Models/Symbols/Options/$symbol/$finalSymbol -m");
        }
        return 0;
    }
}
