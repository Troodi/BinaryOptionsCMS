<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEurUsdTicksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('eur_usd_ticks', function (Blueprint $table) {
            $table->id();
            $table->decimal('price', 10, 5);
            $table->integer('bar')->nullable()->index();
            $table->dateTime('created_at', 6)->unique();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('eur_usd_ticks');
    }
}
