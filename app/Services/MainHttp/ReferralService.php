<?php

namespace App\Services\MainHttp;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\MainHttp\Referral\GetUserRefInfoRequest;
use App\Http\Requests\MainHttp\Referral\GetUserRefsRequest;
use App\Models\Referral;
use App\User;
use Dirape\Token\Token;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class ReferralService
{
    public function getUserRefInfo(GetUserRefInfoRequest $request){
        $admin = false;
        if($request->id && Helper::isAdmin()){
            $admin = true;
        }
        $id = $admin ? $request->id : Auth::user()->id;
        return Referral::where('user_id', $id)->with(['user', 'request'])->first();
    }

    public function getUserRefs(GetUserRefsRequest $request){
        $admin = false;
        if($request->id && Helper::isAdmin()){
            $admin = true;
        }
        $id = $admin ? $request->id : Auth::user()->id;
        $referrals = User::select('token', 'created_at')->where('referer_id', $id)->get();
        return Datatables::of($referrals)->make();
    }

    public function setRefCookie(Request $request){
        $user = User::where('token', $request->code)->first();
        if($user and !Cookie::has('offer')){
            Referral::where('user_id', $user->id)->increment('tracked');
        }
        return redirect('/')->withCookie(cookie()->forever('offer', $request->code));
    }
}
