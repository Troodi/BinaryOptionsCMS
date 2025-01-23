<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Symbol\CreateSymbolRequest;
use App\Http\Requests\Admin\Symbol\GetSymbolRequest;
use App\Http\Requests\Admin\Symbol\RemoveSymbolRequest;
use App\Http\Requests\Admin\Symbol\SaveSymbolRequest;
use App\Models\Symbols\Options\Symbol;
use App\Services\Admin\SymbolService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SymbolController extends Controller
{
  public function allSymbols(Request $request, SymbolService $symbolService)
  {
      return response()->json($symbolService->allSymbolsServ($request));
  }

  public function saveSymbol(SaveSymbolRequest $request, SymbolService $symbolService)
  {
      return response()->json($symbolService->saveSymbolServ($request));
  }

  public function getSymbol(GetSymbolRequest $request, SymbolService $symbolService)
  {
      return response()->json($symbolService->getSymbolServ($request));
  }

  public function removeSymbol(RemoveSymbolRequest $request, SymbolService $symbolService)
  {
      return response()->json($symbolService->removeSymbolServ($request));
  }

  public function createSymbol(CreateSymbolRequest $request, SymbolService $symbolService)
  {
      return response()->json($symbolService->createSymbolServ($request));
  }
}
