<?php

namespace App\Http\Requests\MainHttp\Withdrawal;

use Illuminate\Foundation\Http\FormRequest;

class WithdrawalHistoryRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'numeric|min:1'
        ];
    }
}
