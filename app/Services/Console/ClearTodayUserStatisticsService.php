<?php

namespace App\Services\Console;


use App\Models\UserTodayStatistic;
use Carbon\Carbon;

class ClearTodayUserStatisticsService {

    public function clear()
    {
        UserTodayStatistic::where('created_at', '<', Carbon::today())->delete();
        dump("Today user statistics has been cleared");
        return 0;
    }
}