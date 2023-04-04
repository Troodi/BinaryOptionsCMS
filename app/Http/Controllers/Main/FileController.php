<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Models\File;
use App\Services\MainHttp\FileService;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function showImage(FileService $fileService, Request $request)
    {
        return response()->json($fileService->showImg($request));
    }
}
