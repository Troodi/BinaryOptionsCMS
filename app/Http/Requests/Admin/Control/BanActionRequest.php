<?php

namespace App\Http\Requests\Admin\Control;

use Illuminate\Foundation\Http\FormRequest;

class BanActionRequest extends FormRequest
{

    public function rules()
    {
        return [
            'action' => 'numeric|required|min:0|max:4'
        ];
    }
}
