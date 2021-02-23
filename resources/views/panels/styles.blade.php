{{-- style blade file --}}
<link href="https://fonts.googleapis.com/css?family=Rubik:300,400,500,600%7CIBM+Plex+Sans:300,400,500,600,700" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="{{asset('vendors/css/vendors.min.css')}}">
@yield('vendor-styles')
<link rel="stylesheet" type="text/css" href="{{asset('css/bootstrap.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('css/bootstrap-extended.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('css/colors.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('css/components.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('css/themes/dark-layout.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('css/themes/semi-dark-layout.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('vendors/css/extensions/toastr.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('vendors/css/tables/datatable/datatables.min.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('css/core/menu/menu-types/vertical-menu.css')}}">
@yield('page-styles')
<link rel="stylesheet" type="text/css" href="{{asset('assets/css/style.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('vendors/css/forms/select/select2.min.css')}}">
<style>
    .b-calendar output {
        padding: 0.25rem;
        font-size: 80%;
        background-color: #272e48;
        color: #fff;
        border-color: #464d5c;
    }

    .b-calendar .b-calendar-grid-caption {
        padding: 0.25rem;
        background-color: #272e48;
        color: #fff;
        border-color: #464d5c;
    }

    .b-calendar .b-calendar-grid .row {
        flex-wrap: nowrap;
        background-color: #272e48;
        color: #fff;
        border-color: #464d5c !important;
    }

    .b-calendar .b-calendar-grid {
        padding: 0;
        margin: 0;
        overflow: hidden;
        border-color: #464d5c !important;
    }

    .b-calendar-grid {
        background-color: #1a233a !important;
        color: #fff !important;
        border-color: #464d5c !important;
    }

    .b-calendar-grid-help {
        background-color: #1a233a !important;
        color: #fff !important;
        border-color: #464d5c !important;
    }

    .b-form-btn-label-control.form-control {
        background-image: none;
        padding: 0;
        background-color: #1a233a !important;
        color: #fff !important;
        border-color: #464d5c !important;
    }
</style>