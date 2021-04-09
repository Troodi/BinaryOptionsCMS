<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContestHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contest_histories', function (Blueprint $table) {
            $table->id();
            $table->integer('symbol_id')->index()->nullable();
            $table->integer('user_id')->index()->nullable();
            $table->integer('contest_id')->index()->nullable();
            $table->timestamp('open_at', 6)->nullable();
            $table->timestamp('close_at', 6)->nullable();
            $table->decimal('amount', 10, 2)->nullable();
            $table->decimal('open_price', 15, 5)->nullable();
            $table->decimal('close_price', 15, 5)->nullable();
            $table->decimal('profit', 10, 5)->nullable();
            $table->integer('percent')->nullable();
            $table->integer('type')->nullable();
            $table->timestamp('created_at', 6)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contest_histories');
    }
}
