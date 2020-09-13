<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LatestOrder extends Model
{
  protected $dates = [
    'close_at',
    'open_at',
  ];
  protected $dateFormat = 'Y-m-d H:i:s.u';
  const UPDATED_AT = null;
}
