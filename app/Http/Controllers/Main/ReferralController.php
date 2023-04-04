<?php

namespace App\Http\Controllers\Main;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\MainHttp\Referral\GetUserRefInfoRequest;
use App\Http\Requests\MainHttp\Referral\GetUserRefsRequest;
use App\Models\Referral;
use App\Services\MainHttp\ReferralService;
use App\User;
use Dirape\Token\Token;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class ReferralController extends Controller
{
    public function getUserReferralInfo(ReferralService $referralService, GetUserRefInfoRequest $request)
    {
        return response()->json($referralService->getUserRefInfo($request));
    }

    public function getUserReferrals(ReferralService $referralService, GetUserRefsRequest $request)
    {
        return response()->json($referralService->getUserRefs($request));
    }

    public function setReferralCookie(ReferralService $referralService, Request $request)
    {
        return response()->json($referralService->setRefCookie($request));
    }
}
