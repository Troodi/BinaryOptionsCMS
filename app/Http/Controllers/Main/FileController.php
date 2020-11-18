<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Models\File;
use Illuminate\Http\Request;

class FileController extends Controller
{
  public function showImage(Request $request, $file){
    $file = File::where('id', $file)->firstOrFail()->path;
    return response()->file(base_path($file), ['Content-Type' => 'image/jpeg']);
  }
}
