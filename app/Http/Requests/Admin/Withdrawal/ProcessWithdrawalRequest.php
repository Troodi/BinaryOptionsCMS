<?php

namespace App\Http\Requests\Admin\Withdrawal;

use Illuminate\Foundation\Http\FormRequest;

class ProcessWithdrawalRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'required|integer|min:1',
            'text' => 'required|string|min:1',
            'status' => 'numeric|min:1|max:2',
            'comment' => 'string|nullable'
        ];
    }
}
