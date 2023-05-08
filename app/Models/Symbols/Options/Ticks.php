<?php

namespace App\Models\Symbols\Options;

use Bavix\LaravelClickHouse\Database\Eloquent\Model;

class Ticks extends Model
{
  protected $table = 'tick_quotes';
  protected $dateFormat = 'Y-m-d H:i:s.u';
  const UPDATED_AT = null;
}
