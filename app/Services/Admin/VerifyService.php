<?php

namespace App\Services\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Verify\CheckDocumentRequest;
use App\Http\Requests\Admin\Verify\UnVerifyAccountRequest;
use App\Http\Requests\Admin\Verify\VerifyAccountRequest;
use App\Models\Models\File;
use App\Models\Models\VerifyRequest;
use App\Models\Profile;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Yajra\DataTables\DataTables;

class VerifyService
{
    public function listRequestVerifyServ(Request $request)
    {
        $requests = VerifyRequest::with(['user'])->get();
        return Datatables::of($requests)->make();
    }

    public function checkDocumentServ(CheckDocumentRequest $request)
    {
        if (config('custom.demo')) {
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }
        $files = ['1' => 'document_first_page', '2' => 'document_second_page', '3' => 'document_additional'];
        $pages = ['1' => 'document_first_page_verify_at', '2' => 'document_second_page_verify_at', '3' => 'document_additional_verify_at'];
        $success = false;
        if ($request->status == 1) {
            $success = true;
            Profile::where('user_id', $request->id)->update([$pages[$request->page] => Carbon::now()]);
        } elseif ($request->status == 0) {
            Profile::where('user_id', $request->id)->update([$files[$request->page] => null, $pages[$request->page] => null]);
        } elseif ($request->status == 2) {
            $file_id = Profile::where('user_id', $request->id)->first()->{$files[$request->page]};
            $file = File::where('id', $file_id)->firstOrFail()->path;
            unlink(base_path($file));
            File::where('id', $file_id)->delete();
            Profile::where('user_id', $request->id)->update([$files[$request->page] => null, $pages[$request->page] => null]);
        }
        VerifyRequest::where('user_id', $request->id)->where('page', $request->page)->delete();
        $mail_data = [
            'headline' => $success ? __('locale.admin_verify_approved', ['page' => $request->page]) : __('locale.admin_verify_decline', ['page' => $request->page]),
            'subtitle' => __('locale.admin_verify_document_status'),
            'text' => $success ? '<p>' . __('locale.admin_verify_approved') . '</p>' : '<p>' . __('locale.admin_verify_decline') . '</p>',
            'image' => $success ? 'membership.png' : 'membership-ended.png',
            'button_link' => env('APP_URL') . '/profile',
            'button_text' => __('locale.admin_verify_go_cabinet')
        ];
        try {
            Mail::send('mail.mail', $mail_data, function ($message) use ($request, $success) {
                $message->from(env('MAIL_USERNAME'), env('APP_NAME'));
                $message->replyTo(env('MAIL_USERNAME'));
                $message->subject($success ? __('locale.admin_verify_approved', ['page' => $request->page]) : __('locale.admin_verify_decline', ['page' => $request->page]));
                $message->to(User::where('id', $request->id)->first()->email);
            });
        } catch (\Throwable $ex) {

        }
        return (['success' => true, 'message' => __('locale.admin_verify_action_successful')]);
    }

    //Верификация аккаунта
    public function verifyAccountServ(VerifyAccountRequest $request)
    {
        if (config('custom.demo')) {
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }
        Profile::where('user_id', $request->id)->update(['user_verify_at' => Carbon::now()]);
        VerifyRequest::where('user_id', $request->id)->delete();
        $mail_data = [
            'headline' => __('locale.admin_verify_verified'),
            'subtitle' => __('locale.admin_verify_now_verified'),
            'text' => '<p>' . __('locale.admin_verify_successful_verified') . '</p>',
            'image' => 'subscription-completed.png',
            'button_link' => env('APP_URL') . '/profile',
            'button_text' => __('locale.admin_verify_go_cabinet')
        ];
        try {
            Mail::send('mail.mail', $mail_data, function ($message) use ($request) {
                $message->from(env('MAIL_USERNAME'), env('APP_NAME'));
                $message->replyTo(env('MAIL_USERNAME'));
                $message->subject(__('locale.admin_verify_verified'));
                $message->to(User::where('id', $request->id)->first()->email);
            });
        } catch (\Throwable $ex) {

        }
        return (['success' => true, 'message' => __('locale.admin_verify_user_verified')]);
    }

    //Снятие верификации аккаунта
    public function unVerifyAccountServ(UnVerifyAccountRequest $request)
    {
        if (config('custom.demo')) {
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }
        Profile::where('user_id', $request->id)->update(['user_verify_at' => null]);
        VerifyRequest::where('user_id', $request->id)->delete();
        $mail_data = [
            'headline' => __('locale.admin_verify_not_verified'),
            'subtitle' => __('locale.admin_verify_now_not_verified'),
            'text' => '<p>' . __('locale.admin_verify_take_off_verify') . '</p>',
            'image' => 'subscription-completed.png',
            'button_link' => env('APP_URL') . '/profile',
            'button_text' => __('locale.admin_verify_go_cabinet')
        ];
        try {
            Mail::send('mail.mail', $mail_data, function ($message) use ($request) {
                $message->from(env('MAIL_USERNAME'), env('APP_NAME'));
                $message->replyTo(env('MAIL_USERNAME'));
                $message->subject(__('locale.admin_verify_not_verified'));
                $message->to(User::where('id', $request->id)->first()->email);
            });
        } catch (\Throwable $ex) {

        }
        return (['success' => true, 'message' => __('locale.admin_verify_taken_off_verify')]);
    }
}
