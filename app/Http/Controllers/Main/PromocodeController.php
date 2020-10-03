<?php

namespace App\Http\Controllers\Main;

use App\Events\ChangeBalance;
use App\Http\Controllers\Controller;
use App\Models\Deposit;
use App\Models\LatestOrder;
use App\Models\Promocode;
use App\Models\PromocodeHistory;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class PromocodeController extends Controller
{
  public function getAvailablePromocodes(Request $request){
    return Promocode::where('active_from', '<', Carbon::now())
      ->where('active_to', '>', Carbon::now())
      ->where('public_code', 1)
      ->get();
  }

  public function checkPromocode(Request $request){
    $request->validate([
      'code' => 'string|min:1|max:255'
    ]);
    $promocode = Promocode::where('code', $request->code)->first();
    if(!$promocode){
      return response()->json(['success' => false, 'message' => 'Такого промокода не существует!'], 200);
    }
    $active_from = Carbon::parse($promocode->active_from);
    $active_to = Carbon::parse($promocode->active_to);
    if(Carbon::now() < $active_from or Carbon::now() > $active_to){
      return response()->json(['success' => false, 'message' => 'Срок действия промокода истёк!'], 200);
    }
    $deposits = Deposit::where('user_id', Auth::user()->id)->where('status', 1)->count() + LatestOrder::where('user_id', Auth::user()->id)->count() + PromocodeHistory::where('user_id', Auth::user()->id)->whereHas('promocode', function($query){ $query->where('for_new', 1); })->count();
    if($promocode->for_new and $deposits){
      return response()->json(['success' => false, 'message' => 'Данный промокод предназначен только для новых пользователей!'], 200);
    }
    $promocode_history = PromocodeHistory::where('user_id', Auth::user()->id)->where('promocode_id', $promocode->id)->count();
    if($promocode->attempts && $promocode_history >= $promocode->attempts){
      return response()->json(['success' => false, 'message' => 'Вы уже использовали максимальное количество раз данный промокод!'], 200);
    }
    if($promocode->type == 1) {
      $turnover = $promocode->bonus_size * $promocode->turnover;
      $model = new PromocodeHistory;
      $model->user_id = Auth::user()->id;
      $model->promocode_id = $promocode->id;
      $model->save();
      User::where('id', Auth::user()->id)
        ->update([
          'bonus' => DB::raw("bonus+$promocode->bonus_size"),
          'all_turnover' => DB::raw("all_turnover+$turnover"),
          'left_turnover' => DB::raw("left_turnover+$turnover"),
          'balance' => DB::raw("balance+$promocode->bonus_size")
        ]);
      broadcast(new ChangeBalance(Auth::user()->balance+$promocode->bonus_size, Auth::user()));
      return response()->json(['success' => true, 'message' => 'Промокод на бездепозиный бонус активирован!'], 200);
    } elseif ($promocode->type == 2){
      return response()->json(['success' => true, 'message' => 'Данный промокод активен и доступен при пополнении баланса!', 'data' => $promocode], 200);
    }
  }

  public function getDepositPromocodes(Request $request){
    return Promocode::where('public_code', 2)->orderBy('bonus_size', 'desc')->get();
  }

  public function promocodeHistory(Request $request)
  {
    $history = PromocodeHistory::where('user_id', Auth::user()->id)->with('promocode')->get();
    return Datatables::of($history)->make();
  }

  public function discardBonus(Request $request){
    $user = Auth::user();
    if($user->left_turnover == 0 or $user->all_turnover == 0){
      return response()->json(['success' => false, 'message' => 'У Вас нет бонусов!'], 200);
    }
    $percent_to_payout = 1 - ($user->left_turnover / $user->all_turnover); // Сколько процентов отработано
    $add_to_balance = $user->bonus * $percent_to_payout - $user->bonus;
    User::where('id', Auth::user()->id)->update(['bonus' => 0, 'all_turnover' => 0, 'left_turnover' => 0, 'balance' => DB::raw("balance+$add_to_balance")]);
    broadcast(new ChangeBalance(Auth::user()->balance+$add_to_balance, Auth::user()));
    return response()->json(['success' => true, 'message' => 'Бонус успешно отменен!'], 200);
  }
}
