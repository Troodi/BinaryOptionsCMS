<template>
    <div class="content-wrapper">
        <div class="content-body">
            <div class="row">
              <div class="col-md-12">
                <div v-for="value in errors" class="alert bg-rgba-danger alert-dismissible mb-2 w-100" role="alert">
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

                <div v-for="value in success" class="alert bg-rgba-success alert-dismissible mb-2 w-100" role="alert">
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
              </div>
            </div>

            <div class="row">
                <div class="col-md-7">
                    <section class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ $i18n.t('payout_title') }}</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <div class="row">
                                        <div class="col-md-12 pt-3">
                                            <div class="row">
                                                <div class="col-md-6">
                                                  <img class="img-fluid" src="/images/icon/cards.png">
                                                </div>
                                                <div class="col-md-6">
                                                    <p class="mb-0"><i class="bx bxs-dollar-circle align-middle"></i> {{ $i18n.t('payout_without_turnover') }}</p>
                                                    <p class="mb-0"><i class="bx bx-wallet align-middle"></i> {{ $i18n.t('payout_without_commission') }}</p>
                                                    <p class="mb-0"><i class="bx bx-undo align-middle"></i> {{ $i18n.t('payout_in_24_hours') }}</p>
                                                    <p class="mb-0"><i class="bx bx-check align-middle"></i> {{ $i18n.t('payout_minimum_amount') }}: $10</p>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-md-6">
                                                    <fieldset class="form-group" style="margin-bottom: 3px;">
                                                        <label>{{ $i18n.t('payout_amount') }}<small class="text-muted">{{ $i18n.t('payout_min') }}. <i>10$</i></small></label>
                                                        <template>
                                                            <input ref="ci" type="text" class="form-control" v-model="amount" v-currency="{currency: null, autoDecimalMode: true, valueRange: {min: 10, max: 100000}}">
                                                        </template>
                                                    </fieldset>
                                                </div>
                                                <div class="col-md-6">
                                                  <fieldset class="form-group" style="margin-bottom: 3px;">
                                                    <label>{{ $i18n.t('payout_wallet') }} <small class="text-muted">({{ $i18n.t('payout_check_correct') }})</small></label>
                                                    <template>
                                                      <input type="text" class="form-control" placeholder="____ ____ ____ ____" v-model="wallet_address">
                                                    </template>
                                                  </fieldset>
                                                </div>
                                            </div>
                                            <div class="row mt-1">
                                              <div class="col-md-12">
                                                <fieldset class="form-group">
                                                  <label class="align-top">{{ $i18n.t('payout_system') }}<small class="text-muted"><i>({{ $i18n.t('payout_can_be_commission') }})</i></small></label>
                                                  <select2 v-model="system" :style="'width: 100%;'" :options="systems" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                                                </fieldset>
                                              </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 pt-2">
                                                    <button v-bind:disabled="continueButtonDisabled" @click="processPayout" type="button" class="btn btn-outline-secondary mr-1 mb-1">{{ $i18n.t('payout_continue') }}</button>
                                                </div>
                                                <div class="col-md-6 pt-2 text-right align-bottom">
                                                    <p style="padding-top:10px;">{{ $i18n.t('payout_you_get') }} <span class="text-white" style="font-size: 1.3rem;">$ {{ amount }}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div class="col-md-5">
                    <section class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ $i18n.t('payout_your_turnover') }}</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="d-flex justify-content-between align-items-end">
                                                        <div class="dashboard-content-left">
                                                            <span v-show="!account" role="status" aria-hidden="true" class="mb-2 spinner-border spinner-grow-sm text-primary" style="width:3rem;height:3rem;"></span>
                                                            <h1 v-if="account" class="text-primary font-large-2 text-bold-500">$ {{ account_left_turnover }}</h1>
                                                            <p>{{ $i18n.t('payout_left_turnover') }}
                                                                <span v-show="!account" role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span>
                                                                <code v-if="account">{{ left_turnover }} %</code>
                                                              {{ $i18n.t('payout_from_all_bonus_amount') }}.</p>
                                                            <button v-bind:disabled="discardButtunDisabled" @click="discardBonus" type="button" class="btn btn-primary glow">{{ $i18n.t('payout_cancel_bonus') }}</button>
                                                            <small v-if="account && account_left_turnover > 0" v-show="account" class="ml-1">{{ $i18n.t('payout_balance_be') }} <code>{{ afterDiscardBonus }} $</code> {{ $i18n.t('payout_after_cancel') }}</small>
                                                        </div>
                                                        <div class="dashboard-content-right">
                                                            <img src="/images/icon/cup.png" height="155" width="155" class="img-fluid" style="float:right;">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="card">
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="row">
                                                <div class="col-md-12">
                                                  {{ $i18n.t('payout_conditions') }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>

        <div class="content-body">
            <div class="row">
                <div class="col-md-12">
                    <section class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ $i18n.t('payout_history_title') }}</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                  <div class="table-responsive">
                                      <table class="table" id="withdrawalHistory">
                                          <thead>
                                          <tr>
                                              <th>{{ $i18n.t('payout_amount_simple') }}</th>
                                              <th>{{ $i18n.t('payout_system') }}</th>
                                              <th>{{ $i18n.t('payout_props') }}</th>
                                              <th>{{ $i18n.t('payout_status') }}</th>
                                              <th id="hide">{{ $i18n.t('payout_action') }}</th>
                                              <th>{{ $i18n.t('payout_date') }}</th>
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
    import Swal from '../../../vendors/js/extensions/sweetalert2.all.min.js';
    import {getCookie} from "../../js/functions";

    export default {
        name: "Deposit",
        data: function () {
            return {
                amount: '10',
                account: null,
                system: 1,
                success: [],
                wallet_address: '',
                systems: [],
            }
        },
        methods: {
            getAccountData: function(){
                let self = this;
                let url = '/data/getAccountData';
                if(this.isAdmin){
                  url = '/data/getAccountData/'+this.userId;
                }
                axios.post(url).then(function(response){
                    self.account = response.data;
                });
            },
            discardBonus: function () {
                let self = this;
                this.success = [];
                this.errors = [];
                let url = '/data/discardBonus';
                if(this.isAdmin){
                  url = '/data/discardBonus/'+this.userId;
                }
                axios.post(url).then(function(response){
                    self.getAccountData();
                    if(response.data.success === true){
                        self.success.push(response.data.message);
                    } else {
                        self.errors.push(response.data.message);
                    }
                });
            },
            processPayout: function () {
                let self = this;
                this.success = [];
                this.errors = [];
                let url = '/data/processPayout';
                if(this.isAdmin){
                  url = '/data/processPayout/'+this.userId;
                }
                axios.post(url, { amount: self.amount_formatted, system_id: self.system, address: this.wallet_address }).then(function(response){
                    self.getAccountData();
                    if(response.data.success === true){
                        self.success.push(response.data.message);
                        $("#withdrawalHistory").dataTable().fnDestroy()
                        self.initDatatable();
                    } else {
                        self.errors.push(response.data.message);
                    }
                });
            },
            initDatatable: function () {
              let url = '/data/withdrawalHistory';
              if(this.isAdmin){
                url = '/data/withdrawalHistory/'+this.userId;
              }
              let self = this;
                $('#withdrawalHistory').DataTable({
                    "iDisplayLength": 10,
                    "processing": true,
                    "serverSide": true,
                    "order": [[self.isAdmin ? 5 : 4, "desc"]],
                    "drawCallback": function(settings) {
                        $('[data-toggle="popover"]').popover({ html : true });
                        $('[data-toggle="tooltip"]').popover({ html : true });
                        $('.decline-withdrawal').on('click', function (){
                          let id = $(this).attr('data-id');
                          Swal.fire({
                            title: 'Укажите комментарий',
                            input: 'text',
                            inputAttributes: {
                              autocapitalize: 'off'
                            },
                            showCancelButton: true,
                            confirmButtonText: 'Отменить выплату',
                            cancelButtonText: 'Закрыть',
                            showLoaderOnConfirm: true,
                            preConfirm: (comment) => {
                              return axios.post('/admin/data/processWithdrawal', { id: id, comment: comment, status: 2 }).then((response) => {
                                if(!response.data.success){
                                  throw new Error(response.data.message)
                                }
                                return response;
                              }).catch((error) => {
                                Swal.showValidationMessage(error.message)
                              });
                            },
                            allowOutsideClick: () => !Swal.isLoading()
                          }).then((result) => {
                            if (!result.dismiss) {
                              Swal.fire(self.$i18n.t('payout_success'), result.value.data.message, 'success');
                              $("#withdrawalHistory").dataTable().fnDestroy()
                              self.getAccountData();
                              self.initDatatable();
                            }
                          });
                          return false;
                        });

                      $('.accept-withdrawal').on('click', function (){
                        let id = $(this).attr('data-id');
                        axios.post('/admin/data/processWithdrawal', { id: id, comment: '', status: 1 }).then((response) => {
                          if(response.data.success === true) {
                            toastr.success(response.data.message, self.$i18n.t('payout_success'), {
                              positionClass: 'toast-bottom-left',
                              containerId: 'toast-bottom-left'
                            });
                            $("#withdrawalHistory").dataTable().fnDestroy()
                            self.getAccountData();
                            self.initDatatable();
                          } else {
                            toastr.error(response.data.message, self.$i18n.t('payout_error'), {
                              positionClass: 'toast-bottom-left',
                              containerId: 'toast-bottom-left'
                            });
                          }
                        });
                        return false;
                      });
                    },
                    "ajax": {
                        url: url,
                        type: "POST"
                    },
                    "language": {
                      "url": "/locales/"+ getCookie('currentLanguage') ? getCookie('currentLanguage') : 'en' +".json"
                    },
                    "createdRow": function (row, data, index) {
                      if(!self.isAdmin) {
                        $('td', row).eq(4).addClass("d-none");
                        $('#hide').hide();
                      }
                    },
                    columns: [
                        {
                            data: 'amount',
                            name: 'amount',
                            render: function(data, type) {
                                return parseFloat(data).toFixed(2) + ' $';
                            }
                        },
                        {
                            data: 'withdraw_system.text',
                            name: 'withdraw_system.text',
                            orderable: false,
                            searchable: false,
                            render: function(data, type) {
                                return '<div class="badge badge-primary">' + data + '</div>';
                            }
                        },
                        {
                          data: 'address',
                          name: 'address',
                        },
                        {
                            data: 'status',
                            name: 'status',
                            orderable: false,
                            searchable: false,
                            render: function(data, type, row) {
                                let text = '<div class="badge badge-info">' + self.$i18n.t('payout_processing') + '</div>';
                                if (type === 'display') {
                                    if(data == 0){
                                        text = '<div class="badge badge-info">' + self.$i18n.t('payout_processing') + '</div>';
                                    } else if (data == 1){
                                        text = '<div class="badge badge-success">' + self.$i18n.t('payout_paid_out') + '</div>';
                                    } else if (data == 2){
                                        let message = self.$i18n.t('payout_cause_not_found');
                                        if(row.message){
                                          message = row.message;
                                        }
                                        text = '<div class="badge badge-danger cursor-pointer" data-trigger="hover" data-toggle="popover" data-placement="top" data-container="body" data-original-title="' + self.$i18n.t('payout_cause') + '" data-content="'+message+'">' + self.$i18n.t('payout_declined') + ' <i class="bx bx-help-circle cursor-pointer" style="font-size: 12px;"></i></div>';
                                    }
                                }
                                return text;
                            }
                        },
                        {
                          data: 'id',
                          name: 'id',
                          orderable: false,
                          searchable: false,
                          render: function(data, type, row) {
                            if (type === 'display') {

                            }
                            return '<button type="button" class="btn btn-sm btn-outline-danger mr-1 decline-withdrawal" data-id="'+row.id+'">Отменить</button>' +
                                   '<button type="button" class="btn btn-sm btn-outline-success accept-withdrawal" data-id="'+row.id+'">Выплатить</button>';
                          }
                        },
                        {
                            data: 'created_at',
                            name: 'created_at',
                            render: function(data, type) {
                                let date = new Date();
                                if (type === 'display') {
                                    date = new Date(data);
                                }
                                return dateformat(date, 'dd-mm-yyyy');
                            }
                        },
                    ]
                });
            }
        },
        mounted() {
          let self = this;
          axios.post('/data/getAllWithdrawSystems')
              .then(function (response) {
                self.systems = response.data;
                self.system = 1;
              });
            this.getAccountData();
            this.initDatatable();
        },
        // watch:
        computed: {
            account_left_turnover: function (){
              return parseFloat(this.account.left_turnover).toFixed(2) >= 0 ? parseFloat(this.account.left_turnover).toFixed(2) : 0;
            },
            isAdmin: function (){
              return this.$route.meta.isAdmin;
            },
            userId: function (){
              return this.$route.params.id;
            },
            amount_formatted: function () {
                let amount = this.$ci.parse(this.amount);
                if(isNaN(amount)){
                    amount = 0;
                }
                return amount;
            },
            errors: {
                get: function() {
                    let errors = [];
                    if(this.amount_formatted < 10){
                        errors.push(this.$i18n.t('payout_min_10'));
                    }
                    if(this.wallet_address.length < 5 && this.wallet_address.length > 0){
                      errors.push(this.$i18n.t('payout_enter_correct_address'));
                    }
                    return errors;
                },
                set: function(array) {
                    return array;
                }
            },
            afterDiscardBonus: function () {
                if(!this.account){
                    return 0;
                }
                let percent = (1 - (this.account.left_turnover / this.account.all_turnover)).toFixed(4);
                return (parseFloat(this.account.balance) + (this.account.bonus * percent - this.account.bonus)).toFixed(2);
            },
            left_turnover: function () {
                if(!this.account){
                    return 0;
                }
                let percent = ((this.account.left_turnover / this.account.all_turnover)*100).toFixed(2);
                if(isNaN(percent)){
                    return 0;
                }
                return percent;
            },
            discardButtunDisabled: function () {
                if(!this.account){
                    return true;
                }
                return this.account.all_turnover == 0;
            },
            continueButtonDisabled: function () {
                if(!this.account){
                    return true;
                }
                return this.amount_formatted < 10 || this.wallet_address.length < 5;
            }
        }
    }
</script>

<style scoped>

</style>