<?php

namespace App\Models\Symbols\Options;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Symbol extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'symbol';
    public $incrementing = false;
}
