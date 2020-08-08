<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEurUsd10STable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('eur_usd10_s', function (Blueprint $table) {
            $table->id();
            $table->decimal('high', 10, 5);
            $table->decimal('low', 10, 5);
            $table->decimal('open', 10, 5);
            $table->decimal('close', 10, 5);
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
        Schema::dropIfExists('eur_usd10_s');
    }
}
