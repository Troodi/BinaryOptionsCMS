<?php

namespace App\Http\Requests\MainHttp\Deposit;

use App\Rules\IdIfAdminRule;
use Illuminate\Foundation\Http\FormRequest;

class DepositHistoryRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => [new IdIfAdminRule]
        ];
    }
}
