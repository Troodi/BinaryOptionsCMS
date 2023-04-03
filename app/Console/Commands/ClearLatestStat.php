<?php

namespace App\Console\Commands;

use App\Models\Symbols\Options\Symbol;
use App\Models\Symbols\Options\Ticks;
use App\Models\SymbolShortStatistic;
use App\Services\ClearLatestStatService;
use Carbon\Carbon;
use Illuminate\Console\Command;

class ClearLatestStat extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'clear:stat';

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
    public function handle(ClearLatestStatService $clearLatestStatService)
    {
        $clearLatestStatService->clear();
    }
}
