<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContestOpenOrder extends Model
{
    use HasFactory;
    protected $dateFormat = 'Y-m-d H:i:s.u';
    protected $primary_key = null;
    public $incrementing = false;
}
