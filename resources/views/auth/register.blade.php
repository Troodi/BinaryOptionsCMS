@extends('layouts.fullLayoutMaster')

{{-- page title --}}
@section('title','Register Page')
{{-- page scripts --}}
@section('page-styles')
<link rel="stylesheet" type="text/css" href="{{asset('css/pages/authentication.css')}}">
@endsection

@section('content')
<!-- register section starts -->
<section class="row flexbox-container">
  <div class="col-xl-4 col-lg-6 col-sm-8 col-11">
    <div class="card bg-authentication mb-0">
      <div class="row m-0">
        <!-- register section left -->
        <div class="col-md-12 col-12 px-0">
          <div class="card disable-rounded-right mb-0 p-2 h-100 d-flex justify-content-center">
            <div class="card disable-rounded-right mb-0 h-100 d-flex justify-content-center">
              <div class="card-header pb-1">
                <div class="card-title text-center">
                  <img src="/images/logo/logo4.png" class="mb-2"/>
                </div>
              </div>
            <div class="card-content">
              <div class="card-body">
                <div class="d-flex flex-md-row flex-column justify-content-around mb-1">
                  <a href="#" class="btn btn-social btn-google btn-block font-small-3 mr-md-1 mb-md-0 mb-1">
                    <i class="bx bxl-google font-medium-3"></i>
                    <span class="pl-50 d-block text-center">Google</span>
                  </a>
                  <a href="#" class="btn btn-social btn-block mt-0 btn-facebook font-small-3">
                    <i class="bx bxl-facebook-square font-medium-3"></i>
                    <span class="pl-50 d-block text-center">Facebook</span>
                  </a>
                </div>
                <div class="divider">
                  <div class="divider-text text-uppercase text-muted">
                    <small>или зарегистрируйтесь с помощью email</small>
                  </div>
                </div>
                <form method="POST" action="{{ route('register') }}" id="checkCaptcha">
                  @csrf
                  <div class="form-group mb-50">
                    <label class="text-bold-600" for="email">Email address</label>
                    <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" autocomplete="email" placeholder="Email address">
                    @error('email')
                      <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                      </span>
                    @enderror
                  </div>
                  <div class="form-group mb-50">
                    <label class="text-bold-600" for="password">Password</label>
                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" autocomplete="new-password" placeholder="Password">
                    @error('password')
                    <span class="invalid-feedback" role="alert">
                      <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                  </div>
                  <div class="form-group">
                    <label class="text-bold-600" for="password-confirm">Confirm Password</label>
                    <input id="password-confirm" type="password" class="form-control" name="password_confirmation" autocomplete="new-password" placeholder="Confirm Password">
                  </div>
                  <div class="form-group d-flex flex-md-row flex-column justify-content-between align-items-center">
                    <div class="text-left">
                      <div class="checkbox checkbox-sm">
                        <input class="form-check-input" type="checkbox" name="remember" id="remember" checked="checked" disabled="disabled">
                        <label class="form-check-label" for="remember">
                          <small>Согласен с правилами</small>
                        </label>
                      </div>
                    </div>
                    <div class="text-right">
                      <a href="{{ route('password.request') }}" class="card-link"><small>Прочитать правила</small></a>
                    </div>
                  </div>
                  @component('components.recaptcha') @endcomponent
                  <button type="button" class="mt-1 btn btn-primary glow position-relative w-100" data-toggle="modal" data-target="#captchaModal">SIGN UP<i
                    id="icon-arrow" class="bx bx-right-arrow-alt"></i></button>
                </form>
                <hr>
                <div class="text-center"><small class="mr-25">Already have an account?</small>
                  <a href="{{asset('login')}}"><small>Sign in</small> </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- register section endss -->
@endsection
