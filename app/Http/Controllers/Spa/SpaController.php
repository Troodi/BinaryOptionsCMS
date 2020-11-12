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
    $is_admin = false;
    return view('pages.main', compact('is_admin'));
  }

  public function admin()
  {
    $is_admin = true;
    return view('pages.main', compact('is_admin'));
  }
}