<?php
use App\Http\Controllers\LanguageController;
use App\Models\Symbols\Options\EurUsd\EurUsdTicks;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// dashboard Routes
Auth::routes();
Route::get("/test", function (){
  $start = microtime(true);
  //DB::statement("SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));");
  // SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
  $toTimestamp = '2020-07-19 23:49:10';
  $current = EurUsdTicks::where('created_at', '<=', $toTimestamp)->whereNotNull('bar')->latest()->first();
  $from = EurUsdTicks::where('bar', $current->bar-2000)->first();
  $all = EurUsdTicks::where('created_at', '>', $from->created_at->format('Y-m-d H:i:s'))
    ->where('created_at', '<=', $current->created_at->format('Y-m-d H:i:s'))
    ->select(DB::raw('MAX(`price`) as high, MIN(`price`) as low, COALESCE(`price`) as open, SUBSTRING_INDEX(GROUP_CONCAT(`price`), \',\', -1) as close, `created_at`'))
    ->groupBy(DB::raw('DATE_FORMAT(`created_at`, \'%Y-%m-%d %H:%i\')'))
    ->orderBy('created_at', 'desc')
    ->get()
    ->count();
  dump($all);
//  dump($all->high);
//  dump($all->low);
//  dump($all->open);
//  dump($all->close);
//  dump($all->created_at->format('Y-m-d H:i:s'));
  echo '<br>';
  echo number_format((microtime(true)-$start), 10);
});
Route::get('/{uri}', 'Spa\SpaController@index')->where('uri', '.*');
