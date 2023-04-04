<?php

namespace App\Http\Requests\MainHttp\Partner;

use Illuminate\Foundation\Http\FormRequest;

class RequestAgain extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'numeric|min:1'
        ];
    }
}
