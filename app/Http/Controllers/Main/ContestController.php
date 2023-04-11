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
    public function registerOnContest(RegisterOnContestRequest $request, ContestService $contestService)
    {
        return response()->json($contestService->registerOnContestServ($request));
    }

    public function buyBalanceOnContest(BuyBalanceOnContestRequest $request, ContestService $contestService)
    {
        return response()->json($contestService->buyBalanceOnContestServ($request));
    }

    public function getUserPlace(GetUserPlaceRequest $request, ContestService $contestService)
    {
        return response()->json($contestService->getUserPlaceServ($request));
    }

    public function getWinnersForContest(GetWinnersForContestRequest $request, ContestService $contestService)
    {
        return response()->json($contestService->getWinnersForContestServ($request));
    }

    public function getAllContests(GetAllContestsRequest $request, ContestService $contestService)
    {
        return response()->json($contestService->getAllContestsServ($request));
    }

    public function getContestUser(GetContestUserRequest $request, ContestService $contestService)
    {
        return response()->json($contestService->getContestUserServ($request));
    }

    public function getContestInfo(GetContestInfoRequest $request, ContestService $contestService)
    {
        return response()->json($contestService->getContestInfoServ($request));
    }

    public function getOpenOrders(GetOpenOrdersRequest $request, ContestService $contestService)
    {
        return response()->json($contestService->getOpenOrdersServ($request));
    }

    public function getLatestOrders(GetLatestOrdersRequest $request, ContestService $contestService)
    {
        return response()->json($contestService->getLatestOrdersServ($request));
    }

    public function getHistory(Request $request, $id, ContestService $contestService)
    {
        return response()->json($contestService->getHistoryServ($request, $id));
    }
}
