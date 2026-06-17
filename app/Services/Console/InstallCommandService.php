<?php

namespace App\Services\Console;


use App\Helpers\Helper;
use App\Models\DepositSystem;
use App\Models\Promocode;
use App\Models\Symbols\Options\Symbol;
use Carbon\Carbon;
use Illuminate\Support\Facades\Artisan;


class InstallCommandService {

    public function migrationsSeedersStarterSymbols()
    {
        Helper::checkMysqlConnection();
        Artisan::call('migrate', ['--force' => true]);
        Symbol::truncate();
        Promocode::truncate();

        $symbols = [
            ['BINANCE:BTC/USDT', 90, 0, 0, 1],
            ['BINANCE:ETH/BTC', 85, 0, 0, 1],
            ['BINANCE:XRP/BTC', 85, 0, 0, 1],
            ['BINANCE:EOS/USDT', 85, 0, 0, 1],
            ['BINANCE:XRP/USDT', 85, 0, 0, 1],
            ['BINANCE:ETH/USDT', 85, 0, 0, 1],
            ['BINANCE:XRP/USD', 85, 0, 0, 1],
            ['BINANCE:EUR/USDT', 85, 0, 0, 1],
            ['BINANCE:GBP/USDT', 85, 0, 0, 1],
            ['BINANCE:AUD/USDT', 85, 0, 0, 1],
            ['BINANCE:XRP/GBP', 85, 0, 0, 1],
            ['BINANCE:BTC/AUD', 85, 0, 0, 1],
            ['BINANCE:ETH/AUD', 85, 0, 0, 1],
            ['BINANCE:XRP/GBP', 85, 0, 0, 1],
            ['BINANCE:BTC/GBP', 85, 0, 0, 1],
            ['BINANCE:ETH/GBP', 85, 0, 0, 1],
            ['BINANCE:XRP/RUB', 85, 0, 0, 1],
            ['BINANCE:BTC/RUB', 85, 0, 0, 1],
            ['BINANCE:USDT/RUB', 85, 0, 0, 1],
            ['BINANCE:ETH/RUB', 85, 0, 0, 1],
            ['BINANCE:LTC/RUB', 85, 0, 0, 1],
            ['BINANCE:PAXG/USDT', 85, 0, 0, 1],
            ['BINANCE:BTG/BTC', 85, 0, 0, 1],
            ['BINANCE:XRP/AUD', 85, 0, 0, 1],
            ['FX:EUR/USD', 85, 23, 1, 0],
            ['FX:GBP/USD', 85, 23, 1, 0],
            ['FX:GBP/JPY', 85, 23, 1, 0],
            ['FX:USD/JPY', 85, 23, 1, 0],
            ['FX:AUD/USD', 85, 23, 1, 0],
            ['FX:USD/CAD', 85, 23, 1, 0],
            ['FX:EUR/JPY', 85, 23, 1, 0],
            ['FX:GBP/AUD', 85, 23, 1, 0],
            ['FX:EUR/GBP', 85, 23, 1, 0],
            ['FX:NZD/USD', 85, 23, 1, 0],
            ['FX:USD/CHF', 85, 23, 1, 0],
            ['FX:USD/TRY', 85, 23, 1, 0],
            ['FX:EUR/AUD', 85, 23, 1, 0],
            ['FX:AUD/JPY', 85, 23, 1, 0],
            ['FX:EUR/NZD', 85, 23, 1, 0],
            ['FX:EUR/CAD', 85, 23, 1, 0],
            ['FX:GBP/CAD', 85, 23, 1, 0],
            ['FX:CAD/JPY', 85, 23, 1, 0],
            ['FX:AUD/CAD', 85, 23, 1, 0],
            ['FX:GBP/NZD', 85, 23, 1, 0],
            ['FX:GBP/CHF', 85, 23, 1, 0],
            ['FX:AUD/NZD', 85, 23, 1, 0],
            ['FX:CHF/JPY', 85, 23, 1, 0],
            ['FX:NZD/JPY', 85, 23, 1, 0],
            ['FX:EUR/CHF', 85, 23, 1, 0],
            ['FX:NZD/CAD', 85, 23, 1, 0],
            ['FX:AUD/CHF', 85, 23, 1, 0],
            ['FX:CAD/CHF', 85, 23, 1, 0],
            ['FX:NZD/CHF', 85, 23, 1, 0],
            ['FX:USD/ZAR', 85, 23, 1, 0],
            ['FX:USD/MXN', 85, 23, 1, 0],
            ['FX:EUR/TRY', 85, 23, 1, 0],
            ['FX:USD/CNH', 85, 23, 1, 0],
            ['FX:USD/SEK', 85, 23, 1, 0],
            ['FX:USD/NOK', 85, 23, 1, 0],
            ['FX:EUR/NOK', 85, 23, 1, 0],
            ['FX:EUR/SEK', 85, 23, 1, 0],
            ['FX:USD/HKD', 85, 23, 1, 0],
            ['FX:ZAR/JPY', 85, 23, 1, 0],
            ['FX:TRY/JPY', 85, 23, 1, 0],
        ];

        foreach ($symbols as $symbol) {

            $exploded = explode(':', $symbol[0]);
            list($broker, $pair) = explode(':', $symbol[0]);
            list($firstPair, $secondPair) = explode('/', $pair);
            $model = new Symbol();
            $model->symbol = $firstPair.$secondPair;
            $model->first_symbol = $firstPair;
            $model->second_symbol = $secondPair;
            $model->type = 1;
            $model->broker = $exploded[0];
            $model->min_percent = 65;
            $model->percent = $symbol[1];
            $model->fixed_percent = $symbol[1];
            $model->max_percent = $symbol[1];
            $model->work_to = $symbol[2];
            $model->work_from = $symbol[3];
            $model->status = $symbol[4];
            $model->save();
        }
    }
    public function migrationsSeedersStarterPromo()
    {
        $model = new Promocode;
        $model->description = 'a:3:{s:2:"en";s:3:"123";s:2:"es";s:3:"333";s:2:"ru";s:3:"222";}';
        $model->code = 'GIVEME10DOLLARS';
        $model->image = '/images/promocode_first.jpg';
        $model->public_code = 1;
        $model->used = 0;
        $model->for_new = 1;
        $model->attempts = 1;
        $model->type = 1; // Бездепозитный бонус
        $model->turnover = 50;
        $model->bonus_size = 10;
        $model->active_from = Carbon::now();
        $model->active_to = Carbon::now()->addYears(10);
        $model->save();

        $model = new Promocode;
        $model->description = 'a:3:{s:2:"en";s:3:"123";s:2:"es";s:3:"333";s:2:"ru";s:3:"222";}';
        $model->code = 'GIVEME5DOLLARS';
        $model->image = '/images/promocode_second.jpg';
        $model->public_code = 1;
        $model->used = 0;
        $model->for_new = 1;
        $model->attempts = 1;
        $model->type = 1; // Бездепозитный бонус
        $model->turnover = 50;
        $model->bonus_size = 5;
        $model->active_from = Carbon::now();
        $model->active_to = Carbon::now()->addYears(10);
        $model->save();

        $standard_promocodes = [[50, 25], [100, 55], [250, 60], [500, 65], [1000, 70], [3000, 80], [5000, 90], [10000, 100]];
        foreach ($standard_promocodes as $promocode) {
            $model = new Promocode;
            $model->description = 'a:3:{s:2:"en";s:3:"123";s:2:"es";s:3:"333";s:2:"ru";s:3:"222";}';
            $model->code = 'DEPOSIT' . $promocode[0] . 'BONUS';
            $model->public_code = 2;
            $model->used = 0;
            $model->for_new = 0;
            $model->type = 2; // Процeнт к балансу
            $model->turnover = 30;
            $model->bonus_size = $promocode[1];
            $model->min_amount = $promocode[0];
            $model->active_from = Carbon::now();
            $model->active_to = Carbon::now()->addYears(10);
            $model->save();
        }
    }
    public function migrationsSeedersStarterDeposit()
    {
        DepositSystem::truncate();

        $systems = ['Cards & Qiwi (max. 8 000$)' => 0, 'Cards & YooMoney (max. 200$)' => 0, 'Cryptocurrencies (Bitcoin, Ethereum, Litecoin)(max. 100 000$)' => 0, 'Webmoney' => 1, 'Betatransfer' => 1, 'Payeer' => 1, 'Free-Kassa' => 1, 'InterKassa' => 1, 'RosKassa' => 1, 'Robokassa' => 1];

        foreach ($systems as $system => $hidden) {
            $model = new DepositSystem();
            $model->text = $system;
            $model->hidden = $hidden;
            $model->save();
        }
        DepositSystem::where('text', 'Cards & Qiwi (max. 8 000$)')->update(['order' => 1, 'max' => 8000]); // Qiwi
        DepositSystem::where('text', 'Cards & YooMoney (max. 200$)')->update(['order' => 2, 'max' => 200]); // Yoo
        DepositSystem::where('text', 'Cryptocurrencies (Bitcoin, Ethereum, Litecoin)(max. 100 000$)')->update(['order' => 3, 'max' => 100000]); // Crypto
        DepositSystem::where('text', 'Webmoney')->update(['order' => 4, 'max' => 600]); // WebMoney
        return 0;
    }
    public function migrationsSeedersStarterAll ()
    {
        $this->migrationsSeedersStarterSymbols();
        $this->migrationsSeedersStarterPromo();
        $this->migrationsSeedersStarterDeposit();
        dump("Install command worked successfully");
    }
}
