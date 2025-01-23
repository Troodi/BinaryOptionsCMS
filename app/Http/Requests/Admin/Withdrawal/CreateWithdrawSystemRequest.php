<?php

namespace App\Http\Requests\Admin\Withdrawal;

use Illuminate\Foundation\Http\FormRequest;

class CreateWithdrawSystemRequest extends FormRequest
{

    public function rules()
    {
        return [
            'description' => 'required|string|min:1|max:255',
            'system' => 'unique:withdraw_systems,text|required|string|min:1',
            'order' => 'numeric|min:0|nullable',
            'active' => 'required|numeric|min:0|max:1',
        ];
    }
}
