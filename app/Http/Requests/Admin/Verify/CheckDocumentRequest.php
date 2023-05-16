<?php

namespace App\Http\Requests\Admin\Verify;

use Illuminate\Foundation\Http\FormRequest;

class CheckDocumentRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'numeric|min:1',
            'status' => 'numeric|min:0|max:2',
            'comment' => 'string|nullable',
            'page' => 'numeric|min:1|max:3'
        ];
    }
}
