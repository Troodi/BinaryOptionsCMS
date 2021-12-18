<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MarketStatus extends Model
{
  protected $connection = 'mysql';
  protected $fillable = ['symbol_id', 'market_status'];
}
