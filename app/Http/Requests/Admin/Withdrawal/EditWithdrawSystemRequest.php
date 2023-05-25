<?php

namespace App\Http\Requests\Admin\Withdrawal;

use App\Rules\WithdrawTextRule;
use Illuminate\Foundation\Http\FormRequest;

class EditWithdrawSystemRequest extends FormRequest
{

    public function rules()
    {
        return [
            'description' => 'required|string|min:1|max:255',
            'prevText' => 'required|string|min:1|max:255|exists:deposit_systems,text',
            'text' => ['required', 'min:1', 'max:255', new WithdrawTextRule],
            'order' => 'numeric|min:0|nullable',
            'active' => 'required|numeric|min:0|max:1',
        ];
    }
}
