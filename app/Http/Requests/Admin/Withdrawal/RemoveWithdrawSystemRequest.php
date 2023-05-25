<?php

namespace App\Http\Requests\Admin\Withdrawal;

use Illuminate\Foundation\Http\FormRequest;

class RemoveWithdrawSystemRequest extends FormRequest
{

    public function rules()
    {
        return [
            'text' => 'required|string|min:1',
        ];
    }
}
