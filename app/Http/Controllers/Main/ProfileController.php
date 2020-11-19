<?php

namespace App\Http\Controllers\Main;

use App\Helpers\Helper;
use App\Models\EmailAttempts;
use App\Http\Controllers\Controller;
use App\Models\Models\File;
use App\Models\Models\VerifyRequest;
use App\Models\Profile;
use App\Models\PhoneAttempts;
use App\Models\Referral;
use App\Models\TwilioNumber;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Twilio\Exceptions\ConfigurationException;
use Twilio\Rest\Client;

class ProfileController extends Controller
{
  // Изменение пароля
  public function changePassword(Request $request){
    $request->validate([
      'old_password' =>  'string|min:6|max:255',
      'new_password' =>  'string|min:8|max:255',
      'repeat_password' =>  'string|min:8|max:255',
    ]);
    if(!Hash::check($request->old_password, Auth::user()->password)){
      return response()->json(['success' => false, 'message' => 'Текущий пароль введен неверно!'], 200);
    }
    if($request->new_password != $request->repeat_password){
      return response()->json(['success' => false, 'message' => 'Повтор пароля не совпадает с новым паролем!'], 200);
    }
    User::where('id', Auth::user()->id)->update(['password' => Hash::make($request->new_password)]);
    return response()->json(['success' => true, 'message' => 'Пароль успешно обновлен!'], 200);
  }

  // Изменение основных данных
  public function changeGeneralData(Request $request){
    $id = Auth::user()->id;
    if($request->id && Helper::isAdmin()){
      $request->validate(['id' => 'numeric']);
      $id = $request->id;
    }
    $request->validate([
      'nickname' => 'string|min:3|max:50|nullable',
      'telegram' => 'string|min:3|max:50|nullable',
      'gender' => 'numeric|min:0|max:1',
      'language' => 'string|min:2|max:50',
    ]);
    User::where('id', $id)->update(['name' => $request->nickname]);
    ProFile::where('user_id', $id)->update([
      'telegram' => $request->telegram,
      'gender' => $request->gender,
      'language' => $request->language
    ]);
    return response()->json(['success' => true, 'message' => 'Данные успешно обновлены!'], 200);
  }

  // Изменение личных данных
  public function changeMainData(Request $request){
    $admin = false;
    if($request->id && Helper::isAdmin()){
      $admin = true;
      $request->validate(['id' => 'numeric|min:1']);
    }
    $request->validate([
      'name' => 'string|min:3|max:50'.$admin ? '|nullable' : '',
      'last_name' => 'string|min:3|max:50'.$admin ? '|nullable' : '',
      'patronymic' => 'string|min:3|max:50'.$admin ? '|nullable' : '',
      'birth' => 'regex:/\d{2}\-\d{2}\-\d{4}/'.$admin ? '|nullable' : '',
      'address' => 'string|min:10|max:250'.$admin ? '|nullable' : '',
      'document_number' => 'string|min:3|max:250'.$admin ? '|nullable' : '',
    ]);
    $id = $admin ? $request->id : Auth::user()->id;
    $profile = Profile::where('user_id', $id)->first();
    if(($profile->document_first_page or $profile->document_first_page_verify_at or $profile->document_second_page or $profile->document_second_page_verify_at or $profile->document_additional or $profile->document_document_additional_verify_at) and $admin){
      return response()->json(['success' => false, 'message' => 'Невозможно обновить т.к. документы уже находятся на проверке!'], 200);
    }
    Profile::where('user_id', $id)->update([
      'name' => $request->name,
      'last_name' => $request->last_name,
      'patronymic' => $request->patronymic,
      'birth' => $request->birth ? Carbon::parse($request->birth) : null,
      'address' => $request->address,
      'document_number' => $request->document_number,
    ]);
    return response()->json(['success' => true, 'message' => 'Личные данные успешно обновлены!'], 200);
  }

  //Загружаем информацию о профиле
  public function loadAllProfileData(Request $request){
    if(isset($request->id) && Helper::isAdmin()){
      $request->validate(['id' => 'numeric|min:1']);
      return User::where('id', $request->id)->with('profile', 'provider')->first();
    } else {
      return User::where('id', Auth::user()->id)->with('profile', 'provider')->first();
    }
  }

