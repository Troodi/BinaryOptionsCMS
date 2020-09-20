<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Deposit;
use App\Models\Promocode;
use App\Models\PromocodeHistory;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
    $deposits = Deposit::where('user_id', Auth::user()->id)->where('status', 1)->count();
    if($promocode->for_new and $deposits){
      return response()->json(['success' => false, 'message' => 'Данный депозит предназначен только для новых пользователей!'], 200);
    }
    $promocode_history = PromocodeHistory::where('user_id', Auth::user()->id)->where('promocode_id', $promocode->id)->count();
    if($promocode_history >= $promocode->attempts){
      return response()->json(['success' => false, 'message' => 'Вы уже использовали максимальное количество раз данный промокод!'], 200);
    }
    $model = new PromocodeHistory;
    $model->user_id = Auth::user()->id;
    $model->promocode_id = $promocode->id;
    $model->save();
    return response()->json(['success' => true, 'message' => 'Промокод активирован!'], 200);
  }
}
