<?php

namespace App\Http\Requests\MainHttp\Contest;

use App\Helpers\Helper;
use App\Rules\UserIfAdminIdRule;
use Illuminate\Foundation\Http\FormRequest;

class RegisterOnContestRequest extends FormRequest
{

    public function rules()
    {

        return [
            'contest_id' => 'required|numeric|min:1',
            'user_id' =>  [new UserIfAdminIdRule],
        ];
    }
}
