<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Deposit\CreateDepositSystemRequest;
use App\Http\Requests\Admin\Deposit\EditDepositSystemRequest;
use App\Http\Requests\Admin\Deposit\RemoveDepositSystemRequest;
use App\Models\Deposit;
use App\Models\DepositSystem;
use App\Services\Admin\DepositService;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;

class DepositController extends Controller
{
  public function allDeposits(Request $request, DepositService $depositService)
  {
      return response()->json($depositService->allDepositsServ($request));
  }

  public function allDepositSystems(Request $request, DepositService $depositService)
  {
      return response()->json($depositService->allDepositSystemsServ($request));
  }

  public function editDepositSystem(EditDepositSystemRequest $request, DepositService $depositService)
  {
      return response()->json($depositService->editDepositSystemServ($request));
  }

  public function removeDepositSystem(RemoveDepositSystemRequest $request, DepositService $depositService)
  {
      return response()->json($depositService->removeDepositSystemServ($request));
  }

  public function createDepositSystem(CreateDepositSystemRequest $request, DepositService $depositService)
  {
      return response()->json($depositService->createDepositSystemServ($request));
  }
}
