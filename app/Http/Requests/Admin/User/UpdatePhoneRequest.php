<?php

namespace App\Http\Requests\Admin\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePhoneRequest extends FormRequest
{

    public function rules()
    {
        return [
            'phone' => 'required|string',
            'id' => 'numeric|min:1'
        ];
    }
}
