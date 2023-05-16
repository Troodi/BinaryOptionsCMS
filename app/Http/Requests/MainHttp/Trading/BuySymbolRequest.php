<?php

namespace App\Http\Requests\MainHttp\Trading;

use App\Rules\IssetSymbolRule;
use Illuminate\Foundation\Http\FormRequest;

class BuySymbolRequest extends FormRequest
{

    public function rules()
    {
        return [
            'hours' => 'numeric|min:0|max:12',
            'minutes' => 'numeric|min:0|max:59',
            'seconds' => 'numeric|min:0|max:59',
            'symbol' => [new IssetSymbolRule],
            'amount' => 'numeric|min:1',
            'direction' => 'numeric|min:0|max:1',
            'type' => 'required',
        ];
    }
}
