<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Verify\CheckDocumentRequest;
use App\Http\Requests\Admin\Verify\UnVerifyAccountRequest;
use App\Http\Requests\Admin\Verify\VerifyAccountRequest;
use App\Models\Models\File;
use App\Models\Models\VerifyRequest;
use App\Models\Profile;
use App\Services\Admin\VerifyService;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Yajra\DataTables\DataTables;

class VerifyController extends Controller
{
    public function listRequestVerify(Request $request, VerifyService $verifyService)
    {
        return response()->json($verifyService->listRequestVerifyServ($request));
    }

  public function checkDocument(CheckDocumentRequest $request, VerifyService $verifyService)
  {
      return response()->json($verifyService->checkDocumentServ($request));
  }

  //Верификация аккаунта
  public function verifyAccount(VerifyAccountRequest $request, VerifyService $verifyService)
  {
      return response()->json($verifyService->verifyAccountServ($request));
  }

  //Снятие верификации аккаунта
  public function unVerifyAccount(UnVerifyAccountRequest $request, VerifyService $verifyService)
  {
      return response()->json($verifyService->unVerifyAccountServ($request));
  }
}
