<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSymbolShortStatisticsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('symbol_short_statistics', function (Blueprint $table) {
            $table->id();
            $table->integer('symbol_id')->nullable()->index();
            $table->decimal('amount', 15, 5)->default(0);
            $table->decimal('profit', 15, 5)->default(0);
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
        Schema::dropIfExists('symbol_short_statistics');
    }
}
