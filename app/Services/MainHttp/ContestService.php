<?php

namespace App\Services\MainHttp;


use App\Events\ChangeBalance;
use App\Events\ChangeContestBalance;
use App\Helpers\Helper;
use App\Http\Requests\MainHttp\Contest\BuyBalanceOnContestRequest;
use App\Http\Requests\MainHttp\Contest\GetAllContestsRequest;
use App\Http\Requests\MainHttp\Contest\GetContestInfoRequest;
use App\Http\Requests\MainHttp\Contest\GetContestUserRequest;
use App\Http\Requests\MainHttp\Contest\GetLatestOrdersRequest;
use App\Http\Requests\MainHttp\Contest\GetOpenOrdersRequest;
use App\Http\Requests\MainHttp\Contest\GetUserPlaceRequest;
use App\Http\Requests\MainHttp\Contest\GetWinnersForContestRequest;
use App\Http\Requests\MainHttp\Contest\RegisterOnContestRequest;
use App\Models\Contest;
use App\Models\ContestLatestOrder;
use App\Models\ContestOpenOrder;
use App\Models\ContestUser;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class ContestService {

    public function registerOnContestServ(RegisterOnContestRequest $request)
    {
//        $request->validate([
//            'contest_id' => 'required|numeric|min:1'
//        ]);
        $admin = false;
        if ($request->user_id && Helper::isAdmin()) {
            $admin = true;
//            $request->validate(['user_id' => 'numeric|min:1']);
        }
        $user_id = $admin ? $request->user_id : Auth::user()->id;
        $user = $admin ? User::where('id', $user_id)->first() : Auth::user();
        $contest = Contest::where('id', $request->contest_id)
            ->where('started_at', '<', Carbon::now())
            ->where('ended_at', '>', Carbon::now())
            ->where('hidden', 0)
            ->first();
        if (!$contest) {
            return (['success' => false, 'message' => __('locale.tournament_inactive')]);
        }
        if ($user->balance < $contest->initial_cost) {
            return (['success' => false, 'message' => __('locale.tournament_not_enough_money')]);
        }
        if (ContestUser::where('user_id', $user->id)->where('contest_id', $request->contest_id)->count()) {
            return (['success' => false, 'message' => __('locale.tournament_already_registered')]);
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
        User::where('id', $user->id)->update(['balance' => DB::raw('balance-' . $contest->initial_cost)]);
        $user = User::where('id', $user->id)->first();
        broadcast(new ChangeBalance($user->balance, $user));
        return (['success' => true, 'message' => __('locale.tournament_successfully_registered')]);
    }

    public function buyBalanceOnContestServ(BuyBalanceOnContestRequest $request)
    {
//        $request->validate([
//            'amount' => 'required|numeric',
//            'contest_id' => 'required|numeric|min:1'
//        ]);
        $admin = false;
        if ($request->user_id && Helper::isAdmin()) {
            $admin = true;
//            $request->validate(['user_id' => 'numeric|min:1']);
        }
        $user_id = $admin ? $request->user_id : Auth::user()->id;
        $user = $admin ? User::where('id', $user_id)->first() : Auth::user();
        $contest = Contest::where('id', $request->contest_id)
            ->where('started_at', '<', Carbon::now())
            ->where('ended_at', '>', Carbon::now())
            ->where('hidden', 0)
            ->first();
        if (!$contest) {
            return (['success' => false, 'message' => __('locale.tournament_inactive')]);
        }
        $contest_user = ContestUser::where('user_id', $user->id)->where('contest_id', $request->contest_id)->first();
        if (!$contest_user) {
            return (['success' => false, 'message' => __('locale.tournament_not_registered')]);
        }
        if ($contest_user->banned) {
            return (['success' => false, 'message' => __('locale.tournament_blocked')]);
        }
        if ($request->amount < 100) {
            return (['success' => false, 'message' => __('locale.tournament_min_amount')]);
        }
        $price = $request->amount * $contest->additional_cost;
        if ($user->balance < $price) {
            return (['success' => false, 'message' => __('locale.tournament_not_enough_balance')]);
        }
        if ($contest_user->initial_balance + $contest_user->paid + $request->amount > $contest->max_bought_balance) {
            return (['success' => false, 'message' => __('locale.tournament_max_amount')]);
        }
        User::where('id', $user->id)->update(['balance' => DB::raw('balance-' . $price)]);
        ContestUser::where('user_id', $user->id)
            ->where('contest_id', $request->contest_id)
            ->update([
                'balance' => DB::raw('balance+' . $request->amount),
                'paid' => DB::raw('paid+' . $request->amount),
                'paid_real' => DB::raw('paid_real+' . $price),
                'paid_times' => DB::raw('paid_times+1'),
            ]);
        $user = User::where('id', $user->id)->first();
        broadcast(new ChangeBalance($user->balance, $user));
        $contest_user = ContestUser::where('user_id', $user->id)->where('contest_id', $request->contest_id)->first();
        broadcast(new ChangeContestBalance($contest_user->balance, $contest_user, $request->contest_id));
        return (['success' => true, 'message' => __('locale.tournament_success_bought_balance')]);
    }

    public function getUserPlaceServ(GetUserPlaceRequest $request)
    {
//        $request->validate([
//            'contest_id' => 'required|numeric|min:1'
//        ]);
        $admin = false;
        if ($request->user_id && Helper::isAdmin()) {
            $admin = true;
//            $request->validate(['user_id' => 'numeric|min:1']);
        }
        $user_id = $admin ? $request->user_id : Auth::user()->id;
        $contest = ContestUser::where('user_id', $user_id)->where('contest_id', $request->contest_id)->first();
        if (!$contest) {
            return (['success' => false, 'data' => 0]);
        }
        $place = $contest->winner_place;
        return (['success' => true, 'data' => $place]);
    }

    public function getWinnersForContestServ(GetWinnersForContestRequest $request)
    {
//        $request->validate([
//            'contest_id' => 'required|numeric|min:1'
//        ]);
        $contest = Contest::where('id', $request->contest_id)->where('hidden', 0)->first();
        $count = count($contest->places);
        $type = '';
        switch ($contest->type) {
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
        return ContestUser::with(['user' => function ($query) {
            $query->select('id', 'email');
        }])
            ->where('contest_id', $request->contest_id)
            ->where('banned', 0)
            ->orderBy($type, 'desc')
            ->take($count)
            ->get()->map(function ($value) {
                $value->user->email = preg_replace('/\B[^@.]/', '*', $value->user->email);
                return $value;
            });
    }

    public function getAllContestsServ(GetAllContestsRequest $request)
    {
        $admin = false;
        if ($request->user_id && Helper::isAdmin()) {
            $admin = true;
//            $request->validate(['user_id' => 'numeric|min:1']);
        }
        $user_id = $admin ? $request->user_id : Auth::user()->id;
        $active = Contest::where('hidden', 0)->with(['user' => function ($query) use ($user_id) {
            $query->where('contest_users.user_id', '=', $user_id);
        }])
            ->where('started_at', '<', Carbon::now())->where('ended_at', '>', Carbon::now())->get()->map(function ($value) {
                $bank = 0;
                foreach ($value->places as $place) {
                    $bank += $place['reward'];
                }
                $value->bank = $bank;
                return $value;
            });
        $ended = Contest::where('hidden', 0)->where('ended_at', '<', Carbon::now())->get();
        $planned = Contest::where('hidden', 0)->where('started_at', '>', Carbon::now())->get();
        return [
            'active' => $active,
            'ended' => $ended,
            'planned' => $planned,
        ];
    }

    public function getContestUserServ(GetContestUserRequest $request)
    {
//        $request->validate([
//            'contest_id' => 'required|numeric|min:1',
//        ]);
        return ContestUser::where('user_id', Auth::user()->id)->where('contest_id', $request->contest_id)->first();
    }

    public function getContestInfoServ(GetContestInfoRequest $request)
    {
//        $request->validate([
//            'id' => 'required|numeric|min:1'
//        ]);
        $admin = false;
        if ($request->user_id && Helper::isAdmin()) {
            $admin = true;
//            $request->validate(['user_id' => 'numeric|min:1']);
        }
        $user_id = $admin ? $request->user_id : Auth::user()->id;
        $contest = Contest::where('id', $request->id)->with(['user' => function ($query) use ($user_id) {
            $query->where('contest_users.user_id', '=', $user_id);
        }])->firstOrFail();
        $contest->registered_users = !$contest->show_registered ? '∞' : $contest->registered_users;
        return $contest;
    }

    public function getOpenOrdersServ(GetOpenOrdersRequest $request)
    {
//        $request->validate([
//            'id' => 'required|numeric|min:1'
//        ]);
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

    public function getLatestOrdersServ(GetLatestOrdersRequest $request)
    {
//        $request->validate([
//            'id' => 'required|numeric|min:1'
//        ]);
        return ContestLatestOrder::where('user_id', Auth::user()->id)->where('contest_id', $request->id)->orderBy('id', 'desc')->get()->filter(function ($item) {
            $diff = date_diff(new \DateTime($item->close_at), new \DateTime($item->open_at));
            $item['expiration'] = sprintf("%'.02d", $diff->h) . ':' . sprintf("%'.02d", $diff->i) . ':' . sprintf("%'.02d", $diff->s);
            return $item;
        });
    }

    public function getHistoryServ(Request $request, $id, $user_id = null)
    {
        $admin = false;
        if ($user_id && Helper::isAdmin()) {
            $admin = true;
        }
        $user_id = $admin ? $user_id : Auth::user()->id;
        $table = 'contest_histories';
        $history = DB::table($table)->where('contest_id', $id)->where('user_id', $user_id);
        $history = $history->join('users', "$table.user_id", '=', 'users.id')
            ->select([
                "$table.id",
                "$table.symbol_id",
                "$table.user_id",
                "$table.open_at",
                "$table.close_at",
                "$table.amount",
                "$table.open_price",
                "$table.close_price",
                "$table.profit",
                "$table.percent",
                "$table.type",
                "$table.created_at",
                "users.email",
            ])
            ->get();
        return Datatables::of($history)->make();
    }
}