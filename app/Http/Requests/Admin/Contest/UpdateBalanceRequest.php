<?php

namespace App\Http\Requests\Admin\Contest;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBalanceRequest extends FormRequest
{

    public function rules()
    {
        return [
            'balance' => 'numeric|required',
            'action' => 'numeric|required|min:0|max:2'
        ];
    }
}
