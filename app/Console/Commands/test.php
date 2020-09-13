<?php

namespace App\Console\Commands;

use App\Models\LatestOrder;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class test extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test';

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
      $last_id = LatestOrder::where('user_id', 1)->take(10)->latest()->get()->last()->id;
      var_dump($last_id);
        return 0;
    }
}
