<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PartnerRequest;
use App\User;
use Illuminate\Http\Request;

class PartnerController extends Controller
{
  public function approvePartner(Request $request){
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
    return response()->json(['success' => true, 'message' => 'Участие пользователя в партнерской программе успешно подтверждено!']);
  }

  public function discardPartner(Request $request){
    $request->validate([
      'id' => 'numeric|required|min:1'
    ]);
    if(PartnerRequest::where('user_id', $request->id)->count()) {
      PartnerRequest::where('user_id', $request->id)->update(['status' => 2, 'message' => 'Ваша заявка отклонена администрацией!']);
    }
    User::where('id', $request->id)->update(['partner_status' => null]);
    return response()->json(['success' => true, 'message' => 'Пользователь исключен (не подтвержден) в партнерской программе!']);
  }
}
