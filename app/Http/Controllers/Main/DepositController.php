<?php

namespace App\Http\Controllers\Main;

use App\Events\ChangeBalance;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Deposit;
use App\Models\DepositSystem;
use App\Models\ExchangeRates;
use App\Models\LatestOrder;
use App\Models\Promocode;
use App\Models\PromocodeHistory;
use App\Models\Referral;
use App\User;
use Carbon\Carbon;
use cryptonator\MerchantAPI;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Ixudra\Curl\Facades\Curl;
use Qiwi\Api\BillPayments;
use Yajra\DataTables\DataTables;

class DepositController extends Controller
{
    public function getAllDepositSystems(Request $request){
      return DepositSystem::where('hidden', 0)->orderBy('order', 'asc')->get();
    }

    public function qiwiProcess(Request $request){
      $billPayments = new BillPayments(env('QIWI_SECRET'));
      $check = $billPayments->checkNotificationSignature(
        $request->header('X-Api-Signature-SHA256'), json_decode($request->getContent(), true), env('QIWI_SECRET')
      );
      if($check){
        $orderId = $request['bill']['customFields']['orderId'];
        $this->processDeposit($orderId);
        return null;
      } else {
        return 'Invalid cipher';
      }
    }

    public function yooMoneyProcess(Request $request){
      $arr = null;
      parse_str($request->getContent(), $arr);
      $sha1 = sha1($arr['notification_type'].'&'.$arr['operation_id'].'&'.$arr['amount'].'&'.$arr['currency'].'&'.$arr['datetime'].'&'.$arr['sender'].'&'.$arr['codepro'].'&'.env('YOOMONEY_SECRET').'&'.$arr['label']);
      if($sha1 == $arr['sha1_hash'] and $arr['codepro'] == 'false' and $arr['unaccepted'] == 'false'){
        $this->processDeposit($arr['label']);
        return true;
      } else {
        return 'Invalid cipher';
      }
    }

    public function cryptonatorProcess(Request $request){
      $cryptonator = new MerchantAPI(env('CRYPTONATOR_ID'), env('CRYPTONATOR_SECRET'));
      $array = null;
      parse_str($request->getContent(), $array);
      if($cryptonator->checkAnswer($array)){
        $this->processDeposit($array['order_id']);
      } else {
        return 'Invalid cipher';
      }
    }

