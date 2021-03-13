<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSymbolsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('symbols', function (Blueprint $table) {
            $table->id();
            $table->string('symbol');
            $table->integer('type')->default(1);
            $table->string('broker')->default('FX');
            $table->integer('percent')->default(0);
            $table->integer('min_percent')->default(25);
            $table->integer('fixed_percent')->default(65);
            $table->integer('max_percent')->default(85);
            $table->integer('work_from')->default(0);
            $table->integer('work_to')->default(0);
            $table->integer('min_expiration_time')->default(60); // Время экспирации для символа
            $table->integer('min_percent_tech')->default(20); // Минимальный процент для технического анализа
            $table->integer('min_percent_news')->default(20); // Минимальный процент в случае выхода новостей
            $table->integer('min_percent_user')->default(20); // Минимальный процент если у пользователя слишком удачная торговля
            $table->integer('status')->nullable();
            $table->softDeletes();
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
        Schema::dropIfExists('symbols');
    }
}
