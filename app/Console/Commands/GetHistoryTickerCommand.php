<?php

namespace App\Console\Commands;

use App\Services\Console\TradingViewWebsocketService;
use Illuminate\Console\Command;

class GetHistoryTickerCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'data:historyticker';

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
        $tradingViewWebsocketService->getHistoryTicker('BINANCE:BTC/USDT');
    }
}
