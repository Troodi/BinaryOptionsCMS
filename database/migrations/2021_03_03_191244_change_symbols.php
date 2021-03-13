<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeSymbols extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      //TODO удалить
      try {
        Schema::table('symbols', function (Blueprint $table) {
          $table->integer('min_expiration_time')->default(60); // Время экспирации для символа
          $table->integer('min_percent_tech')->default(20); // Минимальный процент для технического анализа
          $table->integer('min_percent_news')->default(20); // Минимальный процент в случае выхода новостей
          $table->integer('min_percent_user')->default(20); // Минимальный процент если у пользователя слишком удачная торговля
          $table->softDeletes();
        });
      } catch (\Exception $ex) {}
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
