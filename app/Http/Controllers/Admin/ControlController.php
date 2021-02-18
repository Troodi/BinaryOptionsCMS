<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ControlController extends Controller
{
    public function getControlInfo(Request $request)
    {
      $request->validate(['id' => 'numeric|required|min:1']);
      $data = [
        'profile' => Profile::where('user_id', $request->id)->firstOrFail(),
        'user' => User::where('id', $request->id)->firstOrFail(),
      ];
      return response()->json($data);
    }

  public function changeBalance(Request $request)
  {
    if(config('app.demo')){
      return response()->json(['success' => false, 'message' => __('locale.demo_error')]);
    }
    $request->validate([
      'id' => 'numeric|required|min:1',
      'balance' => 'numeric|required',
      'action' => 'numeric|required|min:0|max:2'
    ]);
    $user = User::where('id', $request->id);
    if($request->action == 0){
      $user->update(['balance' => DB::raw("balance+$request->balance")]);
    } elseif($request->action == 1) {
      $user->update(['balance' => DB::raw("balance-$request->balance")]);
    } else {
      $user->update(['balance' => $request->balance]);
    }
    return response()->json(['success' => true, 'message' => 'Баланс пользователя успешно обновлен!']);
  }

  public function banAction(Request $request)
  {
    if(config('app.demo')){
      return response()->json(['success' => false, 'message' => __('locale.demo_error')]);
    }
    $request->validate([
      'id' => 'numeric|required|min:1',
      'action' => 'numeric|required|min:0|max:4'
    ]);
    $action = $request->action ? $request->action : null;
    if($action == 4){
      $action = 3;
    }
    User::where('id', $request->id)->update(['banned' => $action, 'banned_at' => Carbon::now()]);
    return response()->json(['success' => true, 'message' => 'Бан для пользователя обновлен!']);
  }
}
