<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Withdrawal\CreateWithdrawSystemRequest;
use App\Http\Requests\Admin\Withdrawal\EditWithdrawSystemRequest;
use App\Http\Requests\Admin\Withdrawal\ProcessWithdrawalRequest;
use App\Http\Requests\Admin\Withdrawal\RemoveWithdrawSystemRequest;
use App\Models\Withdrawal;
use App\Models\WithdrawSystem;
use App\Services\Admin\WithdrawalService;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Ixudra\Curl\Facades\Curl;
use Yajra\DataTables\DataTables;

class WithdrawalController extends Controller
{
    public function processWithdrawal(ProcessWithdrawalRequest $request, WithdrawalService $withdrawalService)
    {
        return response()->json($withdrawalService->processWithdrawalServ($request));
    }

    public function allWithdrawals(Request $request, WithdrawalService $withdrawalService)
    {
        return response()->json($withdrawalService->allWithdrawalsServ($request));
    }

    public function allWithdrawalSystems(Request $request, WithdrawalService $withdrawalService)
    {
        return response()->json($withdrawalService->allWithdrawalSystemsServ($request));
    }

  public function editWithdrawSystem(EditWithdrawSystemRequest $request, WithdrawalService $withdrawalService)
  {
      return response()->json($withdrawalService->editWithdrawSystemServ($request));
  }

  public function removeWithdrawSystem(RemoveWithdrawSystemRequest $request, WithdrawalService $withdrawalService)
  {
      return response()->json($withdrawalService->removeWithdrawSystemServ($request));
  }

  public function createWithdrawSystem(CreateWithdrawSystemRequest $request, WithdrawalService $withdrawalService)
  {
      return response()->json($withdrawalService->createWithdrawSystemServ($request));
  }
}
