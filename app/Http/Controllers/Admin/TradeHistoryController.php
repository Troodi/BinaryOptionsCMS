<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LatestOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class TradeHistoryController extends Controller
{
    public function getHistory(Request $request){
      $history = DB::table('order_history_1')
        ->join('users', 'order_history_1.user_id', '=', 'users.id')
        ->select([
          'order_history_1.id',
          'order_history_1.symbol_id',
          'order_history_1.user_id',
          'order_history_1.open_at',
          'order_history_1.close_at',
          'order_history_1.amount',
          'order_history_1.open_price',
          'order_history_1.close_price',
          'order_history_1.profit',
          'order_history_1.percent',
          'order_history_1.type',
          'order_history_1.created_at',
          'users.email',
        ])
        ->get();
      return Datatables::of($history)->make();
    }
}
