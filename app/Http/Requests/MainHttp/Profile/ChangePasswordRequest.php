<?php

namespace App\Http\Requests\MainHttp\Profile;

use Illuminate\Foundation\Http\FormRequest;

class ChangePasswordRequest extends FormRequest
{

    public function rules()
    {
        return [
            'old_password' =>  'string|min:6|max:255',
            'new_password' =>  'string|min:8|max:255',
            'repeat_password' =>  'string|min:8|max:255',
        ];
    }
}
