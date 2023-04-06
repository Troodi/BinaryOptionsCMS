<?php

namespace App\Http\Requests\Admin\Withdrawal;

use Illuminate\Foundation\Http\FormRequest;

class RemoveWithdrawSystemRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'required|numeric|min:1',
        ];
    }
}
