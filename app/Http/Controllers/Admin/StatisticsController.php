<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Deposit;
use App\Models\SymbolStatistic;
use App\Models\Withdrawal;
use App\Services\Admin\StatisticsService;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class StatisticsController extends Controller
{
    public function getShortStatistics(Request $request, StatisticsService $statisticsService)
    {
        return response()->json($statisticsService->getShortStatisticsServ($request));
    }

    public function getAllUsers(Request $request, StatisticsService $statisticsService)
    {
        return $statisticsService->getAllUsersServ($request);
    }

    public function getDailyStat(Request $request, StatisticsService $statisticsService)
    {
        return $statisticsService->getDailyStatServ($request);
    }
}
