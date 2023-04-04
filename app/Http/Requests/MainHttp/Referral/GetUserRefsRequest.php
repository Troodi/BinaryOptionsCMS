<?php

namespace App\Http\Requests\MainHttp\Referral;

use Illuminate\Foundation\Http\FormRequest;

class GetUserRefsRequest extends FormRequest
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
            'id' => 'numeric|min:1'
        ];
    }
}
