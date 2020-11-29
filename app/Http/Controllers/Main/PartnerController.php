<?php

namespace App\Http\Controllers\Main;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\PartnerRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PartnerController extends Controller
{
    public function sendPartnerRequest(Request $request){
      $request->validate([
        'telegram' => 'string|min:3|max:255',
        'comment' => 'string|min:20|max:500',
        'traffic' => 'required|numeric|min:0|max:4'
      ]);
      $admin = false;
      if($request->id && Helper::isAdmin()){
        $admin = true;
        $request->validate(['id' => 'numeric|min:1']);
      }
      $id = $admin ? $request->id : Auth::user()->id;
      if(PartnerRequest::where('user_id', $id)->count()){
        if($admin){
          PartnerRequest::where('user_id', $id)->update(['traffic' => $request->traffic, 'telegram' => $request->telegram, 'comment' => $request->comment]);
          return response()->json(['success' => true, 'message' => 'Информация успешно обновлена!']);
        }
        return response()->json(['success' => false, 'message' => 'Заявка уже была отправлена!']);
      }
      $model = new PartnerRequest();
      $model->user_id = $id;
      $model->traffic = $request->traffic;
      $model->telegram = $request->telegram;
      $model->comment = $request->comment;
      $model->save();
      return response()->json(['success' => true, 'message' => 'Заявка успешно отправлена! Срок рассмотрения от нескольких часов до двух дней.']);
    }

    public function requestAgain(Request $request){
      $admin = false;
      if($request->id && Helper::isAdmin()){
        $admin = true;
        $request->validate(['id' => 'numeric|min:1']);
      }
      $id = $admin ? $request->id : Auth::user()->id;
      if(User::where('id', $id)->first()->partner_status != null){
        return response()->json(['success' => false, 'message' => 'У Вас уже подтвержденный аккаунт!']);
      }
      if(!PartnerRequest::where('user_id', $id)->where('status', 2)->count()){
        return response()->json(['success' => false, 'message' => 'Данное действие невозможно выполнить, т.к. не позволяет текущий статус заявки!']);
      }
      PartnerRequest::where('user_id', $id)->delete();
      return response()->json(['success' => true, 'message' => 'Теперь Вы можете подать заявку ещё раз!']);
    }
}
