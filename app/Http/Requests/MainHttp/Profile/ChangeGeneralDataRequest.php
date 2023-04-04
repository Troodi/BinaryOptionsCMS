<?php

namespace App\Http\Requests\MainHttp\Profile;

use Illuminate\Foundation\Http\FormRequest;

class ChangeGeneralDataRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'numeric',
            'nickname' => 'string|min:3|max:50|nullable',
            'telegram' => 'string|min:3|max:50|nullable',
            'gender' => 'numeric|min:0|max:1',
            'language' => 'string|min:2|max:50',
        ];
    }
}
