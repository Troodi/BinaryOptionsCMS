<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\TradeHistoryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class TradeHistoryController extends Controller
{
    public function getHistory(Request $request, $id, TradeHistoryService $tradeHistoryService)
    {
        return response()->json($tradeHistoryService->getHistoryServ($request, $id));
    }

    public function getHistoryDemo(Request $request, $id, TradeHistoryService $tradeHistoryService)
    {
        return response()->json($tradeHistoryService->getHistoryDemoServ($request, $id));
    }

    public static function getHistoryDatatable($table, $id, TradeHistoryService $tradeHistoryService)
    {
        return response()->json($tradeHistoryService->getHistoryDatatableServ($table, $id));
    }
}
