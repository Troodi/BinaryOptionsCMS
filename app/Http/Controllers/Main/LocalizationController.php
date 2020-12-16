<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class LocalizationController extends Controller
{
    private $lang = ['en', 'ru'];

    public function setLang(Request $request, $language){
      if(in_array($language, $this->lang)) {
        App::setLocale($language);
        setcookie("currentLanguage", $language, time() + 86400 * 365, '/');
      }
      return redirect()->back();
    }
}
