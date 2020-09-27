<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailAttempts extends Model
{
  protected $fillable = ['email', 'user_id', 'attempts'];
}
