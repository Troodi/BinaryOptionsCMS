<?php

namespace App\Http\Controllers\Main;

use App\Events\ChangeBalance;
use App\Events\ChangeContestBalance;
use App\Events\ChangeDemoBalance;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\MainHttp\Trading\BuySymbolRequest;
use App\Http\Requests\MainHttp\Trading\DemoTradingHistoryRequest;
use App\Http\Requests\MainHttp\Trading\TradingHistoryRequest;
use App\MarketStatus;
use App\Models\Contest;
use App\Models\ContestOpenOrder;
use App\Models\ContestUser;
use App\Models\LatestDemoOrder;
use App\Models\LatestOrder;
use App\Models\OpenDemoOrders;
use App\Models\OpenOrders;
use App\Models\Symbols\Options\Symbol;
use App\Models\Symbols\Options\Ticks;
use App\Models\SymbolShortStatistic;
use App\Models\UserTodayStatistic;
use App\Services\MainHttp\TradingService;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class TradingController extends Controller
{
    public function getAuthToken(TradingService $tradingService, Request $request)
    {
        return response()->json($tradingService->getAuthTokenServ($request));
    }

    public function buySymbol(TradingService $tradingService, BuySymbolRequest $request)
    {
        return response()->json($tradingService->buySymbolServ($request));
    }

    public function getOpenOrders(TradingService $tradingService, Request $request)
    {
        return response()->json($tradingService->getOpenOrdersServ($request));
    }

  public function getLatestOrders(TradingService $tradingService, Request $request)
  {
      return response()->json($tradingService->getLatestOrdersServ($request));
  }

  public function getOpenDemoOrders(TradingService $tradingService, Request $request)
  {
      return response()->json($tradingService->getOpenDemoOrdersServ($request));
  }

  public function getLatestDemoOrders(TradingService $tradingService, Request $request)
  {
      return response()->json($tradingService->getLatestDemoOrdersServ($request));
  }

  public function tradingHistory(TradingService $tradingService, TradingHistoryRequest $request)
  {
      return response()->json($tradingService->tradingHistoryServ($request));
  }

  public function demoTradingHistory(TradingService $tradingService, DemoTradingHistoryRequest $request)
  {
      return response()->json($tradingService->demoTradingHistoryServ($request));
  }

  public function refillDemoBalance(TradingService $tradingService, Request $request)
  {
      return response()->json($tradingService->refillDemoBalanceServ($request));
  }

  public function ping(TradingService $tradingService, Request $request){
    return null;
  }

  private function formatSeconds(TradingService $tradingService, $seconds_from)
  {
      return response()->json($tradingService->formatSecondsServ($seconds_from));
  }
}
