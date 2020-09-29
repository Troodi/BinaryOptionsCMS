<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\Referral;
use App\Providers\RouteServiceProvider;
use App\User;
use Dirape\Token\Token;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
      $token = new Token();
      $token_string = $token->unique('users', 'token', 10);
      $referer_id = null;
      if(Cookie::get('offer')){
        $token = Cookie::get('offer');
        $referer = User::where('token', $token)->first();
        if($referer){
          $referer_id = $referer->id;
        }
      }
      $create = User::create([
        'email' => $data['email'],
        'password' => Hash::make($data['password']),
        'token' => $token_string,
        'referer_id' => $referer_id,
      ]);
      if($referer_id) {
        Referral::where('user_id', $referer_id)->update(['total_referrals' => DB::raw('total_referrals+1')]);
      }

      $profile = new Profile();
      $profile->user_id = $create->id;
      $profile->save();

      $referral = new Referral();
      $referral->user_id = $create->id;
      $referral->save();

      return $create;
    }

    // Register
    public function showRegistrationForm(){
     return view('/auth/register');
   }
}
