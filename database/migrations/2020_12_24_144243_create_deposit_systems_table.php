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
            $table->timestamps();
        });

        $systems = ['Cards (Qiwi)' => 0, 'YooMoney' => 1, 'Betatransfer' => 1, 'Payeer' => 1, 'Free-Kassa' => 0, 'InterKassa' => 1, 'RosKassa' => 1, 'Robokassa' => 1];

        foreach ($systems as $system => $hidden) {
          $model = new DepositSystem();
          $model->text = $system;
          $model->hidden = $hidden;
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
        Schema::dropIfExists('deposit_systems');
    }
}
