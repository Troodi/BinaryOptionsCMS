<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->nullable();
            $table->string('email')->unique();
            $table->string('token')->nullable();
            $table->integer('banned')->nullable();
            $table->integer('partner_status')->nullable();
            $table->integer('referer_id')->nullable();
            $table->decimal('balance', 15, 4)->default(0);
            $table->decimal('demo_balance', 15, 4)->default(1000);
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamp('banned_at')->nullable();
            $table->string('password')->nullable();
            $table->decimal('bonus', 15, 4)->default(0);
            $table->decimal('all_turnover', 15, 4)->default(0);
            $table->decimal('left_turnover', 15, 4)->default(0);
            $table->timestamp('deleted_at')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
