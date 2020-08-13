<?php

namespace App\Console\Commands\Fxcm;

use App\Models\Symbols\Options\Symbol;
use App\Models\Symbols\Options\Timeframe;
use Carbon\Carbon;
use FxcmRest\FxcmRest;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Type\Time;
use React\EventLoop\Factory;

class LoadHistory extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    private $symbol_order_id = 0;

    protected $signature = 'fxcm:load';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Loading fxcm forex history';

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
      $loop = Factory::create();

      $config = new \FxcmRest\Config([
        'host' => env('FXCM_API_HOST'),
        'token' => env('FXCM_API_KEY'),
      ]);

      
      $this->line('Connecting...');
      $rest = new FxcmRest($loop, $config);
      $rest->on('connected', function() use ($rest, $loop) {
        $this->line('Connected!');
        $loop->addPeriodicTimer(1, function () use ($rest) {
          $rest->socketIO->wssend("5");
          $rest->socketIO->startPinging();
        });
        $this->loadHistoryForSymbol($rest, Symbol::all(), $loop);
      });

      $rest->on('error', function($e) use ($loop) {
        echo "socket error: {$e}\n";
        $loop->stop();
      });
      $rest->on('disconnected', function() use ($loop) {
        echo "FxcmRest disconnected\n";
        $loop->stop();
      });
      $rest->connect();

      $loop->run();
      return 0;
    }

    private function loadHistoryForSymbol($rest, $symbols, $loop){
        $symbol = $symbols->get($this->symbol_order_id);
        if(!$symbol){
          $rest->disconnect();
          $loop->stop();
          return;
        }
      //foreach(Timeframe::whereNotNull('fxcm')->get() as $timeframe) {
        $this->line($symbol->symbol);
        $rest->request('GET', "/candles/$symbol->order/m1/?num=10000",
          [],
          function ($code, $data) use ($rest, $symbol, $symbols, $loop) {
            $candleData = json_decode($data);
            if(!count($candleData->candles)){
              return;
            }
            $this->line($code . ": Data got! ".$symbol->symbol.' count: '.count($candleData->candles));
            $total = 0;
            foreach($candleData->candles as $candle){
              $digits = strlen(substr(strrchr($candle[1], "."), 1));
              $open = number_format(($candle[1] + $candle[5])/2, $digits, '.', '');
              $close = number_format(($candle[2] + $candle[6])/2, $digits, '.', '');
              $high = number_format(($candle[3] + $candle[7])/2, $digits, '.', '');
              $low = number_format(($candle[4] + $candle[8])/2, $digits, '.', '');
              $time = Carbon::createFromTimestamp($candle[0]);
              $instrument = Symbol::where('order', $candleData->instrument_id)->first()->symbol;
              $instrument = preg_replace('/[^A-z\d]/', '', $instrument);
              if(!DB::connection('pgsql2')->table($instrument.'1M')->where('created_at', $time)->count()) {
                DB::connection('pgsql2')->table($instrument . '1M')->insert([
                  'open' => $open,
                  'close' => $close,
                  'high' => $high,
                  'low' => $low,
                  'created_at' => $time,
                ]);
              }
              if($total++ % 100 == 0){
                echo '.';
              }
            }
            $this->line('');
            //$this->loadHistoryForSymbol($rest, $symbols);
            //$rest->disconnect();
            //$rest->connect();
            $this->loadHistoryForSymbol($rest, Symbol::all(), $loop);
            $this->symbol_order_id++;
            $this->line("Added $instrument");
          }
        );
      //}
    }
}
