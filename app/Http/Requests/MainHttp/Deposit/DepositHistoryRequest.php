<?php

namespace App\Http\Requests\MainHttp\Deposit;

use Illuminate\Foundation\Http\FormRequest;

class DepositHistoryRequest extends FormRequest
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
