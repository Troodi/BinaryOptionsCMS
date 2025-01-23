<?php

namespace App\Services\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class TradeHistoryService
{
    public function getHistoryServ(Request $request, $id)
    {
        $id = isset($id) ? $id : null;
        return $this->getHistoryDatatableServ('order_history_1', $id);
    }

    public function getHistoryDemoServ(Request $request, $id)
    {
        $id = isset($id) ? $id : null;
        return $this->getHistoryDatatableServ('order_demo_history_1', $id);
    }

    public function getHistoryDatatableServ($table, $id)
    {
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
