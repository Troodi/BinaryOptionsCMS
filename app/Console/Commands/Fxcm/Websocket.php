<?php

namespace App\Console\Commands\Fxcm;

use App\Events\Trading\NewQuoteEvent;
use App\Models\Symbols\Options\Symbol;
use FxcmRest\FxcmRest;
use Illuminate\Console\Command;
use \React\EventLoop\Factory;

class Websocket extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fxcm:websocket';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get realtime forex market data';

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

      $rest = new FxcmRest($loop, $config);
      $rest->on('connected', function() use ($rest, $loop) {
        $loop->addPeriodicTimer(1, function () use ($rest) {
          $rest->socketIO->wssend("5");
          $rest->socketIO->startPinging();
        });
        $pairs = [];
        foreach (Symbol::all()->take(20) as $symbol){
          $pairs[] = $symbol->symbol;
          echo $symbol->symbol.PHP_EOL;
        }
        //$pairs = ['EUR/USD'];
        foreach($pairs as $pair) {
          $rest->request('POST', '/subscribe',
            ['pairs' => $pair],
            function ($code, $data) use ($rest, $pair) {
              if ($code === 200) {
                $rest->on($pair, function ($data) use ($rest) {
                  $decoded = json_decode($data);
                  event(new NewQuoteEvent($decoded->Symbol, number_format(($decoded->Rates[0]+$decoded->Rates[1])/2, 5, '.', ''), $decoded->Updated));
                  echo $decoded->Updated . " - " . $decoded->Symbol . " " . number_format(($decoded->Rates[0]+$decoded->Rates[1])/2, 5, '.', '') . PHP_EOL;
                });
              }
            }
          );
        }
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
}
