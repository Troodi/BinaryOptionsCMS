<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
  // Изменение пароля
  public function changePassword(Request $request){
    $request->validate([
      'old_password' =>  'string|min:6|max:255',
      'new_password' =>  'string|min:8|max:255',
      'repeat_password' =>  'string|min:8|max:255',
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

  }

  // Верификация емайла
  public function approveEmail(Request $request){

  }

  // Загрузка первой страницы паспорта
  public function passportFirstPage(Request $request){

  }

  // Загрузка второй страницы паспорта
  public function passportSecondPage(Request $request){

  }

  // Загрузка дополнительного документа
  public function additionalDocument(Request $request){

  }
}
