<?php

namespace App\Http\Requests\MainHttp\Profile;

use Illuminate\Foundation\Http\FormRequest;

class PassportFirstPageRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'numeric|min:1',
            'page' => 'required|min:1|max:3',
            'file' => 'required|image|max:4096'
        ];
    }
}
