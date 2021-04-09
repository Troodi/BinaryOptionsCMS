<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContestOpenOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contest_open_orders', function (Blueprint $table) {
            $table->id();
            $table->integer('symbol_id')->index()->nullable();
            $table->integer('user_id')->index()->nullable();
            $table->integer('contest_id')->index()->nullable();
            $table->timestamp('close_at', 6)->nullable();
            $table->decimal('amount', 15, 2)->nullable();
            $table->decimal('open_price', 15, 5)->nullable();
            $table->integer('percent')->nullable();
            $table->integer('hedging')->nullable();
            $table->integer('type')->nullable();
            $table->timestamps(6);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contest_open_orders');
    }
}
