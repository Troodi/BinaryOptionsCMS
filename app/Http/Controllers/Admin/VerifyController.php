<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Models\VerifyRequest;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;

class VerifyController extends Controller
{
    public function listRequestVerify(Request $request){
      $requests = VerifyRequest::with(['user'])->get();
      return Datatables::of($requests)->make();
    }
}
