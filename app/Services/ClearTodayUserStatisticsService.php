<?php

namespace App\Services;


use App\Models\UserTodayStatistic;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class ClearTodayUserStatisticsService {

    public function clear()
    {
        UserTodayStatistic::where('created_at', '<', Carbon::today())->delete();
        dump("Today user statistics has been cleared");
        return 0;
    }
}