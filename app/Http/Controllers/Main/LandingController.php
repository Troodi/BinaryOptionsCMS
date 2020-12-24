<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LandingController extends Controller
{
  public function homePage(Request $request){
    return view('templates.landing.index');
  }

  public function termsPage(Request $request){
    return view('templates.landing.terms');
  }

  public function contactsPage(Request $request){
    return view('templates.landing.contacts');
  }

  public function privacyPage(Request $request){
    return view('templates.landing.privacy');
  }

  public function amlPage(Request $request){
    return view('templates.landing.aml');
  }

  public function paymentPage(Request $request){
    return view('templates.landing.payment');
  }

  public function responsibilityPage(Request $request){
    return view('templates.landing.responsibility');
  }

}
