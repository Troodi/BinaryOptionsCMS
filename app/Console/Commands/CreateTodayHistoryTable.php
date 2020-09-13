<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTodayHistoryTable extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'history:today';

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
        Schema::create('order_history_'.Carbon::now()->format('Y_m_d'), function (Blueprint $table) {
          $table->id();
          $table->integer('symbol_id')->nullable();
          $table->integer('user_id')->nullable();
          $table->timestamp('close_at', 6)->nullable();
          $table->decimal('amount', 10, 2)->nullable();
          $table->decimal('open_price', 10, 5)->nullable();
          $table->decimal('close_price', 10, 5)->nullable();
          $table->decimal('profit', 10, 5)->nullable();
          $table->integer('percent')->nullable();
          $table->integer('type')->nullable();
          $table->timestamp('created_at', 6);
        });
        Schema::create('order_demo_history_'.Carbon::now()->format('Y_m_d'), function (Blueprint $table) {
          $table->id();
          $table->integer('symbol_id')->nullable();
          $table->integer('user_id')->nullable();
          $table->timestamp('created_at', 6);
          $table->decimal('amount', 10, 2)->nullable();
          $table->decimal('open_price', 10, 5)->nullable();
          $table->decimal('close_price', 10, 5)->nullable();
          $table->decimal('profit', 10, 5)->nullable();
          $table->integer('percent')->nullable();
          $table->integer('type')->nullable();
        });
        return 0;
    }
}
