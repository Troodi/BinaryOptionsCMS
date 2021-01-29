<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="keywords" content="" />
  <meta name="description" content="" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>@lang('locale.landing_title')</title>
  <link rel="shortcut icon" type="image/png" href="{{ config('app.icon_url') }}">
  <link href="/templates/landing/assets/css/theme-plugin.css" rel="stylesheet" />
  <link href="/templates/landing/assets/css/theme.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
</head>

<body>
<div class="page-wrapper">
  <div id="ht-preloader">
    <div class="loader clear-loader">
      <span></span>
      <p>{{ config('app.title') }}</p>
    </div>
  </div>

  <header class="site-header @if(Request::is('/')) navbar-dark @else navbar-light @endif">
    <div id="header-wrap" class="position-absolute w-100 z-index-1">
      <div class="container">
        <div class="row">
          <!--menu start-->
          <div class="col d-flex align-items-center justify-content-between">
            <a class="navbar-brand logo @if(Request::is('/')) text-white @else text-dark @endif h2 mb-0" href="/">
              {{ config('app.first_title') }}<span class="@if(Request::is('/')) text-white @else text-primary @endif font-weight-bold">{{ config('app.second_title') }}</span>
            </a>
            <nav class="navbar navbar-expand-lg ml-auto">
              @include('templates.landing.menu')
            </nav>
          </div>
          <!--menu end-->
        </div>
      </div>
    </div>
  </header>
  @yield('content')
  @include('templates.landing.footer')
</div>

<!-- page wrapper end -->


<!--back-to-top start-->

<div class="scroll-top"><a class="smoothscroll" href="#top"><i class="las la-angle-up"></i></a></div>

<!--back-to-top end-->

<!-- inject js start -->

<script src="/templates/landing/assets/js/theme-plugin.js"></script>
<script src="/templates/landing/assets/js/theme-script.js"></script>
<script src="https://wowjs.uk/dist/wow.min.js"></script>
<script>
  new WOW().init();
</script>
<!-- inject js end -->
@include('panels.counter')
@include('panels.jivosite')
</body>

</html>
