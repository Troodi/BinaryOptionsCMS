<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PartnerRequest;
use App\User;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;

class PartnerController extends Controller
{
  public function approvePartner(Request $request){
    if(config('custom.demo')){
      return response()->json(['success' => false, 'message' => __('locale.demo_error')]);
    }
    $request->validate([
      'id' => 'numeric|required|min:1'
    ]);
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
    return response()->json(['success' => true, 'message' => __('locale.admin_partner_accepted')]);
  }

  public function discardPartner(Request $request){
    if(config('custom.demo')){
      return response()->json(['success' => false, 'message' => __('locale.demo_error')]);
    }
    $request->validate([
      'id' => 'numeric|required|min:1'
    ]);
    if(PartnerRequest::where('user_id', $request->id)->count()) {
      PartnerRequest::where('user_id', $request->id)->update(['status' => 2, 'message' => __('locale.admin_partner_declined')]);
    }
    User::where('id', $request->id)->update(['partner_status' => null]);
    return response()->json(['success' => true, 'message' => __('locale.admin_partner_excluded')]);
  }

  public function listRequestPartner(Request $request){
    $requests = PartnerRequest::with(['user'])->get();
    return Datatables::of($requests)->make();
  }
}
