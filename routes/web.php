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
  Route::post("/data/latest", 'Main\TradingController@getLatestOrders');
  Route::post("/binary/buy", 'Main\TradingController@buySymbol');
  Route::post("/data/opened", 'Main\TradingController@getOpenOrders');
  Route::get("/data/symbols", 'Main\SymbolsHistoryController@getExchanges');
  Route::get("/data/getAuthToken", 'Main\TradingController@getAuthToken');
  Route::get('/{uri}', 'Spa\SpaController@index')->where('uri', '.*');
});