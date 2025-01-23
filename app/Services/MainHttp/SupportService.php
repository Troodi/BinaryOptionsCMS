<?php

namespace App\Services\MainHttp;

use App\Http\Requests\MainHttp\SupportRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class SupportService {

    public function sendMail(SupportRequest $supportRequest){

        if (cache()->has('supportEmailSent' . Auth::user()->id)) {
            return ['success' => false, 'message' => __('locale.support_wait_10_minutes')];
        }

        $mail_data = [
            'headline' => __('locale.support_write_to_support'),
            'subtitle' => __('locale.support_save_info'),
            'text' => '<strong>' . __('locale.support_user_email') . ' </strong>' . Auth::user()->email . '<br><strong>' . __('locale.support_question') . ' </strong>' . $supportRequest->question,
            'image' => 'user-subscribe.png',
            'button_link' => config('app.url'),
            'button_text' => __('locale.support_go_to_cabinet')
        ];
        Mail::send('mail.mail', $mail_data, function ($message) use ($supportRequest) {
            $message->from(config('mail.username'), config('app.name'));
            $message->replyTo(Auth::user()->email);
            $message->subject(__('locale.support_write_to_support'));
            $message->to(config('mail.username'));
        });

        cache()->put('supportEmailSent' . Auth::user()->id, true, 600);
        return ['success' => true, 'message' => __('locale.support_question_sent')];
    }
}