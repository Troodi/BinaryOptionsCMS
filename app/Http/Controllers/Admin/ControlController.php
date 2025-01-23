<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Control\BanActionRequest;
use App\Http\Requests\Admin\Control\ChangeBalanceRequest;
use App\Models\Profile;
use App\Services\Admin\ControlService;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ControlController extends Controller
{
  public function getControlInfo(Request $request, $id, ControlService $controlService)
  {
      return response()->json($controlService->getControlInfoServ($request, $id));
  }

  public function getUserBan(Request $request, $id, ControlService $controlService)
  {
      return response()->json($controlService->getUserBanServ($request, $id));
  }

  public function changeBalance(ChangeBalanceRequest $request, $id, ControlService $controlService)
  {
      return response()->json($controlService->changeBalanceServ($request, $id));
  }

  public function banAction(BanActionRequest $request, $id, ControlService $controlService)
  {
      return response()->json($controlService->banActionServ($request, $id));
  }
}
