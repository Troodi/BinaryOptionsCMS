<template>
    <div class="content-fluld" :style="{ 'margin-top': '4.6rem' }">
        <div class="content-body">
            <div class="row">
                <div class="col-lg-8 col-xxl-10 pr-0 pb-0">
                    <section class="card mb-0" :style="{ 'height': 'calc(100vh - 69px)' }">
                        <div class="card-content">
                            <div class="card-body p-0">
                                <div class="card-text">
                                    <TradingChartComponent></TradingChartComponent>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="col-lg-4 col-xxl-2 p-0">
                    <section class="card mb-0" :style="{ 'height': 'calc(100vh - 69px)' }">
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <small class="text-muted"><i>Время экспирации</i></small>
                                    <fieldset class="form-group position-relative" :style="{ 'margin-bottom': '0.3rem !important'}">
                                        <input id="time" @click="timeClick" readonly="readonly" type="text" style="opacity:1;" class="form-control form-control-lg" v-model="expiration">
                                        <div class="form-control-position" :style="{ 'top' : '14px'}">
                                            <i class="bx bx-timer"></i>
                                        </div>
                                    </fieldset>

                                    <div class="row pb-1" v-show="clicked">
                                        <div class="col-4 pr-0">
                                            <small class="text-muted"><i>Часы</i></small>
                                            <div class="d-inline-block w-100">
                                                <div class="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                                                    <input @focus="$event.target.select()" @click="$event.target.select()" type="number" class="touchspin-vertical form-control" v-model="hours">
                                                    <span class="input-group-btn-vertical">
                                                <button @click="hourAdd" style="width: 20px;" class="btn btn-primary bootstrap-touchspin-up" type="button">+</button>
                                                <button @click="hourSub" style="width: 20px;" class="btn btn-primary bootstrap-touchspin-down" type="button">-</button>
                                            </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-4 pr-0" style="padding-left:7.5px;padding-right:7.5px !important;">
                                            <small class="text-muted"><i>Минуты</i></small>
                                            <div class="d-inline-block w-100">
                                                <div class="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                                                    <input @focus="$event.target.select()" @click="$event.target.select()" type="number" class="touchspin-vertical form-control" v-model="minutes">
                                                    <span class="input-group-btn-vertical">
                                                <button @click="minuteAdd" style="width: 20px;" class="btn btn-primary bootstrap-touchspin-up" type="button">+</button>
                                                <button @click="minuteSub" style="width: 20px;" class="btn btn-primary bootstrap-touchspin-down" type="button">-</button>
                                            </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-4 pl-0">
                                            <small class="text-muted"><i>Секунды</i></small>
                                            <div class="d-inline-block w-100">
                                                <div class="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                                                    <input @focus="$event.target.select()" @click="$event.target.select()" type="number" class="touchspin-vertical form-control" v-model="seconds">
                                                    <span class="input-group-btn-vertical">
                                                <button @click="secondAdd" style="width: 20px;" class="btn btn-primary bootstrap-touchspin-up" type="button">+</button>
                                                <button @click="secondSub" style="width: 20px;" class="btn btn-primary bootstrap-touchspin-down" type="button">-</button>
                                            </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12" style="padding-top: 5px;">
                                            <button type="button" @click="closeClick" class="btn btn-outline-primary btn-sm w-100">Закрыть</button>
                                        </div>
                                    </div>

                                    <small class="text-muted"><i>Сумма сделки</i></small>
                                    <fieldset :style="{ 'margin-bottom': '0.3rem !important'}" class="form-group position-relative">
                                        <input @click="amountClick" type="text" v-money="money" v-model="amount" class="form-control form-control-lg">
                                        <div class="form-control-position" :style="{ 'top' : '14px'}">
                                            <i class="bx bx-dollar"></i>
                                        </div>

                                        <div v-show="clickedAmount" class="row" :style="{ 'margin-top': '0.3rem !important'}">
                                            <div class="col-4 pr-0">
                                                <button @click="setAmount(min)" type="button" class="btn btn-outline-primary btn-sm w-100">{{ min }}$</button>
                                            </div>
                                            <div class="col-4" style="padding-left:7.5px;padding-right:7.5px !important;">
                                                <button @click="setAmount(min*2)" type="button" class="btn btn-outline-primary btn-sm w-100">{{ min * 2}}$</button>
                                            </div>
                                            <div class="col-4 pl-0">
                                                <button @click="setAmount(min*4)" type="button" class="btn btn-outline-primary btn-sm w-100">{{ min * 4}}$</button>
                                            </div>
                                        </div>
                                        <div v-show="clickedAmount" class="row" :style="{ 'margin-top': '0.3rem !important'}">
                                            <div class="col-4 pr-0">
                                                <button @click="setAmount(min*8)" type="button" class="btn btn-outline-primary btn-sm w-100">{{ min * 8 }}$</button>
                                            </div>
                                            <div class="col-4" style="padding-left:7.5px;padding-right:7.5px !important;">
                                                <button @click="setAmount(min*16)" type="button" class="btn btn-outline-primary btn-sm w-100">{{ min * 16}}$</button>
                                            </div>
                                            <div class="col-4 pl-0">
                                                <button @click="setAmount(min*32)" type="button" class="btn btn-outline-primary btn-sm w-100">{{ min * 32}}$</button>
                                            </div>
                                        </div>
                                        <div v-show="clickedAmount" class="row" :style="{ 'margin-top': '0.3rem !important'}">
                                            <div class="col-4 pr-0">
                                                <button @click="subAmount" type="button" class="btn btn-outline-primary btn-sm w-100">-</button>
                                            </div>
                                            <div class="col-4" style="padding-left:7.5px;padding-right:7.5px !important;">
                                                <button @click="amountClickClose" type="button" class="btn btn-outline-success btn-sm w-100">ОК</button>
                                            </div>
                                            <div class="col-4 pl-0">
                                                <button @click="addAmount" type="button" class="btn btn-outline-primary btn-sm w-100">+</button>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <small class="text-muted"><i>Потенциальная прибыль</i></small>
                                    <fieldset class="form-group position-relative" v-show="number_percent === null">
                                        <input type="text" disabled class="form-control form-control-lg" placeholder="Загрузка..." aria-describedby="basic-addon2">
                                        <div class="form-control-position" :style="{ 'top' : '14px'}">
                                            <span class="spinner-border spinner-grow-sm" role="status" aria-hidden="true"></span>
                                        </div>
                                    </fieldset>

                                    <fieldset v-show="number_percent !== null" class="form-group position-relative">
                                        <input type="text" class="form-control form-control-lg" :value="(amount.toString().replace(',', '') * number_percent / 100).toFixed(2)" disabled>
                                        <div class="form-control-position" :style="{ 'top' : '14px'}">
                                            <i class="bx bx-dollar"></i>
                                        </div>
                                    </fieldset>

                                    <button v-show="percent === ''" class="btn btn-success mb-1 w-100 btn-lg" type="button" disabled="">
                                        <span class="spinner-border spinner-grow-sm" role="status" aria-hidden="true"></span>
                                        Загрузка...
                                    </button>

                                    <button v-show="percent !== ''" type="button" @click="buy" class="btn btn-success glow w-100 btn-lg" v-bind:disabled="isButtonDisabled">
                                        <i class="bx bx-trending-up"></i> <span class="align-middle ml-25" v-text="percent"></span>
                                    </button>

                                    <button v-show="percent === ''" class="btn btn-danger mb-1 w-100 btn-lg" type="button" disabled="">
                                        <span class="spinner-border spinner-grow-sm" role="status" aria-hidden="true"></span>
                                        Загрузка...
                                    </button>

                                    <button v-show="percent !== ''" @click="sell" type="button" class="btn btn-danger glow w-100 mt-1 btn-lg" v-bind:disabled="isButtonDisabled">
                                        <i class="bx bx-trending-down"></i><span class="align-middle ml-25" v-text="percent"></span>
                                    </button>
                                    <hr class="mt-2" id="line">
                                </div>
                                <div class="row">
                                    <div class="col-md-12" id="history">
                                        <div :style="{ height: historyHeight }" class="accordion collapse-icon accordion-icon-rotate ps ps--active-y" id="accordionWrapa2">
                                            <div class="card collapse-header">
                                                <div style="background-color: #22283e !important;border-top: 1px solid #464d5c !important; border-left: 1px solid #464d5c !important; border-right: 1px solid #464d5c !important;" id="heading5" class="card-header" data-toggle="collapse" data-target="#accordion5" aria-expanded="false" aria-controls="accordion5" role="tablist">
                                                    <span class="collapse-title">
                                                      <span class="text-success align-middle">EUR/USD</span>
                                                        <small>
                                                            <countdown :time="60 * 1000">
                                                                <template slot-scope="props">({{ props.hours.toString().padStart(2, "0") }}:{{ props.minutes.toString().padStart(2, "0") }}:{{ props.seconds.toString().padStart(2, "0") }})</template>
                                                            </countdown>
                                                        </small>
                                                        <countdown :time="60 * 1000">
                                                            <template slot-scope="props">
                                                                <div class="progress progress-sm progress-bar-success">
                                                                    <div :style="{ width: 100 - (((props.hours + props.minutes + props.seconds) / 60) * 100) + '%'}" class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                            </template>
                                                        </countdown>
                                                    </span>
                                                </div>
                                                <div id="accordion5" role="tabpanel" data-parent="#accordionWrapa2" aria-labelledby="heading5" class="collapse">
                                                    <div class="card-content">
                                                        <div class="card-body" style="background-color: #22283e !important; border: 1px solid; border-top: 1px;border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">
                                                            Открыто: 18:12:15<br>
                                                            Цена: 1.12332<br>
                                                            Осталось: 00:00:15
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="card collapse-header">
                                                <div style="background-color: #22283e !important;border-top: 1px solid #464d5c !important; border-left: 1px solid #464d5c !important; border-right: 1px solid #464d5c !important;" id="heading6" class="card-header" data-toggle="collapse" data-target="#accordion6" aria-expanded="false" aria-controls="accordion6" role="tablist">
                                                    <span class="collapse-title">
                                                      <span class="text-danger align-middle">EUR/USD</span>
                                                      <small>(00:00:15)</small>
                                                        <div class="progress progress-sm progress-bar-danger">
                                                          <div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="40" aria-valuemax="100" style="width:40%"></div>
                                                        </div>
                                                    </span>
                                                </div>
                                                <div id="accordion6" role="tabpanel" data-parent="#accordionWrapa2" aria-labelledby="heading6" class="collapse">
                                                    <div class="card-content">
                                                        <div class="card-body" style="background-color: #22283e !important; border: 1px solid; border-top: 1px;border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">
                                                            Открыто: 18:12:15<br>
                                                            Цена: 1.12332<br>
                                                            Осталось: 00:00:15
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="card collapse-header">
                                                <div style="background-color: #22283e !important;border-top: 1px solid #464d5c !important; border-left: 1px solid #464d5c !important; border-right: 1px solid #464d5c !important;" id="heading7" class="card-header" data-toggle="collapse" data-target="#accordion7" aria-expanded="false" aria-controls="accordion7" role="tablist">
                                                    <span class="collapse-title">
                                                      <span style="color:#39DA8A;" class="align-middle">EUR/USD</span>
                                                      <small>(00:00:15)</small>
                                                        <div class="progress progress-sm progress-bar-success">
                                                          <div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="40" aria-valuemax="100" style="width:40%"></div>
                                                        </div>
                                                    </span>
                                                </div>
                                                <div id="accordion7" role="tabpanel" data-parent="#accordionWrapa2" aria-labelledby="heading7" class="collapse">
                                                    <div class="card-content">
                                                        <div class="card-body" style="background-color: #22283e !important; border: 1px solid; border-top: 1px;border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">
                                                            Открыто: 18:12:15<br>
                                                            Цена: 1.12332<br>
                                                            Осталось: 00:00:15
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
    </div>
