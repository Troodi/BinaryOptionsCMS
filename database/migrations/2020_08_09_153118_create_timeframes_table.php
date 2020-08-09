<?php

use App\Models\Symbols\Options\Timeframe;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTimeframesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('timeframes', function (Blueprint $table) {
          $table->id();
          $table->string('timeframe');
          $table->string('fxcm')->nullable();
          $table->timestamps();
      });

      $timeframes = [
        'Ticks' => null,
        '1S' => null,
        '3S' => null,
        '5S' => null,
        '10S' => null,
        '15S' => null,
        '30S' => null,
        '1M' => 'm1',
        '3M' => null,
        '5M' => 'm5',
        '10M' => null,
        '15M' => 'm15',
        '30M' => 'm30'
      ];

      foreach($timeframes as $timeframe => $fxcm) {
        $model = new Timeframe();
        $model->timeframe = $timeframe;
        if($fxcm){
          $model->fxcm = $fxcm;
        }
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
        Schema::dropIfExists('timeframes');
    }
}
