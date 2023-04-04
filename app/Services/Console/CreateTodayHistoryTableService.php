<?php

namespace App\Services\Console;


use Carbon\Carbon;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTodayHistoryTableService {

    public function createHistoryTable()
    {
        Schema::create('order_history_' . Carbon::now()->format('Y_m_d'), function (Blueprint $table) {
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
    }
    public function createDemoHistoryTable()
    {
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
    public function createAllHistoryTables()
    {
        $this->createHistoryTable();
        $this->createDemoHistoryTable();
        dump("Today history tables has been created");
    }
}