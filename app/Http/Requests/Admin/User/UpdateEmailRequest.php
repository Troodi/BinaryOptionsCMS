<?php

namespace App\Http\Requests\Admin\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmailRequest extends FormRequest
{

    public function rules()
    {
        return [
            'email' => 'required|string',
            'id' => 'numeric|min:1'
        ];
    }
}
