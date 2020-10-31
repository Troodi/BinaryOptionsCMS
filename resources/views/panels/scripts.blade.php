    <!-- BEGIN: Vendor JS-->
    <script>
      var assetBaseUrl = "{{ asset('') }}";
      if(window.location.protocol === 'https:'){
          window.websocketAddress = 'wss://{{ env('WEBSOCKET_HOST') }}:443';
      } else {
          window.websocketAddress = 'ws://{{ env('WEBSOCKET_HOST') }}:80';
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
    <script src="{{asset('vendors/js/extensions/toastr.min.js')}}"></script>
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
    @auth
    <script src="{{asset('app/app.js')}}"></script>
    <script>
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            statusCode: {
                401: function(){
                    window.location = '/login';
                },
                419: function () {
                    location.reload();
                }
            }
        });
    </script>
    @endauth