<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Http\Requests\SupportRequest;
use App\Services\SupportService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class SupportController extends Controller
{
    public function sendQuestion(SupportRequest $request, SupportService $supportService)
    {
        return response()->json($supportService->sendMail($request));
    }
}