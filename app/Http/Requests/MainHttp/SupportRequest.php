<?php

namespace App\Http\Requests\MainHttp;

use Illuminate\Foundation\Http\FormRequest;

class SupportRequest extends FormRequest
{

    public function rules()
    {
            return [
                'question' => 'required|string|min:10'
            ];
    }
}