</template>

<script>
    import TradingChartComponent from "./../../components/TradingChartComponent";
    import { Money } from 'v-money'
    import $ from 'jquery'

    export default {
        name: "Trading",
        components : {
            TradingChartComponent,
            Money
        },
        mounted() {
            window.addEventListener("resize", this.windowResized);
            this.historyHeight = ($(window).height() - $('#line').offset().top - 30) + 'px';
            this.ps = new PerfectScrollbar("#accordionWrapa2");
            let self = this;
            this.$echo.channel('closed').listen('CloseOptionEvent', (payload) => {
                if(payload.success === true) {
                    toastr.success('Вы получили прибыль!', 'Сделка закрыта', {
                        positionClass: 'toast-bottom-left',
                        containerId: 'toast-bottom-left'
                    });
                } else {
                    toastr.error('Сделка закрыта без прибыли!', 'Сделка закрыта', {
                        positionClass: 'toast-bottom-left',
                        containerId: 'toast-bottom-left'
                    });
                }
                self.lines[payload.id].remove();
            });

            setInterval(() => {
                if(!window.dataLoaded){
                    this.percent = '';
                    this.symbol = null;
                    this.number_percent = null;
                }
                if(typeof window.symbolInfo !== 'undefined' && window.symbolInfo.full_name !== this.symbol && window.dataLoaded) {
                    this.symbol = window.symbolInfo.id;
                    this.percent = '+ ' + window.symbolInfo.description;
                    this.number_percent = window.symbolInfo.percent;
                }
            });
        },
        methods: {
            windowResized: function (e){
                this.historyHeight = ($(window).height() - $('#line').offset().top - 30) + 'px';
                this.ps.destroy();
                this.ps = new PerfectScrollbar("#accordionWrapa2");
            },
            buy: function () {
                let self = this;
                axios.post('/binary/buy', {
                    symbol: this.symbol,
                    hours: this.hours,
                    minutes: this.minutes,
                    seconds: this.seconds,
                    amount: this.amount,
                    type: 1,
                })
                .then(function (response) {
                    let order = window.tvWidget.chart().createOrderLine()
                        .setText("Выше")
                        .setLineLength(1)
                        .setLineStyle(0)
                        .setQuantity(response.data.quantity + '$')
                        .setLineColor('#23bd70')
                        .setQuantityBackgroundColor('#23bd70')
                        .setQuantityBorderColor('#23bd70')
                        .setBodyBorderColor('#23bd70')
                        .setBodyTextColor('#23bd70');
                    order.setPrice(response.data.price);
                    self.lines[response.data.id] = order;
                    toastr.info('Открыта сделка по цене ' + response.data.price, 'Сделка открыта', { positionClass: 'toast-bottom-left', containerId: 'toast-bottom-left' })
                })
            },
            sell: function(){
                let self = this;
                axios.post('/binary/buy', {
                    symbol: this.symbol,
                    hours: this.hours,
                    minutes: this.minutes,
                    seconds: this.seconds,
                    amount: this.amount,
                    type: 0,
                })
                .then(function (response) {
                    let order = window.tvWidget.chart().createOrderLine()
                        .setText("Ниже")
                        .setLineLength(1)
                        .setLineStyle(0)
                        .setQuantity(response.data.quantity + '$')
                        .setLineColor('#FF5B5C')
                        .setQuantityBackgroundColor('#FF5B5C')
                        .setQuantityBorderColor('#FF5B5C')
                        .setBodyBorderColor('#FF5B5C')
                        .setBodyTextColor('#FF5B5C')
                    order.setPrice(response.data.price);
                    self.lines[response.data.id] = order;
                    toastr.info('Открыта сделка по цене ' + response.data.price, 'Сделка открыта', { positionClass: 'toast-bottom-left', containerId: 'toast-bottom-left' })
                })
            },
            timeClick: function () {
                this.clicked = true;
            },
            closeClick: function () {
                if(parseInt(this.seconds) < 30 && parseInt(this.minutes) === 0 && parseInt(this.hours) === 0) {
                    toastr.error('Минимальная продолжительность сделки должна быть от 30 секунд', 'Ошибка!', {
                        positionClass: 'toast-bottom-left',
                        containerId: 'toast-bottom-left'
                    })
                } else {
                    this.clicked = false;
                }
            },
            addAmount: function(){
                this.amount = (parseFloat(this.amount.toString().replace(',', '')) + this.min).toFixed(2).toString();
            },
            subAmount: function(){
                this.amount = (parseFloat(this.amount.toString().replace(',', '')) - this.min).toFixed(2).toString();
            },
            setAmount: function(min){
              this.amount = min.toFixed(2).toString();
            },
            amountClick: function () {
              this.clickedAmount = true;
            },
            amountClickClose: function () {
                this.clickedAmount = false;
            },
            hourAdd: function () {
                let parsed = parseInt(this.hours);
                parsed += 1;
                this.hours = parsed;
            },
            hourSub: function () {
                let parsed = parseInt(this.hours);
                parsed -= 1;
                this.hours = parsed;
            },
            minuteAdd: function () {
                let parsed = parseInt(this.minutes);
                parsed += 1;
                this.minutes = parsed;
            },
            minuteSub: function () {
                let parsed = parseInt(this.minutes);
                parsed -= 1;
                this.minutes = parsed;
            },
            secondAdd: function () {
                let parsed = parseInt(this.seconds);
                parsed += 5;
                this.seconds = parsed;
            },
            secondSub: function () {
                let parsed = parseInt(this.seconds);
                if(parsed === 59){
                    parsed -= 4;
                } else {
                    parsed -= 5;
                }
                this.seconds = parsed;
            },
        },
        data() {
            return {
                clicked: false,
                clickedAmount: false,
                percent: '',
                symbol: null,
                number_percent: null,
                amount: localStorage.getItem('amount') ? localStorage.getItem('amount') : '1.00',
                min: 1,
                lines: {},
                hours: localStorage.getItem('hours') ? localStorage.getItem('hours') : '00',
                minutes: localStorage.getItem('minutes') ? localStorage.getItem('minutes') : '00',
                seconds: localStorage.getItem('seconds') ? localStorage.getItem('seconds') : '30',
                historyHeight: '300px',
                money: {
                    decimal: '.',
                    thousands: ',',
                    precision: 2,
                }
            }
        },
        computed: {
            expiration: function () {
                return this.hours + ':' + this.minutes + ':' + this.seconds;
            },
            isButtonDisabled: function () {
                return parseInt(this.seconds) < 30 && parseInt(this.minutes) === 0 && parseInt(this.hours) === 0;
            }
        },
        watch: {
            hours: function () {
                let number = parseInt(this.hours);
                let final = number;
                if(number > 12){
                    final = '12';
                }
                else if(number <= 0){
                    final = '0';
                }
                else if(this.hours === ''){
                    final = '0';
                }
                if(final < 10){
                    final = '0' + final.toString();
                }
                this.hours = final;
                localStorage.setItem('hours', this.hours);
            },
            minutes: function () {
                let number = parseInt(this.minutes);
                let final = number;
                if(number > 59){
                    final = '59';
                }
                else if(number <= 0){
                    final = '0';
                }
                else if(this.minutes === ''){
                    final = '0';
                }
                if(final < 10){
                    final = '0' + final.toString();
                }
                this.minutes = final;
                localStorage.setItem('minutes', this.minutes);
            },
            seconds: function () {
                let number = parseInt(this.seconds);
                let final = number;
                if(number > 59){
                    final = '59';
                }
                else if(number <= 0){
                    final = '0';
                }
                else if(this.seconds === ''){
                    final = '0';
                }
                if(final < 10){
                    final = '0' + final.toString();
                }
                this.seconds = final;
                localStorage.setItem('seconds', this.seconds);
            },
            amount: function () {
                let first = this.amount;
                let number = parseFloat(first.toString().replace(',', ''));
                let min = number / 8;
                if(min < 1){
                    min = 1;
                }
                this.min = min;
                if(number < 1){
                    this.amount = '1.00';
                }
                if(number > 100000){
                    this.amount = '100000.00';
                }
                localStorage.setItem('amount', this.amount);
            }
        }
    }
</script>

<style scoped>
    body.dark-layout .collapsible .card.open, body.dark-layout .accordion .card.open {
        box-shadow: 0px 0px 0px 0 rgba(11, 26, 51, 0.63) !important;
    }
</style>