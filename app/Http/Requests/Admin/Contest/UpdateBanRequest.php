<?php

namespace App\Http\Requests\Admin\Contest;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBanRequest extends FormRequest
{

    public function rules()
    {
        return [
            'action' => 'numeric|required|min:0|max:1'
        ];
    }
}
