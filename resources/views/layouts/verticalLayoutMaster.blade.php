<!-- BEGIN: Body-->
<body class="vertical-layout vertical-menu-modern 2-columns dark-layout navbar-sticky footer-static no-card-shadow" data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
<div id="app">
  <!-- BEGIN: Header-->
  <div class="header-navbar-shadow"></div>
  <header-component v-bind:user="{{ Auth::user() }}"></header-component>
  <!-- END: Header-->

  <!-- BEGIN: Main Menu-->
  <menu-component v-bind:logo_url="'{{ config('custom.logo_url') }}'" v-bind:icon_url="'{{ config('custom.icon_url') }}'"></menu-component>
{{--  @include('panels.sidebar')--}}
  <!-- END: Main Menu-->

  <!-- BEGIN: Content-->
  <div class="app-content content">
  {{-- Application page structure --}}
    <div class="content-overlay"></div>
    <app><div class="lds-dual-ring"></div></app>
  </div>
  <!-- END: Content-->

  <div class="sidenav-overlay"></div>
  <div class="drag-target"></div>
  <button class="btn btn-primary btn-icon scroll-top" type="button">
    <i class="bx bx-up-arrow-alt"></i>
  </button>
  <!-- BEGIN: Footer-->
  <footer-component v-bind:title="'{{ config('custom.title') }}'" v-bind:domain="''" v-bind:support_mail="'{{ config('custom.support_mail') }}'"></footer-component>
  <!-- END: Footer-->
</div>
  @include('panels.scripts')
</body>
<!-- END: Body-->
