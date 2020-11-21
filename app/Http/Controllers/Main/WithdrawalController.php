<?php

namespace App\Http\Controllers\Main;

use App\Events\ChangeBalance;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Profile;
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
      $admin = false;
      if($request->id && Helper::isAdmin()){
        $admin = true;
        $request->validate(['id' => 'numeric|min:1']);
      }
      $id = $admin ? $request->id : Auth::user()->id;
      return $admin ? User::where('id', $id)->first() : Auth::user();
    }

    public function processPayout(Request $request){
      $request->validate([
        'amount' => 'required|numeric|min:10|max:100000',
        'system_id' => 'required|numeric|min:0|max:3',
        'address' => 'required|string|min:5|max:155',
      ]);
      $admin = false;
      if($request->id && Helper::isAdmin()){
        $admin = true;
        $request->validate(['id' => 'numeric|min:1']);
      }
      $id = $admin ? $request->id : Auth::user()->id;
      $user = $admin ? User::where('id', $id)->first() : Auth::user();
      if($user->balance < $request->amount){
        return response()->json(['success' => false, 'message' => 'Недостаточно средств для вывода!']);
      }
      if($user->left_turnover > 0){
        return response()->json(['success' => false, 'message' => 'Перед выводом необходимо отработать бонус или отменить его!']);
      }
      if(!Profile::where('user_id', $user->id)->first()->user_verify_at){
        return response()->json(['success' => false, 'message' => 'Для выплаты необходимо пройти верификацию аккаунта!']);
      }
      $model = new Withdrawal();
      $model->user_id = $user->id;
      $model->status = 0;
      $model->system_id = $request->system_id;
      $model->address = $request->address;
      $model->amount = $request->amount;
      $model->save();
      User::where('id', $user->id)->update(['balance' => DB::raw("balance-$request->amount")]);
      broadcast(new ChangeBalance($user->balance-$request->amount, $user));
      return response()->json(['success' => true, 'message' => 'Заявка на вывод успешно создана!']);
    }

  public function withdrawalHistory(Request $request)
  {
    $admin = false;
    if($request->id && Helper::isAdmin()){
      $admin = true;
      $request->validate(['id' => 'numeric|min:1']);
    }
    $id = $admin ? $request->id : Auth::user()->id;
    $history = Withdrawal::where('user_id', $id)->get();
    return Datatables::of($history)->make();
  }
}
