<?php

namespace App\Http\Requests\Admin\Verify;

use Illuminate\Foundation\Http\FormRequest;

class VerifyAccountRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'numeric|min:1'
        ];
    }
}
