<?php

namespace App\Services\MainHttp;

use App\Helpers\Helper;
use App\Http\Requests\MainHttp\Profile\ApproveEmailRequest;
use App\Http\Requests\MainHttp\Profile\ApprovePhoneRequest;
use App\Http\Requests\MainHttp\Profile\ChangeGeneralDataRequest;
use App\Http\Requests\MainHttp\Profile\ChangeMainDataRequest;
use App\Http\Requests\MainHttp\Profile\ChangePasswordRequest;
use App\Http\Requests\MainHttp\Profile\LoadAllProfileDataRequest;
use App\Http\Requests\MainHttp\Profile\PassportFirstPageRequest;
use App\Http\Requests\MainHttp\Profile\SendEmailCodeRequest;
use App\Http\Requests\MainHttp\Profile\SendPhoneCodeRequest;
use App\Models\EmailAttempts;
use App\Http\Controllers\Controller;
use App\Models\Models\File;
use App\Models\Models\VerifyRequest;
use App\Models\Profile;
use App\Models\PhoneAttempts;
use App\Models\Referral;
use App\Models\TwilioNumber;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Twilio\Exceptions\ConfigurationException;
use Twilio\Rest\Client;

class ProfileService
{
    // Изменение пароля
    public function changePasswordServ(ChangePasswordRequest $request){
        if(config('custom.demo')){
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }
//        $request->validate([
//            'old_password' =>  'string|min:6|max:255',
//            'new_password' =>  'string|min:8|max:255',
//            'repeat_password' =>  'string|min:8|max:255',
//        ]);
        if(!Hash::check($request->old_password, Auth::user()->password)){
            return (['success' => false, 'message' => __('locale.profile_current_password_wrong')]);
        }
        if($request->new_password != $request->repeat_password){
            return (['success' => false, 'message' => __('locale.profile_repeat_password_wrong')]);
        }
        User::where('id', Auth::user()->id)->update(['password' => Hash::make($request->new_password)]);
        return (['success' => true, 'message' => __('locale.profile_password_updated')]);
    }

    // Изменение основных данных
    public function changeGeneralDataServ(ChangeGeneralDataRequest $request){
        $id = Auth::user()->id;
        if($request->id && Helper::isAdmin()){
            if(config('custom.demo')){
                return (['success' => false, 'message' => __('locale.demo_error')]);
            }
            $id = $request->id;
        }
//        $request->validate([
//            'nickname' => 'string|min:3|max:50|nullable',
//            'telegram' => 'string|min:3|max:50|nullable',
//            'gender' => 'numeric|min:0|max:1',
//            'language' => 'string|min:2|max:50',
//        ]);
        User::where('id', $id)->update(['name' => $request->nickname]);
        ProFile::where('user_id', $id)->update([
            'telegram' => $request->telegram,
            'gender' => $request->gender,
            'language' => $request->language
        ]);
        return (['success' => true, 'message' => __('locale.profile_data_updated')]);
    }

    // Изменение личных данных
    public function changeMainDataServ(ChangeMainDataRequest $request){
        $admin = false;
        if($request->id && Helper::isAdmin()){
            if(config('custom.demo')){
                return (['success' => false, 'message' => __('locale.demo_error')]);
            }
            $admin = true;
        }
//        $request->validate([
//            'name' => 'string|min:3|max:50'.$admin ? '|nullable' : '',
//            'last_name' => 'string|min:3|max:50'.$admin ? '|nullable' : '',
//            'patronymic' => 'string|min:3|max:50'.$admin ? '|nullable' : '',
//            'birth' => 'regex:/\d{2}\-\d{2}\-\d{4}/'.$admin ? '|nullable' : '',
//            'address' => 'string|min:10|max:250'.$admin ? '|nullable' : '',
//            'document_number' => 'string|min:3|max:250'.$admin ? '|nullable' : '',
//        ]);
        $id = $admin ? $request->id : Auth::user()->id;
        $profile = Profile::where('user_id', $id)->first();
        if(($profile->document_first_page or $profile->document_first_page_verify_at or $profile->document_second_page or $profile->document_second_page_verify_at or $profile->document_additional or $profile->document_document_additional_verify_at) and $admin){
            return (['success' => false, 'message' => __('locale.profile_cant_update_because_already')]);
        }
        Profile::where('user_id', $id)->update([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'patronymic' => $request->patronymic,
            'birth' => $request->birth ? Carbon::parse($request->birth) : null,
            'address' => $request->address,
            'document_number' => $request->document_number,
        ]);
        return (['success' => true, 'message' => __('locale.profile_main_data_updated')]);
    }

    //Загружаем информацию о профиле
    public function loadAllProfileDataServ(LoadAllProfileDataRequest $request){
        if(isset($request->id) && Helper::isAdmin()){
            return User::where('id', $request->id)->with('profile', 'provider')->first();
        } else {
            return User::where('id', Auth::user()->id)->with('profile', 'provider')->first();
        }
    }

