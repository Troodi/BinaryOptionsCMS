<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Contest\CreateContestRequest;
use App\Http\Requests\Admin\Contest\GetContestTradingDataRequest;
use App\Http\Requests\Admin\Contest\LoadContestDataRequest;
use App\Http\Requests\Admin\Contest\UpdateBalanceRequest;
use App\Http\Requests\Admin\Contest\UpdateBanRequest;
use App\Models\Contest;
use App\Models\ContestUser;
use App\Models\SymbolContestStatistic;
use App\Services\Admin\ContestService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class ContestController extends Controller
{
    /*
     * Create or update contest
     */
    public function createContest(CreateContestRequest $request, ContestService $contestService)
    {
        return response()->json($contestService->createContestServ($request));
    }

    /*
     * Get data for specific contest by id
     */
    public function loadContestData(LoadContestDataRequest $request, ContestService $contestService)
    {
        return response()->json($contestService->loadContestDataServ($request));
    }

    /*
     * Get all contests
     */
    public function allContests(Request $request, ContestService $contestService)
    {
        return $contestService->allContestsServ($request);
    }

    /*
     * Get users of specific contest by id
     */
    public function contestUsers(Request $request, $id, ContestService $contestService)
    {
        return $contestService->contestUsersServ($request, $id);
    }

    /*
     * Get user data for contest by user ID and contest ID
     */
    public function getContestUserData(Request $request, $contest_id, $user_id, ContestService $contestService)
    {
        return response()->json($contestService->getContestUserDataServ($request, $contest_id, $user_id));
    }

    /*
     * Get trading history of specific contest by id
     */
    public function getContestTradingData(GetContestTradingDataRequest $request, ContestService $contestService)
    {
        return $contestService->getContestTradingDataServ($request);
    }

    /*
     * Get statistics for days of specific contest by id
     */
    public function getContestDailyStat(Request $request, $id, ContestService $contestService)
    {
        return $contestService->getContestDailyStatServ($request, $id);
    }

    /*
     * Update tournament user balance
     */
    public function updateBalance(UpdateBalanceRequest $request, $contest_id, $user_id, ContestService $contestService)
    {
        return response()->json($contestService->updateBalanceServ($request, $contest_id, $user_id));
    }

    /*
     * Update tournament user ban
     */
    public function updateBan(UpdateBanRequest $request, $contest_id, $user_id, ContestService $contestService)
    {
        return response()->json($contestService->updateBanServ($request, $contest_id, $user_id));
    }
}
