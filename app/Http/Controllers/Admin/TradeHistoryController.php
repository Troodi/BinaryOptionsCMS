<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class TradeHistoryController extends Controller
{
    public function getHistory(Request $request){
      $id = null;
      if($request->id){
        $request->validate(['id' => 'required|numeric|min:0']);
        $id = $request->id;
      }
      return $this->getHistoryDatatable('order_history_1',$id);
    }

    public function getHistoryDemo(Request $request){
      $id = null;
      if($request->id){
        $request->validate(['id' => 'required|numeric|min:0']);
        $id = $request->id;
      }
      return $this->getHistoryDatatable('order_demo_history_1', $id);
    }

    public static function getHistoryDatatable($table, $id){
      $history = DB::table($table);
      if($id){
        $history = $history->where('user_id', $id);
      }
      $history = $history->join('users', "$table.user_id", '=', 'users.id')
        ->select([
          "$table.id",
          "$table.symbol_id",
          "$table.user_id",
          "$table.open_at",
          "$table.close_at",
          "$table.amount",
          "$table.open_price",
          "$table.close_price",
          "$table.profit",
          "$table.percent",
          "$table.type",
          "$table.created_at",
          "users.email",
        ])
        ->get();
      return Datatables::of($history)->make();
    }
}
