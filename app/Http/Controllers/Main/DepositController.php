<?php

namespace App\Http\Controllers\Main;

use App\Events\ChangeBalance;
use App\Http\Controllers\Controller;
use App\Models\Deposit;
use App\Models\LatestOrder;
use App\Models\Promocode;
use App\Models\PromocodeHistory;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class DepositController extends Controller
{
    public function startDeposit(Request $request){
      $request->validate([
        'amount' => 'required|numeric|min:1|max:10000'
      ]);
      $promocode_request = intval($request->promocode);
      $amount = number_format($request->amount, 2, '.', '');
      $promocode_id = null;
      if($promocode_request) {
        $promocode = Promocode::where('id', $promocode_request)->first();
        if (!$promocode) {
          return response()->json(['success' => false, 'message' => 'Такого промокода не существует!'], 200);
        }
        $active_from = Carbon::parse($promocode->active_from);
        $active_to = Carbon::parse($promocode->active_to);
        if(Carbon::now() < $active_from or Carbon::now() > $active_to){
          return response()->json(['success' => false, 'message' => 'Срок действия промокода истёк!'], 200);
        }
        $deposits = Deposit::where('user_id', Auth::user()->id)->where('status', 1)->count() + LatestOrder::where('user_id', Auth::user()->id)->count() + PromocodeHistory::where('user_id', Auth::user()->id)->whereHas('promocode', function($query){ $query->where('for_new', 1); })->count();
        if($promocode->for_new and $deposits){
          return response()->json(['success' => false, 'message' => 'Данный промокод предназначен только для новых пользователей!'], 200);
        }
        $promocode_history = PromocodeHistory::where('user_id', Auth::user()->id)->where('promocode_id', $promocode->id)->count();
        if($promocode->attempts && $promocode_history >= $promocode->attempts){
          return response()->json(['success' => false, 'message' => 'Вы уже использовали максимальное количество раз данный промокод!'], 200);
        }
        if($amount < $promocode->min_amount){
          return response()->json(['success' => false, 'message' => 'Данный промокод доступен только от суммы '.$promocode->min_amount.'$!'], 200);
        }
        $promocode_id = $promocode->id;
      }
      $model = new Deposit();
      $model->user_id = Auth::user()->id;
      $model->amount = $amount;
      $model->system_id = 0;
      $model->status = 0;
      $model->promocode_id = $promocode_id;
      $model->save();

      $m_shop = env('PAYEER_ID');
      $m_orderid = $model->id;
      $m_curr = 'USD';
      $m_desc = base64_encode('Пополнение счета на сайте: '.env('APP_URL'));
      $lang = 'ru';
      $m_key = env('PAYEER_SECRET');
      $arHash = array(
        $m_shop,
        $m_orderid,
        $amount,
        $m_curr,
        $m_desc
      );
      $arHash[] = $m_key;
      $m_sign = strtoupper(hash('sha256', implode(':', $arHash)));
      $link_for_pay = "https://payeer.com/merchant/?m_shop=$m_shop&m_orderid=$m_orderid&m_amount=$amount&m_curr=$m_curr&m_desc=$m_desc&m_sign=$m_sign&lang=$lang";
      return response()->json(['success' => true, 'message' => 'Ссылка на оплату успешно сгенерирована, сейчас вы будете перенаправлены на сайт платежной системы', 'link' => $link_for_pay, 'timeout' => 3000], 200);
    }

    public function processPayeer(Request $request){
      if (!in_array($request->ip(), array('185.71.65.92', '185.71.65.189', '149.202.17.210'))) return;
      if (isset($request->m_operation_id) && isset($request->m_sign)) {
        $m_key = env('PAYEER_SECRET');
        $arHash = array(
          $request->m_operation_id,
          $request->m_operation_ps,
          $request->m_operation_date,
          $request->m_operation_pay_date,
          $request->m_shop,
          $request->m_orderid,
          $request->m_amount,
          $request->m_curr,
          $request->m_desc,
          $request->m_status,
        );
        if (isset($request->m_params)) {
          $arHash[] = $request->m_params;
        }
        $arHash[] = $m_key;
        $sign_hash = strtoupper(hash('sha256', implode(':', $arHash)));
        if ($request->m_sign == $sign_hash && $request->m_status == 'success') {
          ob_end_clean();
          $deposit = Deposit::where('id', $request->m_orderid)->where('status', 0)->first();
          if($deposit){
            if($deposit->promocode_id){
              $promocode = Promocode::where('id', $deposit->promocode_id)->first();
              $bonus_amount = ($deposit->amount * $promocode->bonus_size / 100);
              $amount_with_promocode = $deposit->amount + $bonus_amount;
              $turnover = $bonus_amount * $promocode->turnover;
              User::where('id', $deposit->user_id)->update([
                'balance' => DB::raw("balance+$amount_with_promocode"),
                'bonus' => DB::raw("bonus+$bonus_amount"),
                'all_turnover' => DB::raw("all_turnover+$turnover"),
                'left_turnover' => DB::raw("left_turnover+$turnover"),
              ]);
              broadcast(new ChangeBalance(Auth::user()->balance+$amount_with_promocode, Auth::user()));
            } else {
              User::where('id', $deposit->user_id)->update(['balance' => DB::raw("balance+$deposit->amount")]);
              broadcast(new ChangeBalance(Auth::user()->balance+$deposit->amount, Auth::user()));
            }
            $deposit->update(['status' => 1]);
            return $request->m_orderid.'|success';
          } else {
            return $request->m_orderid.'|error';
          }
        }
        ob_end_clean();
        return $request->m_orderid.'|error';
      }
    }

    public function depositHistory(Request $request){
      $history = Deposit::where('user_id', Auth::user()->id)->get();
      return Datatables::of($history)->make();
    }
}
