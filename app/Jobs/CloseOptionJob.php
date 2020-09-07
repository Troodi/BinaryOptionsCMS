<?php

namespace App\Jobs;

use App\Events\CloseOptionEvent;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class CloseOptionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    private $openPrice;
    private $symbol;
    private $type;

    public function __construct($price, $symbol, $type)
    {
      $this->openPrice = $price;
      $this->symbol = $symbol;
      $this->type = $type;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
      Log::info(Carbon::now()->format('Y-m-d\TH:i:s.u'));
      $closePrice = Cache::get('symbol'.$this->symbol);
      if($closePrice > $this->openPrice and $this->type == 1){
        $success = true;
      } elseif($closePrice < $this->openPrice and $this->type == 0){
        $success = true;
      } elseif($closePrice == $this->openPrice){
        $success = true;
      } else {
        $success = false;
      }
      event(new CloseOptionEvent(1, $success));
    }
}
