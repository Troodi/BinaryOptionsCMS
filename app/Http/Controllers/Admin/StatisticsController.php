<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Deposit;
use App\Models\Withdrawal;
use App\User;
use Illuminate\Http\Request;
use OrderHistory1;

class StatisticsController extends Controller
{
    public function getShortStatistics(Request $request){
      return [
        'user_count' => User::count(),
        'banned_users' => User::whereNotNull('banned')->count(),
        'deposit_count' => Deposit::count(),
        'withdrawal_count' => Withdrawal::count(),
        'referral_count' => User::whereNotNull('referer_id')->count(),
        'profit' => 0,
        'deals' => OrderHistory1::count(),
        'turnover' => OrderHistory1::sum('amount'),
        'bonus' => User::sum('bonus'),
        'clear_balance' => User::sum('balance') - User::sum('bonus'),
        'total_profit_count' => OrderHistory1::where('profit', '>', 'amount')->count(),
        'total_loss_count' => OrderHistory1::where('profit', '<', 'amount')->count(),
      ];
    }
}
