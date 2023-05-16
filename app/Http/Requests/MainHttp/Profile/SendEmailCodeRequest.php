<?php

namespace App\Http\Requests\MainHttp\Profile;

use Illuminate\Foundation\Http\FormRequest;

class SendEmailCodeRequest extends FormRequest
{

    public function rules()
    {
        return [
            'email' => 'email'
        ];
    }
}
