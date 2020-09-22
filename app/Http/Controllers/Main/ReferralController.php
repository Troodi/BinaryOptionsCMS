<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Referral;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Yajra\DataTables\DataTables;

class ReferralController extends Controller
{
    public function getUserReferralInfo(Request $request){
      return Referral::where('user_id', Auth::user()->id)->first();
    }

    public function getUserReferrals(Request $request){
      $referrals = User::select('token', 'created_at')->where('referer_id', Auth::user()->id)->get();
      return Datatables::of($referrals)->make();
    }
}
