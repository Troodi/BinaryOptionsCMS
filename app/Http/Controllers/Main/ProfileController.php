<?php

namespace App\Http\Controllers\Main;

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
use App\Services\MainHttp\ProfileService;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Twilio\Exceptions\ConfigurationException;
use Twilio\Rest\Client;

class ProfileController extends Controller
{
  // Изменение пароля
  public function changePassword(ChangePasswordRequest $request, ProfileService $profileService)
  {
      return response()->json($profileService->changePasswordServ($request));
  }

  // Изменение основных данных
  public function changeGeneralData(ChangeGeneralDataRequest $request, ProfileService $profileService)
  {
      return response()->json($profileService->changeGeneralDataServ($request));
  }

  // Изменение личных данных
  public function changeMainData(ChangeMainDataRequest $request, ProfileService $profileService)
  {
      return response()->json($profileService->changeMainDataServ($request));
  }

  //Загружаем информацию о профиле
  public function loadAllProfileData(LoadAllProfileDataRequest $request, ProfileService $profileService)
  {
      return response()->json($profileService->loadAllProfileDataServ($request));
  }

  // Верификация телефона
  public function approvePhone(ApprovePhoneRequest $request, ProfileService $profileService)
  {
      return response()->json($profileService->approvePhoneServ($request));
  }

  public function sendPhoneCode(SendPhoneCodeRequest $request, ProfileService $profileService)
  {
      return response()->json($profileService->sendPhoneCodeServ($request));
  }

  public function playMP3(Request $request, ProfileService $profileService)
  {
      return response()->json($profileService->playMP3Serv($request));
  }

  //Событие начала звонка из twilio
  public function phoneEvent(Request $request, ProfileService $profileService)
  {
      return response()->json($profileService->phoneEventServ($request));
  }

  public function sendEmailCode(SendEmailCodeRequest $request, ProfileService $profileService)
  {
      return response()->json($profileService->sendEmailCodeServ($request));
  }

  // Верификация емайла
  public function approveEmail(ApproveEmailRequest $request, ProfileService $profileService)
  {
      return response()->json($profileService->approveEmailServ($request));
  }

  // Загрузка фото документа
  public function passportFirstPage(PassportFirstPageRequest $request, ProfileService $profileService)
  {
      return response()->json($profileService->passportFirstPageServ($request));
  }

  public function logout(Request $request, ProfileService $profileService)
  {
      return response()->json($profileService->logoutServ($request));
  }
}
