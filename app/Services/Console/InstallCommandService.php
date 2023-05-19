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
            ['BINANCE:BTCUSDT', 90, 0, 0, 1],
            ['BINANCE:ETHBTC', 85, 0, 0, 1],
            ['BINANCE:XRPBTC', 85, 0, 0, 1],
            ['BINANCE:EOSUSDT', 85, 0, 0, 1],
            ['BINANCE:XRPUSDT', 85, 0, 0, 1],
            ['BINANCE:ETHUSDT', 85, 0, 0, 1],
            ['BINANCE:XRPUSD', 85, 0, 0, 1],
            ['BINANCE:EURUSDT', 85, 0, 0, 1],
            ['BINANCE:GBPUSDT', 85, 0, 0, 1],
            ['BINANCE:AUDUSDT', 85, 0, 0, 1],
            ['BINANCE:XRPGBP', 85, 0, 0, 1],
            ['BINANCE:BTCAUD', 85, 0, 0, 1],
            ['BINANCE:ETHAUD', 85, 0, 0, 1],
            ['BINANCE:XRPGBP', 85, 0, 0, 1],
            ['BINANCE:BTCGBP', 85, 0, 0, 1],
            ['BINANCE:ETHGBP', 85, 0, 0, 1],
            ['BINANCE:XRPRUB', 85, 0, 0, 1],
            ['BINANCE:BTCRUB', 85, 0, 0, 1],
            ['BINANCE:USDTRUB', 85, 0, 0, 1],
            ['BINANCE:ETHRUB', 85, 0, 0, 1],
            ['BINANCE:LTCRUB', 85, 0, 0, 1],
            ['BINANCE:PAXGUSDT', 85, 0, 0, 1],
            ['BINANCE:BTGBTC', 85, 0, 0, 1],
            ['BINANCE:XRPAUD', 85, 0, 0, 1],
            ['FX:EURUSD', 85, 23, 1, 0],
            ['FX:GBPUSD', 85, 23, 1, 0],
            ['FX:GBPJPY', 85, 23, 1, 0],
            ['FX:USDJPY', 85, 23, 1, 0],
            ['FX:AUDUSD', 85, 23, 1, 0],
            ['FX:USDCAD', 85, 23, 1, 0],
            ['FX:EURJPY', 85, 23, 1, 0],
            ['FX:GBPAUD', 85, 23, 1, 0],
            ['FX:EURGBP', 85, 23, 1, 0],
            ['FX:NZDUSD', 85, 23, 1, 0],
            ['FX:USDCHF', 85, 23, 1, 0],
            ['FX:USDTRY', 85, 23, 1, 0],
            ['FX:EURAUD', 85, 23, 1, 0],
            ['FX:AUDJPY', 85, 23, 1, 0],
            ['FX:EURNZD', 85, 23, 1, 0],
            ['FX:EURCAD', 85, 23, 1, 0],
            ['FX:GBPCAD', 85, 23, 1, 0],
            ['FX:CADJPY', 85, 23, 1, 0],
            ['FX:AUDCAD', 85, 23, 1, 0],
            ['FX:GBPNZD', 85, 23, 1, 0],
            ['FX:GBPCHF', 85, 23, 1, 0],
            ['FX:AUDNZD', 85, 23, 1, 0],
            ['FX:CHFJPY', 85, 23, 1, 0],
            ['FX:NZDJPY', 85, 23, 1, 0],
            ['FX:EURCHF', 85, 23, 1, 0],
            ['FX:NZDCAD', 85, 23, 1, 0],
            ['FX:AUDCHF', 85, 23, 1, 0],
            ['FX:CADCHF', 85, 23, 1, 0],
            ['FX:NZDCHF', 85, 23, 1, 0],
            ['FX:USDZAR', 85, 23, 1, 0],
            ['FX:USDMXN', 85, 23, 1, 0],
            ['FX:EURTRY', 85, 23, 1, 0],
            ['FX:USDCNH', 85, 23, 1, 0],
            ['FX:USDSEK', 85, 23, 1, 0],
            ['FX:USDNOK', 85, 23, 1, 0],
            ['FX:EURNOK', 85, 23, 1, 0],
            ['FX:EURSEK', 85, 23, 1, 0],
            ['FX:USDHKD', 85, 23, 1, 0],
            ['FX:ZARJPY', 85, 23, 1, 0],
            ['FX:TRYJPY', 85, 23, 1, 0],
        ];

        foreach ($symbols as $symbol) {
            $exploded = explode(':', $symbol[0]);
            $model = new Symbol();
            $model->symbol = $exploded[1];
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
        DepositSystem::where('id', 1)->update(['order' => 1, 'max' => 8000]); // Qiwi
        DepositSystem::where('id', 2)->update(['order' => 2, 'max' => 200]); // Yoo
        DepositSystem::where('id', 3)->update(['order' => 3, 'max' => 100000]); // Crypto
        DepositSystem::where('id', 4)->update(['order' => 4, 'max' => 600]); // WebMoney
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
