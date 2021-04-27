<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contest extends Model
{
  use HasFactory;

  public function user()
  {
    return $this->hasOne(ContestUser::class);
  }

  public function getTitleAttribute($value)
  {
    return unserialize($value);
  }

  public function getDescriptionAttribute($value)
  {
    return unserialize($value);
  }

  public function getPlacesAttribute($value)
  {
    return unserialize($value);
  }
}
