<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Withdrawal;
use Illuminate\Http\Request;

class WithdrawalController extends Controller
{
    public function approveWithdrawal(Request $request){
      $request->validate([
        'id' => 'numeric|min:1',
        'status' => 'numeric|min:1|max:2'
      ]);
      $withdrawal = Withdrawal::where('id', $request->id)->firstOrFail();
      if($withdrawal->status != 0){
        return response()->json(['success' => false, 'message' => 'Заявка уже была обработана!']);
      }
      Withdrawal::where('id', $request->id)->update(['status' => $request->status]);
      return response()->json(['success' => true, 'message' => 'Заявка успешно обработана!']);
    }
}
