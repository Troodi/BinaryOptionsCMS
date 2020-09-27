<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PhoneAttempts extends Model
{
    protected $fillable = ['phone', 'user_id', 'attempts'];
}
