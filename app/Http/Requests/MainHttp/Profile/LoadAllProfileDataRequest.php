<?php

namespace App\Http\Requests\MainHttp\Profile;

use Illuminate\Foundation\Http\FormRequest;

class LoadAllProfileDataRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'numeric|min:1'
        ];
    }
}
