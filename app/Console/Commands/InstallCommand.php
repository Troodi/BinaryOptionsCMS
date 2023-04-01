<?php

namespace App\Console\Commands;

use App\Helpers\Helper;
use App\Models\DepositSystem;
use App\Models\Promocode;
use App\Models\Symbols\Options\Symbol;
use App\Services\InstallCommandService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class InstallCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Loading and fill database data';

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
    public function handle(InstallCommandService $installCommandService)
    {
        $installCommandService->migrationsSeedersStarterAll();
    }
}
