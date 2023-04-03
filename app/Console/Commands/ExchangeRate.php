<?php

namespace App\Console\Commands;

use App\Models\ExchangeRates;
use App\Services\ExchangeRateService;
use Illuminate\Console\Command;
use Ixudra\Curl\Facades\Curl;

class ExchangeRate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'exchange:rate';

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
    public function handle(ExchangeRateService $exchangeRateService)
    {
        $exchangeRateService->exchange();
    }
}
