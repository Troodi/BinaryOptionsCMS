<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\TwilioNumber;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Twilio\Exceptions\ConfigurationException;
use Twilio\Rest\Client;

class ProfileController extends Controller
{
  // Изменение пароля
  public function changePassword(Request $request){
    $request->validate([
      'old_password' =>  'string|min:6|max:255',
      'new_password' =>  'string|min:6|max:255',
      'repeat_password' =>  'string|min:6|max:255',
    ]);
    if(Hash::make($request->old_password) != Auth::user()->password){
      return response()->json(['success' => false, 'message' => 'Текущий пароль введен неверно!'], 200);
    }
    if($request->new_password != $request->repeat_password){
      return response()->json(['success' => false, 'message' => 'Повтор пароля не совпадает с новым паролем!'], 200);
    }
    User::where('id', Auth::user()->id)->update(['password' => Hash::make($request->new_password)]);
    return response()->json(['success' => true, 'message' => 'Пароль успешно обновлен!'], 200);
  }

  // Изменение личных данных
  public function changeGeneralData(Request $request){
    $request->validate([
      'nickname' => 'string|min:3|max:50',
      'telegram' => 'string|min:3|max:50',
      'gender' => 'numeric|min:0|max:1',
      'language' => 'string|min:3|max:50',
    ]);
    User::where('id', Auth::user()->id)->update(['name' => $request->nickname]);
    ProFile::where('user_id', Auth::user()->id)->update(['telegram' => $request->telegram, 'gender' => $request->telegram, 'language' => $request->language,]);
    return response()->json(['success' => true, 'message' => 'Данные успешно обновлены!'], 200);
  }

  //Загружаем информацию о профиле
  public function loadAllProfileData(Request $request){
    return User::where('id', Auth::user()->id)->with('profile')->first();
  }

  // Верификация телефона
  public function approvePhone(Request $request){
    $request->validate([
      'code' => 'numeric|min:1000|max:9999'
    ]);
    if(Profile::where('user_id', Auth::user()->id)->first()->phone_verify_at){
      return response()->json(['success' => false, 'message' => 'Телефон уже подтвержден!']);
    }
    if(cache()->has('phoneCodeUser'.Auth::user()->id) and cache()->get('phoneCodeUser'.Auth::user()->id) == $request->code){
      Profile::where('user_id', Auth::user()->id)->update(['phone_verify_at' => Carbon::now()]);
      return response()->json(['success' => true]);
    } else {
      return response()->json(['success' => false, 'message' => 'Код неверный или вы не заказывали звонок!']);
    }
  }

  public function sendPhoneCode(Request $request){
    $request->validate([
      'phone' => 'regex:/\+\d{6,20}/'
    ]);
    if(Profile::where('user_id', Auth::user()->id)->first()->phone_verify_at){
      return response()->json(['success' => false, 'message' => 'Телефон уже подтвержден!']);
    }
    $sid = env('TWILLIO_SID');
    $token = env('TWILLIO_KEY');
    try {
      $client = new Client($sid, $token);
    } catch (ConfigurationException $e) {
      return response()->json(['success' => false, 'message' => 'Не удалось отправить код подтверждения, попробуйте позднее!']);
    }
    $number = TwilioNumber::inRandomOrder()->first()->number;
    $digits = substr($number, -4);
    cache()->put('phoneCodeUser'.Auth::user()->id, $digits, 900);
    $client->calls->create(
      $request->phone,
      $number, [
        "method" => "POST",
        "statusCallback" => env('APP_URL')."/event-twilio",
        "statusCallbackEvent" => ["initiated","answered"],
        "statusCallbackMethod" => "POST",
        'url' => 'https://twimlets.com/holdmusic?Bucket=com.twilio.music.ambient'
      ]
    );
    return response()->json(['success' => true, 'message' => 'Мы сделали Вам звонок!']);
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
    $call = $client->calls($request->sid)->fetch();
    $call->update(array("Status" => "completed"));
    return null;
  }

  // Верификация емайла
  public function approveEmail(Request $request){

  }

  // Загрузка первой страницы паспорта
  public function passportFirstPage(Request $request){
    return null;
  }

  // Загрузка второй страницы паспорта
  public function passportSecondPage(Request $request){
    return null;
  }

  // Загрузка дополнительного документа
  public function additionalDocument(Request $request){
    return null;
  }
}
