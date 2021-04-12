<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContestUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contest_users', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->index();
            $table->integer('contest_id')->index();
            $table->decimal('initial_balance', 15, 2);
            $table->decimal('balance', 15, 2);
            $table->decimal('paid', 15, 2);
            $table->decimal('profit_percent', 10, 2)->default(0);
            $table->decimal('turnover', 10, 2)->default(0);
            $table->integer('paid_times')->default(0);
            $table->integer('order_count')->default(0);
            $table->decimal('winner_reward', 10, 2)->default(0);
            $table->integer('winner_place')->default(0);
            $table->integer('banned')->default(0);
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
        Schema::dropIfExists('contest_users');
    }
}
