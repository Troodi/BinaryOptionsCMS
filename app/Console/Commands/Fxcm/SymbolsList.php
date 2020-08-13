<?php

namespace App\Console\Commands\Fxcm;

use App\Models\Symbols\Options\Symbol;
use App\Models\Symbols\Options\Timeframe;
use FxcmRest\FxcmRest;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use React\EventLoop\Factory;
use Illuminate\Database\Schema\Blueprint;

class SymbolsList extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fxcm:add';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fill symbols DB and create symbols tables';

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
        $rest->request('GET', '/trading/get_instruments',
          [],
          function ($code, $data) use ($rest) {
            foreach(json_decode($data)->data->instrument as $symbol){
              $model = new Symbol;
              $model->symbol = $symbol->symbol;
              if(Str::contains($symbol->symbol, '/')){
                $exploded = explode('/', $symbol->symbol);
                $model->first = $exploded[0];
                $model->second = $exploded[1];
                $model->type = 1;
              } else {
                $model->first = $symbol->symbol;
                $model->type = 2;
              }
              $model->order = $symbol->order;
              if(preg_match('/[A-z]{3}\/[A-z]{3}/', $symbol->symbol)){
                //TODO Понять как лучше
                $model->status = 1;
              }
              //TODO Перенести блок в отдельную команду
              foreach(Timeframe::all() as $timeframe) {
                $convertedSymbol = preg_replace('/[^A-z\d]/', '', $symbol->symbol);
                $finalSymbol = $convertedSymbol.$timeframe->timeframe;
                if($timeframe->id == 1){ // Если тиковый
                  Schema::connection('pgsql2')->create($finalSymbol, function (Blueprint $table) {
                    $table->decimal('price', 10, 5);
                    $table->integer('bar')->nullable()->index();
                    $table->dateTime('created_at', 6)->index();
                  });
                } else {
                  Schema::connection('pgsql2')->create($finalSymbol, function (Blueprint $table) {
                    $table->id();
                    $table->decimal('high', 10, 5);
                    $table->decimal('low', 10, 5);
                    $table->decimal('open', 10, 5);
                    $table->decimal('close', 10, 5);
                    $table->timestamps();
                  });
                }
              }
              $model->save();
            }
            $rest->disconnect();
          }
        );
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
