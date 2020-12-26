<?php

namespace App\Console\Commands;

use App\Models\ExchangeRates;
use Illuminate\Console\Command;
use Ixudra\Curl\Facades\Curl;

class ExchangeRate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'exchange:rate';

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
      $response = Curl::to('https://www.cbr-xml-daily.ru/latest.js')
        ->asJson()
        ->get();
      if(!ExchangeRates::where('symbol', 'USD')->count()){
        $model = new ExchangeRates();
        $model->symbol = 'USD';
        $model->price = $response->rates->USD;
        $model->save();
      } else {
        ExchangeRates::where('symbol', 'USD')->update(['price' => $response->rates->USD]);
      }
      return 0;
    }
}
