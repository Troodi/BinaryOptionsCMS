<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Services\TokenService;
use Illuminate\Http\Request;

class TokenController extends Controller
{
    public function refreshToken(Request $request, TokenService $tokenService)
    {
        return response()->json($tokenService->refresh($request));
    }
}
