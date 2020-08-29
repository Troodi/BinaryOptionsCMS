<?php

namespace App\Console\Commands;

use App\Models\Symbols\Options\Symbol;
use Illuminate\Console\Command;

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
        $model = new Symbol();
        $model->symbol = 'EUR/USD';
        $model->type = 1;
        $model->broker = 'FX';
        $model->percent = 75;
        $model->status = 1;
        $model->save();

        $model = new Symbol();
        $model->symbol = 'BTC/USDT';
        $model->type = 1;
        $model->broker = 'BINANCE';
        $model->percent = 75;
        $model->status = 1;
        $model->save();

        return 0;
    }
}
