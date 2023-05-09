<?php

namespace App\Console\Commands;

use App\Models\Symbols\Options\Symbol;
use App\Services\Console\GetMoreDataService;
use App\Services\Console\TradingViewWebsocketService;
use Illuminate\Console\Command;

class GetMoreDataCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'data:getmore';

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
    public function handle(TradingViewWebsocketService $tradingViewWebsocketService)
    {
        foreach(Symbol::all() as $symbol) {
            while(true){
                try {
                    $this->alert($symbol->broker.':'.str_replace('/', '', $symbol->symbol));
                    $tradingViewWebsocketService = new TradingViewWebsocketService();
                    $tradingViewWebsocketService->runHistoryParsing($symbol->broker.':'.str_replace('/', '', $symbol->symbol), $symbol->id);
                    break;
                } catch (\Throwable $ex){
                    $this->error($ex->getMessage());
                }
            }
        }
    }
}
