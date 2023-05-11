<?php

namespace App\Services\MainHttp;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class LocalizationService
{
    private $lang = ['en', 'es'];

    public function setLanguage(Request $request, $language){
        if(in_array($language, $this->lang)) {
            setcookie("currentLanguage", $language, time() + 86400 * 365, '/');
        }
        return redirect()->back()->withCookie(cookie()->forever('locale', $language));
    }

}