<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Models\File;
use App\Models\Models\VerifyRequest;
use App\Models\Profile;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;

class VerifyController extends Controller
{
    public function listRequestVerify(Request $request){
      $requests = VerifyRequest::with(['user'])->get();
      return Datatables::of($requests)->make();
    }

  public function checkDocument(Request $request){
    $request->validate([
      'id' => 'numeric|min:1',
      'status' => 'numeric|min:0|max:2',
      'comment' => 'string|nullable',
      'page' => 'numeric|min:1|max:3'
    ]);
    $files = ['1' => 'document_first_page', '2' => 'document_second_page', '3' => 'document_additional'];
    $pages = ['1' => 'document_first_page_verify_at', '2' => 'document_second_page_verify_at', '3' => 'document_additional_verify_at'];
    if($request->status == 1){
      Profile::where('user_id', $request->id)->update([$pages[$request->page] => Carbon::now()]);
    } elseif($request->status == 0){
      Profile::where('user_id', $request->id)->update([$files[$request->page] => null, $pages[$request->page] => null]);
    } elseif($request->status == 2){
      $file_id = Profile::where('user_id', $request->id)->first()->{$files[$request->page]};
      $file = File::where('id', $file_id)->firstOrFail()->path;
      unlink(base_path($file));
      File::where('id', $file_id)->delete();
      Profile::where('user_id', $request->id)->update([$files[$request->page] => null, $pages[$request->page] => null]);
    }
    VerifyRequest::where('user_id', $request->id)->where('page', $request->page)->delete();
    //TODO Добавить сообщение о проверки документа пользователю
    return response()->json(['success' => true, 'message' => 'Действие выполнено успешно!']);
  }

  //Верификация аккаунта
  public function verifyAccount(Request $request){
    $request->validate([
      'id' => 'numeric|min:1'
    ]);
    Profile::where('user_id', $request->id)->update(['user_verify_at' => Carbon::now()]);
    VerifyRequest::where('user_id', $request->id)->delete();
    //TODO Добавить сообщение о верификации пользователю
    return response()->json(['success' => true, 'message' => 'Пользователь успешно верифицирован!']);
  }
}
