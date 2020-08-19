<?php

namespace App\Events\Trading;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;

class NewQuoteEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public $symbol = '';
    public $price = 0;
    public $from = '';
    public $to = '';
    public $time = 0;

    public function __construct($symbol, $price, $time)
    {
        $this->symbol = $symbol;
        $this->price = $price;
        if(Str::contains($symbol, '/')){
          $explode = explode('/', $symbol);
          $this->from = $explode[0];
          $this->to = $explode[1];
        } else {
          $this->from = $symbol;
          $this->to = '';
        }
        $this->time = $time;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */

    public function broadcastOn () {
      return new Channel('quotes');
    }
}
