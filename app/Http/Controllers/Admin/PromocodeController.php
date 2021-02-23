<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Promocode;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;

class PromocodeController extends Controller
{
    public function getAllPromocode(Request $request){
      return Datatables::of(Promocode::all())->make();
    }

    public function loadPromocode(Request $request){
      $request->validate(['id' => 'required|numeric|min:1']);
      return Promocode::where('id', $request->id)->first();
    }

    public function removePromocode(Request $request){
      $request->validate(['id' => 'required|numeric|min:1']);
      Promocode::where('id', $request->id)->delete();
      return response()->json(['success' => true, 'message' => __('locale.admin_promocodes_deleted')]);
    }

    public function savePromocode(Request $request){
      $request->validate([
        'id' => 'numeric|required|min:0',
        'code' => 'required',
        'image' => 'nullable',
        'bonus_size' => 'numeric|min:0',
        'turnover' => 'required|numeric|min:0',
        'times' => 'numeric|min:0|nullable',
        'min_deposit' => 'numeric|min:0|nullable',
        'desc' => 'required',
        'from_date' => 'required',
        'to_date' => 'required',
        'value_public_options' => 'required|min:1|max:2',
        'value_new_options' => 'required|min:0|max:1',
        'value_type_options' => 'required|min:1|max:2',
      ]);
      Promocode::where('id', $request->id)->update([
        'description' => $request->desc,
        'bonus_size' => $request->bonus_size,
        'code' => $request->code,
        'image' => $request->image,
        'public_code' => $request->value_public_options,
        'for_new' => $request->value_new_options,
        'attempts' => $request->times,
        'type' => $request->value_type_options,
        'turnover' => $request->turnover,
        'min_amount' => $request->min_deposit,
        'active_from' => Carbon::parse($request->from_date),
        'active_to' => Carbon::parse($request->to_date),
      ]);
      return response()->json(['success' => true, 'message' => __('locale.admin_promocodes_updated')]);
    }

  public function createPromocode(Request $request){
    $request->validate([
      'code' => 'required',
      'image' => 'nullable',
      'bonus_size' => 'numeric|min:0',
      'turnover' => 'required|numeric|min:0',
      'times' => 'numeric|min:0|nullable',
      'min_deposit' => 'numeric|min:0|nullable',
      'desc' => 'required',
      'from_date' => 'required',
      'to_date' => 'required',
      'value_public_options' => 'required|min:1|max:2',
      'value_new_options' => 'required|min:0|max:1',
      'value_type_options' => 'required|min:1|max:2',
    ]);
    $model = new Promocode;
    $model->description = $request->desc;
    $model->bonus_size = $request->bonus_size;
    $model->code = $request->code;
    $model->image = $request->image;
    $model->public_code = $request->value_public_options;
    $model->for_new = $request->value_new_options;
    $model->attempts = $request->times;
    $model->type = $request->value_type_options;
    $model->turnover = $request->turnover;
    $model->min_amount = $request->min_deposit;
    $model->active_from = Carbon::parse($request->from_date);
    $model->active_to = Carbon::parse($request->to_date);
    $model->save();
    return response()->json(['success' => true, 'message' => __('locale.admin_promocodes_created'), 'data' => $model]);
  }
}
