<?php

namespace App\Http\Requests\MainHttp\Contest;

use Illuminate\Foundation\Http\FormRequest;

class GetAllContestsRequest extends FormRequest
{

    public function rules()
    {
        return [
            'user_id' => 'numeric|min:1'
        ];
    }
}
