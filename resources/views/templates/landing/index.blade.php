@extends('templates.landing.layout')

@section('content')
<section class="custom-pt-1 custom-pb-2 bg-primary parallaxie position-relative" style="background-image: url(/templates/landing/assets/images/bg/01.jpg);background-position: center center; background-size: auto; background-repeat: no-repeat;" data-overlay="6">
  <div class="container">
    <div class="row justify-content-center text-center">
      <div class="col-12 col-lg-10 col-xl-8">
        <!-- Heading -->
        <h1 class="display-4 text-white font-weight-bold wow pulse">
          @lang('locale.landing_new_platform')
        </h1>
        <!-- Text -->
        <p class="lead text-light mb-5 wow flipInX">@lang('locale.landing_many_instruments')</p>
        <!-- Buttons --> <a href="/register" class="btn btn-primary mr-1 wow bounceInLeft">
          @lang('locale.landing_create_account')
        </a>
        <a href="/login" class="btn btn-light wow bounceInRight">
          @lang('locale.landing_auth')
        </a>
        <p class="lead text-light mt-5 wow shake" style="font-size:1.4em;font-weight: 700">@lang('locale.landing_register') <strong>10$</strong> @lang('locale.landing_for_trade')</p>
      </div>
    </div>
    <!-- / .row -->
  </div>
  <!-- / .container -->
  <div class="shape-1 bottom" style="height: 100px; overflow: hidden;">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" style="height: 100%; width: 100%;">
      <polygon class="svg--sm" fill="white" points="0,0 30,100 65,21 90,100 100,75 100,100 0,100" />
      <polygon class="svg--lg" fill="white" points="0,0 15,100 33,21 45,100 50,75 55,100 72,20 85,100 95,50 100,80 100,100 0,100" />
    </svg>
  </div>
</section>

<!--hero section end-->


<!--body content start-->

<div class="page-content">

  <!--services start-->

<section>
  <div class="container">
    <div class="row justify-content-center text-center">
      <div class="col-12 col-md-12 col-lg-8 mb-8 mb-lg-0">
        <div class="mb-8"> <span class="badge badge-primary-soft p-2 font-w-6 wow bounceInDown">
              @lang('locale.landing_what_we_offer')
          </span>
          <h2 class="mt-3 font-w-5 wow pulse">@lang('locale.landing_necessary_conditions')</h2>
          <p class="lead mb-0 wow shake">@lang('locale.landing_our_platform')</p>
        </div>
      </div>
    </div>
    <!-- / .row -->
    <div class="row align-items-center">
      <div class="col-xl-4 col-lg-4 mb-8 mb-lg-0 wow slideInLeft">
        <div class="card d-flex flex-column" style="background-color: black;border-radius: 20px;">
          <img class="card-img-top" style="width: 100%;height: 450px;object-fit: cover;opacity: 0.6;border-radius: 15px;" src="/templates/landing/assets/images/about/first.png" alt="Card image">
          <div class="card-img-overlay p-0">
            <div class="card-body">
              <h4 class="card-title text-white text-center font-weight-bolder mt-2" style="font-size: 2em">@lang('locale.landing_trade_conditions')</h4>
              <p class="card-text text-white text-center mt-5">@lang('locale.landing_min_invest')</p>
              <a href="/register" class="btn btn-lg btn-block btn-primary mt-auto" style="position: absolute;bottom: 30px;width: 88%;">@lang('locale.landing_registration')</a>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-4 col-lg-4 mb-8 mb-lg-0 wow pulse">
        <div class="card d-flex flex-column" style="background-color: black;border-radius: 20px;">
          <img class="card-img-top" style="width: 100%;height: 450px;object-fit: cover;opacity: 0.6;border-radius: 15px;" src="/templates/landing/assets/images/about/second.png" alt="Card image">
          <div class="card-img-overlay p-0">
            <div class="card-body">
              <h4 class="card-title text-white text-center font-weight-bolder mt-2" style="font-size: 2em">@lang('locale.landing_platform')</h4>
              <p class="card-text text-white text-center mt-5">@lang('locale.landing_universal')</p>
              <a href="/login" class="btn btn-lg btn-block btn-primary mt-auto" style="position: absolute;bottom: 30px;width: 88%;">@lang('locale.landing_cabinet')</a>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-4 col-lg-4 mb-8 mb-lg-0 wow slideInRight">
        <div class="card d-flex flex-column" style="background-color: black;border-radius: 20px;">
          <img class="card-img-top" style="width: 100%;height: 450px;object-fit: cover;opacity: 0.6;border-radius: 15px;" src="/templates/landing/assets/images/about/third.png" alt="Card image">
          <div class="card-img-overlay p-0">
            <div class="card-body">
              <h4 class="card-title text-white text-center font-weight-bolder mt-2" style="font-size: 2em">@lang('locale.landing_partner')</h4>
              <p class="card-text text-white text-center mt-5">@lang('locale.landing_become_partner')</p>
              <a href="/login" class="btn btn-lg btn-block btn-primary mt-auto" style="position: absolute;bottom: 30px;width: 88%;">@lang('locale.landing_auth')</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!--services end-->


