<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class OpenOrdersSymbolIdString extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('open_orders', function (Blueprint $table) {
            $table->dropColumn('id');
            $table->string('symbol_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //Schema::dropIfExists('open_orders'); // Здесь не надо удалять таблицу, здесь надо вернуть таблицы к тому что бчло до чиггации
        Schema::table('open_orders', function (Blueprint $table) {
            $table->integer('symbol_id')->nullable()->change();
            $table->id();
        });
    }
}
