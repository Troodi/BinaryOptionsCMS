<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Deposit;
use App\Models\DepositSystem;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;

class DepositController extends Controller
{
  public function allDeposits(Request $request){
    $requests = Deposit::with(['user'])->get();
    return Datatables::of($requests)->make();
  }

  public function allDepositSystems(Request $request){
    return DepositSystem::orderBy('id', 'asc')->get();
  }

  public function editDepositSystem(Request $request){
    if(config('app.demo')){
      return response()->json(['success' => false, 'message' => __('locale.demo_error')]);
    }
    $request->validate([
      'id' => 'required|numeric|min:1',
      'newId' => 'required|numeric|min:1',
      'system' => 'required|string|min:1',
      'order' => 'numeric|min:0|nullable',
      'active' => 'required|numeric|min:0|max:1',
    ]);
    DepositSystem::where('id', $request->id)->update([
      'id' => $request->newId,
      'text' => $request->system,
      'order' => $request->order,
      'hidden' => $request->active,
    ]);
    return response()->json(['success' => true, 'message' => 'Данные успешно обновлены!']);
  }

  public function removeDepositSystem(Request $request){
    if(config('app.demo')){
      return response()->json(['success' => false, 'message' => __('locale.demo_error')]);
    }
    $request->validate([
      'id' => 'required|numeric|min:1',
    ]);
    DepositSystem::where('id', $request->id)->delete();
    return response()->json(['success' => true, 'message' => 'Система успешно удалена!']);
  }

  public function createDepositSystem(Request $request){
    if(config('app.demo')){
      return response()->json(['success' => false, 'message' => __('locale.demo_error')]);
    }
    $request->validate([
      'system' => 'required|string|min:1',
      'order' => 'numeric|min:0|nullable',
      'active' => 'required|numeric|min:0|max:1',
    ]);
    $model = new DepositSystem();
    $model->text = $request->system;
    $model->order = $request->order;
    $model->hidden = $request->active;
    $model->save();
    return response()->json(['success' => true, 'message' => 'Система успешно создана!']);
  }
}
