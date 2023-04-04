<?php

namespace App\Http\Requests\MainHttp\Contest;

use Illuminate\Foundation\Http\FormRequest;

class GetLatestOrdersRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'required|numeric|min:1'
        ];
    }
}
