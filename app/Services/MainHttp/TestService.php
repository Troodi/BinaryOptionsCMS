<?php

namespace App\Services\MainHttp;

use App\Http\Controllers\Controller;
use App\Events\ChangeDemoBalance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TestService
{
    public function testServ(Request $request){
        $mail_data = [
            'headline' => __('locale.profile_confirm_email'),
            'subtitle' =>  __('locale.profile_code_for_confirm'),
            'text' => '<p>'.__('locale.profile_for_activation').'</p><p><h1 style="text-align: center;"><strong>'. 123456 .'</strong></h1></p><p>'.__('locale.profile_code_valid_15_minutes').'</p>',
            'image' => 'user-reset-password.png',
            'button_link' => config('app.url').'/profile',
            'button_text' => __('locale.profile_go_to_cabinet')
        ];

        Mail::send('mail.mail', $mail_data, function($message) use ($request)
        {
            $message->from(config('mail.username'), config('app.name'));
            $message->replyTo(config('mail.username'));
            $message->subject(__('locale.profile_confirm_email'));
            $message->to('troodi@bk.ru');
        });
    }
}
