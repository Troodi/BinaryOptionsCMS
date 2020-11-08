<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSymbolStatisticsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('symbol_statistics', function (Blueprint $table) {
            $table->id();
            $table->integer('symbol_id')->nullable()->index();
            $table->integer('daily_orders_count')->default(0);
            $table->integer('daily_orders_amount')->default(0);
            $table->integer('daily_profit')->default(0);
            $table->integer('daily_loss')->default(0);
            $table->integer('daily_profit_count')->default(0);
            $table->integer('daily_loss_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('symbol_statistics');
    }
}
