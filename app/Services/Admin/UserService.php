<?php

namespace App\Services\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\GetUserRequest;
use App\Http\Requests\Admin\User\UpdateEmailRequest;
use App\Http\Requests\Admin\User\UpdatePasswordRequest;
use App\Http\Requests\Admin\User\UpdatePhoneRequest;
use App\Models\Models\VerifyRequest;
use App\Models\Profile;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserService
{
    // Верификация телефона
    public function updatePhoneServ(UpdatePhoneRequest $request)
    {
        if(config('custom.demo')){
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }
        Profile::where('user_id', $request->id)->update(['phone' => $request->phone, 'phone_verify_at' => Carbon::now()]);
        return (['success' => true, 'message' => __('locale.admin_user_number_updated')]);
    }

    // Верификация почты
    public function updateEmailServ(UpdateEmailRequest $request)
    {
        if(config('custom.demo')){
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }
        User::where('id', $request->id)->update(['email' => $request->email, 'email_verified_at' => Carbon::now()]);
        return (['success' => true, 'message' => __('locale.admin_user_email_updated')]);
    }

    //Обновление пароля
    public function updatePasswordServ(UpdatePasswordRequest $request)
    {
        if(config('custom.demo')){
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }
        User::where('id', $request->id)->update(['password' => Hash::make($request->password)]);
        return (['success' => true, 'message' => __('locale.admin_user_password_updated')]);
    }

    public function getUserServ(GetUserRequest $request)
    {
        return User::where('id', $request->id)->first();
    }
}
