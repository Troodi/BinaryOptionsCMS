<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\MarketStatus;
use App\Models\Symbols\Options\Symbol;
use App\Models\Symbols\Options\Ticks;
use App\Services\MainHttp\SymbolsHistoryService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class SymbolsHistoryController extends Controller
{
    public function getExchanges(Request $request, SymbolsHistoryService $symbolsHistoryService)
    {
     return response()->json($symbolsHistoryService->getExch($request));
    }
}
