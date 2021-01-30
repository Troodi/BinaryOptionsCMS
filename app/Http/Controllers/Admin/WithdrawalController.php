<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Withdrawal;
use App\Models\WithdrawSystem;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Ixudra\Curl\Facades\Curl;
use Yajra\DataTables\DataTables;

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
        Withdrawal::where('id', $request->id)->update(['status' => $request->status, 'message' => $request->comment]);
        $message = $request->comment ? 'Причина: '.$request->comment : 'Причина отклонения не была указана';
        $mail_data = [
          'headline' => "Выплата отклонена",
          'subtitle' =>  'Вывод средств не был осуществлен',
          'text' => "<p>К сожалению, выплата не произведена. $message</p>",
          'image' => 'order-cancel.png',
          'button_link' => env('APP_URL').'/profile',
          'button_text' => 'Перейти в кабинет'
        ];
        Mail::send('mail.mail', $mail_data, function($message) use ($request, $withdrawal)
        {
          $message->from(env('MAIL_USERNAME'), env('APP_NAME'));
          $message->replyTo(env('MAIL_USERNAME'));
          $message->subject("Выплата отклонена");
          $message->to(User::where('id', $withdrawal->user_id)->first()->email);
        });
        return response()->json(['success' => true, 'message' => 'Заявка на выплату была отклонена!']);
      }
      if($request->status == 1) {
        // Автовыплата (пока в ручном режиме)
//        // Check balance
//        $response = Curl::to('https://payeer.com/ajax/api/api.php?checkUser')
//          ->withData([
//            'apiId' => env('PAYEER_API_PAYOUT_ID'),
//            'apiPass' => env('PAYEER_API_PAYOUT_SECRET'),
//            'account' => env('PAYEER_API_WALLET'),
//            'action' => 'getBalance',
//          ])
//          ->asJsonResponse()
//          ->post();
//        if ($withdrawal->amount > $response->balance->USD->available) {
//          return response()->json(['success' => false, 'message' => 'В платежной системе недостаточно средств для выплаты!']);
//        }
//        //Check user wallet exist
//        $response = Curl::to('https://payeer.com/ajax/api/api.php?checkUser')
//          ->withData([
//            'apiId' => env('PAYEER_API_PAYOUT_ID'),
//            'apiPass' => env('PAYEER_API_PAYOUT_SECRET'),
//            'account' => env('PAYEER_API_WALLET'),
//            'action' => 'checkUser',
//            'user' => $withdrawal->address
//          ])
//          ->asJsonResponse()
//          ->post();
//        if ($response->errors) {
//          return response()->json(['success' => false, 'message' => 'Не существует такого кошелька в платежной системе!']);
//        }
//        // Send money
//        $response = Curl::to('https://payeer.com/ajax/api/api.php?transfer')
//          ->withData([
//            'apiId' => env('PAYEER_API_PAYOUT_ID'),
//            'apiPass' => env('PAYEER_API_PAYOUT_SECRET'),
//            'account' => env('PAYEER_API_WALLET'),
//            'action' => 'transfer',
//            'curIn' => 'USD',
//            'sum' => $withdrawal->amount,
//            'curOut' => 'USD',
//            'to' => $withdrawal->address
//          ])
//          ->asJsonResponse()
//          ->post();
//        if ($response->errors) {
//          Log::info(serialize($response));
//          return response()->json(['success' => false, 'message' => 'Не удалось отправить средства!']);
//        }
        //
        Withdrawal::where('id', $request->id)->update(['status' => $request->status, 'message' => $request->comment]);
        $mail_data = [
          'headline' => "Средства успешно выплачены",
          'subtitle' => 'Выплата произведена',
          'text' => '<p>Поздравляем! Вам была произведена выплата.</p>',
          'image' => 'order-refund.png',
          'button_link' => env('APP_URL') . '/profile',
          'button_text' => 'Перейти в кабинет'
        ];
        Mail::send('mail.mail', $mail_data, function ($message) use ($request, $withdrawal) {
          $message->from(env('MAIL_USERNAME'), env('APP_NAME'));
          $message->replyTo(env('MAIL_USERNAME'));
          $message->subject("Средства успешно выплачены");
          $message->to(User::where('id', $withdrawal->user_id)->first()->email);
        });
      }
      return response()->json(['success' => true, 'message' => 'Заявка успешно обработана!']);
    }

    public function allWithdrawals(Request $request){
      $requests = Withdrawal::with(['user'])->get();
      return Datatables::of($requests)->make();
    }

    public function allWithdrawalSystems(Request $request){
      return WithdrawSystem::orderBy('id', 'asc')->get();
    }

  public function editWithdrawSystem(Request $request){
    $request->validate([
      'id' => 'required|numeric|min:1',
      'newId' => 'required|numeric|min:1',
      'system' => 'required|string|min:1',
      'order' => 'numeric|min:0|nullable',
      'active' => 'required|numeric|min:0|max:1',
    ]);
    WithdrawSystem::where('id', $request->id)->update([
      'id' => $request->newId,
      'text' => $request->system,
      'order' => $request->order,
      'hidden' => $request->active,
    ]);
    return response()->json(['success' => true, 'message' => 'Данные успешно обновлены!']);
  }

  public function removeWithdrawSystem(Request $request){
    $request->validate([
      'id' => 'required|numeric|min:1',
    ]);
    WithdrawSystem::where('id', $request->id)->delete();
    return response()->json(['success' => true, 'message' => 'Система успешно удалена!']);
  }

  public function createWithdrawSystem(Request $request){
    $request->validate([
      'system' => 'required|string|min:1',
      'order' => 'numeric|min:0|nullable',
      'active' => 'required|numeric|min:0|max:1',
    ]);
    $model = new WithdrawSystem();
    $model->text = $request->system;
    $model->order = $request->order;
    $model->hidden = $request->active;
    $model->save();
    return response()->json(['success' => true, 'message' => 'Система успешно создана!']);
  }
}
