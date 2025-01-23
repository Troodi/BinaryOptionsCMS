<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Http\Requests\MainHttp\SupportRequest;
use App\Services\MainHttp\SupportService;

class SupportController extends Controller
{
    public function sendQuestion(SupportRequest $request, SupportService $supportService)
    {
        return response()->json($supportService->sendMail($request));
    }
}