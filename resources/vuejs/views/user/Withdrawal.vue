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
                            <h4 class="card-title">Вывод средств</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <div class="row">
                                        <div class="col-md-12 pt-3">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <img class="img-fluid" src="https://cdn.freelogovectors.net/wp-content/uploads/2019/02/payeer-logo.png">
                                                </div>
                                                <div class="col-md-6">
                                                    <p class="mb-0"><i class="bx bxs-dollar-circle align-middle"></i> Вывод без отработки бонуса</p>
                                                    <p class="mb-0"><i class="bx bx-wallet align-middle"></i> Без комиссии</p>
                                                    <p class="mb-0"><i class="bx bx-undo align-middle"></i> Вывод в течение 24х часов</p>
                                                    <p class="mb-0"><i class="bx bx-check align-middle"></i> Минимальная сумма вывода: $10</p>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-md-6">
                                                    <fieldset class="form-group" style="margin-bottom: 3px;">
                                                        <label>Сумма вывода<small class="text-muted">мин. <i>10$</i></small></label>
                                                        <template>
                                                            <input ref="ci" type="text" class="form-control" v-model="amount" v-currency="{currency: null, autoDecimalMode: true, valueRange: {min: 10, max: 100000}}">
                                                        </template>
                                                    </fieldset>
                                                </div>
                                                <div class="col-md-6">
                                                    <fieldset class="form-group">
                                                        <label class="align-top">Платежная система<small class="text-muted"><i>(может взиматься комиссия)</i></small></label>
                                                        <select2 v-model="system" :options="systems" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                                                    </fieldset>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 pt-2">
                                                    <button v-bind:disabled="continueButtonDisabled" @click="processPayout" type="button" class="btn btn-outline-secondary mr-1 mb-1">Продолжить</button>
                                                </div>
                                                <div class="col-md-6 pt-2 text-right align-bottom">
                                                    <p style="padding-top:10px;">Вы получите <span class="text-white" style="font-size: 1.3rem;">$ {{ amount }}</span></p>
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
                            <h4 class="card-title">Ваш оборот по бонусам</h4>
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
                                                            <h1 v-if="account" class="text-primary font-large-2 text-bold-500">$ {{ parseFloat(account.left_turnover).toFixed(2) }}</h1>
                                                            <p>Вам осталось отработать
                                                                <span v-show="!account" role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span>
                                                                <code v-if="account">{{ left_turnover }} %</code>
                                                                от общей суммы бонуса.</p>
                                                            <button v-bind:disabled="discardButtunDisabled" @click="discardBonus" type="button" class="btn btn-primary glow">Отказаться от бонуса</button>
                                                            <small v-if="account && account.left_turnover > 0" v-show="account" class="ml-1">Баланс будет <code>{{ afterDiscardBonus }} $</code> после отказа</small>
                                                        </div>
                                                        <div class="dashboard-content-right">
                                                            <img src="/images/icon/cup.png" height="155" width="155" class="img-fluid" style="float-right"/>
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
                                                    Условия отключения бонуса и комиссия. Условия отключения бонуса и комиссия. Условия отключения бонуса и комиссия. Условия отключения бонуса и комиссия. Условия отключения бонуса и комиссия. Условия отключения бонуса и комиссия. Условия отключения бонуса и комиссия. Условия отключения бонуса и комиссия.
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
                            <h4 class="card-title">История заявок на вывод средств</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <div class="table-responsive">
                                        <table class="table" id="withdrawalHistory">
                                            <thead>
                                            <tr>
                                                <th>Сумма</th>
                                                <th>Платежная система</th>
                                                <th>Статус</th>
                                                <th>Дата</th>
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

    export default {
        name: "Deposit",
        data: function () {
            return {
                amount: '10',
                account: null,
                system: '0',
                success: [],
                systems: [
                    { id: "0", text: "Payeer (0%)" },
                    { id: "1", text: "Visa/Mastercard (скоро)", disabled: true },
                    { id: "2", text: "AdvCash (скоро)", disabled: true },
                    { id: "3", text: "Yandex (скоро)", disabled: true },
                ],
            }
        },
        methods: {
            getAccountData: function(){
                let self = this;
                axios.post('/data/getAccountData').then(function(response){
                    self.account = response.data;
                });
            },
            discardBonus: function () {
                let self = this;
                this.success = [];
                this.errors = [];
                axios.post('/data/discardBonus').then(function(response){
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
                axios.post('/data/processPayout', { amount: self.amount_formatted, system_id: self.system }).then(function(response){
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
                $('#withdrawalHistory').DataTable({
                    "iDisplayLength": 10,
                    "processing": true,
                    "serverSide": true,
                    "order": [[3, "desc"]],
                    "drawCallback": function(settings) {
                        $('[data-toggle="popover"]').popover({ html : true });
                    },
                    "ajax": {
                        url: "/data/withdrawalHistory",
                        type: "POST"
                    },
                    "language": {
                        "url": "/locales/Russian.json"
                    },
                    columns: [
                        {
                            orderable: false,
                            searchable: false,
                            data: 'amount',
                            name: 'amount',
                            render: function(data, type) {
                                return parseFloat(data).toFixed(2) + ' $';
                            }
                        },
                        {
                            data: 'system_id',
                            name: 'system_id',
                            orderable: false,
                            searchable: false,
                            render: function(data, type) {
                                return '<div class="badge badge-primary">Payeer</div>';
                            }
                        },
                        {
                            data: 'status',
                            name: 'status',
                            orderable: false,
                            searchable: false,
                            render: function(data, type) {
                                let classname = 'info';
                                let text = 'Обрабатывается';
                                if (type === 'display') {
                                    if(data == 0){
                                        classname = 'info';
                                        text = 'Обрабатывается';
                                    } else if (data == 1){
                                        classname = 'success';
                                        text = 'Выплачено';
                                    } else if (data == 2){
                                        classname = 'danger';
                                        text = 'Отклонено';
                                    }
                                }
                                return '<div class="badge badge-'+classname+'">' + text + '</div>';
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
            this.getAccountData();
            this.initDatatable();
        },
        computed: {
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
                        errors.push('Минимальная сумма вывода составляет 10$!');
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
                return this.amount_formatted < 10;
            }
        }
    }
</script>

<style scoped>

</style>