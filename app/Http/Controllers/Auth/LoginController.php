<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    protected function redirectTo()
    {
      if(Auth::check() and Role::where('user_id', Auth::user()->id)->where('role', 1)->count()){
        return '/admin';
      }
      return $this->redirectTo;
    }

    protected function validateLogin(Request $request)
    {
      $array = [
        $this->username() => 'required|string',
        'password' => 'required|string',
      ];
      if(!config('app.debug')){
        $array = array_merge($array, ['custom-g-recaptcha-response' => 'recaptcha']);
      }
      $request->validate($array);
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
    // Login
    public function showLoginForm(){
      if(config('custom.demo')){
        return view('/auth/login')->withErrors(['demo_mode' => __('locale.demo_error')]);
      }
      return view('/auth/login');
    }

     /**
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $this->guard()->logout();

        $request->session()->invalidate();

        return $this->loggedOut($request) ?: redirect('/login');
    }
}
