<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contest;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ContestController extends Controller
{
    public function createContest(Request $request){
        $request->validate([
            'title' => 'array',
            'description' => 'array',
            'places' => 'array',
            'initial_balance' => 'required|numeric|min:1',
            'initial_cost' => 'required|numeric|min:0',
            'additional_cost' => 'required|numeric|min:0',
            'max_bought_balance' => 'required|numeric|min:1',
            'hidden' => 'required|numeric|min:0|max:1',
            'type' => 'required|numeric|min:1|max:3',
            'started_at' => 'required|string|min:1',
            'ended_at' => 'required|string|min:1',
        ]);
        $isset_title = false;
        foreach($request->title as $name){
            if(strlen($name)>0){
                $isset_title = true;
                break;
            }
        }
        if(!$isset_title){
            return response()->json(['success' => false, 'message' => 'Необходимо заполнить заголовок конкурса!']);
        }
        $isset_description = false;
        foreach($request->description as $description){
            if(strlen($description)>0){
                $isset_description = true;
                break;
            }
        }
        if(!$isset_description){
            return response()->json(['success' => false, 'message' => 'Необходимо заполнить описание конкурса!']);
        }
        $model = new Contest();
        $model->title = serialize($request->title);
        $model->description = serialize($request->description);
        $model->places = serialize($request->places);
        $model->initial_balance = $request->initial_balance;
        $model->initial_cost = $request->initial_cost;
        $model->additional_cost = $request->additional_cost;
        $model->max_bought_balance = $request->max_bought_balance;
        $model->hidden = $request->hidden;
        $model->type = $request->type;
        $model->started_at = Carbon::parse($request->started_at);
        $model->ended_at = Carbon::parse($request->ended_at);
        $model->save();
        return response()->json(['success' => true, 'message' => 'Конкурс успешно создан!', 'data' => $model]);
    }

    public function loadContestData(Request $request){
      $request->validate([
        'id' => 'required|numeric|min:1'
      ]);
      $data = Contest::where('id', $request->id)->first();
      $data->title = unserialize($data->title);
      $data->description = unserialize($data->description);
      $data->places = unserialize($data->places);
      return $data;
    }
}
