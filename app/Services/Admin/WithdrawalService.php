<?php

namespace App\Services\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Withdrawal\CreateWithdrawSystemRequest;
use App\Http\Requests\Admin\Withdrawal\EditWithdrawSystemRequest;
use App\Http\Requests\Admin\Withdrawal\ProcessWithdrawalRequest;
use App\Http\Requests\Admin\Withdrawal\RemoveWithdrawSystemRequest;
use App\Models\Withdrawal;
use App\Models\WithdrawSystem;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Ixudra\Curl\Facades\Curl;
use Yajra\DataTables\DataTables;

class WithdrawalService
{
    public function processWithdrawalServ(ProcessWithdrawalRequest $request)
    {
        if(config('custom.demo')){
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }
        $withdrawal = Withdrawal::where('id', $request->id)->firstOrFail();
        if($withdrawal->status != 0){
            return (['success' => false, 'message' => __('locale.admin_withdraw_already_processed')]);
        }
        if($request->status == 2){
            User::where('id', $withdrawal->user_id)->update(['balance' => DB::raw("balance+$withdrawal->amount")]);
            Withdrawal::where('id', $request->id)->update(['status' => $request->status, 'message' => $request->comment]);
            $message = $request->comment ? __('locale.admin_withdraw_cause').': '.$request->comment : __('locale.admin_withdraw_cause_decline');
            $mail_data = [
                'headline' => __('locale.admin_withdraw_declined'),
                'subtitle' =>  __('locale.admin_withdraw_not_implemented'),
                'text' => "<p>".__('locale.admin_withdraw_not_implemented_mail')." $message</p>",
                'image' => 'order-cancel.png',
                'button_link' => config('app.url').'/profile',
                'button_text' => __('locale.admin_withdraw_go_cabinet')
            ];
            try {
                Mail::send('mail.mail', $mail_data, function ($message) use ($request, $withdrawal) {
                    $message->from(config('mail.username'), config('app.name'));
                    $message->replyTo(config('mail.username'));
                    $message->subject(__('locale.admin_withdraw_declined'));
                    $message->to(User::where('id', $withdrawal->user_id)->first()->email);
                });
            } catch (\Throwable $ex){

            }
            return (['success' => true, 'message' => __('locale.admin_withdraw_application_declined')]);
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
                'headline' => __('locale.admin_withdraw_success'),
                'subtitle' => __('locale.admin_withdraw_payment_made'),
                'text' => '<p>'.__('locale.admin_withdraw_congratulations').'</p>',
                'image' => 'order-refund.png',
                'button_link' => config('app.url') . '/profile',
                'button_text' => __('locale.admin_withdraw_go_cabinet')
            ];
            try {
                Mail::send('mail.mail', $mail_data, function ($message) use ($request, $withdrawal) {
                    $message->from(config('mail.username'), config('app.name'));
                    $message->replyTo(config('mail.username'));
                    $message->subject(__('locale.admin_withdraw_success'));
                    $message->to(User::where('id', $withdrawal->user_id)->first()->email);
                });
            } catch (\Throwable $ex){

            }
        }
        return (['success' => true, 'message' => __('locale.admin_withdraw_application_processed')]);
    }

    public function allWithdrawalsServ(Request $request){
        $requests = Withdrawal::with(['user'])->get();
        return Datatables::of($requests)->make();
    }

    public function allWithdrawalSystemsServ(Request $request){
        return WithdrawSystem::orderBy('order', 'asc')->get();
    }

    public function editWithdrawSystemServ(EditWithdrawSystemRequest $request){
        if(config('custom.demo')){
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }

        WithdrawSystem::where('text', $request->prevText)->update([
            'description' => $request->description,
            'text' => $request->text,
            'order' => $request->order,
            'hidden' => $request->active,
        ]);
        return (['success' => true, 'message' => __('locale.admin_withdraw_updated')]);
    }

    public function removeWithdrawSystemServ(RemoveWithdrawSystemRequest $request){
        if(config('custom.demo')){
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }
        WithdrawSystem::where('text', $request->text)->delete();
        return (['success' => true, 'message' => __('locale.admin_withdraw_deleted')]);
    }

    public function createWithdrawSystemServ(CreateWithdrawSystemRequest $request){
        if(config('custom.demo')){
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }

        $model = new WithdrawSystem();
        $model->description = $request->description;
        $model->text = $request->system;
        $model->order = $request->order;
        $model->hidden = $request->active;
        $model->save();
        return (['success' => true, 'message' => __('locale.admin_withdraw_created')]);
    }
}
