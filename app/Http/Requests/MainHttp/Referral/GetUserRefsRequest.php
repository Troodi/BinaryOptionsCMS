<?php

namespace App\Http\Requests\MainHttp\Referral;

use App\Rules\IdIfAdminRule;
use App\Rules\UserIfAdminIdRule;
use Illuminate\Foundation\Http\FormRequest;

class GetUserRefsRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => [new IdIfAdminRule]
        ];
    }
}
