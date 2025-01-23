<?php

namespace App\Http\Requests\MainHttp\Trading;

use App\Rules\IdIfAdminRule;
use Illuminate\Foundation\Http\FormRequest;

class DemoTradingHistoryRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => [new IdIfAdminRule]
        ];
    }
}
