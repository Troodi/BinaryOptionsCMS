<?php

namespace App\Http\Requests\Admin\Contest;

use Illuminate\Foundation\Http\FormRequest;

class LoadContestDataRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'required|numeric|min:1'
        ];
    }
}
