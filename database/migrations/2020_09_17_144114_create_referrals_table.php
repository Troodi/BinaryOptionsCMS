<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReferralsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('referrals', function (Blueprint $table) {
          $table->id();
          $table->integer('user_id')->index();
          $table->integer('total_referrals')->default(0);
          $table->decimal('reward', 20, 10)->default(0);
          $table->integer('active')->default(0);
          $table->integer('deposit_count')->default(0);
          $table->integer('tracked')->default(0);
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
        Schema::dropIfExists('referrals');
    }
}
