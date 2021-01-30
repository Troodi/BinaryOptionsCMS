<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\WithdrawSystem;
class CreateWithdrawSystemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('withdraw_systems', function (Blueprint $table) {
            $table->id();
            $table->string('text');
            $table->string('q_id')->nullable();
            $table->string('y_id')->nullable();
            $table->string('placeholder')->nullable();
            $table->string('image')->nullable();
            $table->integer('order')->nullable();
            $table->boolean('hidden')->default(0);
            $table->timestamps();
        });
        $systems = ['Visa', 'MasterCard', 'Мир', 'Qiwi', 'WebMoney', 'YooMoney', 'WalletOne', 'Payeer'];
        foreach($systems as $system){
          $model = new WithdrawSystem();
          $model->text = $system;
          $model->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('withdraw_systems');
    }
}
