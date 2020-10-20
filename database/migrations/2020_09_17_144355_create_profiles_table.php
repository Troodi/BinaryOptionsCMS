<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('profiles', function (Blueprint $table) {
        $table->id();
        $table->integer('user_id')->index();
        $table->string('name')->nullable();
        $table->string('last_name')->nullable();
        $table->string('patronymic')->nullable();
        $table->string('telegram')->nullable();
        $table->string('phone')->nullable();
        $table->timestamp('phone_verify_at')->nullable();
        $table->integer('gender')->nullable();
        $table->string('language')->nullable();
        $table->dateTime('birth')->nullable();
        $table->string('address')->nullable();
        $table->string('document_number')->nullable();
        $table->string('document_first_page')->nullable();
        $table->timestamp('document_first_page_verify_at')->nullable();
        $table->string('document_second_page')->nullable();
        $table->timestamp('document_second_page_verify_at')->nullable();
        $table->string('document_additional')->nullable();
        $table->timestamp('document_additional_verify_at')->nullable();
        $table->timestamp('user_verify_at')->nullable();
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
        Schema::dropIfExists('profiles');
    }
}
