<?php

namespace App\Http\Requests\Admin\Symbol;

use Illuminate\Foundation\Http\FormRequest;

class GetSymbolRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'required|integer|min:1'
        ];
    }
}
