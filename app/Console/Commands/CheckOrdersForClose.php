<?php

namespace App\Console\Commands;

use App\Services\Console\CheckOrdersForCloseService;
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
    // Пытался переделать, но не понял, как правильно изменить CheckOrdersForCloseService. Возможно сделал, но не понял, потому что не было реакции
    // Если сделал правильно, заменить код на $checkOrdersForCloseService->allChecks(); и желательно добавить dump
    public function handle(CheckOrdersForCloseService $checkOrdersForCloseService)
    {
       $checkOrdersForCloseService->allChecks();
    }
}
