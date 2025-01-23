<?php

namespace App\Http\Requests\MainHttp\Profile;

use App\Rules\IdIfAdminRule;
use Illuminate\Foundation\Http\FormRequest;

class LoadAllProfileDataRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => [new IdIfAdminRule]
        ];
    }
}
