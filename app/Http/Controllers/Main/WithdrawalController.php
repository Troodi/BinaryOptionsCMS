<?php

namespace App\Http\Controllers\Main;

use App\Events\ChangeBalance;
use App\Http\Controllers\Controller;
use App\Models\PromocodeHistory;
use App\Models\Withdrawal;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class WithdrawalController extends Controller
{
    public function getAccountData(Request $request){
      return Auth::user();
    }

    public function processPayout(Request $request){
      $request->validate([
        'amount' => 'required|numeric|min:10|max:100000',
        'system_id' => 'required|numeric|min:0|max:3'
      ]);
      if(Auth::user()->balance < $request->amount){
        return response()->json(['success' => false, 'message' => 'Недостаточно средств для вывода!']);
      }
      if(Auth::user()->left_turnover > 0){
        return response()->json(['success' => false, 'message' => 'Перед выводом необходимо отработать бонус или отменить его!']);
      }
      $model = new Withdrawal();
      $model->user_id = Auth::user()->id;
      $model->status = 0;
      $model->system_id = $request->system_id;
      $model->amount = $request->amount;
      $model->save();
      User::where('id', Auth::user()->id)->update(['balance' => DB::raw("balance-$request->amount")]);
      broadcast(new ChangeBalance(Auth::user()->balance-$request->amount, Auth::user()));
      return response()->json(['success' => true, 'message' => 'Заявка на вывод успешно создана!']);
    }

  public function withdrawalHistory(Request $request)
  {
    $history = Withdrawal::where('user_id', Auth::user()->id)->get();
    return Datatables::of($history)->make();
  }
}
