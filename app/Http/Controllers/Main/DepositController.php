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
    public function getAllDepositSystems(DepositService $depositService, Request $request)
    {
      return response()->json($depositService->getAllDepositSystems($request));
    }

    public function qiwiProcess(DepositService $depositService, Request $request)
    {
        return response()->json($depositService->qiwiProcess($request));
    }

    public function yooMoneyProcess(DepositService $depositService, Request $request)
    {
        return response()->json($depositService->yooMoneyProcess($request));
    }

    public function cryptonatorProcess(DepositService $depositService, Request $request)
    {
        return response()->json($depositService->cryptonatorProcess($request));
    }

    public function startDeposit(DepositService $depositService, StartDepositRequest $request)
    {
        return response()->json($depositService->startDeposit($request));
    }

    public function processPayeer(DepositService $depositService, Request $request)
    {
        return response()->json($depositService->processPayeer($request));
    }

    public function processFreeKassa(DepositService $depositService, Request $request)
    {
        return response()->json($depositService->processFreeKassa($request));
    }

    public function depositHistory(DepositService $depositService, DepositHistoryRequest $request)
    {
        return response()->json($depositService->depositHistory($request));
    }

    private function processDeposit(DepositService $depositService, $orderId)
    {
        return response()->json($depositService->processDepositServ($orderId));
    }
}
