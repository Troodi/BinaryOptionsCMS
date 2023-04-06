<?php

namespace App\Http\Requests\Admin\Deposit;

use Illuminate\Foundation\Http\FormRequest;

class RemoveDepositSystemRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'required|numeric|min:1',
        ];
    }
}
