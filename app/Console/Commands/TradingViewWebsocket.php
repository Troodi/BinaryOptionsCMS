<?php

namespace App\Console\Commands;

use App\Helpers\Helper;
use App\MarketStatus;
use App\Models\Symbols\Options\Ticks;
use App\Services\TradingViewWebsocketService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use App\Models\Symbols\Options\Symbol;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use WebSocket\Client;

class TradingViewWebsocket extends Command
{

  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'tradingview:start';

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
      $tradingViewWebsocketService->run();
  }
}
