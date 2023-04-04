<?php

namespace App\Http\Requests\MainHttp\Deposit;

use Illuminate\Foundation\Http\FormRequest;

class DepositHistoryRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'numeric|min:1'
        ];
    }
}
