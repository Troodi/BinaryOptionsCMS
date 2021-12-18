<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LanguageController extends Controller
{
    //
    public function swap($locale)
    {
        // available language in template array
        $availLocale = ['en' => 'en', 'es' => 'es'];
        // check for existing language
        if (array_key_exists($locale, $availLocale)) {
            session()->put('locale', $locale);
        } else {
            session()->put('locale', 'en');
        }
        return redirect()->back();
    }
}
