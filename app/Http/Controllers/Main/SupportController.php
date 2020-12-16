<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class SupportController extends Controller
{
  public function sendQuestion(Request $request){
    $request->validate([
      'question' => 'required|string|min:10'
    ]);
    if(cache()->has('supportEmailSent'.Auth::user()->id)){
      return response()->json(['success' => false, 'message' => __('locale.support_wait_10_minutes')]);
    }
    $mail_data = [
      'headline' => __('locale.support_write_to_support'),
      'subtitle' =>  __('locale.support_save_info'),
      'text' => '<strong>'.__('locale.support_user_email').' </strong>'.Auth::user()->email.'<br><strong>'.__('locale.support_question').' </strong>'.$request->question,
      'image' => 'user-subscribe.png',
      'button_link' => env('APP_URL'),
      'button_text' => __('locale.support_go_to_cabinet')
    ];
    Mail::send('mail.mail', $mail_data, function($message) use ($request)
    {
      $message->from(env('MAIL_USERNAME'), env('APP_NAME'));
      $message->replyTo(Auth::user()->email);
      $message->subject(__('locale.support_write_to_support'));
      $message->to(env('MAIL_USERNAME'));
    });
    cache()->put('supportEmailSent'.Auth::user()->id, true, 600);
    return response()->json(['success' => true, 'message' => __('locale.support_question_sent')]);
  }
}