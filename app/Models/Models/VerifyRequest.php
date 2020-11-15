<?php

namespace App\Models\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VerifyRequest extends Model
{
    use HasFactory;

  public function user()
  {
    return $this->hasOne('App\User', 'id', 'user_id');
  }
}
