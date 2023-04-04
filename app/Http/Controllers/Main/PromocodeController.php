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
  public function getAvailablePromocodes(PromocodeService $promocodeService, Request $request)
  {
      return response()->json($promocodeService->getAvailablePromocodesServ($request));
  }

  public function checkPromocode(PromocodeService $promocodeService, CheckPromocodeRequest $request)
  {
      return response()->json($promocodeService->checkPromocodeServ($request));
  }

  public function getDepositPromocodes(PromocodeService $promocodeService, Request $request)
  {
      return response()->json($promocodeService->getDepositPromocodesServ($request));
  }

  public function promocodeHistory(PromocodeService $promocodeService, PromocodeHistoryRequest $request)
  {
      return response()->json($promocodeService->promocodeHistoryServ($request));
  }

  public function discardBonus(PromocodeService $promocodeService, DiscardBonusRequest $request)
  {
      return response()->json($promocodeService->discardBonusServ($request));
  }
}
