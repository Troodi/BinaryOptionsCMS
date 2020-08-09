<?php

namespace App\Console\Commands\Fxcm;

use App\Models\Symbols\Options\Symbol;
use FxcmRest\FxcmRest;
use Illuminate\Console\Command;
use React\EventLoop\Factory;

class LoadHistory extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
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

      $rest = new FxcmRest($loop, $config);
      $rest->on('connected', function() use ($rest) {
        $symbols = Symbol::where('order', 1)->get();
        foreach ($symbols as $symbol) {
          $rest->request('GET', '/candles/1/h1/?num=10000 ',
            [],
            function ($code, $data) use ($rest) {

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
