<?php

namespace App\Http\Requests\Admin\Deposit;

use Illuminate\Foundation\Http\FormRequest;

class EditDepositSystemRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'required|numeric|min:1',
            'newId' => 'required|numeric|min:1',
            'system' => 'required|string|min:1',
            'order' => 'numeric|min:0|nullable',
            'active' => 'required|numeric|min:0|max:1',
        ];
    }
}
