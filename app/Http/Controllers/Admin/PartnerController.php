<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Partner\ApprovePartnerRequest;
use App\Http\Requests\Admin\Partner\DiscardPartnerRequest;
use App\Models\PartnerRequest;
use App\Services\Admin\PartnerService;
use App\User;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;

class PartnerController extends Controller
{
  public function approvePartner(ApprovePartnerRequest $request, PartnerService $partnerService)
  {
      return response()->json($partnerService->approvePartnerServ($request));
  }

  public function discardPartner(DiscardPartnerRequest $request, PartnerService $partnerService)
  {
      return response()->json($partnerService->discardPartnerServ($request));
  }

  public function listRequestPartner(Request $request, PartnerService $partnerService)
  {
      return response()->json($partnerService->listRequestPartnerServ($request));
  }
}
