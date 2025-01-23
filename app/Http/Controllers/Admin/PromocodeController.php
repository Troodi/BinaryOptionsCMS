<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Promocode\CreatePromocodeRequest;
use App\Http\Requests\Admin\Promocode\LoadPromocodeRequest;
use App\Http\Requests\Admin\Promocode\RemovePromocodeRequest;
use App\Http\Requests\Admin\Promocode\SavePromocodeRequest;
use App\Models\Promocode;
use App\Services\Admin\PromocodeService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;

class PromocodeController extends Controller
{
    public function getAllPromocode(Request $request, PromocodeService $promocodeService)
    {
        return $promocodeService->getAllPromocodeServ($request);
    }

    public function loadPromocode(LoadPromocodeRequest $request, PromocodeService $promocodeService)
    {
        return response()->json($promocodeService->loadPromocodeServ($request));
    }

    public function removePromocode(RemovePromocodeRequest $request, PromocodeService $promocodeService)
    {
        return response()->json($promocodeService->removePromocodeServ($request));
    }

    public function savePromocode(SavePromocodeRequest $request, PromocodeService $promocodeService)
    {
        return response()->json($promocodeService->savePromocodeServ($request));
    }

  public function createPromocode(CreatePromocodeRequest $request, PromocodeService $promocodeService)
  {
      return response()->json($promocodeService->createPromocodeServ($request));
  }
}
