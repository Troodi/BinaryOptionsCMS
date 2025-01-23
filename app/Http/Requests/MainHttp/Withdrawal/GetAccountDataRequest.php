<?php

namespace App\Http\Requests\MainHttp\Withdrawal;

use App\Rules\IdIfAdminRule;
use App\Rules\UserIfAdminIdRule;
use Illuminate\Foundation\Http\FormRequest;

class GetAccountDataRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => [new IdIfAdminRule]
        ];
    }
}
