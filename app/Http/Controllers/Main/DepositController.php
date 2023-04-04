<?php

namespace App\Http\Controllers\Main;

use App\Events\ChangeBalance;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\MainHttp\Deposit\DepositHistoryRequest;
use App\Http\Requests\MainHttp\Deposit\StartDepositRequest;
use App\Models\Deposit;
use App\Models\DepositSystem;
use App\Models\ExchangeRates;
use App\Models\LatestOrder;
use App\Models\Promocode;
use App\Models\PromocodeHistory;
use App\Models\Referral;
use App\Services\MainHttp\DepositService;
use App\User;
use Carbon\Carbon;
use cryptonator\MerchantAPI;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Ixudra\Curl\Facades\Curl;
use Qiwi\Api\BillPayments;
use Yajra\DataTables\DataTables;

class DepositController extends Controller
{
    public function getAllDepositSystems(Request $request, DepositService $depositService)
    {
      return response()->json($depositService->getAllDepositSystems($request));
    }

    public function qiwiProcess(Request $request, DepositService $depositService)
    {
        return response()->json($depositService->qiwiProcess($request));
    }

    public function yooMoneyProcess(Request $request, DepositService $depositService)
    {
        return response()->json($depositService->yooMoneyProcess($request));
    }

    public function cryptonatorProcess(Request $request, DepositService $depositService)
    {
        return response()->json($depositService->cryptonatorProcess($request));
    }

    public function startDeposit(StartDepositRequest $request, DepositService $depositService)
    {
        return response()->json($depositService->startDeposit($request));
    }

    public function processPayeer(Request $request, DepositService $depositService)
    {
        return response()->json($depositService->processPayeer($request));
    }

    public function processFreeKassa(Request $request, DepositService $depositService)
    {
        return response()->json($depositService->processFreeKassa($request));
    }

    public function depositHistory(DepositHistoryRequest $request, DepositService $depositService)
    {
        return response()->json($depositService->depositHistory($request));
    }

    private function processDeposit($orderId, DepositService $depositService)
    {
        return response()->json($depositService->processDepositServ($orderId));
    }
}
