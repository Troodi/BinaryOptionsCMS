<!-- BEGIN: Body-->
<body class="vertical-layout vertical-menu-modern 2-columns dark-layout navbar-sticky footer-static no-card-shadow" data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
<div id="app">
  <!-- BEGIN: Header-->
  <div class="header-navbar-shadow"></div>
  <header-component v-bind:user="{{ Auth::user() }}"></header-component>
  <!-- END: Header-->

  <!-- BEGIN: Main Menu-->
  <menu-component></menu-component>
{{--  @include('panels.sidebar')--}}
  <!-- END: Main Menu-->

  <!-- BEGIN: Content-->
  <div class="app-content content">
  {{-- Application page structure --}}
    <div class="content-overlay"></div>
    <app></app>
  </div>
  <!-- END: Content-->

  <div class="sidenav-overlay"></div>
  <div class="drag-target"></div>

  <!-- BEGIN: Footer-->
  <footer-component></footer-component>
  <!-- END: Footer-->
</div>
  @include('panels.scripts')
</body>
<!-- END: Body-->
