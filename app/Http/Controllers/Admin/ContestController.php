<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ContestController extends Controller
{
    public function createContest(Request $request){
        $request->validate([
            'title' => 'array',
            'description' => 'array',
            'places' => 'array',
            'initial_balance' => 'required|numeric|min:1',
            'initial_cost' => 'required|numeric|min:0',
            'additional_cost' => 'required|numeric|min:0',
            'max_bought_balance' => 'required|numeric|min:1',
            'hidden' => 'required|numeric|min:0|max:1',
            'type' => 'required|numeric|min:1|max:3',
            'started_at' => 'required|string|min:1',
            'ended_at' => 'required|string|min:1',
        ]);
    }
}
