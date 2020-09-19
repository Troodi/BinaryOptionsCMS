<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePromocodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('promocodes', function (Blueprint $table) {
            $table->id();
            $table->string('description')->nullable();
            $table->string('code')->nullable();
            $table->string('image')->nullable();
            $table->integer('public_code')->nullable();
            $table->integer('used')->nullable();
            $table->integer('for_new')->nullable(); // Только для новых
            $table->integer('attempts')->nullable();
            $table->integer('type')->nullable();
            $table->integer('turnover')->nullable();
            $table->timestamp('active_from');
            $table->timestamp('active_to');
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
        Schema::dropIfExists('promocodes');
    }
}
