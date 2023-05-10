<?php

namespace App\Services\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Promocode\CreatePromocodeRequest;
use App\Http\Requests\Admin\Promocode\LoadPromocodeRequest;
use App\Http\Requests\Admin\Promocode\RemovePromocodeRequest;
use App\Http\Requests\Admin\Promocode\SavePromocodeRequest;
use App\Models\Promocode;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;

class PromocodeService
{
    public function getAllPromocodeServ(Request $request)
    {
        return Datatables::of(Promocode::all())->make();
    }

    public function loadPromocodeServ(LoadPromocodeRequest $request)
    {
        return Promocode::where('id', $request->id)->first();
    }

    public function removePromocodeServ(RemovePromocodeRequest $request)
    {
        Promocode::where('id', $request->id)->delete();
        return (['success' => true, 'message' => __('locale.admin_promocodes_deleted')]);
    }

    public function savePromocodeServ(SavePromocodeRequest $request)
    {
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
        return (['success' => true, 'message' => __('locale.admin_promocodes_updated')]);
    }

    public function createPromocodeServ(CreatePromocodeRequest $request)
    {
        $isset_description = false;
        foreach ($request->desc as $description) {
            if (strlen($description) > 0) {
                $isset_description = true;
                break;
            }
        }
        if (!$isset_description) {
            return (['success' => false, 'message' => __('locale.admin_tournament_desc')]);
        }
            $model = new Promocode;
            $model->description = serialize($request->desc);
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
            return (['success' => true, 'message' => __('locale.admin_promocodes_created'), 'data' => $model]);
        }
}
