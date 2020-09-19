<?php

namespace App\Console\Commands;

use App\Models\Symbols\Options\Symbol;
use App\Models\Symbols\Options\Ticks;
use Carbon\Carbon;
use Illuminate\Console\Command;

class ClearTicksTable extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'clear:ticks';

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
      foreach(Symbol::all() as $symbol){
        $count = Ticks::where('symbol_id', $symbol->id)
          ->where('created_at', '>', Carbon::now()->subMinutes(2))
          ->count();
        if($count){
          Ticks::where('symbol_id', $symbol->id)
            ->where('created_at', '<', Carbon::now()->subMinutes(2))
            ->delete();
        }
      }
      return 0;
    }
}
