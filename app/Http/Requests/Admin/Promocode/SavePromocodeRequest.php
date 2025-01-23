<?php

namespace App\Http\Requests\Admin\Promocode;

use Illuminate\Foundation\Http\FormRequest;

class SavePromocodeRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'numeric|required|min:0',
            'code' => 'required',
            'image' => 'nullable',
            'bonus_size' => 'numeric|min:0',
            'turnover' => 'required|numeric|min:0',
            'times' => 'numeric|min:0|nullable',
            'min_deposit' => 'numeric|min:0|nullable',
            'desc' => 'required',
            'from_date' => 'required',
            'to_date' => 'required',
            'value_public_options' => 'required|min:1|max:2',
            'value_new_options' => 'required|min:0|max:1',
            'value_type_options' => 'required|min:1|max:2',
        ];
    }
}
