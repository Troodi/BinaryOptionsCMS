<?php

use App\Models\DepositSystem;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDepositSystemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deposit_systems', function (Blueprint $table) {
            $table->id();
            $table->string('text');
            $table->boolean('hidden')->default(false);
            $table->integer('order')->nullable();
            $table->timestamps();
        });

        $systems = ['Cards & Qiwi' => 0, 'Cards & YooMoney' => 0, 'Cryptocurrencies (Bitcoin, Ethereum, Litecoin)' => 0, 'Webmoney' => 0, 'Betatransfer' => 1, 'Payeer' => 1, 'Free-Kassa' => 1, 'InterKassa' => 1, 'RosKassa' => 1, 'Robokassa' => 1];

        foreach ($systems as $system => $hidden) {
          $model = new DepositSystem();
          $model->text = $system;
          $model->hidden = $hidden;
          $model->save();
        }
        DepositSystem::where('id', 1)->update(['order' => 2]);
        DepositSystem::where('id', 2)->update(['order' => 1]);
        DepositSystem::where('id', 3)->update(['order' => 3]);
        DepositSystem::where('id', 4)->update(['order' => 4]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deposit_systems');
    }
}
