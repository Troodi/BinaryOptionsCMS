<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LatestOrder extends Model
{
  protected $dateFormat = 'Y-m-d H:i:s.u';
  const UPDATED_AT = null;
}
