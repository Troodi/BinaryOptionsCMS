<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Symbols\Options\Symbol;
use Illuminate\Http\Request;

class SymbolController extends Controller
{
  public function allSymbols(Request $request){
    return Symbol::orderBy('id', 'asc')->get();
  }

  public function saveSymbol(Request $request){
    if(config('app.demo')){
      return response()->json(['success' => false, 'message' => __('locale.demo_error')]);
    }
    $request->validate([
      'id' => 'required|numeric|min:1',
      'pair' => 'required|string|min:1',
      'broker' => 'required|string|min:1',
      'fix' => 'required|numeric|min:1|max:100',
      'min' => 'required|numeric|min:1|max:100',
      'max' => 'required|numeric|min:1|max:100',
      'work_from' => 'required|numeric|min:0|max:23',
      'work_to' => 'required|numeric|min:0|max:23',
      'active' => 'required|numeric|min:0|max:1',
    ]);
    Symbol::where('id', $request->id)->update([
      'symbol' => $request->pair,
      'broker' => $request->broker,
      'fixed_percent' => $request->fix,
      'min_percent' => $request->min,
      'max_percent' => $request->max,
      'work_from' => $request->work_from,
      'work_to' => $request->work_to,
      'status' => $request->active,
    ]);
    return response()->json(['success' => true, 'message' => __('locale.admin_symbols_updated')]);
  }

  public function getSymbol(Request $request){
    $request->validate([
      'id' => 'required|integer|min:1'
    ]);
    return Symbol::where('id', $request->id)->first();
  }

  public function removeSymbol(Request $request){
    if(config('app.demo')){
      return response()->json(['success' => false, 'message' => __('locale.demo_error')]);
    }
    $request->validate([
      'id' => 'required|integer|min:1'
    ]);
    Symbol::where('id', $request->id)->delete();
    return response()->json(['success' => true, 'message' => __('locale.admin_symbols_deleted')]);
  }

  public function createSymbol(Request $request){
    if(config('app.demo')){
      return response()->json(['success' => false, 'message' => __('locale.demo_error')]);
    }
    $request->validate([
      'pair' => 'required|string|min:1',
      'broker' => 'required|string|min:1',
      'fix' => 'required|numeric|min:1|max:100',
      'min' => 'required|numeric|min:1|max:100',
      'max' => 'required|numeric|min:1|max:100',
      'work_from' => 'required|numeric|min:0|max:23',
      'work_to' => 'required|numeric|min:0|max:23',
      'status' => 'required|numeric|min:0|max:1',
    ]);
    $model = new Symbol();
    $model->symbol = $request->pair;
    $model->broker = $request->broker;
    $model->fixed_percent = $request->fix;
    $model->min_percent = $request->min;
    $model->max_percent = $request->max;
    $model->work_from = $request->work_from;
    $model->work_to = $request->work_to;
    $model->status = $request->status;
    $model->save();
    return response()->json(['success' => true, 'message' => __('locale.admin_symbols_created'), 'created' => $model]);
  }
}
