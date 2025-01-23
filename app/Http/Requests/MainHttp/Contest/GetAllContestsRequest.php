<?php

namespace App\Http\Requests\MainHttp\Contest;

use App\Rules\UserIfAdminIdRule;
use Illuminate\Foundation\Http\FormRequest;

class GetAllContestsRequest extends FormRequest
{

    public function rules()
    {
        return [
            'user_id' => [new UserIfAdminIdRule]
        ];
    }
}