    // Верификация телефона
    public function approvePhoneServ(ApprovePhoneRequest $request){
//        $request->validate([
//            'code' => 'numeric|min:1000|max:9999'
//        ]);
        $profile = Profile::where('user_id', Auth::user()->id)->first();
        if($profile->phone_verify_at){
            return (['success' => false, 'message' => __('locale.profile_phone_already_confirmed')]);
        }
        if(cache()->has('phoneCodeUser'.Auth::user()->id) and cache()->get('phoneCodeUser'.Auth::user()->id) == $request->code){
            Profile::where('user_id', Auth::user()->id)->update(['phone_verify_at' => Carbon::now()]);
            PhoneAttempts::where('phone', $profile->phone)->where('user_id', Auth::user()->id)->delete();
            return (['success' => true]);
        } else {
            return (['success' => false, 'message' => __('locale.profile_code_wrong')]);
        }
    }

    public function sendPhoneCodeServ(SendPhoneCodeRequest $request){
//        $request->validate([
//            'phone' => 'regex:/\+\d{6,20}/'
//        ]);
        if(cache()->has('phoneSent'.Auth::user()->id)){
            return (['success' => false, 'message' => __('locale.profile_once_a_minute_call')]);
        }
        if(Profile::where('user_id', Auth::user()->id)->first()->phone_verify_at){
            return (['success' => false, 'message' => __('locale.profile_phone_already_confirmed')]);
        }
        $phoneAttepmts = PhoneAttempts::where('phone', $request->phone)->where('user_id', Auth::user()->id)->first();
        if($phoneAttepmts and $phoneAttepmts->attempts >= 3){
            return (['success' => false, 'message' => __('locale.profile_phone_limit')]);
        }
        if(Profile::where('phone', $request->phone)->whereNotNull('phone_verify_at')->count()){
            return (['success' => false, 'message' => __('locale.profile_this_phone_cant_confirm')]);
        }
        $sid = env('TWILLIO_SID');
        $token = env('TWILLIO_KEY');
        try {
            $client = new Client($sid, $token);
        } catch (ConfigurationException $e) {
            return (['success' => false, 'message' => __('locale.profile_cant_send_phone')]);
        }
        $model = PhoneAttempts::firstOrNew(['phone' => $request->phone, 'user_id' => Auth::user()->id]);
        $model->increment('attempts');
        $model->save();
        $twilio = TwilioNumber::where('updated_at', '<=', Carbon::now()->subSeconds(20))->inRandomOrder()->first();
        if($twilio){
            $number = $twilio->number;
            TwilioNumber::where('id', $twilio->id)->update(['updated_at' => Carbon::now()]);
        } else {
            return (['success' => false, 'message' => __('locale.profile_cant_call_without_number')]);
        }
        $digits = substr($number, -4);
        cache()->put('phoneCodeUser'.Auth::user()->id, $digits, 900);
        $client->calls->create(
            $request->phone,
            $number, [
                "method" => "POST",
                "statusCallback" => env('APP_URL')."/event-twilio",
                "statusCallbackEvent" => ["ringing","answered"],
                "statusCallbackMethod" => "POST",
                'url' => env('APP_URL').'/mp3'
            ]
        );
        Profile::where('user_id', Auth::user()->id)->update(['phone' => $request->phone]);
        cache()->put('phoneSent'.Auth::user()->id, true, 60);
        return (['success' => true, 'message' => __('locale.profile_call_made')]);
    }

    public function playMP3Serv(Request $request){
        $str = '<Response><Play>'.env('APP_URL').'/data/silence.mp3</Play><Redirect/></Response>';
        return (['Content-Type' => 'application/xml']);
    }

    //Событие начала звонка из twilio
    public function phoneEventServ(Request $request){
        $sid = env('TWILLIO_SID');
        $token = env('TWILLIO_KEY');
        try {
            $client = new Client($sid, $token);
        } catch (ConfigurationException $e) {
            return null;
        }
        $call = $client->calls($request->CallSid)->fetch();
        $call->update(array("Status" => "completed"));
        return null;
    }

