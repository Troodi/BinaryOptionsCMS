<template>
    <div class="content-fluld" :style="{ 'margin-top': '4.6rem' }">
        <div class="content-body">
            <div class="row">
                <div class="col-md-10 pr-0 pb-0">
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
                <div class="col-md-2 p-0">
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
                                        <div class="col-lg-12 col-xl-4 pr-0">
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
                                        <div class="col-lg-12 col-xl-4 pr-0" style="padding-left:7.5px;padding-right:7.5px !important;">
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
                                        <div class="col-lg12 col-xl-4 pl-0">
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
                                        <input type="number" v-model="amount" class="form-control form-control-lg">
                                        <div class="form-control-position" :style="{ 'top' : '14px'}">
                                            <i class="bx bx-dollar"></i>
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
                                        <input type="text" class="form-control form-control-lg" :value="amount * number_percent / 100" disabled>
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
                                    <hr class="mt-2">
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
    import md5 from 'md5'

    export default {
        name: "Trading",
        components : {
            TradingChartComponent
        },
        mounted() {
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
                percent: '',
                symbol: null,
                number_percent: null,
                amount: 10,
                lines: {},
                hours: '00',
                minutes: '00',
                seconds: '30',
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
            },
        }
    }
</script>

<style scoped>

</style>