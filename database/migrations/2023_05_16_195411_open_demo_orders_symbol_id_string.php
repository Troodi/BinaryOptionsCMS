<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class OpenDemoOrdersSymbolIdString extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('open_demo_orders', function (Blueprint $table) {
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
        Schema::table('open_demo_orders', function (Blueprint $table) {
            $table->integer('symbol_id')->nullable()->change();
            $table->id();
        });
    }
}
