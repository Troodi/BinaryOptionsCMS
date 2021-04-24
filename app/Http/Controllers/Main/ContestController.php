<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Contest;
use App\Models\ContestLatestOrder;
use App\Models\ContestOpenOrder;
use App\Models\LatestOrder;
use App\Models\OpenOrders;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContestController extends Controller
{
  public function getAllContests(Request $request){
    $active = Contest::where('hidden', 0)->where('started_at', '<', Carbon::now())->where('ended_at', '>', Carbon::now())->get();
    $ended = Contest::where('hidden', 0)->where('ended_at', '<', Carbon::now())->get();
    $planned = Contest::where('hidden', 0)->where('started_at', '>', Carbon::now())->get();
    return [
      'active' => $active,
      'ended' => $ended,
      'planned' => $planned,
    ];
  }

  public function getContestInfo(Request $request){
    $request->validate([
      'id' => 'required|numeric|min:1'
    ]);
    return Contest::where('id', $request->id)->firstOrFail();
  }

  public function getOpenOrders(Request $request){
    $request->validate([
      'id' => 'required|numeric|min:1'
    ]);
    return ContestOpenOrder::where('user_id', Auth::user()->id)->where('contest_id', $request->id)->orderBy('id', 'desc')->get()->filter(function ($item) {
      $diff = date_diff(new \DateTime($item->close_at), new \DateTime($item->created_at));
      $item['expiration'] = $diff->s + $diff->i * 60 + $diff->h * 60 * 60;
      return $item;
    })->filter(function ($item) {
      $diff = date_diff(new \DateTime(), new \DateTime($item->created_at));
      $item['timestamp'] = Carbon::parse($item->close_at)->timestamp;
      return $item;
    });
  }

  public function getLatestOrders(Request $request){
    $request->validate([
      'id' => 'required|numeric|min:1'
    ]);
    return ContestLatestOrder::where('user_id', Auth::user()->id)->where('contest_id', $request->id)->orderBy('id', 'desc')->get()->filter(function ($item) {
      $diff = date_diff(new \DateTime($item->close_at), new \DateTime($item->open_at));
      $item['expiration'] = sprintf("%'.02d", $diff->h).':'.sprintf("%'.02d", $diff->i).':'.sprintf("%'.02d", $diff->s);
      return $item;
    });
  }
}
