<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\SettingsService;
use Illuminate\Http\Request;
use Jackiedo\DotenvEditor\Facades\DotenvEditor;

class SettingsController extends Controller
{
  public function getAllSettings(Request $request, SettingsService $settingsService)
  {
      return response()->json($settingsService->getAllSettingsServ($request));
  }

  public function save(Request $request, SettingsService $settingsService)
  {
      return response()->json($settingsService->saveServ($request));
  }
}
