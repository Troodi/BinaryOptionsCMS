<?php

namespace App\Http\Requests\MainHttp\Profile;

use App\Rules\IdIfAdminRule;
use Illuminate\Foundation\Http\FormRequest;

class PassportFirstPageRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => [new IdIfAdminRule],
            'page' => 'required|min:1|max:3',
            'file' => 'required|image|max:4096'
        ];
    }
}
