<?php

namespace App\Console\Commands;

use App\Models\Symbols\Options\EurUsd\EurUsdTicks;
use Carbon\Carbon;
use Illuminate\Console\Command;

class GenerateEurUsd extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:eurusd';

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
        $date = Carbon::now()->subDays(20);
        $tmp = $date->second;
        $flag = true;
        $total = 1;
        for($i=0; $i<30000000; $i++){
          $model = new EurUsdTicks();
          $model->price = mt_rand(100000, 999999)/100000;
          $model->created_at = $date->add(200, 'milliseconds')->format('Y-m-d H:i:s.u O');
          if($flag){
            $flag = false;
            $model->bar = $total++;
          }
          if($date->second > $tmp){
            $model->bar = $total++;
          } elseif ($date->second == 0 and $tmp == 59){
            $model->bar = $total++;
          }

          $model->save();
          if($i % 1000 == 0){
            echo $i.PHP_EOL;
          }
          $tmp = $date->second;
        }
        return 0;
    }
}
