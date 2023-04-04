<?php

namespace App\Http\Requests\MainHttp\Trading;

use Illuminate\Foundation\Http\FormRequest;

class DemoTradingHistoryRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'numeric|min:1'
        ];
    }
}
