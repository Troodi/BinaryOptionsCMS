<?php

namespace App\Http\Requests\MainHttp\Withdrawal;

use Illuminate\Foundation\Http\FormRequest;

class ProcessPayoutRequest extends FormRequest
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
            'amount' => 'required|numeric|min:10|max:100000',
            'system_id' => 'required|numeric|min:1|max:8',
            'address' => 'required|string|min:5|max:155',
            'id' => 'numeric|min:1'
        ];
    }
}
