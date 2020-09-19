<?php

namespace App\Console\Commands;

use App\Models\Symbols\Options\Symbol;
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
    protected $description = 'Command description';

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
          ['FX_IDC:EUR/USD', mt_rand(50, 85)],
          ['FX_IDC:GBP/USD', mt_rand(50, 85)],
          ['FX_IDC:USD/CHF', mt_rand(50, 85)],
          ['FX_IDC:EUR/GBP', mt_rand(50, 85)],
          ['FX_IDC:EUR/JPY', mt_rand(50, 85)],
          ['FX_IDC:USD/SEK', mt_rand(50, 85)],
          ['FX_IDC:USD/RUB', mt_rand(50, 85)],
          ['FX_IDC:USD/NOK', mt_rand(50, 85)],
          ['FX_IDC:EUR/CHF', mt_rand(50, 85)],
          ['FX_IDC:EUR/SEK', mt_rand(50, 85)],
          ['FX_IDC:EUR/NOK', mt_rand(50, 85)],
          ['FX_IDC:EUR/AUD', mt_rand(50, 85)],
          ['FX_IDC:CAD/CHF', mt_rand(50, 85)],
          ['FX_IDC:CHF/RUB', mt_rand(50, 85)],
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

        return 0;
    }
}
