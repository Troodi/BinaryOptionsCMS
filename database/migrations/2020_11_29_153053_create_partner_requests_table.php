<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePartnerRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('partner_requests', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->index();
            $table->string('telegram')->nullable();
            $table->integer('traffic')->nullable();
            $table->text('comment')->nullable()->comment('Описание от пользователя');
            $table->text('message')->nullable()->comment('Причина отклонения');
            $table->integer('status')->default(0)->comment('Отклонено или подтверждено');
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
        Schema::dropIfExists('partner_requests');
    }
}
