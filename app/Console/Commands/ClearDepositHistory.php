<?php

namespace App\Console\Commands;

use App\Models\Deposit;
use Carbon\Carbon;
use Illuminate\Console\Command;

class ClearDepositHistory extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'clear:deposit';

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
      Deposit::where('status', 0)->where('created_at', '<', Carbon::now()->subHours(1))->delete();
      return 0;
    }
}
