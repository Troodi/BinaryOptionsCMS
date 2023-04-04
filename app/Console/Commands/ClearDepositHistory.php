<?php

namespace App\Console\Commands;

use App\Services\Console\ClearDepositHistoryService;
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
    public function handle(ClearDepositHistoryService $clearDepositHistoryService)
    {
        $clearDepositHistoryService->clear();
    }
}
