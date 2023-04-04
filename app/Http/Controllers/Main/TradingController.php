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
    public function getAuthToken(Request $request, TradingService $tradingService)
    {
        return response()->json($tradingService->getAuthTokenServ($request));
    }

    public function buySymbol(BuySymbolRequest $request, TradingService $tradingService)
    {
        return response()->json($tradingService->buySymbolServ($request));
    }

    public function getOpenOrders(Request $request, TradingService $tradingService)
    {
        return response()->json($tradingService->getOpenOrdersServ($request));
    }

  public function getLatestOrders(Request $request, TradingService $tradingService)
  {
      return response()->json($tradingService->getLatestOrdersServ($request));
  }

  public function getOpenDemoOrders(Request $request, TradingService $tradingService)
  {
      return response()->json($tradingService->getOpenDemoOrdersServ($request));
  }

  public function getLatestDemoOrders(Request $request, TradingService $tradingService)
  {
      return response()->json($tradingService->getLatestDemoOrdersServ($request));
  }

  public function tradingHistory(TradingHistoryRequest $request, TradingService $tradingService)
  {
      return response()->json($tradingService->tradingHistoryServ($request));
  }

  public function demoTradingHistory(DemoTradingHistoryRequest $request, TradingService $tradingService)
  {
      return response()->json($tradingService->demoTradingHistoryServ($request));
  }

  public function refillDemoBalance(Request $request, TradingService $tradingService)
  {
      return response()->json($tradingService->refillDemoBalanceServ($request));
  }

  public function ping(Request $request, TradingService $tradingService)
  {
    return null;
  }

  private function formatSeconds($seconds_from, TradingService $tradingService)
  {
      return response()->json($tradingService->formatSecondsServ($seconds_from));
  }
}
