<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Referral;
use App\Models\SameIp;
use App\Services\Admin\CheatService;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class CheatController extends Controller
{
  public function getAllCheaters(Request $request, CheatService $cheatService)
  {
    return response()->json($cheatService->getAllCheatersServ($request));
  }
}
