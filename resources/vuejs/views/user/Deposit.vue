<template>
    <div class="content-wrapper">
        <div class="content-body">
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
                                                        <input type="text" class="form-control" value="START50">
                                                    </fieldset>
                                                    <div class="custom-control custom-switch custom-control-inline mb-1">
                                                        <input type="checkbox" class="custom-control-input" checked="" id="customSwitch1">
                                                        <label class="custom-control-label mr-1" for="customSwitch1">
                                                        </label>
                                                        <span>Использовать бонус <small>(условия)</small></span>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 pt-2">
                                                    <button type="button" class="btn btn-outline-secondary mr-1 mb-1">Продолжить</button>
                                                </div>
                                                <div class="col-md-6 pt-2 text-right align-bottom">
                                                    <p style="padding-top:10px;">Вы получите <span class="text-white" style="font-size: 1.3rem;">$ 1,000.00</span> (бонус 35%)</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <h4 class="card-title">Выберите Ваш бонус</h4>
                                            <div class="row" v-for="current in bonus" style="padding-bottom: 5px;">
                                                <div class="col-md-12">
                                                    <div @click="setBonusId(current.id)" class="btn btn-light-secondary w-100" :class="{'yellow-outline' : current.checked, 'checked-box' : current.id === bonus_id}">
                                                        <div class="row">
                                                            <div class="col-md-3">
                                                                <fieldset>
                                                                    <div class="radio radio-primary radio-glow" style="padding-top: 5px;">
                                                                        <input type="radio" :id="'radio'+current.amount" :value="current.id" v-model="bonus_id" name="radioGlow" disabled="disabled">
                                                                        <label :for="'radio'+current.amount"></label>
                                                                    </div>
                                                                </fieldset>
                                                            </div>
                                                            <div class="col-md-2">
                                                                $ {{ current.amount }}
                                                            </div>
                                                            <div class="col-md-3 text-success">
                                                                бонус {{ current.percent }} %
                                                            </div>
                                                            <div class="col-md-1">
                                                                =
                                                            </div>
                                                            <div class="col-md-2">
                                                                $ {{ (parseInt(current.amount.replace(' ', '')) * current.percent / 100).toString().replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ') }}
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

        <deposit-history></deposit-history>
    </div>
</template>

<script>
    import { CurrencyDirective, setValue, getValue } from 'vue-currency-input'
    import TradingChartComponent from "../../components/TradingChartComponent";
    export default {
        name: "Deposit",
        components : {
            TradingChartComponent
        },
        data: function () {
            return {
                bonus: [
                    { id: 7, amount: '10 000', percent: '100', checked: false },
                    { id: 6, amount: '5 000', percent: '90', checked: false },
                    { id: 5, amount: '3 000', percent: '80', checked: false },
                    { id: 4, amount: '1 000', percent: '70', checked: false },
                    { id: 3, amount: '500', percent: '65', checked: true },
                    { id: 2, amount: '250', percent: '60', checked: false },
                    { id: 1, amount: '100', percent: '55', checked: false },
                    { id: 0, amount: '50', percent: '50', checked: false },
                ],
                bonus_id: 3,
                amount: 50,
            }
        },
        methods: {
            setBonusId: function (id) {
                this.bonus_id = id;
                if(id === 3){
                    toastr.warning('Это рекомендуемая сумма к пополнению!', 'Внимание!', {
                        positionClass: 'toast-bottom-left',
                        containerId: 'toast-bottom-left'
                    });
                }
            },
            setAmount: function (amount) {
                setValue(this.$refs.ci, amount.toFixed(2))
            }
        }
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