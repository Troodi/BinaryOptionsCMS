<?php

namespace App\Http\Requests\MainHttp\Partner;

use App\Rules\IdIfAdminRule;
use Illuminate\Foundation\Http\FormRequest;

class RequestAgain extends FormRequest
{

    public function rules()
    {
        return [
            'id' => [new IdIfAdminRule]
        ];
    }
}
