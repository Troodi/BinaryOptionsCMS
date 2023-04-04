<?php

namespace App\Http\Controllers\Main;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\MainHttp\Partner\RequestAgain;
use App\Http\Requests\MainHttp\Partner\SendPartnerRequest;
use App\Models\PartnerRequest;
use App\Services\MainHttp\PartnerService;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PartnerController extends Controller
{
    public function sendPartnerRequest(PartnerService $partnerService, SendPartnerRequest $request)
    {
        return response()->json($partnerService->sendPartnerReq($request));
    }

    public function requestAgain(PartnerService $partnerRequest, RequestAgain $request)
    {
     return response()->json($partnerRequest->reqAgain($request));
    }
}
