<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MarketStatusesSymbolIdString extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mysql')->table('market_statuses', function (Blueprint $table) {
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
        Schema::connection('mysql')->table('market_statuses', function (Blueprint $table) {
            $table->integer('symbol_id')->nullable()->change();
            $table->id();
        });
    }
}
