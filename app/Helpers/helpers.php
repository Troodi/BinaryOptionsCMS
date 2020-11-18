<?php // Code within app\Helpers\Helper.php
namespace App\Helpers;
use App\Models\Profile;
use App\Models\Referral;
use App\User;
use Dirape\Token\Token;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class Helper
{
  static public function createPathForVerifyPhotos(){
    if(!File::isDirectory(storage_path('app/private'))){
      File::makeDirectory(storage_path('app/private'));
    }
    if(!File::isDirectory(storage_path('app/private/'.date('Y')))){
      File::makeDirectory(storage_path('app/private/'.date('Y')));
    }
    if(!File::isDirectory(storage_path('app/private/'.date('Y/m')))){
      File::makeDirectory(storage_path('app/private/'.date('Y/m')));
    }
    if(!File::isDirectory(storage_path('app/private/'.date('Y/m/d')))){
      File::makeDirectory(storage_path('app/private/'.date('Y/m/d')));
    }
    return 'private/'.date('Y/m/d');
  }

  /**
   * Create a new user instance after a valid registration.
   *
   * @param  array  $data
   * @return \App\User
   */
  public static function createUser(array $data){
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
}
