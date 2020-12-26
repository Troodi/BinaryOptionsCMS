<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDepositsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deposits', function (Blueprint $table) {
          $table->id();
          $table->integer('user_id')->index();;
          $table->decimal('amount', 10, 2);
          $table->decimal('amount_in_rub', 10, 2)->nullable();
          $table->integer('promocode_id')->nullable();
          $table->integer('system_id');
          $table->string('billId')->nullable();
          $table->integer('status');
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
        Schema::dropIfExists('deposits');
    }
}
