<?php

namespace App\Http\Requests\MainHttp\Partner;

use App\Rules\IdIfAdminRule;
use Illuminate\Foundation\Http\FormRequest;

class SendPartnerRequest extends FormRequest
{

    public function rules()
    {
        return [
            'telegram' => 'string|min:3|max:255',
            'comment' => 'string|min:20|max:500',
            'traffic' => 'required|numeric|min:0|max:4',
            'id' => [new IdIfAdminRule]
        ];
    }
}
