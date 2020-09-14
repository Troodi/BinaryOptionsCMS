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
                                        <template>
                                            <input ref="ci" @click="amountClick" type="text" class="form-control form-control-lg" v-model="amount" v-currency="{currency: null, autoDecimalMode: true, valueRange: {min: 1, max: 1000}}">
                                        </template>

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
                                        <input type="text" class="form-control form-control-lg" :value="(this.$ci.parse(this.amount) + (this.$ci.parse(this.amount) * number_percent / 100)).toFixed(2)" disabled>
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
<!--                                            Opened orders-->
                                            <p v-show="opened.length > 0" class="text-center">Открытые сделки</p>
                                            <div v-for="open in opened" class="card collapse-header">
                                                <div :id="'heading' + open.id" :data-target="'#accordion' + open.id" :aria-controls="'accordion' + open.id" aria-expanded="false"  style="background-color: #22283e !important;border-top: 1px solid #464d5c !important; border-left: 1px solid #464d5c !important; border-right: 1px solid #464d5c !important; padding:15px;" class="card-header" data-toggle="collapse" role="tablist">
                                                    <span class="collapse-title">
                                                        <span class="align-middle" :class="'text-' + open.textColor">
                                                            {{ symbols.find(item => item.id === open.symbol_id).symbol }}
                                                        </span>

                                                        <small :class="'text-' + open.textColor" style="float: right;padding-right: 20px;padding-top: 5px;">
                                                            <strong v-show="open.profit_status === 0" v-text="'0 $'"></strong>
                                                            <strong v-show="open.profit_status === 1" v-text="(parseFloat(open.amount) + (open.amount * open.percent / 100)).toFixed(2) + ' $'"></strong>
                                                            <strong v-show="open.profit_status === 2" v-text="open.amount + ' $'"></strong>
                                                       </small>

                                                        <template>
                                                            <vue-countdown-timer :start-time="'2020-01-01 00:00:00'" :end-time="open.timestamp" :interval="1000">
                                                                <template slot="countdown" slot-scope="scope">
                                                                    <div class="progress position-relative" :class="'progress-bar-' + open.textColor" style="text-shadow: 1px 1px 2px black;">
                                                                        <div :style="{ width: (100 - (((scope.props.hours * 60 * 60 + scope.props.minutes * 60 + scope.props.seconds) / open.expiration) * 100)) + '%'}" class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                                                        <small style="margin-top: -3.4px; font-size:12px;" class="text-white justify-content-center d-flex position-absolute w-100">
                                                                            {{scope.props.hours}}:{{scope.props.minutes}}:{{scope.props.seconds}}
                                                                        </small>

                                                                        <small style="margin-top: -3.4px; font-size:10px;" class="text-white justify-content-left d-flex position-absolute w-100">
                                                                            <i v-show="open.type === 1" class="bx bx-trending-up" style="font-size: 12px;padding-left: 1px;padding-top: 3px;"></i>
                                                                            <i v-show="open.type === 0" class="bx bx-trending-down" style="font-size: 12px;padding-left: 1px;padding-top: 1px;"></i>
                                                                            <span class="text-white" style="padding-top: 1px;">{{ open.percent }}%</span>
                                                                        </small>

                                                                        <small v-text="open.amount + ' $'" style="margin-top: -3.4px; font-size:12px; padding-right:1px;" class="text-white justify-content-end d-flex position-absolute w-100"></small>
                                                                    </div>
                                                                  </template>
                                                                  <template slot="end-text" slot-scope="scope">
                                                                    <div class="progress progress-sm progress-bar-success">
                                                                        <div :style="{ width: '100%'}" class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                                                    </div>
                                                                  </template>
                                                            </vue-countdown-timer>
                                                        </template>
                                                    </span>
                                                </div>
                                                <div :id="'accordion' + open.id" :aria-labelledby="'heading' + open.id" role="tabpanel" data-parent="#accordionWrapa2" class="collapse">
                                                    <div class="card-content">
                                                        <div class="card-body" style="padding: 15px; background-color: #22283e !important; border: 1px solid; border-top: 1px;border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">
                                                            Открыто: 12:00:00<br>
                                                            Цена открытия: {{ parseFloat(open.open_price) }}<br>
                                                            Текущая цена: {{ open.current_price }}<br>
                                                            Время: 00:00:15<br>
                                                            Направление: выше
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
<!--                                            End opened orders-->
                                            <p class="text-center">История сделок</p>
