<template>
    <div class="content-wrapper">
        <div class="content-body">
            <div class="row">
                <div class="col-md-6">
                    <section class="card mb-2">
                        <div class="card-header">
                            <h4 class="card-title">{{ $i18n.t('partner_title') }}</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <fieldset class="form-group">
                                        <label for="basicInput">{{ $i18n.t('partner_your_link') }}</label>
                                        <input :value="link" type="text" class="form-control opacity-full" id="basicInput" readonly="readonly">
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="col-md-6">
                    <section class="card mb-2">
                        <div class="card-header">
                            <h4 class="card-title">{{ $i18n.t('partner_conditions') }}</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <p style="margin-bottom: 0.3rem;">
                                      {{ $i18n.t('partner_every_user') }} <code>2%</code> {{ $i18n.t('partner_from_turnover') }}
                                      {{ $i18n.t('partner_cheating') }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div class="col-md-12">
                  <div v-if="'partner_status' in user && user.partner_status === null && typeof request !== 'undefined' && request === null" class="alert bg-rgba-primary mb-2" role="alert">
                    <div class="d-flex align-items-center">
                      <i class="bx bx-error-circle"></i>
                      <span>
                        {{ $i18n.t('partner_normal_status') }}
                      </span>
                    </div>
                  </div>

                  <div v-if="'partner_status' in user && user.partner_status === null && typeof request !== 'undefined' && request !== null && request.status === 0" class="alert bg-rgba-info mb-2" role="alert">
                    <div class="d-flex align-items-center">
                      <i class="bx bx-error-circle"></i>
                      <span>
                        {{ $i18n.t('partner_application_premium') }}
                      </span>
                    </div>
                  </div>

                  <div v-if="'partner_status' in user && user.partner_status === 1" class="alert bg-rgba-warning mb-2" role="alert">
                    <div class="d-flex align-items-center">
                      <i class="bx bx-error-circle"></i>
                      <span>
                        {{ $i18n.t('partner_success_premium') }}
                      </span>
                    </div>
                  </div>

                  <div v-if="'partner_status' in user && user.partner_status === null && typeof request !== 'undefined' && request !== null && request.status === 2" class="alert bg-rgba-danger mb-2" role="alert">
                    <div class="row">
                      <div class="col-md-8">
                        <div class="d-flex align-items-center">
                          <i class="bx bx-error-circle"></i>
                          <span>
                            {{ $i18n.t('partner_application_decline') }} {{ request.message }}
                          </span>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <button type="button" @click="requestAgain" class="btn btn-sm btn-danger float-right" style="padding-top: 2.5px;padding-bottom: 2.5px;">
                          {{ $i18n.t('partner_try') }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div v-for="value in errors" class="alert bg-rgba-danger alert-dismissible mb-2" role="alert">
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

                  <section class="card">
                    <div class="card-header">
                      <h4 class="card-title">{{ $i18n.t('partner_premium_title') }}</h4>
                    </div>
                    <div class="card-content">
                      <div class="card-body">
                        <div class="card-text">
                          <p>
                            {{ $i18n.t('partner_become_premium') }} <span class="badge badge-warning text-white">{{ $i18n.t('partner_10_percent') }}</span> {{ $i18n.t('partner_from_deposit') }} <span class="badge badge-primary text-white">{{ $i18n.t('partner_5_cents') }}</span> {{ $i18n.t('partner_to_active_registration') }} <span class="badge badge-success text-white">{{ $i18n.t('partner_3_percents') }}</span> {{ $i18n.t('partner_from_turnover_referral') }}
                          </p>
                          <div class="row" v-if="isAdmin || 'partner_status' in user && user.partner_status === null && typeof request !== 'undefined' && request === null">
                            <div class="col-md-6">
                              <fieldset class="form-group">
                                <label>{{ $i18n.t('partner_telegram') }}</label>
                                <input type="text" class="form-control" v-model="telegram" placeholder="@___">
                              </fieldset>
                            </div>
                            <div class="col-md-6">
                              <fieldset class="form-group">
                                <label class="align-top">{{ $i18n.t('partner_plan') }}</label>
                                <select2 v-model="traficQuantity" :options="traficQuantityOptions" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                              </fieldset>
                            </div>
                            <div class="col-md-12">
                              <fieldset class="form-group">
                                <textarea v-model="comment" class="form-control" style="height:150px" :placeholder="$i18n.t('partner_comment')"></textarea>
                              </fieldset>
                            </div>
                          </div>
                          <button v-show="isAdmin || 'partner_status' in user && user.partner_status === null && typeof request !== 'undefined' && request === null" type="button" @click="clearRequest" class="btn btn-secondary mt-0">{{ $i18n.t('partner_clear') }}</button>
                          <button v-show="isAdmin || 'partner_status' in user && user.partner_status === null && typeof request !== 'undefined' && request === null" v-bind:disabled="!buttonEnable" type="button" @click="sendRequest" class="btn btn-primary mt-0 float-right">{{ $i18n.t('partner_send') }}</button>
                          <button v-if="isAdmin" type="button" @click="changePartner('discardPartner')" class="btn btn-danger mt-0">{{ $i18n.t('partner_exclusion') }}</button>
                          <button v-if="isAdmin" type="button" @click="changePartner('approvePartner')" class="btn btn-success mt-0 float-right" style="margin-right: 3px;">{{ $i18n.t('partner_make_partner') }}</button>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <div class="col-md-12">
                    <section class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ $i18n.t('partner_all_stat') }}</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                            <tr>
                                                <th>{{ $i18n.t('partner_all_referrals') }}</th>
                                                <th>{{ $i18n.t('partner_reward') }}</th>
                                                <th>{{ $i18n.t('partner_active') }}</th>
                                                <th>{{ $i18n.t('partner_deposited') }}</th>
                                                <th>{{ $i18n.t('partner_clicks') }}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td v-text="count"></td>
                                                    <td><span class="badge badge-primary text-white" v-text="reward + ' $'"></span></td>
                                                    <td v-text="active"></td>
                                                    <td v-text="deposit_count"></td>
                                                    <td v-text="tracked"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div class="col-md-12">
                    <section class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ $i18n.t('partner_list') }}</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <div class="table-responsive">
                                        <table class="table" id="referrals">
                                            <thead>
                                            <tr>
                                                <th>{{ $i18n.t('partner_token') }}</th>
                                                <th>{{ $i18n.t('partner_date') }}</th>
                                            </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import dateformat from "dateformat";
    import {getCookie} from "../../js/functions";
    require('../../../vendors/js/tables/datatable/datatables.min.js');
    require('../../../vendors/js/tables/datatable/dataTables.bootstrap4.min.js');

    export default {
        name: "Partner",
        methods: {
          changePartner: function(action){
            let self = this;
            axios.post('/admin/data/'+action, { id: self.userId })
                .then(function (response) {
                  self.initPartner();
                  if(response.data.success === true) {
                    toastr.success(response.data.message, self.$i18n.t('partner_success'), {
                      positionClass: 'toast-bottom-left',
                      containerId: 'toast-bottom-left'
                    });
                  } else {
                    toastr.error(response.data.message, self.$i18n.t('partner_error'), {
                      positionClass: 'toast-bottom-left',
                      containerId: 'toast-bottom-left'
                    });
                  }
                });
          },
          requestAgain: function (){
            let self = this;
            self.success = [];
            self.errors = [];
            axios.post(this.isAdmin ? '/data/requestAgain/'+this.userId : '/data/requestAgain')
                .then(function (response) {
                  if(response.data.success === true) {
                    self.success.push(response.data.message);
                    self.initPartner();
                  } else {
                    self.errors.push(response.data.message);
                  }
                });
          },
          sendRequest: function (){
            let self = this;
            self.success = [];
            self.errors = [];
            axios.post(this.isAdmin ? '/data/sendPartnerRequest/'+this.userId : '/data/sendPartnerRequest', {telegram: self.telegram, comment: self.comment, traffic: self.traficQuantity})
                .then(function (response) {
                  if(response.data.success === true) {
                    self.success.push(response.data.message);
                    self.initPartner();
                  } else {
                    self.errors.push(response.data.message);
                  }
                });
          },
          clearRequest: function (){
              this.comment = '';
              this.telegram = '';
          },
          initPartner: function (){
            let self = this;
            axios.post(this.isAdmin ? '/data/referralsInfo/'+this.userId : '/data/referralsInfo')
                .then(function (response) {
                  self.count = response.data.total_referrals;
                  self.reward = response.data.reward;
                  self.active = response.data.active;
                  self.deposit_count = response.data.deposit_count;
                  self.tracked = response.data.tracked;
                  self.user = response.data.user;
                  self.request = response.data.request;
                  self.traficQuantity = self.request.traffic;
                  self.comment = self.request.comment;
                  self.telegram = self.request.telegram;
                });
            if(this.isAdmin) {
              axios.post('/admin/data/userinfo/' + this.userId)
                  .then(function (response) {
                    self.link = window.location.origin + '/offer/' + response.data.token;
                  });
            } else {
              self.link = window.location.origin + '/offer/' + window.user_data.token;
            }
            let url = this.isAdmin ? '/data/referrals/'+this.userId : '/data/referrals';
            $("#referrals").dataTable().fnDestroy();
            $('#referrals').DataTable({
              "iDisplayLength": 10,
              "processing": true,
              "serverSide": true,
              "order": [[1, "desc"]],
              "ajax": {
                url: url,
                type: "POST"
              },
              "language": {
                "url": "/locales/"+ (getCookie('currentLanguage') ? getCookie('currentLanguage') : 'en') +".json"
              },
              columns: [
                {
                  data: 'token',
                  name: 'token'
                },
                {
                  data: 'created_at',
                  name: 'created_at',
                  render: function(data, type) {
                    let date = new Date();
                    if (type === 'display') {
                      date = new Date(data);
                    }
                    return dateformat(date, 'HH:MM:ss dd-mm-yyyy');
                  }
                },
              ]
            });
          }
        },
        mounted() {
            this.initPartner();
        },
        computed: {
          isAdmin: function (){
            return this.$route.meta.isAdmin;
          },
          userId: function (){
            return this.$route.params.id;
          },
          errors: function (){
            let errors = [];
            if(this.telegram.length > 0 && this.telegram.length < 4){
              errors.push(this.$i18n.t('partner_nickname'));
            }
            if(this.comment.length > 0 && this.comment.length < 20){
              errors.push(this.$i18n.t('partner_comment_desc'));
            }
            if(this.comment.length > 500){
              errors.push(this.$i18n.t('partner_comment_error'));
            }
            return errors;
          },
          buttonEnable: function (){
            return this.telegram.length > 3 && this.comment.length > 20 && this.comment.length < 500;
          }
        },
        data: function () {
            return {
                traficQuantity: 0,
                traficQuantityOptions: [
                  { id: "0", text: this.$i18n.t('partner_5_people') },
                  { id: "1", text: this.$i18n.t('partner_15_people') },
                  { id: "2", text: this.$i18n.t('partner_50_people') },
                  { id: "3", text: this.$i18n.t('partner_50_plus_people') },
                  { id: "4", text: this.$i18n.t('partner_not_known')},
                ],
                count: this.$i18n.t('partner_loading'),
                reward: this.$i18n.t('partner_loading'),
                active: this.$i18n.t('partner_loading'),
                deposit_count: this.$i18n.t('partner_loading'),
                tracked: this.$i18n.t('partner_loading'),
                link: this.$i18n.t('partner_loading'),
                telegram: '',
                comment: '',
                user: {},
                request: {},
                success: [],
            }
        }
    }
</script>

<style scoped>
    .opacity-full{
        opacity: 1 !important;
    }
</style>