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
  // Трейдинг
  Route::post("/binary/buy", 'Main\TradingController@buySymbol');
  Route::post("/data/opened", 'Main\TradingController@getOpenOrders');
  Route::get("/data/symbols", 'Main\SymbolsHistoryController@getExchanges');
  Route::get("/data/getAuthToken", 'Main\TradingController@getAuthToken');
  // Реферралы
  Route::post('/data/referralsInfo', 'Main\ReferralController@getUserReferralInfo');
  Route::post('/data/referrals', 'Main\ReferralController@getUserReferrals');
  // Промокоды
  Route::post("/promocodes", 'Main\PromocodeController@getAvailablePromocodes');
  Route::post("/promocode", 'Main\PromocodeController@checkPromocode');
  Route::post("/promocode/history", 'Main\PromocodeController@promocodeHistory');
  // История сделок
  Route::post("/trading/history", 'Main\TradingController@tradingHistory');
  Route::post("/trading/demo/history", 'Main\PromocodeController@demoTradingHistory');
  Route::post("/data/latest", 'Main\TradingController@getLatestOrders');
  // Профиль
  Route::post("/data/profile", 'Main\ProfileController@loadAllProfileData');
  // Все остальные страницы
  Route::post("/ping", 'Main\TradingController@ping');
  Route::get('/{uri}', 'Spa\SpaController@index')->where('uri', '.*');
});