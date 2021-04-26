<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CloseContestOptionEvent implements ShouldBroadcastNow
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $id;
  public $success;
  public $model;
  public $user_id;
  public $contest_id;

  public function __construct($model, $id, $success, $user_id, $contest_id)
  {
    $this->id = $id;
    $this->success = $success;
    $this->model = $model;
    $this->user_id = $user_id;
    $this->contest_id = $contest_id;
  }

  public function broadcastOn()
  {
    return new PrivateChannel('closed_contest.'.$this->user_id.'.'.$this->contest_id);
  }
}
