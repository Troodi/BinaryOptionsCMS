<?php

namespace App\Http\Controllers\Main;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Referral;
use App\User;
use Dirape\Token\Token;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class ReferralController extends Controller
{
    public function getUserReferralInfo(Request $request){
      $admin = false;
      if($request->id && Helper::isAdmin()){
        $admin = true;
        $request->validate(['id' => 'numeric|min:1']);
      }
      $id = $admin ? $request->id : Auth::user()->id;
      return Referral::where('user_id', $id)->with(['user', 'request'])->first();
    }

    public function getUserReferrals(Request $request){
      $admin = false;
      if($request->id && Helper::isAdmin()){
        $admin = true;
        $request->validate(['id' => 'numeric|min:1']);
      }
      $id = $admin ? $request->id : Auth::user()->id;
      $referrals = User::select('token', 'created_at')->where('referer_id', $id)->get();
      return Datatables::of($referrals)->make();
    }

    public function setReferralCookie(Request $request){
      $user = User::where('token', $request->code)->first();
      if($user and !Cookie::has('offer')){
        Referral::where('user_id', $user->id)->increment('tracked');
      }
      return redirect('/')->withCookie(cookie()->forever('offer', $request->code));
    }
}
