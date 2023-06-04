<?php

namespace App\Services;

use Illuminate\Http\Request;

class TokenService
{
    public function refresh(Request $request)
    {
        session()->regenerate();
        return (['data' => ["token"=>csrf_token()], 'status' => 200]);
    }
}