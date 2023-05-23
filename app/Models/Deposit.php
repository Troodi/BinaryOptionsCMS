<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deposit extends Model
{
  protected $fillable = ['user_id', 'amount', 'promocode_id', 'system_id', 'status', 'created_at', 'updated_at'];

  public function user()
  {
    return $this->hasOne('App\User', 'id', 'user_id');
  }
  public function depositSystem()
  {
    return $this->hasOne('App\Models\DepositSystem', 'text', 'system_id');
  }
    protected $primary_key = null;
    public $incrementing = false;
}
