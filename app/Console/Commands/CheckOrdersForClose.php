<?php

namespace App\Console\Commands;

use App\Events\CloseOptionEvent;
use App\Models\OpenOrders;
use App\Models\Symbols\Options\Ticks;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CheckOrdersForClose extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:orders';

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
        while(true){
          //TODO добавить асинхронность
          $start = microtime(true);
          $opened = OpenOrders::where('close_at', '<', Carbon::now()->format('Y-m-d H:i:s.u'))->get();
          $ticks = Ticks::all();
          foreach($opened as $open){
            $closed_price = $ticks->where('symbol_id', $open->symbol_id)->where('created_at', '<', Carbon::parse($open->closed_at)->format('Y-m-d H:i:s.u'))->last()->price;
            if($closed_price == $open->open_price){
              broadcast(new CloseOptionEvent($open->id, true));
            }
            elseif($open->type == 1){ // Покупка
              if($closed_price > $open->open_price) {
                broadcast(new CloseOptionEvent($open->id, true));
              } else {
                broadcast(new CloseOptionEvent($open->id, false));
              }
            } else { // Продажа
              if($closed_price < $open->open_price) {
                broadcast(new CloseOptionEvent($open->id, true));
              } else {
                broadcast(new CloseOptionEvent($open->id, false));
              }
            }
            $open->delete();
          }
          $end = microtime(true) - $start;
          var_dump(number_format($end/1000000, 10));
          if($end < 1000000){
            usleep(1000000 - $end);
          }
        }
        return 0;
    }
}
