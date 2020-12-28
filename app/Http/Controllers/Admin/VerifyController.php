<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Models\File;
use App\Models\Models\VerifyRequest;
use App\Models\Profile;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Yajra\DataTables\DataTables;

class VerifyController extends Controller
{
    public function listRequestVerify(Request $request){
      $requests = VerifyRequest::with(['user'])->get();
      return Datatables::of($requests)->make();
    }

  public function checkDocument(Request $request){
    $request->validate([
      'id' => 'numeric|min:1',
      'status' => 'numeric|min:0|max:2',
      'comment' => 'string|nullable',
      'page' => 'numeric|min:1|max:3'
    ]);
    $files = ['1' => 'document_first_page', '2' => 'document_second_page', '3' => 'document_additional'];
    $pages = ['1' => 'document_first_page_verify_at', '2' => 'document_second_page_verify_at', '3' => 'document_additional_verify_at'];
    $success = false;
    if($request->status == 1){
      $success = true;
      Profile::where('user_id', $request->id)->update([$pages[$request->page] => Carbon::now()]);
    } elseif($request->status == 0){
      Profile::where('user_id', $request->id)->update([$files[$request->page] => null, $pages[$request->page] => null]);
    } elseif($request->status == 2){
      $file_id = Profile::where('user_id', $request->id)->first()->{$files[$request->page]};
      $file = File::where('id', $file_id)->firstOrFail()->path;
      unlink(base_path($file));
      File::where('id', $file_id)->delete();
      Profile::where('user_id', $request->id)->update([$files[$request->page] => null, $pages[$request->page] => null]);
    }
    VerifyRequest::where('user_id', $request->id)->where('page', $request->page)->delete();
    $mail_data = [
      'headline' => $success ? "Документ №$request->page прошел проверку" : "Документ №$request->page не прошел проверку",
      'subtitle' =>  'Статус проверки документа',
      'text' => $success ? '<p>Поздравляем! Ваш документ был проверен и подтвержден</p>' : '<p>К сожалению, документ не прошел проверку</p>',
      'image' => $success ? 'membership.png' : 'membership-ended.png',
      'button_link' => env('APP_URL').'/profile',
      'button_text' => 'Перейти в кабинет'
    ];
    Mail::send('mail.mail', $mail_data, function($message) use ($request, $success)
    {
      $message->from(env('MAIL_USERNAME'), env('APP_NAME'));
      $message->replyTo(env('MAIL_USERNAME'));
      $message->subject($success ? "Документ №$request->page прошел проверку" : "Документ №$request->page не прошел проверку");
      $message->to(User::where('id', $request->id)->first()->email);
    });
    return response()->json(['success' => true, 'message' => 'Действие выполнено успешно!']);
  }

  //Верификация аккаунта
  public function verifyAccount(Request $request){
    $request->validate([
      'id' => 'numeric|min:1'
    ]);
    Profile::where('user_id', $request->id)->update(['user_verify_at' => Carbon::now()]);
    VerifyRequest::where('user_id', $request->id)->delete();
    $mail_data = [
      'headline' => "Аккаунт верифицирован",
      'subtitle' =>  'Теперь у вас подтвержденный аккаунт',
      'text' => '<p>Поздравляем! Ваши данные были проверены и успешно подтверждены.</p>',
      'image' => 'subscription-completed.png',
      'button_link' => env('APP_URL').'/profile',
      'button_text' => 'Перейти в кабинет'
    ];
    Mail::send('mail.mail', $mail_data, function($message) use ($request)
    {
      $message->from(env('MAIL_USERNAME'), env('APP_NAME'));
      $message->replyTo(env('MAIL_USERNAME'));
      $message->subject("Аккаунт верифицирован");
      $message->to(User::where('id', $request->id)->first()->email);
    });
    return response()->json(['success' => true, 'message' => 'Пользователь успешно верифицирован!']);
  }

  //Снятие верификации аккаунта
  public function unVerifyAccount(Request $request){
    $request->validate([
      'id' => 'numeric|min:1'
    ]);
    Profile::where('user_id', $request->id)->update(['user_verify_at' => null]);
    VerifyRequest::where('user_id', $request->id)->delete();
    $mail_data = [
      'headline' => "Аккаунт не верифицирован",
      'subtitle' =>  'Теперь у вас не подтвержденный аккаунт',
      'text' => '<p>К сожалению, мы сняли верификацию с Вашего аккаута.</p>',
      'image' => 'subscription-completed.png',
      'button_link' => env('APP_URL').'/profile',
      'button_text' => 'Перейти в кабинет'
    ];
    Mail::send('mail.mail', $mail_data, function($message) use ($request)
    {
      $message->from(env('MAIL_USERNAME'), env('APP_NAME'));
      $message->replyTo(env('MAIL_USERNAME'));
      $message->subject("Аккаунт не верифицирован");
      $message->to(User::where('id', $request->id)->first()->email);
    });
    return response()->json(['success' => true, 'message' => 'У пользователя снята верификация!']);
  }
}
