<?php

namespace App\Console\Commands;

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
        ['BINANCE:BTC/BUSD', mt_rand(50, 85)],
        ['BINANCE:BTC/IDRT', mt_rand(50, 85)],
        ['BINANCE:BTC/RUB', mt_rand(50, 85)],
        ['BINANCE:BTC/ZAR', mt_rand(50, 85)],
        ['BINANCE:BTC/BKRW', mt_rand(50, 85)],
        ['BINANCE:BTC/UAH', mt_rand(50, 85)],
        ['BINANCE:BTC/GBP', mt_rand(50, 85)],
        ['BINANCE:BTC/NGN', mt_rand(50, 85)],
        ['BINANCE:BTC/USDC', mt_rand(50, 85)],
        ['BINANCE:BTC/DAI', mt_rand(50, 85)],
        ['BINANCE:BTC/USDT', mt_rand(50, 85)],
        ['BINANCE:BTC/AUD', mt_rand(50, 85)],
        ['BINANCE:BTC/PAX', mt_rand(50, 85)],
        ['BINANCE:BTC/TUSD', mt_rand(50, 85)],
        ['BINANCE:BTC/BIDR', mt_rand(50, 85)],
        ['BINANCE:BTC/EUR', mt_rand(50, 85)],
        ['BINANCE:BTC/TRY', mt_rand(50, 85)],
        ['BINANCE:BTC/USDTPERP', mt_rand(50, 85)],
        ['BITFINEX:BTC/XCH', mt_rand(50, 85)],
        ['BITFINEX:BTC/UST', mt_rand(50, 85)],
        ['BITFINEX:BTC/EUR', mt_rand(50, 85)],
        ['BITFINEX:BTC/JPY', mt_rand(50, 85)],
        ['BITFINEX:BTC/USD', mt_rand(50, 85)],
        ['BITFINEX:BTC/GBP', mt_rand(50, 85)],
        ['BITFINEX:BTC/CNHT', mt_rand(50, 85)],
        ['BITFLYER:BTC/JPY3M', mt_rand(50, 85)],
        ['BITFLYER:BTC/JPY', mt_rand(50, 85)],
        ['BITHUMB:BTC/KRW', mt_rand(50, 85)],
        ['BITSO:BTC/MXN', mt_rand(50, 85)],
        ['BITSTAMP:BTC/EUR', mt_rand(50, 85)],
        ['BITSTAMP:BTC/USD', mt_rand(50, 85)],
        ['BITSTAMP:BTC/GBP', mt_rand(50, 85)],
        ['BITSTAMP:BTC/PAX', mt_rand(50, 85)],
        ['BINANE:ETH/USDT', mt_rand(50, 85)],
        ['BITTREX:BTC/USD', mt_rand(50, 85)],
        ['BITTREX:BTC/EUR', mt_rand(50, 85)],
        ['FX:EUR/USD', mt_rand(50, 85)],
        ['FX:GBP/USD', mt_rand(50, 85)],
        ['FX:USD/CHF', mt_rand(50, 85)],
        ['FX:EUR/GBP', mt_rand(50, 85)],
        ['FX:EUR/JPY', mt_rand(50, 85)],
        ['FX:USD/SEK', mt_rand(50, 85)],
        ['FX:USD/RUB', mt_rand(50, 85)],
        ['FX:USD/NOK', mt_rand(50, 85)],
        ['FX:EUR/CHF', mt_rand(50, 85)],
        ['FX:EUR/SEK', mt_rand(50, 85)],
        ['FX:EUR/NOK', mt_rand(50, 85)],
        ['FX:EUR/AUD', mt_rand(50, 85)],
        ['FX:CAD/CHF', mt_rand(50, 85)],
        ['FX:CHF/RUB', mt_rand(50, 85)],
      ];

      foreach ($symbols as $symbol) {
        $exploded = explode(':', $symbol[0]);
        $model = new Symbol();
        $model->symbol = $exploded[1];
        $model->type = 1;
        $model->broker = $exploded[0];
        $model->percent = $symbol[1];
        $model->status = 1;
        $model->save();
      }

      $model = new Promocode;
      $model->description = 'Бездепозитный бонус 10$ для новых клиентов. Для того чтобы вывести бонус его необходимо отработать, для этого необходимо сделать торговый оборот, то есть общую сумму сделок 500$ (например 500 сделок по 1 доллару).';
      $model->code = 'GIVEME10DOLLARS';
      $model->image = 'https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148253847.jpg';
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
      $model->image = 'https://image.freepik.com/free-vector/abstract-composition-of-purple-gradient-liquid-shapes-background_23-2148274146.jpg';
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
      return 0;
    }
}
