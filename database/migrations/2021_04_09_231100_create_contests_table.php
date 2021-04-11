<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contests', function (Blueprint $table) {
            $table->id();
            $table->text('title');
            $table->text('description');
            $table->text('places');
            $table->decimal('initial_balance', 15, 2);
            $table->decimal('initial_cost', 15, 2);
            $table->decimal('additional_cost', 15, 2);
            $table->decimal('max_bought_balance', 15, 2);
            $table->integer('registered_users')->default(0);
            $table->decimal('earned', 15, 2)->default(0);
            $table->integer('hidden')->default(0);
            $table->integer('show_registered')->default(0);
            $table->integer('type');
            $table->timestamp('started_at');
            $table->timestamp('ended_at');
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
        Schema::dropIfExists('contests');
    }
}
