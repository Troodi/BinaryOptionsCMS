<?php

namespace App\Http\Requests\MainHttp\Withdrawal;

use App\Rules\IdIfAdminRule;
use App\Rules\UserIfAdminIdRule;
use Illuminate\Foundation\Http\FormRequest;

class ProcessPayoutRequest extends FormRequest
{

    public function rules()
    {
        return [
            'amount' => 'required|numeric|min:10|max:100000',
            'system_id' => 'required|string|min:1|max:255',
            'address' => 'required|string|min:5|max:155',
            'id' => [new IdIfAdminRule]
        ];
    }
}
