<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContestUser extends Model
{
    use HasFactory;

    public function user()
    {
      return $this->hasOne(User::class, 'id', 'user_id');
    }
}
