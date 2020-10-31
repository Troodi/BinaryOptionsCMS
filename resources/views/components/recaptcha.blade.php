<div class="modal fade" id="captchaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Подтвердите что вы не робот</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                {!! htmlFormSnippet([
                    "callback" => "callbackFunction",
                    "expired-callback" => "expiredCallbackFunction",
                    "error-callback" => "errorCallbackFunction",
                ]) !!}

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                <button type="button" class="btn btn-primary">Подтвердить</button>
            </div>
        </div>
    </div>
</div>

<textarea id="custom-g-recaptcha-response" name="custom-g-recaptcha-response" style="display:none;"></textarea>
<style>
    .g-recaptcha > div {
        margin-left: auto !important;
        margin-right: auto !important;
    }
</style>
{!! htmlScriptTagJsApi() !!}
<script src="{{ asset('vendors/js/jquery.min.js') }}"></script>
<script type="text/javascript">
    function callbackFunction() {
        let token = grecaptcha.getResponse();
        $('#checkCaptcha').submit();
    }

    function expiredCallbackFunction(){
        $('#custom-g-recaptcha-response').val('');
    }

    function errorCallbackFunction(){
        $('#custom-g-recaptcha-response').val('');
    }
</script>