<?php

namespace App\Services\MainHttp;

use App\Helpers\Helper;

use App\Http\Requests\MainHttp\Partner\RequestAgain;
use App\Http\Requests\MainHttp\Partner\SendPartnerRequest;
use App\Models\PartnerRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class PartnerService {

    public function sendPartnerReq(SendPartnerRequest $request){

        $admin = false;
        if($request->id && Helper::isAdmin()){
            if(config('custom.demo')){
                return (['success' => false, 'message' => __('locale.demo_error')]);
            }
            $admin = true;
        }
        $id = $admin ? $request->id : Auth::user()->id;
        if(PartnerRequest::where('user_id', $id)->count()){
            if($admin){
                PartnerRequest::where('user_id', $id)->update(['traffic' => $request->traffic, 'telegram' => $request->telegram, 'comment' => $request->comment]);
                return (['success' => true, 'message' => __('locale.partner_updated')]);
            }
            return (['success' => false, 'message' => __('locale.partner_already_sent')]);
        }
        $model = new PartnerRequest();
        $model->user_id = $id;
        $model->traffic = $request->traffic;
        $model->telegram = $request->telegram;
        $model->comment = $request->comment;
        $model->save();
        return (['success' => true, 'message' => __('locale.partner_application_sent')]);
    }

    public function reqAgain(RequestAgain $request){
        $admin = false;
        if($request->id && Helper::isAdmin()){
            if(config('custom.demo')){
                return (['success' => false, 'message' => __('locale.demo_error')]);
            }
            $admin = true;
        }
        $id = $admin ? $request->id : Auth::user()->id;
        if(User::where('id', $id)->first()->partner_status != null){
            return (['success' => false, 'message' => __('locale.partner_already_approved')]);
        }
        if(!PartnerRequest::where('user_id', $id)->where('status', 2)->count()){
            return (['success' => false, 'message' => __('locale.partner_impossible')]);
        }
        PartnerRequest::where('user_id', $id)->delete();
        return (['success' => true, 'message' => __('locale.partner_you_can_try')]);
    }
}