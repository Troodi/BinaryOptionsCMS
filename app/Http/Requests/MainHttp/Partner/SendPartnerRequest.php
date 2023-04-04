<?php

namespace App\Http\Requests\MainHttp\Partner;

use Illuminate\Foundation\Http\FormRequest;

class SendPartnerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'telegram' => 'string|min:3|max:255',
            'comment' => 'string|min:20|max:500',
            'traffic' => 'required|numeric|min:0|max:4',
            'id' => 'numeric|min:1'
        ];
    }
}
