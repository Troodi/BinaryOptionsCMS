<?php

namespace App\Http\Controllers\Main;

use App\Events\ChangeBalance;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\MainHttp\Promocode\CheckPromocodeRequest;
use App\Http\Requests\MainHttp\Promocode\DiscardBonusRequest;
use App\Http\Requests\MainHttp\Promocode\PromocodeHistoryRequest;
use App\Models\Deposit;
use App\Models\LatestOrder;
use App\Models\OpenOrders;
use App\Models\Promocode;
use App\Models\PromocodeHistory;
use App\Services\MainHttp\PromocodeService;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class PromocodeController extends Controller
{
  public function getAvailablePromocodes(Request $request, PromocodeService $promocodeService)
  {
      return response()->json($promocodeService->getAvailablePromocodesServ($request));
  }

  public function checkPromocode(CheckPromocodeRequest $request, PromocodeService $promocodeService)
  {
      $service  = $promocodeService->checkPromocodeServ($request);
      return response()->json($service['data'], $service['status']);  }

  public function getDepositPromocodes(Request $request, PromocodeService $promocodeService)
  {
      return response()->json($promocodeService->getDepositPromocodesServ($request));
  }

  public function promocodeHistory(PromocodeHistoryRequest $request, PromocodeService $promocodeService)
  {
      return $promocodeService->promocodeHistoryServ($request);
  }

  public function discardBonus(DiscardBonusRequest $request, PromocodeService $promocodeService)
  {
      $service  = $promocodeService->discardBonusServ($request);
      return response()->json($service['data'], $service['status']);  }
}
