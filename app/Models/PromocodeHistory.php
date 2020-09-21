<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PromocodeHistory extends Model
{
  public function promocode()
  {
    return $this->hasOne('App\Models\Promocode', 'id', 'promocode_id');
  }
}
