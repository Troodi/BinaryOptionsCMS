<?php

namespace App\Services\MainHttp;

use App\Events\ChangeBalance;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\MainHttp\Promocode\CheckPromocodeRequest;
use App\Http\Requests\MainHttp\Promocode\DiscardBonusRequest;
use App\Http\Requests\MainHttp\Promocode\PromocodeHistoryRequest;
use App\Models\Deposit;
use App\Models\LatestOrder;
use App\Models\OpenOrders;
use App\Models\Promocode;
use App\Models\PromocodeHistory;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class PromocodeService
{
    public function getAvailablePromocodesServ(Request $request){
        return Promocode::where('active_from', '<', Carbon::now())
            ->where('active_to', '>', Carbon::now())
            ->where('public_code', 1)
            ->get();
    }

    public function checkPromocodeServ(CheckPromocodeRequest $request){

        $admin = false;
        if($request->id && Helper::isAdmin()){
            if(config('custom.demo')){
                return (['success' => false, 'message' => __('locale.demo_error')]);
            }
            $admin = true;
        }
        $id = $admin ? $request->id : Auth::user()->id;
        $promocode = Promocode::where('code', $request->code)->first();
        if(!$promocode){
            return (['success' => false, 'message' => __('locale.promo_code_not_exist')]);
        }
        $active_from = Carbon::parse($promocode->active_from);
        $active_to = Carbon::parse($promocode->active_to);
        if(Carbon::now() < $active_from or Carbon::now() > $active_to){
            return (['success' => false, 'message' => __('locale.promo_code_validity_expired')]);
        }
        $deposits = Deposit::where('user_id', $id)->where('status', 1)->count() + LatestOrder::where('user_id', $id)->count() + PromocodeHistory::where('user_id', $id)->whereHas('promocode', function($query){ $query->where('for_new', 1); })->count();
        if($promocode->for_new and $deposits){
            return (['success' => false, 'message' => __('locale.promo_code_only_for_new')]);
        }
        $promocode_history = PromocodeHistory::where('user_id', $id)->where('promocode_id', $promocode->id)->count();
        if($promocode->attempts && $promocode_history >= $promocode->attempts){
            return (['success' => false, 'message' => __('locale.promo_code_used_max_times')]);
        }
        if($promocode->type == 1) {
            $turnover = $promocode->bonus_size * $promocode->turnover;
            $model = new PromocodeHistory;
            $model->user_id = $id;
            $model->promocode_id = $promocode->id;
            $model->save();
            User::where('id', $id)
                ->update([
                    'bonus' => DB::raw("bonus+$promocode->bonus_size"),
                    'all_turnover' => DB::raw("all_turnover+$turnover"),
                    'left_turnover' => DB::raw("left_turnover+$turnover"),
                    'balance' => DB::raw("balance+$promocode->bonus_size")
                ]);
            $user = $admin ? User::where('id', $id)->first() : Auth::user();
            broadcast(new ChangeBalance($user->balance + $promocode->bonus_size, $user));
            return (['success' => true, 'message' => __('locale.promo_code_without_deposit_activated')]);
        } elseif ($promocode->type == 2){
            return (['success' => true, 'message' => __('locale.promo_code_active'), 'data' => $promocode]);
        }
    }

    public function getDepositPromocodesServ(Request $request){
        return Promocode::where('public_code', 2)->orderBy('bonus_size', 'desc')->get();
    }

    public function promocodeHistoryServ(PromocodeHistoryRequest $request)
    {
        $admin = false;
        if($request->id && Helper::isAdmin()){
            $admin = true;
        }
        $id = $admin ? $request->id : Auth::user()->id;
        $history = PromocodeHistory::where('user_id', $id)->with('promocode')->get();
        return Datatables::of($history)->make();
    }

    public function discardBonusServ(DiscardBonusRequest $request){
        $admin = false;
        if($request->id && Helper::isAdmin()){
            if(config('custom.demo')){
                return (['success' => false, 'message' => __('locale.demo_error')]);
            }
            $admin = true;
        }
        $id = $admin ? $request->id : Auth::user()->id;
        $user = $admin ? User::where('id', $id)->first() : Auth::user();
        if(OpenOrders::where('user_id', $id)->count()){
            return (['success' => false, 'message' => __('locale.promo_code_you_have_open_orders')]);
        }
        if($user->left_turnover == 0 or $user->all_turnover <= 0){
            return (['success' => false, 'message' => __('locale.promo_code_you_dont_have_bonuses')]);
        }
        $percent_to_payout = 1 - ($user->left_turnover / $user->all_turnover); // Сколько процентов отработано
        $add_to_balance = $user->bonus * $percent_to_payout - $user->bonus;
        $set_balance = $user->balance + $add_to_balance;
        if($set_balance <= 0){
            $set_balance = 0;
        }
        User::where('id', $id)->update(['bonus' => 0, 'all_turnover' => 0, 'left_turnover' => 0, 'balance' => $set_balance]);
        broadcast(new ChangeBalance($user->balance+$add_to_balance, $user));
        return (['success' => true, 'message' => __('locale.promo_code_bonus_decline')]);
    }
}
