<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Symbols\Options\Symbol;
use Illuminate\Http\Request;

class SymbolController extends Controller
{
  public function allSymbols(Request $request){
    return Symbol::orderBy('id', 'asc')->get();
  }
}
