<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DepositSystemsNoId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('deposit_systems', function (Blueprint $table) {
            $table->dropColumn('id');
            $table->string('text')->index()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('deposit_systems', function (Blueprint $table) {
            $table->id();
            $table->string('text')->change();
        });
    }
}
