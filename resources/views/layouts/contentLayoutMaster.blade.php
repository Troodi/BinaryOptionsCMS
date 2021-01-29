<html class="loading" lang="en" data-textdirection="ltr">
    <head>
    @if(Auth::check()) <script> window.user_data = {!! Auth::user() !!}; </script> @endif
    <meta  charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title')</title>
    <link rel="apple-touch-icon" href="{{ config('app.icon_url') }}">
    <link rel="shortcut icon" type="image/x-icon" href="{{ config('app.icon_url') }}">
    <link rel="stylesheet" type="text/css" href="{{asset('vendors/css/forms/spinner/jquery.bootstrap-touchspin.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('css/plugins/animate/animate.css')}}">
    @include('panels.styles')
    </head>
    @include('layouts.verticalLayoutMaster')
</html>
