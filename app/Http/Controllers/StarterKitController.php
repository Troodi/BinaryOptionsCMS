<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StarterKitController extends Controller
{
    //index
    public function index(){
        return view('pages.sk-layout-2-columns');
    }
}
