<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Deposit;
use App\Models\SymbolStatistic;
use App\Models\Withdrawal;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class StatisticsController extends Controller
{
    public function getShortStatistics(Request $request){
      $clear_profit = DB::table('order_history_1')->where('profit', '>', 'amount');
      return [
        'user_count' => User::count(),
        'banned_users' => User::whereNotNull('banned')->count(),
        'deposit_count' => Deposit::count(),
        'withdrawal_count' => Withdrawal::count(),
        'referral_count' => User::whereNotNull('referer_id')->count(),
        'profit' => number_format(DB::table('order_history_1')->where('profit', 0)->sum('amount') - ($clear_profit->sum('profit') - $clear_profit->sum('amount')), 2),
        'deals' => DB::table('order_history_1')->count(),
        'turnover' => DB::table('order_history_1')->sum('amount'),
        'bonus' => User::sum('bonus'),
        'clear_balance' => User::sum('balance') - User::sum('bonus'),
        'total_profit_count' => $clear_profit->count(),
        'total_loss_count' => DB::table('order_history_1')->where('profit', 0)->count(),
      ];
    }

    public function getAllUsers(Request $request){
      $users = User::get();
      return Datatables::of($users)
        ->addColumn('geo', function($user){
          if($user->ip){
            $country = geoip($user->ip)['country'];
          } else {
            $country = 'Undefined';
          }
          return $country;
        })
        ->addColumn('geo_code', function($user){
          if($user->ip){
            $code = strtolower(geoip($user->ip)['iso_code']);
          } else {
            $code = 'un';
          }
          return $code;
        })
        ->addColumn('status', function($user){ if($user->updated_at > Carbon::now()->subMinutes(20)){ return 1; } else { return 0; } })
        ->rawColumns(['name', 'geo'])
        ->make();
    }

    public function getDailyStat(Request $request){
      $daily = SymbolStatistic::select(
          DB::raw('SUM(daily_orders_count) AS daily_orders_count'),
          DB::raw('SUM(daily_orders_amount) AS daily_orders_amount'),
          DB::raw('SUM(daily_profit) AS daily_profit'),
          DB::raw('SUM(daily_loss) AS daily_loss'),
          DB::raw('SUM(daily_profit_count) AS daily_profit_count'),
          DB::raw('SUM(daily_loss_count) AS daily_loss_count'),
          DB::raw('CAST(created_at AS DATE) created_at')
        )
        ->groupBy(DB::raw('CAST(created_At AS DATE)'))
        ->orderBy('created_at', 'desc')
        ->get();
      return Datatables::of($daily)->make();
    }
}
