    <!-- BEGIN: Vendor JS-->
    <script>
      var assetBaseUrl = "{{ asset('') }}";
      if(window.location.protocol === 'https:'){
          window.websocketAddress = 'wss://{{ config('custom.websocket_host') }}';
      } else {
          window.websocketAddress = 'ws://{{ config('custom.websocket_host') }}';
      }
    </script>
    @yield('above-vendor-scripts')
    <script src="{{asset('vendors/js/vendors.min.js')}}"></script>
    <script src="{{asset('fonts/LivIconsEvo/js/LivIconsEvo.tools.js')}}"></script>
    <script src="{{asset('fonts/LivIconsEvo/js/LivIconsEvo.defaults.js')}}"></script>
    <script src="{{asset('fonts/LivIconsEvo/js/LivIconsEvo.min.js')}}"></script>
    <!-- BEGIN Vendor JS-->

    <!-- BEGIN: Page Vendor JS-->
    @yield('vendor-scripts')
    <script src="{{asset('vendors/js/extensions/swiper.min.js')}}"></script>
    <script src="{{asset('vendors/js/extensions/toastr.min.js')}}"></script>
    <script src="{{asset('js/scripts/configs/vertical-menu-light.js')}}"></script>
    <script src="{{asset('js/core/app-menu.js')}}"></script>
    <script src="{{asset('app/scripts.js')}}"></script>
    <script src="{{asset('js/core/app.js')}}"></script>
    <script src="{{asset('js/scripts/components.js')}}"></script>
    <script src="{{asset('js/scripts/footer.js')}}"></script>
    <script src="{{asset('js/scripts/customizer.js')}}"></script>
    <!-- END: Theme JS-->

    <!-- BEGIN: Page JS-->
    @yield('page-scripts')
    <!-- END: Page JS-->
    @auth
        @if(isset($is_admin) and $is_admin)
            <script src="{{ mix('app/admin.js') }}"></script>
        @else
            <script src="{{ mix('app/app.js') }}"></script>
        @endif
    @endauth
    @include('panels.counter')
