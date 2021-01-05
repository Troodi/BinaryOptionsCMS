<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class GetReferer
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
        $response = $next($request);
        $referer = request()->headers->get('http_referer');
        if(!empty($request->utm_adv)){
          $referer = $request->utm_adv;
        }
        if($referer and empty($request->cookie('http_referer'))){
          return $response->withCookie(cookie()->forever('http_referer', $referer));
        }
        return $response;
    }
}
