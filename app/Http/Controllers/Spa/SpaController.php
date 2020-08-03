<?php

namespace App\Http\Controllers\Spa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SpaController extends Controller
{
  /**
   * Returning the prepared page for the SPA application
   *
   * @return view
   */
  public function index()
  {
    return view('pages.sk-layout-2-columns');
  }
}