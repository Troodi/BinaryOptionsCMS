<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deposit extends Model
{
    protected $fillable = ['user_id', 'amount', 'promocode_id', 'system_id', 'status', 'created_at', 'updated_at'];
}
