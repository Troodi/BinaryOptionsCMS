<?php

namespace App\Http\Middleware;

use App\Models\Profile;
use App\Models\SameIp;
use App\User;
use Carbon\Carbon;
use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class Cheat
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
      $return = $next($request);
      if(!Cache::has('user_active_'.Auth::user()->id)){
        Cache::put('user_active_'.Auth::user()->id, true, 300);
        User::where('id', Auth::user()->id)->update(['updated_at' => Carbon::now()]);
      }
      if(!empty($_SERVER["HTTP_CF_CONNECTING_IP"])){
        $ip = $_SERVER["HTTP_CF_CONNECTING_IP"];
      } else if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
      } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
      } else {
        $ip = $_SERVER['REMOTE_ADDR'] ?? null;
      }
      $agent = $request->header('user-agent');
      if(Cache::remember('user_agent_'.Auth::user()->id, 3600, function () use ($agent) { return $agent; }) != $agent or !Cache::has('user_agent_updated_'.Auth::user()->id)) {
        Cache::put('user_agent_updated_'.Auth::user()->id, true, 3600);
        Profile::where('user_id', Auth::user()->id)->update(['http_user_agent' => $agent]);
      }

      if(Auth::user()->banned == 1){
        Auth::logout();
        return redirect('/login')->withErrors(['cheat' => 'Ваш аккаунт был заблокирован за использование мультиаккаунтов!']);
      }
      else if(Auth::user()->banned == 2){
        Auth::logout();
        return redirect('/login')->withErrors(['cheat' => 'Ваш аккаунт был заблокирован по неактивности!']);
      }
      else if(Auth::user()->banned == 3){
        Auth::logout();
        return redirect('/login')->withErrors(['cheat' => 'Ваш аккаунт был заблокирован за нарушение правил!']);
      }

      if (Cache::remember('coincidence_ip_'.Auth::user()->id, 3600, function () { return SameIp::where('user_id', Auth::user()->id)->count(); })) { // Если пользователь есть в таблице SameIp
        if (Auth::user()->ip != $ip) { // И предыдущий IP не равен текущему
          if (!SameIp::where('user_id', Auth::user()->id)->where('ip', $ip)->count()) { // Если нет записей с таким IP в таблице
            $model = new SameIp; // Создаем её
            $model->user_id = Auth::user()->id;
            $model->ip = $ip;
            $model->save();
          }
        }
      } else {
        Cache::put('coincidence_ip_'.Auth::user()->id, 1, 3600);
        $model = new SameIp;
        $model->user_id = Auth::user()->id;
        $model->ip = $ip;
        $model->save();
      }

      // Если изменился IP или IP ешё ни разу не записывался
      if(Cache::remember('user_ip_'.Auth::user()->id, 3600, function () use ($ip) { return $ip; }) != $ip or !Cache::has('user_ip_updated_'.Auth::user()->id)) { // Если IP изменялся
        Profile::where('id', Auth::user()->id)->update(['ip' => $ip]);
        Cache::put('user_ip_updated_'.Auth::user()->id, true, 3600);
        Cache::put('user_ip_'.Auth::user()->id, $ip, 3600);
      }
      return $return;
    }
}
