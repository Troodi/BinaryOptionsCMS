<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Models\VerifyRequest;
use App\Models\Profile;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
  // Верификация телефона
  public function updatePhone(Request $request){
    if(config('custom.demo')){
      return response()->json(['success' => false, 'message' => __('locale.demo_error')]);
    }
    $request->validate([
      'phone' => 'required|string',
      'id' => 'numeric|min:1'
    ]);
    Profile::where('user_id', $request->id)->update(['phone' => $request->phone, 'phone_verify_at' => Carbon::now()]);
    return response()->json(['success' => true, 'message' => __('locale.admin_user_number_updated')]);
  }

  // Верификация почты
  public function updateEmail(Request $request){
    if(config('custom.demo')){
      return response()->json(['success' => false, 'message' => __('locale.demo_error')]);
    }
    $request->validate([
      'email' => 'required|string',
      'id' => 'numeric|min:1'
    ]);
    User::where('id', $request->id)->update(['email' => $request->email, 'email_verified_at' => Carbon::now()]);
    return response()->json(['success' => true, 'message' => __('locale.admin_user_email_updated')]);
  }

  //Обновление пароля
  public function updatePassword(Request $request){
    if(config('custom.demo')){
      return response()->json(['success' => false, 'message' => __('locale.demo_error')]);
    }
    $request->validate([
      'password' => 'required|string|min:8',
      'id' => 'numeric|min:1'
    ]);
    User::where('id', $request->id)->update(['password' => Hash::make($request->password)]);
    return response()->json(['success' => true, 'message' => __('locale.admin_user_password_updated')]);
  }

  public function getUser(Request $request){
    $request->validate([
      'id' => 'numeric|min:1'
    ]);
    return User::where('id', $request->id)->first();
  }
}
