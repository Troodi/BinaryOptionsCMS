<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Events\ChangeDemoBalance;
use App\Services\MainHttp\TestService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TestController extends Controller
{
  public function test(TestService $testService, Request $request)
  {
    return response()->json($testService->testServ($request));
  }
}
