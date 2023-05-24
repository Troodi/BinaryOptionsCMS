<?php

namespace App\Http\Requests\Admin\Deposit;

use Illuminate\Foundation\Http\FormRequest;

class EditDepositSystemRequest extends FormRequest
{

    public function rules()
    {
        return [
            'prevText' => 'exists:deposit_systems,text|required|string|min:1',
            'text' => 'unique:deposit_systems,text|required|string|min:1',
            'order' => 'numeric|min:0|nullable',
            'active' => 'required|numeric|min:0|max:1',
        ];
    }
}
