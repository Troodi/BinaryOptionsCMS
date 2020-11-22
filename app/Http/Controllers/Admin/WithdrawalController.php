<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Withdrawal;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WithdrawalController extends Controller
{
    public function processWithdrawal(Request $request){
      $request->validate([
        'id' => 'numeric|min:1',
        'status' => 'numeric|min:1|max:2',
        'comment' => 'string|nullable'
      ]);
      $withdrawal = Withdrawal::where('id', $request->id)->firstOrFail();
      if($withdrawal->status != 0){
        return response()->json(['success' => false, 'message' => 'Заявка уже была обработана!']);
      }
      Withdrawal::where('id', $request->id)->update(['status' => $request->status, 'message' => $request->comment]);
      if($request->status == 2){
        User::where('id', $withdrawal->user_id)->update(['balance' => DB::raw("balance+$withdrawal->amount")]);
      }
      return response()->json(['success' => true, 'message' => 'Заявка успешно обработана!']);
    }
}
