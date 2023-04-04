<?php

namespace App\Services\MainHttp;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\UserProvider;
use App\Providers\RouteServiceProvider;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;


class SocialService {

    public function callB($provider)
    {
        $userSocial = Socialite::driver($provider)->user();
        if(empty($userSocial->user['email'])){
            return redirect('/login')->withErrors(['social' => __('locale.social_email')]);
        }
        $model = UserProvider::where('provider_id', $userSocial->id)->where('provider', $provider);
        if(!Auth::check()) {
            if ($model->count()) { // Если есть такой пользователь
                Auth::loginUsingId($model->first()->user_id);
            } else { // Если записи нет, регистрируем
                if(config('custom.demo')){
                    return view('/auth/register')->withErrors(['demo_mode' => __('locale.demo_error')]);
                }
                $user_model = User::where('email', $userSocial->user['email']);
                if (!$user_model->count()) {
                    $created = Helper::createUser(['email' => $userSocial->user['email'], 'password' => null]);
                    $user_id = $created->id;
                } else {
                    $user_id = $user_model->first()->email;
                }
                $model = new UserProvider;
                $model->user_id = $user_id;
                $model->provider = $provider;
                $model->provider_id = $userSocial->id;
                $model->save();
                Auth::loginUsingId($user_id);
            }
            $redirect = RouteServiceProvider::HOME;
            if(Auth::check() and Role::where('user_id', Auth::user()->id)->where('role', 1)->count()) {
                $redirect = '/admin';
            }
            return redirect($redirect);
        } else {
            if (!$model->count()) { // Если есть такой пользователь
                $model = new UserProvider;
                $model->user_id = Auth::user()->id;
                $model->provider = $provider;
                $model->provider_id = $userSocial->id;
                $model->save();
            }
            return redirect('/profile');
        }
    }
}