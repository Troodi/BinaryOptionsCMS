<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Contest;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ContestController extends Controller
{
  public function getAllContests(Request $request){
    $contests = Contest::where('hidden', 0)->where('started_at', '<', Carbon::now())->where('ended_at', '>', Carbon::now())->get();
    return $contests;
  }
}
