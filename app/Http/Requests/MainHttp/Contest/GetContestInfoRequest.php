<?php

namespace App\Http\Requests\MainHttp\Contest;

use App\Rules\UserIfAdminIdRule;
use Illuminate\Foundation\Http\FormRequest;

class GetContestInfoRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'required|numeric|min:1',
            'user_id' => [new UserIfAdminIdRule]
        ];
    }
}