  // Верификация телефона
  public function approvePhone(Request $request){
    $request->validate([
      'code' => 'numeric|min:1000|max:9999'
    ]);
    $profile = Profile::where('user_id', Auth::user()->id)->first();
    if($profile->phone_verify_at){
      return response()->json(['success' => false, 'message' => 'Телефон уже подтвержден!']);
    }
    if(cache()->has('phoneCodeUser'.Auth::user()->id) and cache()->get('phoneCodeUser'.Auth::user()->id) == $request->code){
      Profile::where('user_id', Auth::user()->id)->update(['phone_verify_at' => Carbon::now()]);
      PhoneAttempts::where('phone', $profile->phone)->where('user_id', Auth::user()->id)->delete();
      return response()->json(['success' => true]);
    } else {
      return response()->json(['success' => false, 'message' => 'Код неверный или вы не заказывали звонок!']);
    }
  }

  public function sendPhoneCode(Request $request){
    $request->validate([
      'phone' => 'regex:/\+\d{6,20}/'
    ]);
    if(cache()->has('phoneSent'.Auth::user()->id)){
      return response()->json(['success' => false, 'message' => 'Совершение звонка возможно не чаще одного раза в минуту!']);
    }
    if(Profile::where('user_id', Auth::user()->id)->first()->phone_verify_at){
      return response()->json(['success' => false, 'message' => 'Телефон уже подтвержден!']);
    }
    $phoneAttepmts = PhoneAttempts::where('phone', $request->phone)->where('user_id', Auth::user()->id)->first();
    if($phoneAttepmts and $phoneAttepmts->attempts >= 3){
      return response()->json(['success' => false, 'message' => 'Вы исчерпали количество подтверждений для данного номера телефона. Если считаете что произошла ошибка - обратитесь в техническую поддержку!']);
    }
    if(Profile::where('phone', $request->phone)->whereNotNull('phone_verify_at')->count()){
      return response()->json(['success' => false, 'message' => 'Данный телефон невозможно верифицировать!']);
    }
    $sid = env('TWILLIO_SID');
    $token = env('TWILLIO_KEY');
    try {
      $client = new Client($sid, $token);
    } catch (ConfigurationException $e) {
      return response()->json(['success' => false, 'message' => 'Не удалось отправить код подтверждения, попробуйте позднее!']);
    }
    $model = PhoneAttempts::firstOrNew(['phone' => $request->phone, 'user_id' => Auth::user()->id]);
    $model->increment('attempts');
    $model->save();
    $twilio = TwilioNumber::where('updated_at', '<=', Carbon::now()->subSeconds(20))->inRandomOrder()->first();
    if($twilio){
      $number = $twilio->number;
      TwilioNumber::where('id', $twilio->id)->update(['updated_at' => Carbon::now()]);
    } else {
      return response()->json(['success' => false, 'message' => 'Не удалось совершить звонок из-за отсутствия свободных номеров!']);
    }
    $digits = substr($number, -4);
    cache()->put('phoneCodeUser'.Auth::user()->id, $digits, 900);
    $client->calls->create(
      $request->phone,
      $number, [
        "method" => "POST",
        "statusCallback" => env('APP_URL')."/event-twilio",
        "statusCallbackEvent" => ["ringing","answered"],
        "statusCallbackMethod" => "POST",
        'url' => env('APP_URL').'/mp3'
      ]
    );
    Profile::where('user_id', Auth::user()->id)->update(['phone' => $request->phone]);
    cache()->put('phoneSent'.Auth::user()->id, true, 60);
    return response()->json(['success' => true, 'message' => 'Мы сделали Вам звонок!']);
  }

  public function playMP3(Request $request){
    $str = '<Response><Play>'.env('APP_URL').'/data/silence.mp3</Play><Redirect/></Response>';
    return response($str, 200, ['Content-Type' => 'application/xml']);
  }

  //Событие начала звонка из twilio
  public function phoneEvent(Request $request){
    $sid = env('TWILLIO_SID');
    $token = env('TWILLIO_KEY');
    try {
      $client = new Client($sid, $token);
    } catch (ConfigurationException $e) {
      return null;
    }
    $call = $client->calls($request->CallSid)->fetch();
    $call->update(array("Status" => "completed"));
    return null;
  }

