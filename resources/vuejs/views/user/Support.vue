<template>
    <div class="content-wrapper">
        <div class="content-body">
            <div v-for="value in error" class="alert bg-rgba-danger alert-dismissible mb-2" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <div class="d-flex align-items-center">
                    <i class="bx bx-error"></i>
                    <span>
                      {{ value }}
                    </span>
                </div>
            </div>

            <div v-for="value in success" class="alert bg-rgba-success alert-dismissible mb-2" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <div class="d-flex align-items-center">
                    <i class="bx bx-error"></i>
                    <span>
                      {{ value }}
                    </span>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <section class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ $i18n.t('support_title') }}</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <p>
                                      {{ $i18n.t('support_desc') }}
                                    </p>
                                    <textarea class="form-control" style="height:200px" :placeholder="$i18n.t('support_write')" v-model="question"></textarea>
                                    <button type="button" @click="clearForm" class="btn btn-secondary mt-2">{{ $i18n.t('support_clear') }}</button>
                                    <button type="button" v-bind:disabled="buttonDisabled" @click="send" class="btn btn-primary mt-2 float-right">{{ $i18n.t('support_send') }}</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <section class="card">
                  <div class="card-header">
                    <h4 class="card-title">{{ $i18n.t('support_contacts') }}</h4>
                  </div>
                  <div class="card-content">
                    <div class="card-body">
                      <div class="card-text">
                        <p>
                          <strong>{{ $i18n.t('support_email') }}</strong>: <a href="mailto:info@">info@</a>
                        </p>
                        <p>
                          <strong>{{ $i18n.t('support_working_time') }}</strong>: 09:00 - 23:00
                        </p>
                        <p>
                          <strong>{{ $i18n.t('support_phone') }}</strong>: {{ $i18n.t('support_not_known') }}
                        </p>
                        <p>
                          <strong>{{ $i18n.t('support_address') }}</strong>: {{ $i18n.t('support_address_line') }}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section class="card">
                  <div class="card-header">
                    <h4 class="card-title">{{ $i18n.t('support_info') }}</h4>
                  </div>
                  <div class="card-content">
                    <div class="card-body">
                      <div class="card-text">
                        <p style="margin-bottom: 7px;">
                          {{ $i18n.t('support_info_desc') }}
                        </p>
                        <p>{{ $i18n.t('support_thank_you') }}</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div class="col-8">
                <div class="card">
                  <div class="card-header">
                    <h4 class="card-title">{{ $i18n.t('support_place') }}</h4>
                  </div>
                  <div class="card-content">
                    <div class="card-body">
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2028.9795209859203!2d24.760501722233876!3d59.43341610207085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4692935fa172bce7%3A0x7b478f8bf92430aa!2sTartu%20Invest%20O%C3%9C!5e0!3m2!1sru!2sru!4v1604776694925!5m2!1sru!2sru" width="100%" height="400" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      name: "Support",
      data: function () {
          return {
              question: '',
              success: []
          }
      },
      methods: {
            clearForm: function () {
                this.question = '';
            },
            send: function () {
                let self = this;
                axios.post('/data/support', {
                    question: self.question,
                }).then(function (response) {
                    self.error = [];
                    self.success = [];
                    if(response.data.success === true) {
                        self.success.push(response.data.message);
                        self.clearForm();
                    } else {
                        self.error.push(response.data.message);
                    }
                })
            }
        },
        computed: {
            error: function () {
                let errors = [];
                if(this.question.length > 0 && this.question.length < 25){
                    errors.push(this.$i18n.t('support_question_error'));
                }
                return errors;
            },
            buttonDisabled: function () {
                return this.question.length < 25;
            }
        }
    }
</script>

<style scoped>

</style>
