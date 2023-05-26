<?php

namespace App\Http\Requests\Admin\Symbol;

use Illuminate\Foundation\Http\FormRequest;

class RemoveSymbolRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'required|string|min:1'
        ];
    }
}
