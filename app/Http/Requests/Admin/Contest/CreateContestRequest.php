<?php

namespace App\Http\Requests\Admin\Contest;

use Illuminate\Foundation\Http\FormRequest;

class CreateContestRequest extends FormRequest
{

    public function rules()
    {
        return [
            'id' => 'numeric|nullable',
            'title' => 'array',
            'description' => 'array',
            'places' => 'array',
            'show_registered' => 'required|numeric|min:0|max:1',
            'initial_balance' => 'required|numeric|min:1',
            'initial_cost' => 'required|numeric|min:0',
            'additional_cost' => 'required|numeric|min:0',
            'max_bought_balance' => 'required|numeric|min:1',
            'hidden' => 'required|numeric|min:0|max:1',
            'type' => 'required|numeric|min:1|max:3',
            'started_at' => 'required|string|min:1',
            'ended_at' => 'required|string|min:1',
            'new' => 'required|numeric|min:0|max:1',
        ];
    }
}
