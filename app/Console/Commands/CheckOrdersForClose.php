<?php

namespace App\Console\Commands;

use App\Events\ChangeBalance;
use App\Events\ChangeContestBalance;
use App\Events\ChangeDemoBalance;
use App\Events\CloseContestOptionEvent;
use App\Events\CloseDemoOptionEvent;
use App\Events\CloseOptionEvent;
use App\MarketStatus;
use App\Models\Contest;
use App\Models\ContestLatestOrder;
use App\Models\ContestOpenOrder;
use App\Models\ContestUser;
use App\Models\LatestDemoOrder;
use App\Models\LatestOrder;
use App\Models\OpenDemoOrders;
use App\Models\OpenOrders;
use App\Models\Referral;
use App\Models\SymbolContestStatistic;
use App\Models\SymbolDemoStatistic;
use App\Models\Symbols\Options\Ticks;
use App\Models\SymbolShortStatistic;
use App\Models\SymbolStatistic;
use App\Models\UserTodayStatistic;
use App\Services\CheckOrdersForCloseService;
use App\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class CheckOrdersForClose extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:orders';

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
    // Пытался переделать, но не понял, как правильно изменить CheckOrdersForCloseService. Возможно сделал, но не понял, потому что не было реакции
    // Если сделал правильно, заменить код на $checkOrdersForCloseService->allChecks(); и желательно добавить dump
    public function handle(CheckOrdersForCloseService $checkOrdersForCloseService)
    {
       $checkOrdersForCloseService->allChecks();
    }
}
