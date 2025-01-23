<?php

namespace App\Http\Requests\MainHttp\Contest;

use Illuminate\Foundation\Http\FormRequest;

class GetWinnersForContestRequest extends FormRequest
{

    public function rules()
    {
        return [
            'contest_id' => 'required|numeric|min:1'
        ];
    }
}
