<?php

namespace App\Http\Controllers\Main;

use App\Events\ChangeBalance;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\MainHttp\Withdrawal\GetAccountDataRequest;
use App\Http\Requests\MainHttp\Withdrawal\ProcessPayoutRequest;
use App\Http\Requests\MainHttp\Withdrawal\WithdrawalHistoryRequest;
use App\Models\Profile;
use App\Models\Withdrawal;
use App\Models\WithdrawSystem;
use App\Services\MainHttp\WithdrawalService;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class WithdrawalController extends Controller
{
    public function getAllWithdrawSystems(Request $request, WithdrawalService $withdrawalService)
    {
      return response()->json($withdrawalService->getAllWithdrawSysts($request));
    }

    public function getAccountData(GetAccountDataRequest $request, WithdrawalService $withdrawalService)
    {
        return response()->json($withdrawalService->getAccData($request));
    }

    public function processPayout(ProcessPayoutRequest $request, WithdrawalService $withdrawalService)
    {
        return response()->json($withdrawalService->processOfPayout($request));
    }

  public function withdrawalHistory(WithdrawalHistoryRequest $request, WithdrawalService $withdrawalService)
  {
      return response()->json($withdrawalService->withdrawalHist($request));
  }
}
