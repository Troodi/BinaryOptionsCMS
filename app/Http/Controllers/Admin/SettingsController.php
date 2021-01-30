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

  public function save(Request $request){
    DotenvEditor::autoBackup(false);
    $result = null;
    parse_str($request->data, $result);
    foreach ($result as $key => $value) {
      DotenvEditor::setKey($key, $value, '', false);
    }
    DotenvEditor::save();
    return response()->json(['success' => true, 'message' => 'Настройки успешно сохранены!']);
  }
}
