<?php

namespace App\Console\Commands;

use App\Services\Console\UpdateTournamentInfoService;
use Illuminate\Console\Command;

class UpdateTournamentInfo extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contest:check';

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
    public function handle(UpdateTournamentInfoService $updateTournamentInfoService)
    {
        $updateTournamentInfoService->updateInfo();
    }
}
