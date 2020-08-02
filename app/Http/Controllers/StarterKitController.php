<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StarterKitController extends Controller
{
    //index
    public function index(){
        // Breadcrumbs
        $breadcrumbs = [
            ['link' => "/", 'name' => "Home"], ['link' => "#", 'name' => "Starter Kit"], ['name' => "2 Columns"],
        ];
        //Pageheader set true for breadcrumbs
        $pageConfigs = ['pageHeader' => true];
        return view('pages.sk-layout-2-columns',['pageConfigs'=>$pageConfigs,'breadcrumbs'=>$breadcrumbs]);
    }
}
