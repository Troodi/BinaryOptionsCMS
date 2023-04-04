<?php

namespace App\Http\Requests\MainHttp\Promocode;

use Illuminate\Foundation\Http\FormRequest;

class CheckPromocodeRequest extends FormRequest
{

    public function rules()
    {
        return [
            'code' => 'string|min:1|max:255',
            'id' => 'numeric|min:1'
        ];
    }
}
