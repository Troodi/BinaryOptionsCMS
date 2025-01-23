<?php

namespace App\Http\Requests\MainHttp\Deposit;

use Illuminate\Foundation\Http\FormRequest;

class StartDepositRequest extends FormRequest
{

    public function rules()
    {
        return [
            'amount' => 'required|numeric|min:5|max:10000',
            'system_id' => 'required|numeric|min:0'
        ];
    }
}
