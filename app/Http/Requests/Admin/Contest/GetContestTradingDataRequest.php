<?php

namespace App\Http\Requests\Admin\Contest;

use Illuminate\Foundation\Http\FormRequest;

class GetContestTradingDataRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'integer|nullable'
        ];
    }
}
