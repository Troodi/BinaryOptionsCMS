<?php

namespace App\Http\Requests\MainHttp\Promocode;

use App\Rules\IdIfAdminRule;
use Illuminate\Foundation\Http\FormRequest;

class PromocodeHistoryRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => [new IdIfAdminRule]
        ];
    }
}
