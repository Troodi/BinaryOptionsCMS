<!DOCTYPE html>
<html class="loading" lang="en" data-textdirection="ltr">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title')</title>
    <link rel="apple-touch-icon" href="{{ config('custom.icon_url') }}">
    <link rel="shortcut icon" type="image/png" href="{{ config('custom.icon_url') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @include('panels.styles')
  </head>
  <body class="vertical-layout vertical-menu-modern 1-column navbar-sticky bg-full-screen-image blank-page footer-static" data-open="click" data-menu="vertical-menu-modern" data-col="1-column">
   <div class="app-content content">
      <div class="content-overlay"></div>
      <div class="content-wrapper">
        <div class="content-header row"></div>
        <div class="content-body">
          @yield('content')
        </div>
      </div>
    </div>
    @include('panels.scripts')
  </body>
</html>