<!--                                            Latest orders-->
                                            <div v-for="open in latest" class="card collapse-header">
                                                <div :id="'heading' + open.id" :data-target="'#accordion' + open.id" :aria-controls="'accordion' + open.id" aria-expanded="false"  style="background-color: #22283e !important;border-top: 1px solid #464d5c !important; border-left: 1px solid #464d5c !important; border-right: 1px solid #464d5c !important; padding:15px;" class="card-header" data-toggle="collapse" role="tablist">
                                                    <span class="collapse-title">
                                                        <span class="align-middle" :class="'text-' + open.textColor">
                                                            {{ symbols.find(item => item.id === open.symbol_id).symbol }}
                                                        </span>

                                                        <small :class="'text-' + open.textColor" style="float: right;padding-right: 20px;padding-top: 5px;">
                                                            <strong v-text="parseFloat(open.profit).toFixed(2) + ' $'"></strong>
                                                       </small>
                                                        <div class="progress position-relative" :class="'progress-bar-primary'" style="text-shadow: 1px 1px 2px black;">
                                                            <div style="width:100%" class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                                            <small style="margin-top: -3.4px; font-size:12px;" class="text-white justify-content-center d-flex position-absolute w-100">
                                                                {{ open.expiration }}
                                                            </small>

                                                            <small style="margin-top: -3.4px; font-size:10px;" class="text-white justify-content-left d-flex position-absolute w-100">
                                                                <i v-show="open.type === 1" class="bx bx-trending-up" style="font-size: 12px;padding-left: 1px;padding-top: 3px;"></i>
                                                                <i v-show="open.type === 0" class="bx bx-trending-down" style="font-size: 12px;padding-left: 1px;padding-top: 1px;"></i>
                                                                <span class="text-white" style="padding-top: 1px;">{{ open.percent }}%</span>
                                                            </small>

                                                            <small v-text="open.amount + ' $'" style="margin-top: -3.4px; font-size:12px; padding-right:1px;" class="text-white justify-content-end d-flex position-absolute w-100"></small>
                                                        </div>
                                                    </span>
                                                </div>
                                                <div :id="'accordion' + open.id" :aria-labelledby="'heading' + open.id" role="tabpanel" data-parent="#accordionWrapa2" class="collapse">
                                                    <div class="card-content">
                                                        <div class="card-body" style="padding: 15px; background-color: #22283e !important; border: 1px solid; border-top: 1px;border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">
                                                            Открыто: 12:00:00<br>
                                                            Цена открытия: {{ parseFloat(open.open_price) }}<br>
                                                            Текущая цена: {{ open.current_price }}<br>
                                                            Время: 00:00:15<br>
                                                            Направление: выше
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="button" class="btn btn-outline-primary w-100">Полная история сделок</button>
<!--                                            End latest orders-->
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
    import $ from 'jquery'
    import { TradingViewFastWebsocket } from '../../js/tv2'
    import { CurrencyDirective, setValue, getValue } from 'vue-currency-input'

    export default {
        name: "Trading",
        components : {
            TradingChartComponent
        },
        directives: {
            currency: CurrencyDirective
        },
        mounted() {
            this.localTV = new TradingViewFastWebsocket();

            setInterval(() => {
                this.fastData = this.localTV.getTickerDataArray();
                this.opened.forEach((open) => {
                    if(this.symbols.length > 0) {
                        try {
                            let symbol = this.symbols.find(item => item.id === open.symbol_id);
                            let lp = this.fastData[symbol.broker + ':' + symbol.symbol.replace('/', '')].lp;
                            let color = 'warning';
                            let profitStatus = 2;
                            let open_price = parseFloat(open.open_price);
                            if (open.type === 1 && lp > open_price || open.type === 0 && lp < open_price) {
                                color = 'success';
                                profitStatus = 1;
                            } else if (open.type === 0 && lp > open_price || open.type === 1 && lp < open_price) {
                                color = 'danger';
                                profitStatus = 0;
                            }
                            this.$set(open, 'textColor', color);
                            this.$set(open, 'current_price', lp);
                            this.$set(open, 'profit_status', profitStatus);
                        } catch (e) { }
                    }
                });
            }, 100);

            window.addEventListener("resize", this.windowResized);
            this.historyHeight = ($(window).height() - $('#line').offset().top - 30) + 'px';
            this.ps = new PerfectScrollbar("#accordionWrapa2");
            let self = this;

            axios.get('/data/symbols')
                .then(function (response) {
                    self.symbols = response.data;
                    self.symbols.forEach(item => {
                        self.localTV.getTicker(item.broker + ':' + item.symbol.replace('/', ''));
                    });
                })

            this.$echo.channel('closed').listen('CloseOptionEvent', (payload) => {
                let model = payload.model;
                self.latest.unshift(model);
                if(payload.success === true) {
                    toastr.success('Вы получили прибыль ' + model.profit + '$!', 'Сделка закрыта', {
                        positionClass: 'toast-bottom-left',
                        containerId: 'toast-bottom-left'
                    });
                } else {
                    toastr.error('Сделка закрыта без прибыли!', 'Сделка закрыта', {
                        positionClass: 'toast-bottom-left',
                        containerId: 'toast-bottom-left'
                    });
                }
                self.opened = self.opened.filter(item => item.id !== payload.id);
                try {
                    self.lines[payload.id].remove();
                } catch (e) {
                    
                }
            });

            setInterval(() => {
                if(!window.dataLoaded){
                    this.percent = '';
                    this.symbol = null;
                    this.number_percent = null;
                }
                if(typeof window.symbolInfo !== 'undefined' && window.symbolInfo.full_name !== this.symbol && window.dataLoaded && this.symbol !== window.symbolInfo.id) {
                    this.symbol = window.symbolInfo.id;
                    this.percent = '+ ' + window.symbolInfo.description;
                    this.number_percent = window.symbolInfo.percent;

                    if(self.opened.length === 0) {
                        axios.post('/data/opened')
                            .then(function (response) {
                                self.opened = response.data;
                                let filtered = self.opened.filter(item => item.symbol_id === window.symbolInfo.id);
                                filtered.forEach(element => {
                                    try {
                                        self.lines[element.id].remove();
                                    } catch (e) {
                                    }
                                    let color = element.type === 1 ? '#23bd70' : '#FF5B5C';
                                    let order = window.tvWidget.chart().createOrderLine()
                                        .setText("Выше")
                                        .setLineLength(1)
                                        .setLineStyle(0)
                                        .setQuantity(element.amount + '$')
                                        .setLineColor(color)
                                        .setQuantityBackgroundColor(color)
                                        .setQuantityBorderColor(color)
                                        .setBodyBorderColor(color)
                                        .setBodyTextColor(color);
                                    order.setPrice(element.open_price);
                                    self.lines[element.id] = order;
                                });
                            });
                    }

                    if(self.latest.length === 0) {
                        axios.post('/data/latest')
                            .then(function (response) {
                                if (self.latest.length === 0) {
                                    self.latest = response.data;
                                }
                            });
                    }
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
                    amount: this.$ci.parse(this.amount),
                    type: 1,
                })
                .then(function (response) {
                    self.opened.unshift(response.data);
                    let order = window.tvWidget.chart().createOrderLine()
                        .setText("Выше")
                        .setLineLength(1)
                        .setLineStyle(0)
                        .setQuantity(response.data.amount + '$')
                        .setLineColor('#23bd70')
                        .setQuantityBackgroundColor('#23bd70')
                        .setQuantityBorderColor('#23bd70')
                        .setBodyBorderColor('#23bd70')
                        .setBodyTextColor('#23bd70');
                    order.setPrice(response.data.open_price);
                    self.lines[response.data.id] = order;
                    toastr.info('Открыта сделка по цене ' + response.data.open_price, 'Сделка открыта', { positionClass: 'toast-bottom-left', containerId: 'toast-bottom-left' })
                })
            },
            sell: function(){
                let self = this;
                axios.post('/binary/buy', {
                    symbol: this.symbol,
                    hours: this.hours,
                    minutes: this.minutes,
                    seconds: this.seconds,
                    amount: this.$ci.parse(this.amount),
                    type: 0,
                })
                .then(function (response) {
                    self.opened.unshift(response.data);
                    let order = window.tvWidget.chart().createOrderLine()
                        .setText("Ниже")
                        .setLineLength(1)
                        .setLineStyle(0)
                        .setQuantity(response.data.amount + '$')
                        .setLineColor('#FF5B5C')
                        .setQuantityBackgroundColor('#FF5B5C')
                        .setQuantityBorderColor('#FF5B5C')
                        .setBodyBorderColor('#FF5B5C')
                        .setBodyTextColor('#FF5B5C')
                    order.setPrice(response.data.open_price);
                    self.lines[response.data.id] = order;
                    toastr.info('Открыта сделка по цене ' + response.data.open_price, 'Сделка открыта', { positionClass: 'toast-bottom-left', containerId: 'toast-bottom-left' })
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
              setValue(this.$refs.ci, min.toFixed(2))
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
                amount: localStorage.getItem('amount') ? localStorage.getItem('amount') : '1,00',
                min: 1,
                lines: {},
                hours: localStorage.getItem('hours') ? localStorage.getItem('hours') : '00',
                minutes: localStorage.getItem('minutes') ? localStorage.getItem('minutes') : '00',
                seconds: localStorage.getItem('seconds') ? localStorage.getItem('seconds') : '30',
                historyHeight: '300px',
                opened: [],
                fastData: [],
                latest: [],
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
                if (number > 12) {
                    final = '12';
                } else if (number <= 0) {
                    final = '0';
                } else if (this.hours === '') {
                    final = '0';
                }
                if (final < 10) {
                    final = '0' + final.toString();
                }
                this.hours = final;
                localStorage.setItem('hours', this.hours);
            },
            minutes: function () {
                let number = parseInt(this.minutes);
                let final = number;
                if (number > 59) {
                    final = '59';
                } else if (number <= 0) {
                    final = '0';
                } else if (this.minutes === '') {
                    final = '0';
                }
                if (final < 10) {
                    final = '0' + final.toString();
                }
                this.minutes = final;
                localStorage.setItem('minutes', this.minutes);
            },
            seconds: function () {
                let number = parseInt(this.seconds);
                let final = number;
                if (number > 59) {
                    final = '59';
                } else if (number <= 0) {
                    final = '0';
                } else if (this.seconds === '') {
                    final = '0';
                }
                if (final < 10) {
                    final = '0' + final.toString();
                }
                this.seconds = final;
                localStorage.setItem('seconds', this.seconds);
            },
            amount: function () {
                let min = Math.ceil(this.$ci.parse(this.amount) / 8);
                this.min = min;
                localStorage.setItem('amount', this.amount);
            },
            latest: function () {
                this.latest.forEach((last) => {
                    try {
                        let color = 'warning';
                        let open_price = parseFloat(last.open_price);
                        let close_price = parseFloat(last.close_price);
                        if (last.type === 1 && close_price > open_price || last.type === 0 && close_price < open_price) {
                            color = 'success';
                        } else if (last.type === 0 && close_price > open_price || last.type === 1 && close_price < open_price) {
                            color = 'danger';
                        }
                        this.$set(last, 'textColor', color);
                    } catch (e) { }
                });
            }
        }
    }
</script>

<style scoped>
    body.dark-layout .collapsible .card.open, body.dark-layout .accordion .card.open {
        box-shadow: 0px 0px 0px 0 rgba(11, 26, 51, 0.63) !important;
    }
    .progress-bar-success .progress-bar {
        background-color: #157344;
        box-shadow: 0 2px 6px 0 rgba(57, 218, 138, 0.2);
    }
    .progress-bar-primary .progress-bar {
        background-color: #244177;
        box-shadow: 0 2px 6px 0 rgba(90, 141, 238, 0.2);
    }
</style>