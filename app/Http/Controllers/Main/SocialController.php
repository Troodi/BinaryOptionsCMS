<?php

namespace App\Http\Controllers\Main;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\UserProvider;
use App\Providers\RouteServiceProvider;
use App\Services\MainHttp\SocialService;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialController extends Controller
{
  public function redirect($provider)
  {
    return Socialite::driver($provider)->redirect();
  }

  public function Callback($provider, SocialService $socialService)
  {
      return response()->json($socialService->callB($provider));
  }
}
