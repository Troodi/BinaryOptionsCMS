<?php

namespace App\Console\Commands;

use App\Models\DepositSystem;
use App\Models\Promocode;
use App\Models\Symbols\Options\Symbol;
use Carbon\Carbon;
use Illuminate\Console\Command;

class InstallCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Loading and fill database data';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
      Symbol::truncate();
      Promocode::truncate();

      $symbols = [
        ['BINANCE:ETH/BTC', mt_rand(50, 85), 0, 0],
        ['BINANCE:XRP/BTC', mt_rand(50, 85), 0, 0],
        ['BINANCE:EOS/USDT', mt_rand(50, 85), 0, 0],
        ['BINANCE:BTC/USDT', mt_rand(50, 85), 0, 0],
        ['BINANCE:XRP/USDT', mt_rand(50, 85), 0, 0],
        ['BINANCE:ETH/USDT', mt_rand(50, 85), 0, 0],
        ['BINANCE:XRP/USD', mt_rand(50, 85), 0, 0],
        ['BINANCE:EUR/USDT', mt_rand(50, 85), 0, 0],
        ['BINANCE:GBP/USDT', mt_rand(50, 85), 0, 0],
        ['BINANCE:AUD/USDT', mt_rand(50, 85), 0, 0],
        ['BINANCE:XRP/GBP', mt_rand(50, 85), 0, 0],
        ['BINANCE:BTC/AUD', mt_rand(50, 85), 0, 0],
        ['BINANCE:ETH/AUD', mt_rand(50, 85), 0, 0],
        ['BINANCE:XRP/GBP', mt_rand(50, 85), 0, 0],
        ['BINANCE:BTC/GBP', mt_rand(50, 85), 0, 0],
        ['BINANCE:ETH/GBP', mt_rand(50, 85), 0, 0],
        ['BINANCE:XRP/RUB', mt_rand(50, 85), 0, 0],
        ['BINANCE:BTC/RUB', mt_rand(50, 85), 0, 0],
        ['BINANCE:USDT/RUB', mt_rand(50, 85), 0, 0],
        ['BINANCE:ETH/RUB', mt_rand(50, 85), 0, 0],
        ['BINANCE:LTC/RUB', mt_rand(50, 85), 0, 0],
        ['BINANCE:PAXG/USDT', mt_rand(50, 85), 0, 0],
        ['BINANCE:BTG/BTC', mt_rand(50, 85), 0, 0],
        ['BINANCE:XRP/AUD', mt_rand(50, 85), 0, 0],
        ['FX:EUR/USD', mt_rand(50, 85), 23, 1],
        ['FX:GBP/USD', mt_rand(50, 85), 23, 1],
        ['FX:GBP/JPY', mt_rand(50, 85), 23, 1],
        ['FX:USD/JPY', mt_rand(50, 85), 23, 1],
        ['FX:AUD/USD', mt_rand(50, 85), 23, 1],
        ['FX:USD/CAD', mt_rand(50, 85), 23, 1],
        ['FX:EUR/JPY', mt_rand(50, 85), 23, 1],
        ['FX:GBP/AUD', mt_rand(50, 85), 23, 1],
        ['FX:EUR/GBP', mt_rand(50, 85), 23, 1],
        ['FX:NZD/USD', mt_rand(50, 85), 23, 1],
        ['FX:USD/CHF', mt_rand(50, 85), 23, 1],
        ['FX:USD/TRY', mt_rand(50, 85), 23, 1],
        ['FX:EUR/AUD', mt_rand(50, 85), 23, 1],
        ['FX:AUD/JPY', mt_rand(50, 85), 23, 1],
        ['FX:EUR/NZD', mt_rand(50, 85), 23, 1],
        ['FX:EUR/CAD', mt_rand(50, 85), 23, 1],
        ['FX:GBP/CAD', mt_rand(50, 85), 23, 1],
        ['FX:CAD/JPY', mt_rand(50, 85), 23, 1],
        ['FX:AUD/CAD', mt_rand(50, 85), 23, 1],
        ['FX:GBP/NZD', mt_rand(50, 85), 23, 1],
        ['FX:GBP/CHF', mt_rand(50, 85), 23, 1],
        ['FX:AUD/NZD', mt_rand(50, 85), 23, 1],
        ['FX:CHF/JPY', mt_rand(50, 85), 23, 1],
        ['FX:NZD/JPY', mt_rand(50, 85), 23, 1],
        ['FX:EUR/CHF', mt_rand(50, 85), 23, 1],
        ['FX:NZD/CAD', mt_rand(50, 85), 23, 1],
        ['FX:AUD/CHF', mt_rand(50, 85), 23, 1],
        ['FX:CAD/CHF', mt_rand(50, 85), 23, 1],
        ['FX:NZD/CHF', mt_rand(50, 85), 23, 1],
        ['FX:USD/ZAR', mt_rand(50, 85), 23, 1],
        ['FX:USD/MXN', mt_rand(50, 85), 23, 1],
        ['FX:EUR/TRY', mt_rand(50, 85), 23, 1],
        ['FX:USD/CNH', mt_rand(50, 85), 23, 1],
        ['FX:USD/SEK', mt_rand(50, 85), 23, 1],
        ['FX:USD/NOK', mt_rand(50, 85), 23, 1],
        ['FX:EUR/NOK', mt_rand(50, 85), 23, 1],
        ['FX:EUR/SEK', mt_rand(50, 85), 23, 1],
        ['FX:USD/HKD', mt_rand(50, 85), 23, 1],
        ['FX:ZAR/JPY', mt_rand(50, 85), 23, 1],
        ['FX:TRY/JPY', mt_rand(50, 85), 23, 1],
      ];

      foreach ($symbols as $symbol) {
        $exploded = explode(':', $symbol[0]);
        $model = new Symbol();
        $model->symbol = $exploded[1];
        $model->type = 1;
        $model->broker = $exploded[0];
        $model->percent = $symbol[1];
        $model->work_to = $symbol[2];
        $model->work_from = $symbol[3];
        $model->status = 1;
        $model->save();
      }

      $model = new Promocode;
      $model->description = 'Бездепозитный бонус 10$ для новых клиентов. Для того чтобы вывести бонус его необходимо отработать, для этого необходимо сделать торговый оборот, то есть общую сумму сделок 500$ (например 500 сделок по 1 доллару).';
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
      $model->description = 'Бездепозитный бонус 5$ для новых клиентов. Для того чтобы вывести бонус его необходимо отработать, для этого необходимо сделать торговый оборот, то есть общую сумму сделок 250$ (например 250 сделок по 1 доллару).';
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

      $standard_promocodes = [[50, 25], [100, 55], [250,60], [500, 65], [1000, 70], [3000, 80], [5000, 90], [10000, 100]];
      foreach($standard_promocodes as $promocode) {
        $model = new Promocode;
        $model->description = 'Стандартный бонус';
        $model->code = 'DEPOSIT'.$promocode[0].'BONUS';
        $model->public_code = 2;
        $model->used = 0;
        $model->for_new = 0;
        $model->type = 2; // Процнт к балансу
        $model->turnover = 30;
        $model->bonus_size = $promocode[1];
        $model->min_amount = $promocode[0];
        $model->active_from = Carbon::now();
        $model->active_to = Carbon::now()->addYears(10);
        $model->save();
      }

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
}
