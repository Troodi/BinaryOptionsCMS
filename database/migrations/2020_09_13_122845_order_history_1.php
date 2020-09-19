<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class OrderHistory1 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('order_history_1', function (Blueprint $table) {
        $table->id();
        $table->integer('symbol_id')->nullable();
        $table->integer('user_id')->nullable();
        $table->timestamp('open_at', 6)->nullable();
        $table->timestamp('close_at', 6)->nullable();
        $table->decimal('amount', 10, 2)->nullable();
        $table->decimal('open_price', 15, 5)->nullable();
        $table->decimal('close_price', 15, 5)->nullable();
        $table->decimal('profit', 10, 5)->nullable();
        $table->integer('percent')->nullable();
        $table->integer('type')->nullable();
        $table->timestamp('created_at', 6);
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
