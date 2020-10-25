<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LatestDemoOrder extends Model
{
  protected $dates = [
    'close_at',
    'open_at',
  ];

  protected $table = 'order_demo_history_1';

  protected $dateFormat = 'Y-m-d H:i:s.u';
  const UPDATED_AT = null;
}
