<?php

namespace App\Http\Requests\Admin\Control;

use Illuminate\Foundation\Http\FormRequest;

class ChangeBalanceRequest extends FormRequest
{

    public function rules()
    {
        return [
            'balance' => 'numeric|required',
            'action' => 'numeric|required|min:0|max:2'
        ];
    }
}