    public function sendEmailCodeServ(SendEmailCodeRequest $request){
//        $request->validate([
//            'email' => 'email'
//        ]);
        if(cache()->has('emailSent'.Auth::user()->id)){
            return (['success' => false, 'message' => __('locale.profile_email_once_a_minute')]);
        }
        if(Auth::user()->email_verified_at){
            return (['success' => false, 'message' => __('locale.profile_email_already_confirmed')]);
        }
        $emailAttepmts = EmailAttempts::where('email', $request->email)->where('user_id', Auth::user()->id)->first();
        if($emailAttepmts and $emailAttepmts->attempts >= 10){
            return (['success' => false, 'message' => __('locale.profile_email_limit')]);
        }
        if(User::where('email', $request->email)->whereNotNull('email_verified_at')->count()){
            return (['success' => false, 'message' => __('locale.profile_email_cant_confirm')]);
        }
        $model = EmailAttempts::firstOrNew(['email' => $request->email, 'user_id' => Auth::user()->id]);
        $model->increment('attempts');
        $model->save();
        $token = mt_rand(1000, 9999);
        cache()->put('emailCodeUser'.Auth::user()->id, $token, 900);
        cache()->put('emailAddressUser'.Auth::user()->id.$token, $request->email, 910);
        $mail_data = [
            'headline' => __('locale.profile_confirm_email'),
            'subtitle' =>  __('locale.profile_code_for_confirm'),
            'text' => '<p>'.__('locale.profile_for_activation').'</p><p><h1 style="text-align: center;"><strong>'.$token.'</strong></h1></p><p>'.__('locale.profile_code_valid_15_minutes').'</p>',
            'image' => 'user-reset-password.png',
            'button_link' => env('APP_URL').'/profile',
            'button_text' => __('locale.profile_go_to_cabinet')
        ];
        Mail::send('mail.mail', $mail_data, function($message) use ($request)
        {
            $message->from(env('MAIL_USERNAME'), env('APP_NAME'));
            $message->replyTo(env('MAIL_USERNAME'));
            $message->subject(__('locale.profile_confirm_email'));
            $message->to($request->email);
        });
        cache()->put('emailSent'.Auth::user()->id, true, 60);
        return (['success' => true, 'message' => __('locale.profile_email_sent')]);
    }

    // Верификация емайла
    public function approveEmailServ(ApproveEmailRequest $request){
//        $request->validate([
//            'code' => 'numeric|min:1000|max:9999'
//        ]);
        if(Auth::user()->email_verified_at){
            return (['success' => false, 'message' => __('locale.profile_email_already_confirmed')]);
        }
        if(cache()->has('emailCodeUser'.Auth::user()->id) and cache()->get('emailCodeUser'.Auth::user()->id) == $request->code){
            if(cache()->has('emailAddressUser'.Auth::user()->id.$request->code)){
                $email = cache()->get('emailAddressUser'.Auth::user()->id.$request->code);
            } else {
                return (['success' => false, 'message' => __('locale.profile_cant_confirm_email')]);
            }
            User::where('id', Auth::user()->id)->update(['email' => $email, 'email_verified_at' => Carbon::now()]);
            EmailAttempts::where('email', $email)->where('user_id', Auth::user()->id)->delete();
            if(Auth::user()->referer_id){
                if(User::where('id', Auth::user()->referer_id)->first()->partner_status){
                    User::where('id', Auth::user()->referer_id)->update(['balance' => DB::raw('balance+0.05')]);
                }
                Referral::where('user_id', Auth::user()->referer_id)->increment('active');
            }
            return (['success' => true]);
        } else {
            return (['success' => false, 'message' => __('locale.profile_email_code_wrong')]);
        }
    }

    // Загрузка фото документа
    public function passportFirstPageServ(PassportFirstPageRequest $request){
//        $request->validate([
//            'page' => 'required|min:1|max:3',
//            'file' => 'required|image|max:4096'
//        ]);
        $admin = false;
        if($request->id && Helper::isAdmin()){
            if(config('custom.demo')){
                return (['success' => false, 'message' => __('locale.demo_error')]);
            }
            $admin = true;
        }
        $id = $admin ? $request->id : Auth::user()->id;
        $pages = ['1' => 'document_first_page', '2' => 'document_second_page', '3' => 'document_additional'];
        $profile = Profile::where('user_id', $id)->first();
        if(!$profile->name or !$profile->last_name or !$profile->patronymic or !$profile->birth or !$profile->address or !$profile->document_number){
            return (['success' => false, 'message' => __('locale.profile_before_upload_fill_data'), 'page' => $request->page]);
        }
        $tableDocument = $profile->{$pages[$request->page]};
        $tableVerify = $profile->{$pages[$request->page].'_verify_at'};
        if($tableDocument or $tableVerify){
            return (['success' => false, 'message' => __('locale.profile_document_already_checking'), 'page' => $request->page]);
        }
        try {
            $path = Helper::createPathForVerifyPhotos();
            $fileName = time() . '_' . $request->file->getClientOriginalName();
            $filePath = 'storage/app/'.$request->file('file')->storeAs($path, $fileName);
            $model = new File();
            $model->user_id = Auth::user()->id;
            $model->path = $filePath;
            $model->save();
            Profile::where('user_id', $id)->update([$pages[$request->page] => $model->id]);
        } catch (\Exception $ex){
            return (['success' => false, 'message' => __('locale.profile_error_with_save_file'), 'page' => $request->page]);
        }
        $model = new VerifyRequest();
        $model->user_id = $id;
        $model->page = $request->page;
        $model->save();
        return (['success' => true, 'message' => __('locale.profile_file_send_to_approve'), 'page' => $request->page]);
    }

    public function logoutServ(Request $request){
        Auth::logout();
        return (['success' => true, 'message' => __('locale.profile_logout_successful'), 'page' => $request->page]);
    }
}