<!--about start-->

<section>
  <div class="container">
    <div class="row align-items-center justify-content-between">
      <div class="col-12 col-lg-6 mb-8 mb-lg-0 wow slideInLeft">
        <img src="/templates/landing/assets/images/about/05.png" alt="Image" class="img-fluid">
      </div>
      <div class="col-12 col-lg-6 col-xl-5 wow slideInRight">
        <div> <span class="badge badge-primary-soft p-2 font-w-6">
              @lang('locale.landing_our_stat')
          </span>
          <h2 class="mt-3 font-w-5">@lang('locale.landing_trade_with_us')</h2>
          <p class="lead mb-0">@lang('locale.landing_we_offer_excellent_conditions')</p>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-5">
          <div class="counter">
            <div class="counter-desc"> <span class="count-number display-4" data-to="3" data-speed="1000">3</span>
              <span class="display-4 text-primary">k</span>
              <h6 class="text-muted mb-0">@lang('locale.landing_online')</h6>
            </div>
          </div>
          <div class="counter">
            <div class="counter-desc"> <span class="count-number display-4" data-to="85" data-speed="1000">85</span>
              <span class="display-4 text-primary">%</span>
              <h6 class="text-muted mb-0">@lang('locale.landing_profit')</h6>
            </div>
          </div>
          <div class="counter">
            <div class="counter-desc"> <span class="count-number display-4" data-to="75" data-speed="1000">75</span>
              <span class="display-4 text-primary">+</span>
              <h6 class="text-muted mb-0">@lang('locale.landing_pairs')</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!--about end-->


<!--how it work start-->

<section class="custom-py-2 position-relative bg-dark" data-bg-img="/templates/landing/assets/images/bg/02.png">
  <div class="container">
    <div class="row justify-content-center text-center">
      <div class="col-12 col-md-12 col-lg-8 mb-8 mb-lg-0">
        <div class="mb-8"> <span class="badge badge-primary-soft p-2 font-w-6 wow bounceInDown">
              @lang('locale.landing_how_to_start')
          </span>
          <h2 class="mt-3 font-w-5 mb-0 text-white wow pulse">@lang('locale.landing_three_stages')</h2>
        </div>
      </div>
    </div>
    <!-- / .row -->
    <div class="row align-items-center justify-content-between mb-10">
      <div class="col-12 col-lg-6 mb-6 mb-lg-0 wow slideInLeft">
        <img src="/templates/landing/assets/images/new/idea.png" alt="Image" class="img-fluid pt-5">
      </div>
      <div class="col-12 col-lg-6 col-xl-5 wow slideInRight">
        <div>
          <h2> <span class="badge badge-primary-soft p-2">
              01
          </span>
          </h2>
          <h4 class="mt-3 text-light">@lang('locale.landing_register_now')</h4>
          <p class="lead mb-0">@lang('locale.landing_simple_registration')</p>
        </div>
      </div>
    </div>
    <div class="row align-items-center justify-content-between mb-10">
      <div class="col-12 col-lg-6 order-lg-1 mb-6 mb-lg-0 wow slideInRight">
        <img src="/templates/landing/assets/images/new/idea2.png" alt="Image" class="img-fluid pl-5">
      </div>
      <div class="col-12 col-lg-6 col-xl-5 wow slideInLeft">
        <div>
          <h2> <span class="badge badge-primary-soft p-2">
              02
          </span>
          </h2>
          <h4 class="mt-3 text-light">@lang('locale.landing_deposit')</h4>
          <p class="lead mb-0">@lang('locale.landing_move_to_deposit')</p>
        </div>
      </div>
    </div>
    <div class="row align-items-center justify-content-between">
      <div class="col-12 col-lg-6 mb-6 mb-lg-0 wow slideInLeft">
        <img src="/templates/landing/assets/images/new/idea3.png" alt="Image" class="img-fluid зе-5">
      </div>
      <div class="col-12 col-lg-6 col-xl-5 wow slideInRight">
        <div>
          <h2> <span class="badge badge-primary-soft p-2">
              03
          </span>
          </h2>
          <h4 class="mt-3 text-light">@lang('locale.landing_trade')</h4>
          <p class="lead mb-0">@lang('locale.landing_train')</p>
        </div>
      </div>
    </div>
  </div>
  <div class="shape-1" style="height: 200px; overflow: hidden;">
    <svg viewBox="0 0 500 150" preserveAspectRatio="none" style="height: 100%; width: 100%;">
      <path d="M0.00,49.98 C150.00,150.00 271.49,-50.00 500.00,49.98 L500.00,0.00 L0.00,0.00 Z" style="stroke: none; fill: #fff;"></path>
    </svg>
  </div>
  <div class="shape-1 bottom" style="height: 200px; overflow: hidden;">
    <svg viewBox="0 0 500 150" preserveAspectRatio="none" style="height: 100%; width: 100%;">
      <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style="stroke: none; fill: #fff;"></path>
    </svg>
  </div>
