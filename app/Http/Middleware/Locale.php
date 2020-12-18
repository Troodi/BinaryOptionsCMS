<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cookie;

class Locale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if(isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])){
          $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
        } else {
          $lang = 'en';
        }
        if($request->cookie('locale')){
          App::setLocale($request->cookie('locale'));
        } else if($lang) {
          Cookie::queue('locale', $lang, 1440 * 365);
          App::setLocale($lang);
        }
        return $next($request);
    }
}
