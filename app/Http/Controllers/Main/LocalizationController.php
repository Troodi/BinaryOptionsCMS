<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class LocalizationController extends Controller
{
    private $lang = ['en', 'ru', 'es'];

    public function setLang(Request $request, $language){
      if(in_array($language, $this->lang)) {
        setcookie("currentLanguage", $language, time() + 86400 * 365, '/');
      }
      return redirect()->back()->withCookie(cookie()->forever('locale', $language));
    }
}
