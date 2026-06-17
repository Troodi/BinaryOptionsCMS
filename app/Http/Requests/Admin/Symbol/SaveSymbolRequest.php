<?php

namespace App\Http\Requests\Admin\Symbol;

use Illuminate\Foundation\Http\FormRequest;

class SaveSymbolRequest extends FormRequest
{

    public function rules()
    {
        return [
            'pair' => 'required|string|min:1',
            'broker' => 'required|string|min:1',
            'fix' => 'required|numeric|min:1|max:100',
            'min' => 'required|numeric|min:1|max:100',
            'max' => 'required|numeric|min:1|max:100',
            'work_from' => 'required|numeric|min:0|max:23',
            'work_to' => 'required|numeric|min:0|max:23',
            'active' => 'required|numeric|min:0|max:1',
            'min_expiration_time' => 'required|min:1|max:100000|numeric',
            'min_percent_tech' => 'required|min:0|max:100|numeric',
            'min_percent_news' => 'required|min:0|max:100|numeric',
            'min_percent_user' => 'required|min:0|max:100|numeric',
        ];
    }
}
