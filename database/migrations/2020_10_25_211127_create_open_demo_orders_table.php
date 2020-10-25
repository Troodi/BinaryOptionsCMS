<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOpenDemoOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('open_demo_orders', function (Blueprint $table) {
          $table->id();
          $table->integer('symbol_id')->nullable();
          $table->integer('user_id')->nullable();
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
        Schema::dropIfExists('open_demo_orders');
    }
}
