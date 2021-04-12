<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Admin\TradeHistoryController;
use App\Models\Contest;
use App\Models\ContestUser;
use App\Models\SymbolContestStatistic;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class ContestController extends Controller
{
    /*
     * Create or update contest
     */
    public function createContest(Request $request){
        $request->validate([
            'id' => 'numeric|nullable',
            'title' => 'array',
            'description' => 'array',
            'places' => 'array',
            'show_registered' => 'required|numeric|min:0|max:1',
            'initial_balance' => 'required|numeric|min:1',
            'initial_cost' => 'required|numeric|min:0',
            'additional_cost' => 'required|numeric|min:0',
            'max_bought_balance' => 'required|numeric|min:1',
            'hidden' => 'required|numeric|min:0|max:1',
            'type' => 'required|numeric|min:1|max:3',
            'started_at' => 'required|string|min:1',
            'ended_at' => 'required|string|min:1',
            'new' => 'required|numeric|min:0|max:1',
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
        if($request->new == 1) {
          $model = new Contest();
          $model->title = serialize($request->title);
          $model->description = serialize($request->description);
          $model->places = serialize($request->places);
          $model->initial_balance = $request->initial_balance;
          $model->initial_cost = $request->initial_cost;
          $model->additional_cost = $request->additional_cost;
          $model->max_bought_balance = $request->max_bought_balance;
          $model->show_registered = $request->show_registered;
          $model->hidden = $request->hidden;
          $model->type = $request->type;
          $model->started_at = Carbon::parse($request->started_at);
          $model->ended_at = Carbon::parse($request->ended_at);
          $model->save();
          return response()->json(['success' => true, 'message' => 'Конкурс успешно создан!', 'data' => $model]);
        } else {
          Contest::where('id', $request->id)->update([
            'title' => serialize($request->title),
            'description' => serialize($request->description),
            'places' => serialize($request->places),
            'initial_balance' => $request->initial_balance,
            'initial_cost' => $request->initial_cost,
            'additional_cost' => $request->additional_cost,
            'max_bought_balance' => $request->max_bought_balance,
            'show_registered' => $request->show_registered,
            'hidden' => $request->hidden,
            'type' => $request->type,
            'started_at' => Carbon::parse($request->started_at),
            'ended_at' => Carbon::parse($request->ended_at),
          ]);
          return response()->json(['success' => true, 'message' => 'Конкурс успешно обновлен!']);
        }
    }

    /*
     * Get data for specific contest by id
     */
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

    /*
     * Get all contests
     */
    public function contestAll(Request $request){
      return Datatables::of(Contest::all())->make();
    }

    /*
     * Get users of specific contest by id
     */
    public function contestUsers(Request $request){
      $request->validate([
        'id' => 'required|numeric|min:1'
      ]);
      return Datatables::of(ContestUser::all())->make();
    }

    /*
     * Get user data for contest by user ID and contest ID
     */
    public function getContestUserData(Request $request){
      $request->validate([
        'user_id' => 'required|numeric|min:1',
        'contest_id' => 'required|numeric|min:1'
      ]);
    }

    /*
     * Get trading history of specific contest by id
     */
    public function getContestTradingData(Request $request){
      $request->validate([
        'id' => 'numeric'
      ]);
      $table = 'contest_histories';
      $id = null;
      if(isset($request->id)){
        $request->validate(['id' => 'required|numeric|min:0']);
        $id = $request->id;
      }
      return TradeHistoryController::getHistoryDatatable($table, $id);
    }

  public function getContestDailyStat(Request $request){
    $daily = SymbolContestStatistic::select(
      DB::raw('SUM(daily_orders_count) AS daily_orders_count'),
      DB::raw('SUM(daily_orders_amount) AS daily_orders_amount'),
      DB::raw('SUM(daily_profit) AS daily_profit'),
      DB::raw('SUM(daily_loss) AS daily_loss'),
      DB::raw('SUM(daily_profit_count) AS daily_profit_count'),
      DB::raw('SUM(daily_loss_count) AS daily_loss_count'),
      DB::raw('CAST(created_at AS DATE) created_at')
    )
      ->groupBy(DB::raw('CAST(created_At AS DATE)'))
      ->orderBy('created_at', 'desc')
      ->get();
    return Datatables::of($daily)->make();
  }
}
