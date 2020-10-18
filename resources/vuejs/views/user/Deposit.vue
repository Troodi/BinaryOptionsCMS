<template>
    <div class="content-wrapper">
        <div class="content-body">

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

            <div class="row">
                <div class="col-md-12">
                    <section class="card">
                        <div class="card-header">
                            <h4 class="card-title">Пополнение счета</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <div class="row">
                                        <div class="col-md-6 pt-3">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <img class="img-fluid" src="https://cdn.freelogovectors.net/wp-content/uploads/2019/02/payeer-logo.png">
                                                </div>
                                                <div class="col-md-6">
                                                        <p class="mb-0"><i class="bx bxs-dollar-circle align-middle"></i> Минимальная сумма депозита: $5</p>
                                                        <p class="mb-0"><i class="bx bx-wallet align-middle"></i> Без комиссии</p>
                                                        <p class="mb-0"><i class="bx bx-undo align-middle"></i> Быстрое снятие со счета</p>
                                                        <p class="mb-0"><i class="bx bx-check align-middle"></i> Минимальная сумма вывода: $10</p>
                                                </div>
                                                <div class="col-md-6 mt-3">
                                                    <fieldset class="form-group" style="margin-bottom: 3px;">
                                                        <label>Сумма депозита</label>
                                                        <small class="text-muted">мин. <i>5$</i></small>
                                                        <template>
                                                            <input ref="ci" type="text" class="form-control" v-model="amount" v-currency="{currency: null, autoDecimalMode: true, valueRange: {min: 1, max: 10000}}">
                                                        </template>
                                                    </fieldset>
                                                    <div class="row mb-1 mr-0 ml-0">
                                                        <div class="col-md-3 pl-0" style="padding-right: 3px;">
                                                            <button @click="setAmount(150)" type="button" class="btn w-100 btn-sm btn-outline-dark">$ 150</button>
                                                        </div>
                                                        <div class="col-md-3 pl-0" style="padding-right: 1.5px;">
                                                            <button @click="setAmount(200)" type="button" class="btn w-100 btn-sm btn-outline-dark">$ 200</button>
                                                        </div>
                                                        <div class="col-md-3 pr-0" style="padding-left: 1.5px;">
                                                            <button @click="setAmount(300)" type="button" class="btn w-100 btn-sm btn-outline-dark">$ 300</button>
                                                        </div>
                                                        <div class="col-md-3 pr-0" style="padding-left: 3px;">
                                                            <button @click="setAmount(500)" type="button" class="btn w-100 btn-sm btn-outline-dark">$ 500</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 mt-3">
                                                    <fieldset class="form-group" style="margin-bottom: 10px;">
                                                        <label>Промокод для получения бонуса</label>
                                                        <small class="text-muted">(необязательно)</small>
                                                        <div class="input-group">
                                                            <input v-model="promocode" type="text" class="form-control">
                                                            <div class="input-group-append">
                                                                <button v-show="this.promocode !== this.prev_promocode" @click="checkPromocode" class="btn btn-secondary" type="button">Проверить</button>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                    <div class="custom-control custom-switch custom-control-inline mb-1">
                                                        <input v-model="use_promocode" type="checkbox" class="custom-control-input" id="customSwitch1">
                                                        <label class="custom-control-label mr-1" for="customSwitch1">
                                                        </label>
                                                        <span>Использовать бонус <small>(условия)</small></span>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 pt-2">
                                                    <button @click="proccess" type="button" class="btn btn-outline-secondary mr-1 mb-1">Продолжить</button>
                                                </div>
                                                <div class="col-md-6 pt-2 text-right align-bottom">
                                                    <p style="padding-top:10px;">
                                                        Вы получите
                                                        <span class="text-white" style="font-size: 1.3rem;">$
                                                            {{ show_amount }}
                                                        </span>
                                                        <span v-if="promocode_info && bonus_percent" v-show="use_promocode">(бонус {{ promocode_info.bonus_size }}%)</span>
                                                        <span v-show="!use_promocode || !bonus_percent">(без бонуса)</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <h4 class="card-title">Выберите Ваш бонус</h4>
                                            <div class="row" v-for="current in bonus" style="padding-bottom: 5px;">
                                                <div class="col-md-12">
                                                    <div @click="setBonusId(current.min_amount)" class="btn btn-light-secondary w-100" :class="{'yellow-outline' : current.min_amount === bonus_id || current.min_amount === 500, 'checked-box' : current.min_amount === bonus_id}">
                                                        <div class="row">
                                                            <div class="col-md-3">
                                                                <fieldset>
                                                                    <div class="radio radio-primary radio-glow" style="padding-top: 5px;">
                                                                        <input type="radio" :id="'radio'+current.min_amount" :value="current.min_amount" v-model="bonus_id" name="radioGlow" disabled="disabled">
                                                                        <label :for="'radio'+current.min_amount"></label>
                                                                    </div>
                                                                </fieldset>
                                                            </div>
                                                            <div class="col-md-2">
                                                                $ {{ current.min_amount.toLocaleString(undefined, {minimumFractionDigits: 0}) }}
                                                            </div>
                                                            <div class="col-md-3 text-success">
                                                                бонус {{ current.bonus_size }} %
                                                            </div>
                                                            <div class="col-md-1">
                                                                =
                                                            </div>
                                                            <div class="col-md-2">
                                                                $ {{ (parseInt((current.min_amount).toString().replace(' ', '')) * current.bonus_size / 100).toString().replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ') }}
                                                            </div>
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
                </div>
            </div>
        </div>
        <deposit-history ref="datatables"></deposit-history>
    </div>
</template>

<script>
    import { CurrencyDirective, setValue, getValue } from 'vue-currency-input'
    export default {
        name: "Deposit",
        mounted() {
            let self = this;
            axios.post('/data/getDepositPromocodes')
                .then(function (response) {
                    self.bonus = response.data;
                    self.promocode = self.bonus.find(item => item.min_amount == 500).code;
                    self.prev_promocode = self.promocode;
                    self.promocode_info = self.bonus.find(item => item.min_amount == 500);
                })
        },
        data: function () {
            return {
                bonus: [],
                bonus_id: 500,
                amount: '500',
                prev_promocode: '',
                promocode: '',
                promocode_info: null,
                use_promocode: true,
                errors: [],
                success: [],
            }
        },
        methods: {
            setBonusId: function (id) {
                this.bonus_id = id;
                this.promocode = this.bonus.find(item => item.min_amount == id).code;
                this.prev_promocode = this.promocode;
                this.promocode_info = this.bonus.find(item => item.min_amount == id);
                this.setAmount(this.promocode_info.min_amount);
                if(id == 500){
                    toastr.warning('Это рекомендуемая сумма к пополнению!', 'Внимание!', {
                        positionClass: 'toast-bottom-left',
                        containerId: 'toast-bottom-left'
                    });
                }
            },
            setAmount: function (amount) {
                setValue(this.$refs.ci, amount.toFixed(2))
            },
            checkPromocode: function () {
                let self = this;
                this.errors = [];
                this.success = [];
                axios.post('/promocode', { code: this.promocode })
                    .then(function (response) {
                        if(response.data.success === false) {
                            self.errors.push(response.data.message);
                            self.promocode_info = null;
                            self.prev_promocode = self.promocode;
                        } else {
                            self.prev_promocode = self.promocode;
                            self.promocode_info = response.data.data;
                            self.success.push(response.data.message);
                        }
                    });
            },
            proccess: function () {
              let self = this;
              this.errors = [];
              this.success = [];
              axios.post('/data/deposit', { amount: self.numericAmount, promocode: self.selected_promocode})
                  .then(function (response) {
                    if(response.data.success === true) {
                      toastr.success(response.data.message, 'Успешно!', {
                        positionClass: 'toast-bottom-left',
                        containerId: 'toast-bottom-left'
                      });
                      self.$refs.datatables.updateDatatables();
                      setTimeout(() => { window.location.href = response.data.link; }, response.data.timeout);
                    } else {
                      self.errors.push(response.data.message);
                    }
                  })
            }
        },
        computed: {
            numericAmount: function () {
                return this.$ci.parse(this.amount);
            },
            show_amount: function () {
                let amount = this.numericAmount;
                if(this.promocode_info && this.use_promocode && this.prev_promocode === this.promocode){
                    amount = amount + (amount * this.promocode_info.bonus_size * 0.01);
                }
                return amount.toLocaleString(undefined, {minimumFractionDigits: 2});
            },
            bonus_percent: function () {
                if(this.promocode_info && this.prev_promocode === this.promocode){
                    return this.promocode_info.bonus_size;
                }
                return null;
            },
            selected_promocode: function () {
                if(this.promocode_info && this.prev_promocode === this.promocode && this.use_promocode){
                    return this.promocode_info.id;
                }
                return '';
            }
        },
    }
</script>

<style scoped>
    .yellow-outline {
        border: 1px solid #63630b;
    }

    .checked-box {
        background-color: #3e536b !important;
        border: 1px solid #8e8e10;
    }
</style>