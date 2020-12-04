<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Deposit;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;

class DepositController extends Controller
{
  public function allDeposits(Request $request){
    $requests = Deposit::with(['user'])->get();
    return Datatables::of($requests)->make();
  }
}
