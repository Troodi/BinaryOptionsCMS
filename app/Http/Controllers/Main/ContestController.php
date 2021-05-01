<?php

namespace App\Http\Controllers\Main;

use App\Events\ChangeBalance;
use App\Events\ChangeContestBalance;
use App\Http\Controllers\Controller;
use App\Models\Contest;
use App\Models\ContestLatestOrder;
use App\Models\ContestOpenOrder;
use App\Models\ContestUser;
use App\Models\LatestOrder;
use App\Models\OpenOrders;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ContestController extends Controller
{
  public function registerOnContest(Request $request){
    $request->validate([
      'contest_id' => 'required|numeric|min:1'
    ]);
    $user = Auth::user();
    $contest = Contest::where('id', $request->contest_id)
      ->where('started_at', '<', Carbon::now())
      ->where('ended_at', '>', Carbon::now())
      ->where('hidden', 0)
      ->first();
    if(!$contest){
      return response()->json(['success' => false, 'message' => 'Данный конкурс неактивен!']);
    }
    if($user->balance < $contest->initial_cost){
      return response()->json(['success' => false, 'message' => 'Недостаточно баланса для регистрации на конкурсе!']);
    }
    if(ContestUser::where('user_id', $user->id)->where('contest_id', $request->contest_id)->count()){
      return response()->json(['success' => false, 'message' => 'Вы уже зарегистрированы в конкурсе!']);
    }
    $model = new ContestUser();
    $model->user_id = $user->id;
    $model->contest_id = $request->contest_id;
    $model->balance = $contest->initial_balance;
    $model->initial_balance = $contest->initial_balance;
    $model->paid = 0;
    $model->paid_real = 0;
    $model->profit_percent = 0;
    $model->turnover = 0;
    $model->paid_times = 0;
    $model->order_count = 0;
    $model->order_count = 0;
    $model->winner_reward = 0;
    $model->winner_place = 0;
    $model->banned = 0;
    $model->save();
    User::where('id', $user->id)->update(['balance' => DB::raw('balance-'.$contest->initial_cost)]);
    $user = User::where('id', $user->id)->first();
    broadcast(new ChangeBalance($user->balance, $user));
    return response()->json(['success' => true, 'message' => 'Вы успешно зарегистрировались в конкурсе!']);
  }

  public function buyBalanceOnContest(Request $request){
    $request->validate([
      'amount' => 'required|numeric',
      'contest_id' => 'required|numeric|min:1'
    ]);
    $user = Auth::user();
    $contest = Contest::where('id', $request->contest_id)
      ->where('started_at', '<', Carbon::now())
      ->where('ended_at', '>', Carbon::now())
      ->where('hidden', 0)
      ->first();
    if(!$contest){
      return response()->json(['success' => false, 'message' => 'Данный конкурс неактивен!']);
    }
    $contest_user = ContestUser::where('user_id', $user->id)->where('contest_id', $request->contest_id)->first();
    if(!$contest_user){
      return response()->json(['success' => false, 'message' => 'Вы не зарегистрированы в данном конкурсе!']);
    }
    if($contest_user->banned){
      return response()->json(['success' => false, 'message' => 'Вы заблокированы в данном конкурсе!']);
    }
    if($request->amount < 100){
      return response()->json(['success' => false, 'message' => 'Минимальная сумма покупки 100 конкурсных долларов!']);
    }
    $price = $request->amount * $contest->additional_cost;
    if($user->balance < $price){
      return response()->json(['success' => false, 'message' => 'Недостаточно баланса для пополнения конкурсного счета!']);
    }
    if($contest_user->initial_balance + $contest_user->paid + $request->amount > $contest->max_bought_balance){
      return response()->json(['success' => false, 'message' => 'Вы превысили максимальную сумму покупки конкурсных средств!']);
    }
    User::where('id', $user->id)->update(['balance' => DB::raw('balance-'.$price)]);
    ContestUser::where('user_id', $user->id)
      ->where('contest_id', $request->contest_id)
      ->update([
        'balance' => DB::raw('balance+'.$request->amount),
        'paid' => DB::raw('paid+'.$request->amount),
        'paid_real' => DB::raw('paid_real+'.$price),
        'paid_times' => DB::raw('paid_times+1'),
      ]);
    $user = User::where('id', $user->id)->first();
    broadcast(new ChangeBalance($user->balance, $user));
    $contest_user = ContestUser::where('user_id', $user->id)->where('contest_id', $request->contest_id)->first();
    broadcast(new ChangeContestBalance($contest_user->balance, $contest_user, $request->contest_id));
    return response()->json(['success' => true, 'message' => 'Вы успешно пополнили конкурсный баланс!']);
  }

  public function getUserPlace(Request $request){
    $request->validate([
      'contest_id' => 'required|numeric|min:1'
    ]);
    $user_id = Auth::user()->id;
    $place = ContestUser::where('user_id', $user_id)->where('contest_id', $request->contest_id)->first()->winner_place;
    return response()->json(['success' => true, 'data' => $place]);
  }

  public function getWinnersForContest(Request $request){
    $request->validate([
      'contest_id' => 'required|numeric|min:1'
    ]);
    $contest = Contest::where('id', $request->contest_id)->where('hidden', 0)->first();
    $count = count($contest->places);
    $type = '';
    switch($contest->type){
      case 1:
        $type = 'balance';
        break;
      case 2:
        $type = 'profit_percent';
        break;
      case 3:
        $type = 'turnover';
        break;
    }
    return ContestUser::with(['user' => function($query) {
        $query->select('id', 'email');
      }])
      ->where('contest_id', $request->contest_id)
      ->where('banned', 0)
      ->orderBy($type, 'desc')
      ->take($count)
      ->get()->map(function ($value){
        $value->user->email = preg_replace('/\B[^@.]/', '*', $value->user->email);
        return $value;
      });
  }

  public function getAllContests(Request $request){
    $active = Contest::where('hidden', 0)->with(['user'])->where('started_at', '<', Carbon::now())->where('ended_at', '>', Carbon::now())->get();
    $ended = Contest::where('hidden', 0)->where('ended_at', '<', Carbon::now())->get();
    $planned = Contest::where('hidden', 0)->where('started_at', '>', Carbon::now())->get();
    return [
      'active' => $active,
      'ended' => $ended,
      'planned' => $planned,
    ];
  }

  public function getContestUser(Request $request){
    $request->validate([
      'contest_id' => 'required|numeric|min:1',
    ]);
    return ContestUser::where('user_id', Auth::user()->id)->where('contest_id', $request->contest_id)->first();
  }

  public function getContestInfo(Request $request){
    $request->validate([
      'id' => 'required|numeric|min:1'
    ]);
    return Contest::where('id', $request->id)->with(['user'])->firstOrFail();
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
