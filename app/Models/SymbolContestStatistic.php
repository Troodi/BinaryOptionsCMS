<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SymbolContestStatistic extends Model
{
    use HasFactory;
    protected $fillable = ['symbol_id', 'contest_id'];
}
