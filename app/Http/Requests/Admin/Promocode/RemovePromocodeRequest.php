<?php

namespace App\Http\Requests\Admin\Promocode;

use Illuminate\Foundation\Http\FormRequest;

class RemovePromocodeRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'required|numeric|min:1'
        ];
    }
}
