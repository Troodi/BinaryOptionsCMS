<?php

namespace App\Console\Commands;

use App\Events\CloseOptionEvent;
use App\Models\OpenOrders;
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
          $start = microtime(true);
          $opened = OpenOrders::where('close_at', '<', Carbon::now()->format('Y-m-d H:i:s.u'))->get();
          foreach($opened as $open){
            broadcast(new CloseOptionEvent($open->id, true));
            $open->delete();
          }
          $end = microtime(true) - $start;
          if($end < 1000000){
            usleep(1000000 - $end);
          }
        }
        return 0;
    }
}
