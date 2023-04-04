<?php

namespace App\Http\Requests\MainHttp\Promocode;

use Illuminate\Foundation\Http\FormRequest;

class PromocodeHistoryRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'numeric|min:1'
        ];
    }
}
