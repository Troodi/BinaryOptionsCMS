<?php

namespace App\Models\Symbols\Options;

use Illuminate\Database\Eloquent\Model;

class Ticks extends Model
{
  protected $connection = 'mysql';
  protected $dateFormat = 'Y-m-d H:i:s.u';
  const UPDATED_AT = null;
}
