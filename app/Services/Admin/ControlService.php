<?php

namespace App\Services\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Control\BanActionRequest;
use App\Http\Requests\Admin\Control\ChangeBalanceRequest;
use App\Models\Profile;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ControlService
{
    public function getControlInfoServ(Request $request, $id)
    {
        $data = [
            'profile' => Profile::where('user_id', $id)->firstOrFail(),
            'user' => User::where('id', $id)->firstOrFail(),
            'balance' => User::where('id', $id)->firstOrFail()->balance,
        ];
        return ($data);
    }

    public function getUserBanServ(Request $request, $id)
    {
        return (['banned' => User::where('id', $id)->first()->banned]);
    }

    public function changeBalanceServ(ChangeBalanceRequest $request, $id)
    {
        if(config('custom.demo')){
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }

        $user = User::where('id', $id);
        if($request->action == 0){
            $user->update(['balance' => DB::raw("balance+$request->balance")]);
        } elseif($request->action == 1) {
            $user->update(['balance' => DB::raw("balance-$request->balance")]);
        } else {
            $user->update(['balance' => $request->balance]);
        }
        return (['success' => true, 'message' =>  __('locale.admin_control_balance')]);
    }

    public function banActionServ(BanActionRequest $request, $id)
    {
        if(config('custom.demo')){
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }

        $action = $request->action ? $request->action : null;
        if($action == 4){
            $action = 3;
        }
        User::where('id', $id)->update(['banned' => $action, 'banned_at' => Carbon::now()]);
        return (['success' => true, 'message' => __('locale.admin_control_ban')]);
    }
}
