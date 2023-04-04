<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Services\MainHttp\LocalizationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class LocalizationController extends Controller
{
    public function setLang(Request $request, LocalizationService $localizationService)
    {
        return response()->json($localizationService->setLanguage($request));
    }
}
