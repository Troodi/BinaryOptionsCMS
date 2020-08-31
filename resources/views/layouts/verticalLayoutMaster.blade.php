<!-- BEGIN: Body-->
<body class="vertical-layout vertical-menu-modern 2-columns
@if($configData['isMenuCollapsed'] == true){{'menu-collapsed'}}@endif
@if($configData['theme'] === 'dark'){{'dark-layout'}} @elseif($configData['theme'] === 'semi-dark'){{'semi-dark-layout'}} @else {{'light-layout'}} @endif
@if($configData['isContentSidebar'] === true) {{'content-left-sidebar'}} @endif @if(isset($configData['navbarType'])){{$configData['navbarType']}}@endif
@if(isset($configData['footerType'])) {{$configData['footerType']}} @endif
{{$configData['bodyCustomClass']}}
@if($configData['mainLayoutType'] === 'vertical-menu-boxicons'){{'boxicon-layout'}}@endif
@if($configData['isCardShadow'] === false){{'no-card-shadow'}}@endif"
data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
<div id="app">
  <!-- BEGIN: Header-->
  <div class="header-navbar-shadow"></div>
  <header-component></header-component>
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
