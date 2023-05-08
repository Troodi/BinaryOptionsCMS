<?php

namespace App\Models\Symbols\Options;

use Bavix\LaravelClickHouse\Database\Eloquent\Model;

class Ticks extends Model
{
    protected $primary_key = null;
    public $incrementing = false;
  protected $table = 'tick_quotes';
  protected $dateFormat = 'Y-m-d H:i:s.u';

  const UPDATED_AT = null;
}
