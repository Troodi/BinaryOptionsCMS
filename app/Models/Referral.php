<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Referral extends Model
{
    public function user(){
      return $this->hasOne('App\User', 'id', 'user_id');
    }

  public function request(){
    return $this->belongsTo('App\Models\PartnerRequest', 'user_id', 'user_id');
  }
}
