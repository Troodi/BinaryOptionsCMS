<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Withdrawal;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Ixudra\Curl\Facades\Curl;

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
      if($request->status == 2){
        User::where('id', $withdrawal->user_id)->update(['balance' => DB::raw("balance+$withdrawal->amount")]);
      }
      // Check balance
      $response = Curl::to('https://payeer.com/ajax/api/api.php?checkUser')
        ->withData([
          'apiId' => env('PAYEER_API_PAYOUT_ID'),
          'apiPass' => env('PAYEER_API_PAYOUT_SECRET'),
          'account' => env('PAYEER_API_WALLET'),
          'action' => 'getBalance',
        ])
        ->asJsonResponse()
        ->post();
      if($withdrawal->amount > $response->balance->USD->available){
        return response()->json(['success' => false, 'message' => 'В платежной системе недостаточно средств для выплаты!']);
      }
      //Check user wallet exist
      $response = Curl::to('https://payeer.com/ajax/api/api.php?checkUser')
        ->withData([
          'apiId' => env('PAYEER_API_PAYOUT_ID'),
          'apiPass' => env('PAYEER_API_PAYOUT_SECRET'),
          'account' => env('PAYEER_API_WALLET'),
          'action' => 'checkUser',
          'user' => $withdrawal->address
        ])
        ->asJsonResponse()
        ->post();
        if($response->errors){
          return response()->json(['success' => false, 'message' => 'Не существует такого кошелька в платежной системе!']);
        }
      // Send money
      $response = Curl::to('https://payeer.com/ajax/api/api.php?transfer')
        ->withData([
          'apiId' => env('PAYEER_API_PAYOUT_ID'),
          'apiPass' => env('PAYEER_API_PAYOUT_SECRET'),
          'account' => env('PAYEER_API_WALLET'),
          'action' => 'transfer',
          'curIn' => 'USD',
          'sum' => $withdrawal->amount,
          'curOut' => 'USD',
          'to' => $withdrawal->address
        ])
        ->asJsonResponse()
        ->post();
      if($response->errors){
        Log::info($response);
        return response()->json(['success' => false, 'message' => 'Не удалось отправить средства!']);
      }
      //
      Withdrawal::where('id', $request->id)->update(['status' => $request->status, 'message' => $request->comment]);
      return response()->json(['success' => true, 'message' => 'Заявка успешно обработана!']);
    }
}
