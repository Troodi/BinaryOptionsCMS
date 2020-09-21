<?php
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
Auth::routes();
Route::middleware(['auth'])->group(function () {
  Route::post("/ping", 'Main\TradingController@ping');
  Route::post("/data/latest", 'Main\TradingController@getLatestOrders');
  Route::post("/binary/buy", 'Main\TradingController@buySymbol');
  Route::post("/data/opened", 'Main\TradingController@getOpenOrders');
  Route::get("/data/symbols", 'Main\SymbolsHistoryController@getExchanges');
  Route::get("/data/getAuthToken", 'Main\TradingController@getAuthToken');
  Route::post("/promocodes", 'Main\PromocodeController@getAvailablePromocodes');
  Route::post("/promocode", 'Main\PromocodeController@checkPromocode');
  Route::post("/promocode/history", 'Main\PromocodeController@promocodeHistory');
  Route::post("/trading/history", 'Main\TradingController@tradingHistory');
  Route::post("/trading/demo/history", 'Main\PromocodeController@demoTradingHistory');
  Route::get('/{uri}', 'Spa\SpaController@index')->where('uri', '.*');
});