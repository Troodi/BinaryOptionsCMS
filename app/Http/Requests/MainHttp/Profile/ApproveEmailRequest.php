<?php

namespace App\Http\Requests\MainHttp\Profile;

use Illuminate\Foundation\Http\FormRequest;

class ApproveEmailRequest extends FormRequest
{

    public function rules()
    {
        return [
            'code' => 'numeric|min:1000|max:9999'
        ];
    }
}