  public function sendEmailCode(Request $request){
    $request->validate([
      'email' => 'email'
    ]);
    if(cache()->has('emailSent'.Auth::user()->id)){
      return response()->json(['success' => false, 'message' => 'Отправка письма возможна не чаще одного раза в минуту!']);
    }
    if(Auth::user()->email_verified_at){
      return response()->json(['success' => false, 'message' => 'Email уже подтвержден!']);
    }
    $emailAttepmts = EmailAttempts::where('email', $request->email)->where('user_id', Auth::user()->id)->first();
    if($emailAttepmts and $emailAttepmts->attempts >= 10){
      return response()->json(['success' => false, 'message' => 'Вы исчерпали количество подтверждений для данного email адреса. Если считаете что произошла ошибка - обратитесь в техническую поддержку!']);
    }
    if(User::where('email', $request->email)->whereNotNull('email_verified_at')->count()){
      return response()->json(['success' => false, 'message' => 'Данный email невозможно верифицировать!']);
    }
    $model = EmailAttempts::firstOrNew(['email' => $request->email, 'user_id' => Auth::user()->id]);
    $model->increment('attempts');
    $model->save();
    $token = mt_rand(1000, 9999);
    cache()->put('emailCodeUser'.Auth::user()->id, $token, 900);
    cache()->put('emailAddressUser'.Auth::user()->id.$token, $request->email, 910);
    $mail_data = [
      'headline' => 'Подтверждение email адреса',
      'subtitle' =>  'Код для подтверждения',
      'text' => '<p>Здравствуйте, для активации аккаунта необходимо ввести код подтверждения на странице профиля.</p><p><h1 style="text-align: center;"><strong>'.$token.'</strong></h1></p><p>Данный код действителен в течение 15 минут после его получения.</p>',
      'image' => 'user-reset-password.png',
      'button_link' => env('APP_URL').'/profile',
      'button_text' => 'Перейти в кабинет'
    ];
    Mail::send('mail.mail', $mail_data, function($message) use ($request)
    {
      $message->from(env('MAIL_USERNAME'), env('APP_NAME'));
      $message->replyTo(env('MAIL_USERNAME'));
      $message->subject('Подтверждение email адреса');
      $message->to($request->email);
    });
    cache()->put('emailSent'.Auth::user()->id, true, 60);
    return response()->json(['success' => true, 'message' => 'Мы выслали Вам код подтверждения!']);
  }

  // Верификация емайла
  public function approveEmail(Request $request){
    $request->validate([
      'code' => 'numeric|min:1000|max:9999'
    ]);
    if(Auth::user()->email_verified_at){
      return response()->json(['success' => false, 'message' => 'Email уже подтвержден!']);
    }
    if(cache()->has('emailCodeUser'.Auth::user()->id) and cache()->get('emailCodeUser'.Auth::user()->id) == $request->code){
      if(cache()->has('emailAddressUser'.Auth::user()->id.$request->code)){
        $email = cache()->get('emailAddressUser'.Auth::user()->id.$request->code);
      } else {
        return response()->json(['success' => false, 'message' => 'Не удалось подтвердить почту!']);
      }
      User::where('id', Auth::user()->id)->update(['email' => $email, 'email_verified_at' => Carbon::now()]);
      EmailAttempts::where('email', $email)->where('user_id', Auth::user()->id)->delete();
      if(Auth::user()->referer_id){
        Referral::where('user_id', Auth::user()->referer_id)->increment('active');
      }
      return response()->json(['success' => true]);
    } else {
      return response()->json(['success' => false, 'message' => 'Код неверный или вы не отправляли письмо!']);
    }
  }

  // Загрузка фото документа
  public function passportFirstPage(Request $request){
    $request->validate([
      'page' => 'required|min:1|max:3',
      'file' => 'required|image|max:4096'
    ]);
    $pages = ['1' => 'document_first_page', '2' => 'document_second_page', '3' => 'document_additional'];
    $profile = Profile::where('user_id', Auth::user()->id)->first();
    if(!$profile->name or !$profile->last_name or !$profile->patronymic or !$profile->birth or !$profile->address or !$profile->document_number){
      return response()->json(['success' => false, 'message' => 'Перед загрузкой документов необходимо заполнить личные данные!', 'page' => $request->page]);
    }
    $tableDocument = $profile->{$pages[$request->page]};
    $tableVerify = $profile->{$pages[$request->page].'_verify_at'};
    if($tableDocument or $tableVerify){
      return response()->json(['success' => false, 'message' => 'Документ уже находится на проверке или проверен!', 'page' => $request->page]);
    }
    try {
      $path = Helper::createPathForVerifyPhotos();
      $fileName = time() . '_' . $request->file->getClientOriginalName();
      $filePath = 'storage/app/'.$request->file('file')->storeAs($path, $fileName);
      $model = new File();
      $model->user_id = Auth::user()->id;
      $model->path = $filePath;
      $model->save();
      Profile::where('user_id', Auth::user()->id)->update([$pages[$request->page] => $model->id]);
    } catch (\Exception $ex){
      return response()->json(['success' => false, 'message' => 'Произошла непредвиденная ошибка при сохранении файла!', 'page' => $request->page]);
    }
    $model = new VerifyRequest();
    $model->user_id = Auth::user()->id;
    $model->page = $request->page;
    $model->save();
    return response()->json(['success' => true, 'message' => 'Файл успешно отправлен на проверку, ожидайте результата!', 'page' => $request->page]);
  }
}
