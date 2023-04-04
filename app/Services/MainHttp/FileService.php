<?php

namespace App\Services\MainHttp;

use App\Helpers\Helper;

use App\Models\Models\File;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class FileService {

    public function showImg(Request $request, $file){
        $file = File::where('id', $file)->firstOrFail()->path;
        return file(base_path($file), ['Content-Type' => 'image/jpeg']);
    }
}