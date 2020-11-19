<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Models\VerifyRequest;
use App\Models\Profile;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
  // Верификация телефона
  public function updatePhone(Request $request){
    $request->validate([
      'phone' => 'required|string',
      'id' => 'numeric|min:1'
    ]);
    Profile::where('user_id', $request->id)->update(['phone' => $request->phone, 'phone_verify_at' => Carbon::now()]);
    return response()->json(['success' => true, 'message' => 'Номер телефона успешно обновлен!']);
  }

  // Верификация почты
  public function updateEmail(Request $request){
    $request->validate([
      'email' => 'required|string',
      'id' => 'numeric|min:1'
    ]);
    User::where('id', $request->id)->update(['email' => $request->email, 'email_verified_at' => Carbon::now()]);
    return response()->json(['success' => true, 'message' => 'Email успешно обновлен!']);
  }

  //Обновление пароля
  public function updatePassword(Request $request){
    $request->validate([
      'password' => 'required|string|min:8',
      'id' => 'numeric|min:1'
    ]);
    User::where('id', $request->id)->update(['password' => Hash::make($request->password)]);
    return response()->json(['success' => true, 'message' => 'Пароль успешно обновлен!']);
  }

  //Верификация аккаунта
  public function verifyAccount(Request $request){
    $request->validate([
      'id' => 'numeric|min:1'
    ]);
    Profile::where('user_id', $request->id)->update(['user_verify_at' => Carbon::now()]);
    VerifyRequest::where('user_id', $request->id)->delete();
    //TODO Добавить сообщение о верификации пользователю
    return response()->json(['success' => true, 'message' => 'Пользователь успешно верифицирован!']);
  }
}
