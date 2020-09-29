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
      return response()->json(['success' => false, 'message' => 'Вы уже отправили вопрос в течение 10 минут, пожалуйста, подождите и попробуйте ещё раз!']);
    }
    $mail_data = [
      'headline' => 'Обращение в поддержку',
      'subtitle' =>  'Сохраняйте информацию о переписке',
      'text' => '<strong>Email пользователя: </strong>'.Auth::user()->email.'<br><strong>Вопрос: </strong>'.$request->question,
      'image' => 'user-subscribe.png',
      'button_link' => env('APP_URL'),
      'button_text' => 'Перейти в кабинет'
    ];
    Mail::send('mail.mail', $mail_data, function($message) use ($request)
    {
      $message->from(env('MAIL_USERNAME'), env('APP_NAME'));
      $message->replyTo(Auth::user()->email);
      $message->subject('Обращение в поддержку');
      $message->to(env('MAIL_USERNAME'));
    });
    cache()->put('supportEmailSent'.Auth::user()->id, true, 600);
    return response()->json(['success' => true, 'message' => 'Вопрос успешно отправлен, скоро Вам ответят!']);
  }
}