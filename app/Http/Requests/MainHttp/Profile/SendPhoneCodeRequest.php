<?php

namespace App\Http\Requests\MainHttp\Profile;

use Illuminate\Foundation\Http\FormRequest;

class SendPhoneCodeRequest extends FormRequest
{

    public function rules()
    {
        return [
            'phone' => 'regex:/\+\d{6,20}/'
        ];
    }
}
