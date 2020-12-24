<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarNav">
  <ul class="navbar-nav ml-auto navbar-light">
    <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">@lang('locale.landing_contacts')</a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="/">info@getoption.pro</a></li>
        <li><a class="dropdown-item" href="/">Telegram: @getoption</a></li>
      </ul>
    </li>
    <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">@lang('locale.landing_language')</a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="/lang/ru">Русский</a></li>
        <li><a class="dropdown-item" href="/lang/en">English</a></li>
      </ul>
    </li>
  </ul>
</div>
@if(Request::is('/'))
  <a class="btn btn-light ml-8 d-none d-lg-block" href="/demo">@lang('locale.landing_demo_trading')</a>
@else
  <a class="btn btn-primary ml-8 d-none d-lg-block" href="/trading">@lang('locale.landing_auth')</a>
@endif