<?php

namespace App\Http\Requests\MainHttp\Contest;

use Illuminate\Foundation\Http\FormRequest;

class GetOpenOrdersRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'required|numeric|min:1'
        ];
    }
}
