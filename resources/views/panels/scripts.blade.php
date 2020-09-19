
    <!-- BEGIN: Vendor JS-->
    <script>
      var assetBaseUrl = "{{ asset('') }}";
    </script>
    @yield('above-vendor-scripts')
    <script src="{{asset('vendors/js/vendors.min.js')}}"></script>
    <script src="{{asset('fonts/LivIconsEvo/js/LivIconsEvo.tools.js')}}"></script>
    <script src="{{asset('fonts/LivIconsEvo/js/LivIconsEvo.defaults.js')}}"></script>
    <script src="{{asset('fonts/LivIconsEvo/js/LivIconsEvo.min.js')}}"></script>
    <link rel="stylesheet" type="text/css" href="/vendors/css/extensions/toastr.css">
    <!-- BEGIN Vendor JS-->

    <!-- BEGIN: Page Vendor JS-->
    @yield('vendor-scripts')
    <script src="/vendors/js/extensions/toastr.min.js"></script>
    <script src="{{asset('vendors/js/pickers/pickadate/legacy.js')}}"></script>
    <script src="{{asset('vendors/js/pickers/daterange/moment.min.js')}}"></script>
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

    <script src="{{asset('app/app.js')}}"></script>