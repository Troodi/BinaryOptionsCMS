<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\GetUserRequest;
use App\Http\Requests\Admin\User\UpdateEmailRequest;
use App\Http\Requests\Admin\User\UpdatePasswordRequest;
use App\Http\Requests\Admin\User\UpdatePhoneRequest;
use App\Models\Models\VerifyRequest;
use App\Models\Profile;
use App\Services\Admin\UserService;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
  // Верификация телефона
  public function updatePhone(UpdatePhoneRequest $request, UserService $userService)
  {
      return response()->json($userService->updatePhoneServ($request));
  }

  // Верификация почты
  public function updateEmail(UpdateEmailRequest $request, UserService $userService)
  {
      return response()->json($userService->updateEmailServ($request));
  }

  //Обновление пароля
  public function updatePassword(UpdatePasswordRequest $request, UserService $userService)
  {
      return response()->json($userService->updatePasswordServ($request));
  }

  public function getUser(GetUserRequest $request, UserService $userService)
  {
      return response()->json($userService->getUserServ($request));
  }
}
