@extends('templates.landing.layout')

@section('content')
  <section class="position-relative" style="margin-top:70px">
    <div id="particles-js"></div>
    <div class="container">
      <div class="row  text-center">
        <div class="col">
          <h1>@lang('locale.landing_contacts')</h1>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb justify-content-center bg-transparent p-0 m-0">
              <li class="breadcrumb-item"><a class="text-dark" href="/">@lang('locale.landing_home')</a></li>
              <li class="breadcrumb-item active text-primary" aria-current="page">@lang('locale.landing_contacts')</li>
            </ol>
          </nav>
        </div>
      </div>
      <!-- / .row -->
    </div>
    <!-- / .container -->
  </section>

  <!--hero section end-->


  <!--body content start-->

  <div class="page-content">

    <!--terms start-->

    <section>
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <section>
              <div class="container">
                <div class="row text-center">
                  <div class="col-lg-4 col-md-12">
                    <div>
                      <svg class="feather feather-map-pin" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#1360ef" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      <h4 class="mt-5">@lang('locale.landing_address'):</h4>
                      <span class="text-black">@lang('locale.landing_remote')</span>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6">
                    <div>
                      <svg class="feather feather-mail" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#1360ef" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      <h4 class="mt-5">Email</h4>
                      <a href="mailto:{{ config('app.support_mail') }}"> {{ config('app.support_mail') }}</a>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6">
                    <div>
                      <svg class="feather feather-phone-call" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#1360ef" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      <h4 class="mt-5">Telegram</h4>
                      <a href="#"> {{ config('app.support_telegram') }}</a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  </div>
@endsection