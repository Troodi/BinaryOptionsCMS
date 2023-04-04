<?php

namespace App\Http\Requests\MainHttp\Contest;

use Illuminate\Foundation\Http\FormRequest;

class RegisterOnContestRequest extends FormRequest
{

    public function rules()
    {
        return [
            'contest_id' => 'required|numeric|min:1',
            'user_id' => 'numeric|min:1'
        ];
    }
}
