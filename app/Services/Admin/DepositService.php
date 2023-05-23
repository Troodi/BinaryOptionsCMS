<?php

namespace App\Services\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Deposit\CreateDepositSystemRequest;
use App\Http\Requests\Admin\Deposit\EditDepositSystemRequest;
use App\Http\Requests\Admin\Deposit\RemoveDepositSystemRequest;
use App\Models\Deposit;
use App\Models\DepositSystem;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;

class DepositService
{
    public function allDepositsServ(Request $request){
        $requests = Deposit::with(['user'])->get();
        return Datatables::of($requests)->make();
    }

    public function allDepositSystemsServ(Request $request){
        return DepositSystem::orderBy('created_at', 'asc')->get();
    }

    public function editDepositSystemServ(EditDepositSystemRequest $request){
        if(config('custom.demo')){
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }

        DepositSystem::where('id', $request->id)->update([
            'text' => $request->system,
            'order' => $request->order,
            'hidden' => $request->active,
        ]);
        return (['success' => true, 'message' => __('locale.admin_deposit_updated')]);
    }

    public function removeDepositSystemServ(RemoveDepositSystemRequest $request){
        if(config('custom.demo')){
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }

        DepositSystem::where('text', $request->system)->delete();
        return (['success' => true, 'message' => __('locale.admin_deposit_deleted')]);
    }

    public function createDepositSystemServ(CreateDepositSystemRequest $request){
        if(config('custom.demo')){
            return (['success' => false, 'message' => __('locale.demo_error')]);
        }

        $model = new DepositSystem();
        $model->text = $request->system;
        $model->order = $request->order;
        $model->hidden = $request->active;
        $model->save();
        return (['success' => true, 'message' => __('locale.admin_deposit_created')]);
    }
}
