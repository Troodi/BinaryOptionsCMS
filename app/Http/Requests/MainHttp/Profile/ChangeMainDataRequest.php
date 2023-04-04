<?php

namespace App\Http\Requests\MainHttp\Profile;

use Illuminate\Foundation\Http\FormRequest;

class ChangeMainDataRequest extends FormRequest
{

   public $admin = true;

    public function rules($admin)
    {
        return [
            'id' => 'numeric|min:1',
            'name' => 'string|min:3|max:50'.$admin ? '|nullable' : '',
            'last_name' => 'string|min:3|max:50'.$admin ? '|nullable' : '',
            'patronymic' => 'string|min:3|max:50'.$admin ? '|nullable' : '',
            'birth' => 'regex:/\d{2}\-\d{2}\-\d{4}/'.$admin ? '|nullable' : '',
            'address' => 'string|min:10|max:250'.$admin ? '|nullable' : '',
            'document_number' => 'string|min:3|max:250'.$admin ? '|nullable' : '',
        ];
    }
}
