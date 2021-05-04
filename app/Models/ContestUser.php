<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContestUser extends Model
{
    use HasFactory;
    protected $fillable = ['winner_place', 'winner_reward', 'registered_users', 'profit_percent'];
    public function user()
    {
      return $this->hasOne(User::class, 'id', 'user_id');
    }
}
