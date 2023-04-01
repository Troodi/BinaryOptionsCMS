<?php

namespace App\Console\Commands;

use App\Events\ChangeSymbol;
use App\Models\Symbols\Options\Symbol;
use App\Models\SymbolShortStatistic;
use Carbon\Carbon;
use Illuminate\Console\Command;
use App\Services\SetSymbolsPercentService;

class SetSymbolsPercent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'set:percent';

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
    public function handle(SetSymbolsPercentService $setSymbolsPercentService)
    {
        $setSymbolsPercentService->calculatePercent();
    }
}
