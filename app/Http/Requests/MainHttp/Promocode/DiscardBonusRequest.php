<?php

namespace App\Http\Requests\MainHttp\Promocode;

use Illuminate\Foundation\Http\FormRequest;

class DiscardBonusRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'numeric|min:1'
        ];
    }
}
