<?php

namespace App\Http\Requests\MainHttp\Referral;

use App\Rules\IdIfAdminRule;
use Illuminate\Foundation\Http\FormRequest;

class GetUserRefInfoRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => [new IdIfAdminRule]
        ];
    }
}
