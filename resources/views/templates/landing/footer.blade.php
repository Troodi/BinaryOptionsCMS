<footer class="py-11 bg-primary position-relative" data-bg-img="/templates/landing/assets/images/bg/03.png" @if(Request::is('/')) style="background-color: #000c2d !important" @endif>
  <div class="shape-1" style="height: 150px; overflow: hidden;">
    <svg viewBox="0 0 500 150" preserveAspectRatio="none" style="height: 100%; width: 100%;">
      <path d="M0.00,49.98 C150.00,150.00 271.49,-50.00 500.00,49.98 L500.00,0.00 L0.00,0.00 Z" style="stroke: none; fill: #fff;"></path>
    </svg>
  </div>
  <div class="container mt-11">
    <div class="row">
      <div class="col-12 col-lg-5 col-xl-4 mr-auto mb-6 mb-lg-0">
        <div class="subscribe-form bg-warning-soft p-5 rounded" @if(Request::is('/')) style="background-color: rgba(146, 146, 146, 0.1) !important" @endif>
          <h5 class="mb-4 text-white">@lang('locale.landing_contacts')</h5>
          <p class="text-white"><strong>@lang('locale.landing_phone'):</strong> +7 999 676 26 3O</p>
          <p class="text-white"><strong>Email:</strong> info@getoption.pro</p>
          <p class="text-white"><strong>Telegram:</strong> @getoptionpro</p>
          <p class="text-white"><strong>@lang('locale.landing_inn'):</strong> 773578793916</p>
        </div>
      </div>
      <div class="col-12 col-lg-6 col-xl-7">
        <div class="row mt-4">
          <div class="col-12 col-sm-4 navbar-dark">
            <h5 class="mb-4 text-white">@lang('locale.landing_pages')</h5>
            <ul class="navbar-nav list-unstyled mb-0">
              <li class="mb-3 nav-item"><a class="nav-link" href="/" style="text-transform: none !important;">@lang('locale.landing_home')</a></li>
              <li class="mb-3 nav-item"><a class="nav-link" href="/login" style="text-transform: none !important;">@lang('locale.landing_auth')</a></li>
              <li class="mb-3 nav-item"><a class="nav-link" href="/register" style="text-transform: none !important;">@lang('locale.landing_registration')</a></li>
              <li class="mb-3 nav-item"><a class="nav-link" href="/password/reset" style="text-transform: none !important;">@lang('locale.landing_restore_password')</a></li>
              <li class="nav-item"><a class="nav-link" href="/contacts" style="text-transform: none !important;">@lang('locale.landing_contacts')</a></li>
            </ul>
          </div>
          <div class="col-2"></div>
          <div class="col-12 col-sm-6 mt-6 mt-sm-0 navbar-dark">
            <h5 class="mb-4 text-white">@lang('locale.landing_documents')</h5>
            <ul class="navbar-nav list-unstyled mb-0">
              <li class="mb-3 nav-item"><a class="nav-link" href="/terms" style="text-transform: none !important;">@lang('locale.landing_offer')</a></li>
              <li class="mb-3 nav-item"><a class="nav-link" href="/privacy-policy" style="text-transform: none !important;">@lang('locale.landing_privacy')</a></li>
              <li class="mb-3 nav-item"><a class="nav-link" href="/aml-policy" style="text-transform: none !important;">@lang('locale.landing_kyc')</a></li>
              <li class="mb-3 nav-item"><a class="nav-link" href="/payment-policy" style="text-transform: none !important;">@lang('locale.landing_payment_privacy')</a></li>
              <li class="mb-3 nav-item"><a class="nav-link" href="/responsibility-disclosure" style="text-transform: none !important;">@lang('locale.landing_information')</a></li>

            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="row text-white text-center mt-8">
      <div class="col">
        <hr class="mb-5">
        <div class="row">
          <div class="col-md-12">
            <p class="text-white text-left" style="font-size: 12px; color: rgba(255, 255, 255, 1)!important;">
              <strong class="text-left" style="font-size: 16px;">@lang('locale.landing_risk')</strong><br>
              @lang('locale.landing_trading_on_market')
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col"><hr class="mb-5"></div>
          <div class="col-md-12">
            <p class="text-white text-left" style="font-size: 12px;color: rgba(255, 255, 255, 1)!important;">
              @lang('locale.landing_our_materials')
            </p>
          </div>
        </div>
        <hr class="mb-5">
        <div class="col d-flex align-items-center justify-content-between p-0">
          <a class="navbar-brand logo text-white h2 mb-0" href="/">
            Get<span class="text-white font-weight-bold">Option</span>
          </a>
          <span class="text-white">Copyright ©{{ date('Y') }} Get Option</span>
        </div>
      </div>
    </div>
  </div>
</footer>