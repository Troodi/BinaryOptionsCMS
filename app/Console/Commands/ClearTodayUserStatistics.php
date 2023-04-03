<?php

namespace App\Console\Commands;

use App\Models\UserTodayStatistic;
use App\Services\ClearTodayUserStatisticsService;
use Carbon\Carbon;
use Illuminate\Console\Command;

class ClearTodayUserStatistics extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'clear:today_user_stat';

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
    public function handle(ClearTodayUserStatisticsService $clearTodayUserStatisticsService)
    {
        $clearTodayUserStatisticsService->clear();
    }
}
