<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Bavix\LaravelClickHouse\Database\Eloquent\Model;

class Quote extends Model
{
    use HasFactory;

    protected $fillable = [
        'symbol_id',
        'high',
        'min',
        'open',
        'close',
        'timeframe',
    ];

}
