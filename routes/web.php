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

Route::get('/', 'Main\LandingController@homePage');
Route::get('login/{provider}', 'Main\SocialController@redirect');
Route::get('lang/{lang}', 'Main\LocalizationController@setLang');
Route::get('login/{provider}/callback','Main\SocialController@Callback');
Route::get('/terms', 'Main\LandingController@termsPage');
Route::get('/contacts', 'Main\LandingController@contactsPage');
Route::get('/privacy-policy', 'Main\LandingController@privacyPage');
Route::get('/aml-policy', 'Main\LandingController@amlPage');
Route::get('/payment-policy', 'Main\LandingController@paymentPage');
Route::get('/responsibility-disclosure', 'Main\LandingController@responsibilityPage');
Route::post('/qiwi/process', 'Main\DepositController@qiwiProcess');

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
  Route::post('/data/sendPartnerRequest', 'Main\PartnerController@sendPartnerRequest');
  Route::post('/data/requestAgain', 'Main\PartnerController@requestAgain');
  Route::post('/data/referralsInfo/{id}', 'Main\ReferralController@getUserReferralInfo')->middleware('admin');
  Route::post('/data/referrals/{id}', 'Main\ReferralController@getUserReferrals')->middleware('admin');
  Route::post('/data/sendPartnerRequest/{id}', 'Main\PartnerController@sendPartnerRequest')->middleware('admin');
  Route::post('/data/requestAgain/{id}', 'Main\PartnerController@requestAgain')->middleware('admin');
  // Промокоды
  Route::post("/promocodes", 'Main\PromocodeController@getAvailablePromocodes');
  Route::post("/promocode", 'Main\PromocodeController@checkPromocode');
  Route::post("/promocode/history", 'Main\PromocodeController@promocodeHistory');
  Route::post("/promocode/{id}", 'Main\PromocodeController@checkPromocode')->middleware('admin');
  Route::post("/promocode/history/{id}", 'Main\PromocodeController@promocodeHistory')->middleware('admin');
  // История сделок
  Route::post("/trading/history", 'Main\TradingController@tradingHistory');
  Route::post("/trading/demo/history", 'Main\TradingController@demoTradingHistory');
  Route::post("/trading/history/{id}", 'Main\TradingController@tradingHistory')->middleware('admin');
  Route::post("/trading/demo/history/{id}", 'Main\TradingController@demoTradingHistory')->middleware('admin');
  Route::post("/data/latest", 'Main\TradingController@getLatestOrders');
  Route::post("/data/opened", 'Main\TradingController@getOpenOrders');
  Route::post("/data/demo/latest", 'Main\TradingController@getLatestDemoOrders');
  Route::post("/data/demo/opened", 'Main\TradingController@getOpenDemoOrders');
  // Профиль
  Route::post("/data/profile", 'Main\ProfileController@loadAllProfileData');
  Route::post("/data/profile/{id}", 'Main\ProfileController@loadAllProfileData')->middleware('admin');
  Route::post("/data/changePassword", 'Main\ProfileController@changePassword');
  Route::post('/data/upload-additional','Main\ProfileController@additionalDocument');
  Route::post('/data/verifyPhone', 'Main\ProfileController@sendPhoneCode');
  Route::post('/data/checkPhoneCode', 'Main\ProfileController@approvePhone');
  Route::post('/data/verifyEmail', 'Main\ProfileController@sendEmailCode');
  Route::post('/data/checkEmailCode', 'Main\ProfileController@approveEmail');
  Route::post('/data/sendPhoto', 'Main\ProfileController@passportFirstPage');
  Route::post('/data/sendPhoto/{id}', 'Main\ProfileController@passportFirstPage')->middleware('admin');
  Route::post('/data/changeGeneralData', 'Main\ProfileController@changeGeneralData');
  Route::post('/data/changeGeneralData/{id}', 'Main\ProfileController@changeGeneralData')->middleware('admin');
  Route::post('/data/changeMainData', 'Main\ProfileController@changeMainData');
  Route::post('/data/changeMainData/{id}', 'Main\ProfileController@changeMainData')->middleware('admin');
  //Поддержка
  Route::post('/data/support', 'Main\SupportController@sendQuestion');
  //Вывод
  Route::post('/data/getAccountData', 'Main\WithdrawalController@getAccountData');
  Route::post('/data/discardBonus', 'Main\PromocodeController@discardBonus');
  Route::post('/data/processPayout', 'Main\WithdrawalController@processPayout');
  Route::post('/data/withdrawalHistory', 'Main\WithdrawalController@withdrawalHistory');
  Route::post('/data/getAccountData/{id}', 'Main\WithdrawalController@getAccountData')->middleware('admin');
  Route::post('/data/discardBonus/{id}', 'Main\PromocodeController@discardBonus')->middleware('admin');
  Route::post('/data/processPayout/{id}', 'Main\WithdrawalController@processPayout')->middleware('admin');
  Route::post('/data/withdrawalHistory/{id}', 'Main\WithdrawalController@withdrawalHistory')->middleware('admin');
  // Пополнение
  Route::post('/data/getAllDepositSystems', 'Main\DepositController@getAllDepositSystems');
  Route::post('/data/getDepositPromocodes', 'Main\PromocodeController@getDepositPromocodes');
  Route::post('/data/deposit', 'Main\DepositController@startDeposit');
  Route::post('/data/depositHistory', 'Main\DepositController@depositHistory');
  Route::post('/data/depositHistory/{id}', 'Main\DepositController@depositHistory')->middleware('admin');
  Route::post("/data/demo/refill", 'Main\TradingController@refillDemoBalance');
  // Все остальные страницы
  Route::post("/ping", 'Main\TradingController@ping');

  Route::middleware(['admin'])->prefix('admin')->group(function () {
    Route::get("image/{file}", 'Main\FileController@showImage');
    Route::prefix('data')->group(function () {
      Route::post("statistics", 'Admin\StatisticsController@getShortStatistics');
      Route::post("userinfo/{id}", 'Admin\UserController@getUser');
      Route::post("users", 'Admin\StatisticsController@getAllUsers');
      Route::post("daily", 'Admin\StatisticsController@getDailyStat');
      Route::post("verify", 'Admin\VerifyController@listRequestVerify');
      Route::post("cheat", 'Admin\CheatController@getAllCheaters');
      Route::post("history", 'Admin\TradeHistoryController@getHistory');
      Route::post("history/demo", 'Admin\TradeHistoryController@getHistoryDemo');
      Route::post("updatePhone", 'Admin\UserController@updatePhone');
      Route::post("updateEmail", 'Admin\UserController@updateEmail');
      Route::post("updatePassword", 'Admin\UserController@updatePassword');
      Route::post("verifyAccount", 'Admin\VerifyController@verifyAccount');
      Route::post("checkDocument", 'Admin\VerifyController@checkDocument');
      Route::post("processWithdrawal", 'Admin\WithdrawalController@processWithdrawal');
      Route::post("getControlInfo", 'Admin\ControlController@getControlInfo');
      Route::post("changeBalance", 'Admin\ControlController@changeBalance');
      Route::post("banAction", 'Admin\ControlController@banAction');
      Route::post("approvePartner", 'Admin\PartnerController@approvePartner');
      Route::post("discardPartner", 'Admin\PartnerController@discardPartner');
      Route::post("partner", 'Admin\PartnerController@listRequestPartner');
      Route::post("withdrawal", 'Admin\WithdrawalController@allWithdrawals');
      Route::post("deposits", 'Admin\DepositController@allDeposits');
    });
    Route::get('/{uri?}', 'Spa\SpaController@admin')->where('uri', '.*');
  });

  Route::get('/{uri}', 'Spa\SpaController@index')->where('uri', '.*');
});