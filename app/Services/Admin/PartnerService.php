<?php

namespace App\Services\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Partner\ApprovePartnerRequest;
use App\Http\Requests\Admin\Partner\DiscardPartnerRequest;
use App\Models\PartnerRequest;
use App\User;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;

class PartnerService
{
    public function approvePartnerServ(ApprovePartnerRequest $request){
        if(config('custom.demo')){
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }

        if(PartnerRequest::where('user_id', $request->id)->count()) {
            PartnerRequest::where('user_id', $request->id)->update(['status' => 1]);
        } else {
            $model = new PartnerRequest;
            $model->user_id = $request->id;
            $model->telegram = '@____________';
            $model->traffic = 0;
            $model->comment = '---------------------------------------------------';
            $model->status = 1;
            $model->save();
        }
        User::where('id', $request->id)->update(['partner_status' => 1]);
        return (['success' => true, 'message' => __('locale.admin_partner_accepted')]);
    }

    public function discardPartnerServ(DiscardPartnerRequest $request){
        if(config('custom.demo')){
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }
        if(PartnerRequest::where('user_id', $request->id)->count()) {
            PartnerRequest::where('user_id', $request->id)->update(['status' => 2, 'message' => __('locale.admin_partner_declined')]);
        }
        User::where('id', $request->id)->update(['partner_status' => null]);
        return (['success' => true, 'message' => __('locale.admin_partner_excluded')]);
    }

    public function listRequestPartnerServ(Request $request){
        $requests = PartnerRequest::with(['user'])->get();
        return Datatables::of($requests)->make();
    }
}