</section>

<!--how it work end-->

<!--blog start-->

<section>
  <div class="container">
    <div class="row justify-content-center text-center">
      <div class="col-12 col-md-12 col-lg-8 mb-8 mb-lg-0">
        <div class="mb-8"> <span class="badge badge-primary-soft p-2 font-w-6 wow bounceInDown">
              @lang('locale.landing_offers')
          </span>
          <h2 class="mt-3 font-w-5 wow pulse">@lang('locale.landing_our_discounts')</h2>
          <p class="lead mb-0 wow flipInX">@lang('locale.landing_we_try')</p>
        </div>
      </div>
    </div>
    <!-- / .row -->
    <div class="row">
      <div class="col-12 col-lg-6 mb-8 mb-lg-0 wow slideInLeft">
        <!-- Blog Card -->
        <div class="card border-0 shadow">
          <div class="position-absolute bg-white shadow-primary text-center p-2 rounded ml-3 mt-3 z-index-1">10
            <br>$</div>
          <div class="row no-gutters align-items-center">
            <div class="col-md-5">
              <img src="/templates/landing/assets/images/new/deal2.png" class="img-fluid p-5" alt="...">
            </div>
            <div class="col-md-7">
              <div class="card-body"> <a class="d-inline-block text-muted mb-2" href="#">@lang('locale.landing_depositing')</a>
                <h2 class="h5 font-weight-medium">
                  @lang('locale.landing_gift_10_dollars')
                </h2>
                <p>@lang('locale.landing_gift_10_dollars_desc')</p>
                <a class="btn-link" href="/promocodes">@lang('locale.landing_cabinet')</a>
              </div>
            </div>
          </div>
        </div>
        <!-- End Blog Card -->
      </div>
      <div class="col-12 col-lg-6 mb-8 mb-lg-0 wow slideInRight">
        <!-- Blog Card -->
        <div class="card border-0 shadow">
          <div class="position-absolute bg-white shadow-primary text-center p-2 rounded ml-3 mt-3 z-index-1">50
            <br>%</div>
          <div class="row no-gutters align-items-center">
            <div class="col-md-5">
              <img src="/templates/landing/assets/images/new/deal.png" class="img-fluid p-5" alt="...">
            </div>
            <div class="col-md-7">
              <div class="card-body"> <a class="d-inline-block text-muted mb-2" href="#">@lang('locale.landing_depositing')</a>
                <h2 class="h5 font-weight-medium">
                  @lang('locale.landing_50_percents_gift')
                </h2>
                <p>@lang('locale.landing_get_gift')</p>
                <a class="btn-link" href="/deposit">@lang('locale.landing_cabinet')</a>
              </div>
            </div>
          </div>
        </div>
        <!-- End Blog Card -->
      </div>
    </div>
  </div>
</section>
@endsection