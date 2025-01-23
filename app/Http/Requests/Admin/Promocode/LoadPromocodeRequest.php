<?php

namespace App\Http\Requests\Admin\Promocode;

use Illuminate\Foundation\Http\FormRequest;

class LoadPromocodeRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'required|numeric|min:1'
        ];
    }
}