    public function startDeposit(Request $request){
      $request->validate([
        'amount' => 'required|numeric|min:5|max:10000',
        'system_id' => 'required|numeric|min:0'
      ]);
      $promocode_request = intval($request->promocode);
      $amount = number_format($request->amount, 2, '.', '');
      $max = DepositSystem::where('id', $request->system_id)->first()->max;
      if($amount > $max){
        return response()->json(['success' => false, 'message' => __('locale.deposit_max_amount').' '.$max.'$'], 200);
      }
      $promocode_id = null;
      if($promocode_request) {
        $promocode = Promocode::where('id', $promocode_request)->first();
        if (!$promocode) {
          return response()->json(['success' => false, 'message' => __('locale.deposit_promo_code')], 200);
        }
        $active_from = Carbon::parse($promocode->active_from);
        $active_to = Carbon::parse($promocode->active_to);
        if(Carbon::now() < $active_from or Carbon::now() > $active_to){
          return response()->json(['success' => false, 'message' => __('locale.deposit_time_left')], 200);
        }
        $deposits = Deposit::where('user_id', Auth::user()->id)->where('status', 1)->count() + LatestOrder::where('user_id', Auth::user()->id)->count() + PromocodeHistory::where('user_id', Auth::user()->id)->whereHas('promocode', function($query){ $query->where('for_new', 1); })->count();
        if($promocode->for_new and $deposits){
          return response()->json(['success' => false, 'message' => __('locale.deposit_only_for_new')], 200);
        }
        $promocode_history = PromocodeHistory::where('user_id', Auth::user()->id)->where('promocode_id', $promocode->id)->count();
        if($promocode->attempts && $promocode_history >= $promocode->attempts){
          return response()->json(['success' => false, 'message' => __('locale.deposit_already_used')], 200);
        }
        if($amount < $promocode->min_amount){
          return response()->json(['success' => false, 'message' => __('locale.deposit_from_amount').' '.$promocode->min_amount.'$!'], 200);
        }
        $promocode_id = $promocode->id;
      }
      $rub = $amount / ExchangeRates::where('symbol', 'USD')->first()->price;
      $model = new Deposit();
      $model->user_id = Auth::user()->id;
      $model->amount = $amount;
      $model->amount_in_rub = $rub;
      $model->system_id = $request->system_id;
      $model->status = 0;
      $model->promocode_id = $promocode_id;
      $model->save();
      if($request->system_id == 3) { // Cryptonator
        $cryptonator = new MerchantAPI(env('CRYPTONATOR_ID'), env('CRYPTONATOR_SECRET'));
        $url = $cryptonator->startPayment(array(
          'item_name'               => 'Deposit on '.config('custom.domain'),
          'order_id'              => $model->id,
          'item_description'      => 'Deposit on '.config('custom.domain').' for user: '.Auth::user()->email,
          'invoice_amount'          => $amount,
          'invoice_currency'        => 'usd',
          'language'              => 'en',
        ));
        return response()->json(['success' => true, 'message' => __('locale.deposit_link'), 'link' => $url, 'timeout' => 3000], 200);
      } elseif($request->system_id == 2) { // YooMoney
        $orderId = $model->id;
        $amount = $rub;
        $message = urlencode('Deposit on '.config('custom.domain').' for user: '.Auth::user()->email);
        $success_url = urlencode('https://'.config('custom.domain').'/trading');
        $yoo = Curl::to("https://yoomoney.ru/quickpay/confirm.xml?receiver=".env('YOOMONEY_WALLET')."&quickpay-form=shop&targets=$message&sum=$amount&label=$orderId&successURL=$success_url&paymentType=AC")
          ->get();
        $link = str_replace('Found. Redirecting to ', '', $yoo);
        return response()->json(['success' => true, 'message' => __('locale.deposit_link'), 'link' => $link, 'timeout' => 3000], 200);
      } elseif($request->system_id == 1) { // Qiwi
        $billPayments = new BillPayments(env('QIWI_SECRET'));
        $billId = $billPayments->generateId();
        Deposit::where('id', $model->id)->update(['billId' => $billId]);
        $lifetime = Carbon::now()->addMinutes(60)->format('Y-m-d\TH:m:s+03:00');
        $fields = [
          'amount' => $rub,
          'currency' => 'RUB',
          'comment' => 'Account replenishment on the site for the user: '.Auth::user()->email,
          'email' => Auth::user()->email,
          'account' => Auth::user()->id,
          'expirationDateTime' => $lifetime,
          'successUrl' => 'https://'.config('custom.domain').'/trading',
          'customFields' => ['orderId' => $model->id],
        ];
        $response = $billPayments->createBill($billId, $fields);
        return response()->json(['success' => true, 'message' => __('locale.deposit_link'), 'link' => $response['payUrl'], 'timeout' => 3000], 200);
      } elseif($request->system_id == 7) { //Free-Kassa
        $m_shop = env('FREE_KASSA_ID');
        $m_orderid = $model->id;
        $m_curr = 'USD';
        $m_desc = base64_encode(__('locale.deposit_deposit_on_site') . ': ' . env('APP_URL'));
        $lang = 'ru';
        $m_key = env('FREE_KASSA_SECRET');
        $arHash = array(
          $m_shop,
          $m_orderid,
          $amount,
          $m_curr,
          $m_desc
        );
        $arHash[] = $m_key;
        $m_sign = md5(env('FREE_KASSA_ID') . ':' . $amount . ':' . env('FREE_KASSA_SECRET') . ':' . $m_orderid);
        $link_for_pay = "https://www.free-kassa.ru/merchant/cash.php?oa=$amount&o=$m_orderid&us_desc=$m_desc&s=$m_sign&m=$m_shop&lang=$lang";
        return response()->json(['success' => true, 'message' => __('locale.deposit_link'), 'link' => $link_for_pay, 'timeout' => 3000], 200);
      }
      elseif($request->system_id == 6) { //Payeer
        $m_shop = env('PAYEER_ID');
        $m_orderid = $model->id;
        $m_curr = 'USD';
        $m_desc = base64_encode(__('locale.deposit_deposit_on_site') . ': ' . env('APP_URL'));
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
        return response()->json(['success' => true, 'message' => __('locale.deposit_link'), 'link' => $link_for_pay, 'timeout' => 3000], 200);
      }
      elseif($request->system_id == 1){ // Qiwi

      }
      elseif($request->system_id == 7){ // RosKassa

      }
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
          if($this->processDeposit($request->m_orderid)){
            return $request->m_orderid.'|success';
          } else {
            return $request->m_orderid.'|error';
          }
        }
        ob_end_clean();
        return $request->m_orderid.'|error';
      }
    }

    public function processFreeKassa(Request $request){
      if (!in_array($request->ip(), array('136.243.38.147', '136.243.38.149', '136.243.38.150', '136.243.38.151', '136.243.38.189', '136.243.38.108'))) return;
      $sign = md5(env('FREE_KASSA_ID').':'.$request->AMOUNT.':'.env('FREE_KASSA_SECRET_2').':'.$request->MERCHANT_ORDER_ID);
      if($sign == $request->SIGN){
        $this->processDeposit($request->MERCHANT_ORDER_ID);
        return 'YES';
      } else {
        return 'wrong sign';
      }
    }

    public function depositHistory(Request $request){
      $admin = false;
      if($request->id && Helper::isAdmin()){
        $admin = true;
        $request->validate(['id' => 'numeric|min:1']);
      }
      $id = $admin ? $request->id : Auth::user()->id;
      $history = Deposit::where('user_id', $id)->with(['depositSystem'])->get();
      return Datatables::of($history)->make();
    }

    private function processDeposit($orderId){
      $deposit = Deposit::where('id', $orderId)->where('status', 0)->first();
      if($deposit){
        Deposit::where('id', $orderId)->where('status', 0)->update(['status' => 1]);
        $user = User::where('id', $deposit->user_id)->first();
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
          broadcast(new ChangeBalance($user->balance+$amount_with_promocode, Auth::user()));
        } else {
          User::where('id', $deposit->user_id)->update(['balance' => DB::raw("balance+$deposit->amount")]);
          broadcast(new ChangeBalance($user->balance+$deposit->amount, Auth::user()));
        }
        if($user->referer_id) {
          if(User::where('id', $user->referer_id)->first()->partner_status){
            $amount_percent = $deposit->amount * 0.1;
            User::where('id', $user->referer_id)->update(['balance' => DB::raw("balance+$amount_percent")]);
          }
          Referral::where('user_id', $user->referer_id)->update(['deposit_count' => DB::raw("deposit_count+$deposit->amount")]);
        }
        return true;
      } else {
        return false;
      }
    }
}
