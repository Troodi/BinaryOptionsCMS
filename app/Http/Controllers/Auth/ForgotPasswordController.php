<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    protected function validateEmail(Request $request)
    {
      if(config('custom.demo')){
        throw ValidationException::withMessages(['demo_mode' => __('locale.demo_error')]);
      }
      $request->validate([
        'email' => 'required|email',
        'custom-g-recaptcha-response' => 'recaptcha',
      ]);
    }

    public function showLinkRequestForm(){
      if(config('custom.demo')){
        return view('/auth/passwords/email')->withErrors(['demo_mode' => __('locale.demo_error')]);
      }
      return view('/auth/passwords/email');
  }
}
