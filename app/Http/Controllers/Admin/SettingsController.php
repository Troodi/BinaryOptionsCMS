<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Jackiedo\DotenvEditor\Facades\DotenvEditor;

class SettingsController extends Controller
{
  public function getAllSettings(Request $request){
    $keys = DotenvEditor::getKeys();
    return $keys;
  }
}
