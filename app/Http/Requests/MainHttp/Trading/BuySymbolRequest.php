<?php

namespace App\Http\Requests\MainHttp\Trading;

use Illuminate\Foundation\Http\FormRequest;

class BuySymbolRequest extends FormRequest
{

    public function rules()
    {
        return [
            'hours' => 'numeric|min:0|max:12',
            'minutes' => 'numeric|min:0|max:59',
            'seconds' => 'numeric|min:0|max:59',
            'symbol' => 'numeric|min:0',
            'amount' => 'numeric|min:1',
            'direction' => 'numeric|min:0|max:1',
            'type' => 'required',
            'id' => 'required|numeric|min:0'
        ];
    }
}
