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

Route::get('login/{provider}', 'Main\SocialController@redirect');
Route::get('login/{provider}/callback','Main\SocialController@Callback');

Route::post('/event-twilio', 'Main\ProfileController@phoneEvent');
Route::get('/mp3', 'Main\ProfileController@playMP3');
Route::get('/offer/{code}', 'Main\ReferralController@setReferralCookie');
Route::get('/test', 'Main\TestController@test');
Route::post('/payeer/status', 'Main\DepositController@processPayeer');

Route::middleware(['auth', 'cheat'])->group(function () {
  // Трейдинг
  Route::post("/binary/buy", 'Main\TradingController@buySymbol');
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
  Route::post("/trading/demo/history", 'Main\TradingController@demoTradingHistory');
  Route::post("/data/latest", 'Main\TradingController@getLatestOrders');
  Route::post("/data/opened", 'Main\TradingController@getOpenOrders');
  Route::post("/data/demo/latest", 'Main\TradingController@getLatestDemoOrders');
  Route::post("/data/demo/opened", 'Main\TradingController@getOpenDemoOrders');
  // Профиль
  Route::post("/data/profile", 'Main\ProfileController@loadAllProfileData');
  Route::post("/data/changePassword", 'Main\ProfileController@changePassword');
  Route::post('/data/upload-additional','Main\ProfileController@additionalDocument');
  Route::post('/data/verifyPhone', 'Main\ProfileController@sendPhoneCode');
  Route::post('/data/checkPhoneCode', 'Main\ProfileController@approvePhone');
  Route::post('/data/verifyEmail', 'Main\ProfileController@sendEmailCode');
  Route::post('/data/checkEmailCode', 'Main\ProfileController@approveEmail');
  Route::post('/data/sendPhoto', 'Main\ProfileController@passportFirstPage');
  Route::post('/data/changeGeneralData', 'Main\ProfileController@changeGeneralData');
  Route::post('/data/changeMainData', 'Main\ProfileController@changeMainData');
  //Поддержка
  Route::post('/data/support', 'Main\SupportController@sendQuestion');
  //Вывод
  Route::post('/data/getAccountData', 'Main\WithdrawalController@getAccountData');
  Route::post('/data/discardBonus', 'Main\PromocodeController@discardBonus');
  Route::post('/data/processPayout', 'Main\WithdrawalController@processPayout');
  Route::post('/data/withdrawalHistory', 'Main\WithdrawalController@withdrawalHistory');
  // Пополнение
  Route::post('/data/getDepositPromocodes', 'Main\PromocodeController@getDepositPromocodes');
  Route::post('/data/deposit', 'Main\DepositController@startDeposit');
  Route::post('/data/depositHistory', 'Main\DepositController@depositHistory');
  Route::post("/data/demo/refill", 'Main\TradingController@refillDemoBalance');
  // Все остальные страницы
  Route::post("/ping", 'Main\TradingController@ping');

  Route::middleware(['admin'])->prefix('admin')->group(function () {
    Route::prefix('data')->group(function () {
      Route::post("statistics", 'Admin\StatisticsController@getShortStatistics');
      Route::post("users", 'Admin\StatisticsController@getAllUsers');
      Route::post("daily", 'Admin\StatisticsController@getDailyStat');
    });
    Route::get('/{uri?}', 'Spa\SpaController@admin')->where('uri', '.*');
  });

  Route::get('/{uri}', 'Spa\SpaController@index')->where('uri', '.*');
});