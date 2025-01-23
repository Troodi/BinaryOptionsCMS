<?php

namespace App\Services\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Symbol\CreateSymbolRequest;
use App\Http\Requests\Admin\Symbol\GetSymbolRequest;
use App\Http\Requests\Admin\Symbol\RemoveSymbolRequest;
use App\Http\Requests\Admin\Symbol\SaveSymbolRequest;
use App\Models\Symbols\Options\Symbol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SymbolService
{
    public function allSymbolsServ(Request $request)
    {
        return Symbol::orderBy('symbol', 'asc')->get();
    }

    public function saveSymbolServ(SaveSymbolRequest $request)
    {
        if(config('custom.demo')){
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }
        $exploded = explode('/', $request->pair);
        if(Symbol::where('symbol', $exploded[0].$exploded[1])->where('broker', $request->broker)->withTrashed()->count()){
            return (['success' => false, 'message' => 'Такая торговая пара уже есть в системе!']);
        }

        Symbol::where('symbol', $exploded[0].$exploded[1])->where('broker', $request->broker)->update([
            'first_symbol' => $exploded[0],
            'second_symbol' => $exploded[1],
            'symbol' => $exploded[0].$exploded[1],
            'broker' => $request->broker,
            'fixed_percent' => $request->fix,
            'min_percent' => $request->min,
            'max_percent' => $request->max,
            'work_from' => $request->work_from,
            'work_to' => $request->work_to,
            'status' => $request->active,
            'min_expiration_time' => $request->min_expiration_time,
            'min_percent_tech' => $request->min_percent_tech,
            'min_percent_news' => $request->min_percent_news,
            'min_percent_user' => $request->min_percent_user,
        ]);
        return (['success' => true, 'message' => __('locale.admin_symbols_updated')]);
    }

    public function getSymbolServ(GetSymbolRequest $request)
    {
        $exploded = explode('/', $request->pair);
        return Symbol::where('symbol', $exploded[0].$exploded[1])->where('broker', $request->broker)->first();
    }

    public function removeSymbolServ(RemoveSymbolRequest $request)
    {
        if(config('custom.demo')){
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }

        Symbol::where('symbol', $request->id)->where('broker', $request->broker)->delete();
        Cache::forever('market_update', true);
        return (['success' => true, 'message' => __('locale.admin_symbols_deleted')]);
    }

    public function createSymbolServ(CreateSymbolRequest $request)
    {
        if(config('custom.demo')){
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }
        $exploded = explode('/', $request->pair);

        if(Symbol::where('symbol', $exploded[0].$exploded[1])->where('broker', $request->broker)->withTrashed()->count()){
            return (['success' => false, 'message' => 'Такая торговая пара уже есть в системе!']);
        }

        $model = new Symbol();
        $model->first_symbol = $exploded[0];
        $model->second_symbol = $exploded[1];
        $model->type = 1;
        $model->percent = $request->fix;
        $model->symbol = $exploded[0].$exploded[1];
        $model->broker = $request->broker;
        $model->fixed_percent = $request->fix;
        $model->min_percent = $request->min;
        $model->max_percent = $request->max;
        $model->work_from = $request->work_from;
        $model->work_to = $request->work_to;
        $model->status = $request->status;
        $model->min_expiration_time = $request->min_expiration_time;
        $model->min_percent_tech = $request->min_percent_tech;
        $model->min_percent_news = $request->min_percent_news;
        $model->min_percent_user = $request->min_percent_user;
        $model->save();
        Cache::forever('market_update', true);
        return (['success' => true, 'message' => __('locale.admin_symbols_created'), 'created' => $model]);
    }
}
