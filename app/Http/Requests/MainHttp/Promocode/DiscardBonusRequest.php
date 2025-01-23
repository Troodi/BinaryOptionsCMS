<?php

namespace App\Http\Requests\MainHttp\Promocode;

use App\Rules\IdIfAdminRule;
use Illuminate\Foundation\Http\FormRequest;

class DiscardBonusRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => [new IdIfAdminRule]
        ];
    }
}
