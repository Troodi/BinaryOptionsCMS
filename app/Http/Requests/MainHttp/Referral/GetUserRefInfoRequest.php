<?php

namespace App\Http\Requests\MainHttp\Referral;

use Illuminate\Foundation\Http\FormRequest;

class GetUserRefInfoRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'numeric|min:1'
        ];
    }
}
