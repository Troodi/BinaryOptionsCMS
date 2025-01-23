<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Withdrawal extends Model
{
  public function user()
  {
    return $this->hasOne('App\User', 'id', 'user_id');
  }

  public function withdrawSystem()
  {
    return $this->hasOne('App\Models\WithdrawSystem', 'text', 'system_id');
  }
}
