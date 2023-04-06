<?php

namespace App\Http\Requests\Admin\Partner;

use Illuminate\Foundation\Http\FormRequest;

class ApprovePartnerRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'numeric|required|min:1'
        ];
    }
}
