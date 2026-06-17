<?php

namespace App\Http\Requests\Admin\Deposit;

use App\Rules\DepositEditRule;
use App\Rules\DepositTextRule;
use Illuminate\Foundation\Http\FormRequest;

class EditDepositSystemRequest extends FormRequest
{

    public function rules()
    {
        return [
            'description' => 'required|string|min:1|max:255',
            'prevText' => 'required|string|min:1|max:255|exists:deposit_systems,text',
            'text' => ['required', 'min:1', 'max:255', new DepositTextRule],
            'order' => 'numeric|min:0|nullable',
            'active' => 'required|numeric|min:0|max:1',
        ];
    }
}
