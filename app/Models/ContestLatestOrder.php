<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContestLatestOrder extends Model
{
    use HasFactory;
    protected $dates = [
      'close_at',
      'open_at',
    ];
    protected $dateFormat = 'Y-m-d H:i:s.u';
    const UPDATED_AT = null;
}
