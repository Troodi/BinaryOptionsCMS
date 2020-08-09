<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Symbols\Options\EurUsd\EurUsdTicks;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TradingController extends Controller
{
    public function selectDB(){
      $start = microtime(true);
      $toTimestamp = '2020-08-01 10:07:58';
      $timeframe = "second";
      $allValues = 2000;
      $current = EurUsdTicks::where('created_at', '<=', $toTimestamp)->whereNotNull('bar')->latest()->first();
      $from = EurUsdTicks::where('bar', $current->bar-$allValues)->first();
      $all = EurUsdTicks::where('created_at', '>', Carbon::parse($from->created_at)->format('Y-m-d H:i:s'))
        ->where('created_at', '<=', Carbon::parse($current->created_at)->format('Y-m-d H:i:s'))
        ->select(DB::raw('MAX(price) as high_price, MIN(price) as low_price, (ARRAY_AGG(price ORDER BY created_at ASC))[1] AS open_price, (ARRAY_AGG(price ORDER BY created_at DESC))[1] as close_price, (ARRAY_AGG(created_at ORDER BY created_at DESC))[1] as bar_time, (ARRAY_AGG(bar ORDER BY created_at ASC))[1] as bar_number, date_trunc(\''.$timeframe.'\', created_at) as secondVal'))
        ->groupBy(DB::raw('secondVal'))
        ->orderBy('bar_time', 'desc')
        ->get()
        ->count();
      dump($all);
      echo '<br>';
      echo number_format((microtime(true)-$start), 10);
    }
}
