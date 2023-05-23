<?php

namespace App\Http\Requests\Admin\Deposit;

use Illuminate\Foundation\Http\FormRequest;

class CreateDepositSystemRequest extends FormRequest
{

    public function rules()
    {
        return [
            'system' => 'unique|required|string|min:1',
            'order' => 'numeric|min:0|nullable',
            'active' => 'required|numeric|min:0|max:1',
        ];
    }
}
