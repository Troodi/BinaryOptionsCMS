<?php

namespace App\Http\Requests\Admin\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePasswordRequest extends FormRequest
{

    public function rules()
    {
        return [
            'password' => 'required|string|min:8',
            'id' => 'numeric|min:1'
        ];
    }
}
