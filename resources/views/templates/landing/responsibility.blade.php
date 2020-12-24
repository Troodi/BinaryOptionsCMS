@extends('templates.landing.layout')

@section('content')
  <section class="position-relative" style="margin-top:70px">
    <div id="particles-js"></div>
    <div class="container">
      <div class="row  text-center">
        <div class="col">
          <h1>@lang('locale.landing_information')</h1>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb justify-content-center bg-transparent p-0 m-0">
              <li class="breadcrumb-item"><a class="text-dark" href="/">@lang('locale.landing_home')</a></li>
              <li class="breadcrumb-item active text-primary" aria-current="page">@lang('locale.landing_information')</li>
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
            <h4 class="text-primary">@lang('locale.landing_information')</h4>
            <p>
              @lang('locale.landing_information_text')
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
@endsection