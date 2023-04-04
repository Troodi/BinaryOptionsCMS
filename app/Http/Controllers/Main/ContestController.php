<?php

namespace App\Http\Controllers\Main;

use App\Events\ChangeBalance;
use App\Events\ChangeContestBalance;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\MainHttp\Contest\BuyBalanceOnContestRequest;
use App\Http\Requests\MainHttp\Contest\GetAllContestsRequest;
use App\Http\Requests\MainHttp\Contest\GetContestInfoRequest;
use App\Http\Requests\MainHttp\Contest\GetContestUserRequest;
use App\Http\Requests\MainHttp\Contest\GetLatestOrdersRequest;
use App\Http\Requests\MainHttp\Contest\GetOpenOrdersRequest;
use App\Http\Requests\MainHttp\Contest\GetUserPlaceRequest;
use App\Http\Requests\MainHttp\Contest\GetWinnersForContestRequest;
use App\Http\Requests\MainHttp\Contest\RegisterOnContestRequest;
use App\Models\Contest;
use App\Models\ContestLatestOrder;
use App\Models\ContestOpenOrder;
use App\Models\ContestUser;
use App\Services\MainHttp\ContestService;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class ContestController extends Controller
{
    public function registerOnContest(ContestService $contestService, RegisterOnContestRequest $request)
    {
        return response()->json($contestService->registerOnContestServ($request));
    }

    public function buyBalanceOnContest(ContestService $contestService, BuyBalanceOnContestRequest $request)
    {
        return response()->json($contestService->buyBalanceOnContestServ($request));
    }

    public function getUserPlace(ContestService $contestService, GetUserPlaceRequest $request)
    {
        return response()->json($contestService->getUserPlaceServ($request));
    }

    public function getWinnersForContest(ContestService $contestService, GetWinnersForContestRequest $request)
    {
        return response()->json($contestService->getWinnersForContestServ($request));
    }

    public function getAllContests(ContestService $contestService, GetAllContestsRequest $request)
    {
        return response()->json($contestService->getAllContestsServ($request));
    }

    public function getContestUser(ContestService $contestService, GetContestUserRequest $request)
    {
        return response()->json($contestService->getContestUserServ($request));
    }

    public function getContestInfo(ContestService $contestService, GetContestInfoRequest $request)
    {
        return response()->json($contestService->getContestInfoServ($request));
    }

    public function getOpenOrders(ContestService $contestService, GetOpenOrdersRequest $request)
    {
        return response()->json($contestService->getOpenOrdersServ($request));
    }

    public function getLatestOrders(ContestService $contestService, GetLatestOrdersRequest $request)
    {
        return response()->json($contestService->getLatestOrdersServ($request));
    }

    public function getHistory(ContestService $contestService, Request $request)
    {
        return response()->json($contestService->getHistoryServ($request));
    }
}
