<template>
    <div class="content-fluld" :style="{ 'margin-top': '4.6rem' }">
      <!-- Modal discount -->
      <div class="modal fade" id="greatWorkModal" tabindex="-1" role="dialog" aria-labelledby="discountModalLabel" aria-hidden="true">
        <div class="modal-dialog gradient-border" role="document" style="top:25vh">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">{{ $i18n.t('trade_good_work') }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="text-center">
                <div class="text-center mb-2">
                  {{ $i18n.t('trade_profit_modal') }}
                </div>
                <div class="text-center mb-2">
                  <img src="/images/icon/cup.png" height="155" width="155" class="img-fluid">
                </div>
                <div class="text-center mb-2">
                  {{ $i18n.t('trade_profit_modal_desc') }}
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" @click="moveToReal" class="btn btn-warning w-100">{{ $i18n.t('trade_go_real') }}</button>
            </div>
          </div>
        </div>
      </div>
      <!-- End modal -->

        <div class="content-body">
            <div class="row">
                <div class="col-lg-8 col-xxl-10 pr-0 pb-0">
                    <section class="card mb-0">
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
                    <section class="card mb-0 trading-card-height">
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">

                                  <div v-show="number_percent !== null && number_percent > 0 && isButtonDisabled" class="alert bg-rgba-danger alert-dismissible mb-2" role="alert">
                                    <div class="d-flex align-items-center">
                                      {{ $i18n.t('trade_expiration_min', {min_expiration: formatSeconds()}) }}
                                    </div>
                                  </div>

                                  <small class="text-muted"><i>{{ $i18n.t('trade_expiration') }} <span v-show="number_percent !== null">({{ $i18n.t('trade_expiration_min', {min_expiration: formatSeconds()}) }})</span></i></small>
                                    <fieldset class="form-group position-relative" :style="{ 'margin-bottom': '0.3rem !important'}">
                                        <input id="time" @click="timeClick" readonly="readonly" type="text" style="opacity:1;" class="form-control form-control-lg" v-model="expiration">
                                        <div class="form-control-position" :style="{ 'top' : '14px'}">
                                            <i class="bx bx-timer"></i>
                                        </div>
                                    </fieldset>

                                    <div class="row pb-1" v-show="clicked">
                                        <div class="col-4 pr-0">
                                            <small class="text-muted"><i>{{ $i18n.t('trade_hours') }}</i></small>
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
                                            <small class="text-muted"><i>{{ $i18n.t('trade_minutes') }}</i></small>
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
                                            <small class="text-muted"><i>{{ $i18n.t('trade_seconds') }}</i></small>
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
                                            <button type="button" @click="closeClick" class="btn btn-outline-primary btn-sm w-100">{{ $i18n.t('trade_close') }}</button>
                                        </div>
                                    </div>

                                    <small class="text-muted"><i>{{ $i18n.t('trade_amount') }}</i></small>
                                    <fieldset :style="{ 'margin-bottom': '0.3rem !important'}" class="form-group position-relative">
                                        <template>
                                            <input ref="ci" @click="amountClick" type="text" class="form-control form-control-lg" v-model="amount" v-currency="{currency: null, autoDecimalMode: true, valueRange: {min: 1, max: 1000}}">
                                        </template>

                                        <div class="form-control-position" :style="{ 'top' : '14px'}">
                                            <i class="bx bx-dollar"></i>
                                        </div>

                                        <div v-show="clickedAmount" class="row" :style="{ 'margin-top': '0.3rem !important'}">
                                            <div class="col-4 pr-0">
                                                <button @click="setAmount(min)" type="button" class="btn btn-outline-primary btn-sm w-100" style="padding-left: 3px;padding-right: 3px;">{{ min }}$</button>
                                            </div>
                                            <div class="col-4" style="padding-left:7.5px;padding-right:7.5px !important;">
                                                <button @click="setAmount(min*2)" type="button" class="btn btn-outline-primary btn-sm w-100" style="padding-left: 3px;padding-right: 3px;">{{ min * 2}}$</button>
                                            </div>
                                            <div class="col-4 pl-0">
                                                <button @click="setAmount(min*4)" type="button" class="btn btn-outline-primary btn-sm w-100" style="padding-left: 3px;padding-right: 3px;">{{ min * 4}}$</button>
                                            </div>
                                        </div>
                                        <div v-show="clickedAmount" class="row" :style="{ 'margin-top': '0.3rem !important'}">
                                            <div class="col-4 pr-0">
                                                <button @click="setAmount(min*8)" type="button" class="btn btn-outline-primary btn-sm w-100" style="padding-left: 3px;padding-right: 3px;">{{ min * 8 }}$</button>
                                            </div>
                                            <div class="col-4" style="padding-left:7.5px;padding-right:7.5px !important;">
                                                <button @click="setAmount(min*16)" type="button" class="btn btn-outline-primary btn-sm w-100" style="padding-left: 3px;padding-right: 3px;">{{ min * 16}}$</button>
                                            </div>
                                            <div class="col-4 pl-0">
                                                <button @click="setAmount(min*32)" type="button" class="btn btn-outline-primary btn-sm w-100" style="padding-left: 3px;padding-right: 3px;">{{ min * 32}}$</button>
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

                                    <small class="text-muted"><i>{{ $i18n.t('trade_potential') }}</i></small>
                                    <fieldset class="form-group position-relative" v-show="number_percent === null">
                                        <input type="text" disabled class="form-control form-control-lg" :placeholder="$i18n.t('trade_loading')" aria-describedby="basic-addon2">
                                        <div class="form-control-position" :style="{ 'top' : '14px'}">
                                            <span class="spinner-border spinner-grow-sm" role="status" aria-hidden="true"></span>
                                        </div>
                                    </fieldset>

                                    <fieldset v-show="number_percent !== null" class="form-group position-relative">
                                        <input type="text" class="form-control form-control-lg" :value="(this.$ci.parse(this.amount) * number_percent / 100).toFixed(2)" disabled>
                                        <div class="form-control-position" :style="{ 'top' : '14px'}">
                                            <i class="bx bx-dollar"></i>
                                        </div>
                                    </fieldset>

                                    <button v-show="percent === ''" class="btn btn-success mb-1 w-100 btn-lg" type="button" disabled="">
                                        <span class="spinner-border spinner-grow-sm" role="status" aria-hidden="true"></span>
                                        {{ $i18n.t('trade_loading') }}
                                    </button>

                                    <button v-show="number_percent === 0 && percent !== ''" class="disabled btn btn-success mb-1 w-100 btn-lg" type="button" disabled="disabled">
                                      {{ $i18n.t('trade_closed_market') }}
                                    </button>

                                    <button v-show="percent !== '' && number_percent !== 0" type="button" @click="placeOrder(1, '#23bd70', $i18n.t('trade_up'))" class="btn btn-success glow w-100 btn-lg" v-bind:disabled="isButtonDisabled">
                                        <i class="bx bx-trending-up"></i> <span class="align-middle ml-25" v-text="percent"></span>
                                    </button>

                                    <button v-show="percent === ''" class="btn btn-danger mb-1 w-100 btn-lg" type="button" disabled="">
                                        <span class="spinner-border spinner-grow-sm" role="status" aria-hidden="true"></span>
                                        {{ $i18n.t('trade_loading') }}
                                    </button>

                                    <button v-show="number_percent === 0 && percent !== ''" class="disabled btn btn-danger mb-1 w-100 btn-lg" type="button" disabled="disabled">
                                      {{ $i18n.t('trade_closed_market') }}
                                    </button>

                                    <button v-show="percent !== '' && number_percent !== 0" @click="placeOrder(0, '#FF5B5C', $i18n.t('trade_down'))" type="button" class="btn btn-danger glow w-100 mt-1 btn-lg" v-bind:disabled="isButtonDisabled">
                                        <i class="bx bx-trending-down"></i><span class="align-middle ml-25" v-text="percent"></span>
                                    </button>
                                    <hr class="mt-2" id="line">
                                </div>
                                <div class="row">
                                    <div class="col-md-12" id="history">
                                        <div :style="{ height: historyHeight }" class="accordion collapse-icon accordion-icon-rotate ps ps--active-y" id="accordionWrapa2">
<!--                                            Opened orders-->
                                            <p v-show="opened.length > 0" class="text-center">{{ $i18n.t('trade_open_orders') }}</p>

                                            <b-card no-body v-for="(open, index) in opened" :key="index" class="collapse-header">
                                              <div v-b-toggle="'opened-orders' + index" data-toggle="collapse" class="card-header p-1">
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
                                              <b-collapse :id="'opened-orders' + index" accordion="opened-orders" role="tabpanel">
                                                <div class="card-content">
                                                  <div class="card-body" style="padding: 15px; background-color: #22283e !important; border: 1px solid; border-top: 1px;border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">
                                                    {{ $i18n.t('trade_open') }}: {{ openedDate(open.created_at) }}<br>
                                                    {{ $i18n.t('trade_opened_price') }}: {{ parseFloat(open.open_price) }}<br>
                                                    {{ $i18n.t('trade_path') }}: <div v-show="open.type === 1" class="badge badge-success">{{ $i18n.t('trade_up') }}</div><div v-show="open.type === 0" class="badge badge-danger">{{ $i18n.t('trade_down') }}</div>
                                                  </div>
                                                </div>
                                              </b-collapse>
                                            </b-card>
<!--                                            End opened orders-->
                                            <p class="text-center">{{ $i18n.t('trade_orders_history') }}</p>
                                            <div v-show="latest.length === 0 && historyLoaded">
                                              <ul class="list-group">
                                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                                  <span> {{ $i18n.t('trade_no_orders') }}</span>
                                                  <span class="badge-circle badge-circle-warning badge-circle-sm text-white">
                                                    <i class="bx bx-info-circle font-size-base" style="font-size: 1rem;margin-left: -1.5px;"></i>
                                                  </span>
                                                </li>
                                              </ul>
                                            </div>
<!--                                        Latest orders-->
                                            <b-card no-body v-for="(open, index) in latest" :key="'latest' + index" class="collapse-header">
                                              <div v-b-toggle="'latest-orders' + index" data-toggle="collapse" class="card-header p-1">
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
                                                <b-collapse :id="'latest-orders' + index" accordion="latest-orders" role="tabpanel">
                                                  <div class="card-content">
                                                    <div class="card-body" style="padding: 15px; background-color: #22283e !important; border: 1px solid; border-top: 1px;border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">
                                                      {{ $i18n.t('trade_open') }}: {{ openedDate(open.open_at) }}<br>
                                                      {{ $i18n.t('trade_opened_price') }}: {{ parseFloat(open.open_price) }}<br>
                                                      {{ $i18n.t('trade_time') }}: {{ open.expiration }}<br>
                                                      {{ $i18n.t('trade_path') }}: <div v-show="open.type === 1" class="badge badge-success">{{ $i18n.t('trade_up') }}</div><div v-show="open.type === 0" class="badge badge-danger">{{ $i18n.t('trade_down') }}</div>
                                                    </div>
                                                  </div>
                                                </b-collapse>
                                            </b-card>
                                            <div class="text-center mb-2">
                                              <span v-show="!historyLoaded" role="status" aria-hidden="true" class="spinner-border spinner-grow-sm" style="width:3rem;height:3rem;"></span>
                                            </div>
                                            <router-link to="/history">
                                              <template>
                                                <button type="button" class="btn btn-outline-primary w-100">{{ $i18n.t('trade_full_orders_history') }}</button>
                                              </template>
                                            </router-link>
<!--                                        End latest orders-->
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
    import * as dateformat from "dateformat";

    export default {
        name: "Trading",
        props: ['user'],
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
            try {
                this.historyHeight = ($(window).height() - $('#line').offset().top - 30) + 'px';
            } catch (e){
                this.historyHeight = '0px';
            }
            this.ps = new PerfectScrollbar("#accordionWrapa2");
            let self = this;

            axios.get('/data/symbols')
                .then(function (response) {
                    self.symbols = response.data;
                    self.symbols.forEach(item => {
                        self.localTV.getTicker(item.broker + ':' + item.symbol.replace('/', ''));
                    });
                })
            setInterval(() => {
                if(!window.dataLoaded){
                    this.percent = '';
                    this.symbol = null;
                    this.number_percent = null;
                    this.min_expiration = Infinity;
                }
                if(typeof window.symbolInfo !== 'undefined' && window.symbolInfo.full_name !== this.symbol && window.dataLoaded && this.symbol !== window.symbolInfo.id) {
                    this.symbol = window.symbolInfo.id;
                    this.min_expiration = window.symbolInfo.expiration;
                    if(this.symbolsPercents[this.symbol] == null){
                      this.percent = '+ ' + window.symbolInfo.description;
                      this.number_percent = window.symbolInfo.percent;
                    } else {
                      this.percent = '+ ' + this.symbolsPercents[this.symbol].toString()+'%';
                      this.number_percent = this.symbolsPercents[this.symbol];
                      window.$('#' + window.tvWidget._iFrame.name).contents().find('[data-name="legend-source-title"]').first().text(this.symbolsPercents[this.symbol].toString()+'%')
                    }
                    if(self.opened.length === 0) {
                        self.getOpenedHistory();
                    }

                    if(self.latest.length === 0) {
                      self.getLatestHistory();
                    }
                }
            });
        },
        methods: {
            clearLines(){
              if(this.lines.length > 0) {
                this.lines.forEach(element => {
                  element.remove();
                });
                this.lines = [];
              }
            },
            getOpenedHistory(){
              let self = this;
              self.opened = [];
              let urlOpened = '/data/opened';
              if(this.isDemo) {
                urlOpened = '/data/demo/opened';
              }
              if(this.isContest){
                urlOpened = '/data/tournament/opened';
              }
              axios.post(urlOpened, { id: this.tradingType === 'tournament' ? this.contestId : 0 })
                .then(function (response) {
                  self.opened = response.data;
                  try {
                    // remove all lines from chart
                    self.clearLines();
                    // draw all lines for open positions
                    let filtered = self.opened.filter(item => item.symbol_id === window.symbolInfo.id);
                    filtered.forEach(element => {
                      let color = element.type === 1 ? '#23bd70' : '#FF5B5C';
                      let order = window.tvWidget.chart().createOrderLine()
                        .setText(self.$i18n.t('trade_up'))
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
                } catch (e) {}
                });
            },
            getLatestHistory(){
              let self = this;
              self.latest = [];
              let urlLatest = '/data/latest';
              if(this.isDemo) {
                urlLatest = '/data/demo/latest';
              }
              if(this.isContest) {
                urlLatest = '/data/tournament/latest';
              }
              axios.post(urlLatest, { id: this.tradingType === 'tournament' ? this.contestId : 0 })
                .then(function (response) {
                  if (self.latest.length === 0) {
                    self.latest = response.data;
                  }
                  self.historyLoaded = true;
                });
            },
            formatSeconds(){
              if(this.min_expiration !== Infinity) {
                let hours = Math.floor(this.min_expiration / 3600);
                let minutes = Math.floor((this.min_expiration - (hours * 3600)) / 60);
                let seconds = this.min_expiration - (hours * 3600) - (minutes * 60);

                if (hours < 10) {
                  hours = "0" + hours;
                }
                if (minutes < 10) {
                  minutes = "0" + minutes;
                }
                if (seconds < 10) {
                  seconds = "0" + seconds;
                }
                return hours + ':' + minutes + ':' + seconds;
              } else {
                return '';
              }
            },
            moveToReal: function (){
              $('#greatWorkModal').modal('hide');
              this.$router.push('/');
            },
            showDemoModal: function (){
              if(this.canVisibleDemoModal && this.getRnd(0, 20) === 10 && this.isDemo){
                $('#discountModal').modal('show');
                this.canVisibleDemoModal = false;
                let self = this;
                setTimeout(() => { self.canVisibleDemoModal = true; }, 60*5*1000);
              }
            },
            getRnd: function(min, max){
              return Math.floor(Math.random() * (max - min)) + min;
            },
            openedDate: function(date){
              return dateformat(new Date(date), 'HH:MM:ss');
            },
            windowResized: function (e){
                try {
                    this.historyHeight = ($(window).height() - $('#line').offset().top - 30) + 'px';
                } catch (e) {
                    this.historyHeight = '0px';
                }
                this.ps.destroy();
                this.ps = new PerfectScrollbar("#accordionWrapa2");
            },
            placeOrder: function(direction, color, text){
              toastr.warning(null, this.$i18n.t('trade_order_processing'), { positionClass: 'toast-bottom-left', containerId: 'toast-bottom-left' })
              let self = this;
              axios.post('/binary/buy', {
                symbol: this.symbol,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                amount: this.$ci.parse(this.amount),
                direction: direction,
                type: this.tradingType,
                id: this.contestId != null ? this.contestId : 0,
              })
                .then(function (response) {
                  self.opened.unshift(response.data);
                  let order = window.tvWidget.chart().createOrderLine()
                    .setText(text)
                    .setLineLength(1)
                    .setLineStyle(0)
                    .setQuantity(response.data.amount + '$')
                    .setLineColor(color)
                    .setQuantityBackgroundColor(color)
                    .setQuantityBorderColor(color)
                    .setBodyBorderColor(color)
                    .setBodyTextColor(color);
                  order.setPrice(response.data.open_price);
                  self.lines[response.data.id] = order;
                  toastr.info(self.$i18n.t('trade_order_open_by_price') + ' ' + response.data.open_price, self.$i18n.t('trade_order_opened'), { positionClass: 'toast-bottom-left', containerId: 'toast-bottom-left' })
                })
                .catch(error => {
                  toastr.error(error.response.data.message, this.$i18n.t('trade_error'), { positionClass: 'toast-bottom-left', containerId: 'toast-bottom-left' })
                });
            },
            timeClick: function () {
                this.clicked = true;
            },
            closeClick: function () {
                if((parseInt(this.minutes) * 60 + parseInt(this.seconds) + parseInt(this.hours) * 60 * 60) < this.min_expiration) {
                    toastr.error(this.$i18n.t('trade_minimal_expiration', {min_expiration: this.formatSeconds()}), this.$i18n.t('trade_error'), {
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
            setTradingType: function (to, from){
              this.clearLines();
              if(from !== null && from.path === '/trading'){
                this.$echo.leave('closed.' + window.user_data.id);
              }
              else if(from !== null && from.path === '/trading/demo'){
                this.$echo.leave('closed_demo.' + window.user_data.id);
              }
              else if(from !== null && from.matched.length > 0 && from.matched[0].path === '/trading/:type?/:trading_id?'){
                this.$echo.leave('closed_contest.' + window.user_data.id+'.'+from.params.trading_id)
              }
              if(this.isReal){
                this.tradingType = 'real';
                if(to !== null && to.path === '/trading'){
                  this.subscribeCloseEvent('closed.' + window.user_data.id, 'CloseOptionEvent');
                }
              }
              else if(this.isDemo){
                this.tradingType = 'demo';
                this.subscribeCloseEvent('closed_demo.' + window.user_data.id, 'CloseDemoOptionEvent');
              }
              else if(this.isContest){
                this.tradingType = 'tournament';
                this.subscribeCloseEvent('closed_contest.' + window.user_data.id+'.'+this.contestId, 'CloseContestOptionEvent');
              }
              if(window.symbolInfo != null && window.location.href.includes(window.location.host + '/trading')) {
                this.getOpenedHistory()
                this.getLatestHistory();
              }
            },
            subscribeCloseEvent: function(channel, event){
              let self = this;
              this.$echo.private(channel).listen(event, (payload) => {
                let model = payload.model;
                self.latest.unshift(model);
                if(payload.success === true) {
                  toastr.success(self.$i18n.t('trade_you_got_profit') + ' ' + model.profit + '$!', self.$i18n.t('trade_order_closed'), {
                    positionClass: 'toast-bottom-left',
                    containerId: 'toast-bottom-left'
                  });
                  this.showDemoModal();
                } else {
                  toastr.error(self.$i18n.t('trade_order_closed_without_profit'), self.$i18n.t('trade_order_closed'), {
                    positionClass: 'toast-bottom-left',
                    containerId: 'toast-bottom-left'
                  });
                }
                self.opened = self.opened.filter(item => item.id !== payload.id);
                try {
                  self.lines[payload.id].remove();
                } catch (e) { }
              });
            }
        },
        data() {
            return {
                min_expiration: Infinity,
                clicked: false,
                clickedAmount: false,
                percent: '',
                symbol: null,
                number_percent: null,
                amount: localStorage.getItem('amount') ? localStorage.getItem('amount') : '1.00',
                min: 1,
                lines: [],
                hours: localStorage.getItem('hours') ? localStorage.getItem('hours') : '00',
                minutes: localStorage.getItem('minutes') ? localStorage.getItem('minutes') : '05',
                seconds: localStorage.getItem('seconds') ? localStorage.getItem('seconds') : '00',
                historyHeight: '300px',
                opened: [],
                fastData: [],
                latest: [],
                symbolsPercents: [],
                historyLoaded: false,
                isReal: false,
                isDemo: false,
                isContest: false,
                contestId: 0,
                canVisibleDemoModal: true,
                tradingType: '',
            }
        },
        computed: {
            expiration: function () {
                return this.hours + ':' + this.minutes + ':' + this.seconds;
            },
            isButtonDisabled: function () {
                return (parseInt(this.minutes) * 60 + parseInt(this.seconds) + parseInt(this.hours) * 60 * 60) < this.min_expiration;
            }
        },
        watch: {
            $route (to, from){
              this.isReal = this.$router.currentRoute.params.type == null;
              this.isDemo = (this.$router.currentRoute.params.type != null ? this.$router.currentRoute.params.type : false) === 'demo';
              this.isContest = (this.$router.currentRoute.params.type != null ? this.$router.currentRoute.params.type : false) === 'tournament';
              this.contestId = this.$router.currentRoute.params.trading_id != null ? this.$router.currentRoute.params.trading_id : '0';
              this.historyLoaded = false;
              this.setTradingType(to, from);
            },
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
        },
        destroyed() {
            this.$echo.leave('closed.'+window.user_data.id);
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

    @media screen and (max-width: 1000px) {
        .trading-card-height {
           height: auto !important;
        }
    }
    @media screen and (min-width: 1000px) {
        .trading-card-height {
            height: calc(100vh - 69px) !important;
        }
    }
    :focus {
      outline: -webkit-focus-ring-color auto 0px;
    }

    .collapse-icon [data-toggle=collapse]:before {
      position: absolute;
      top: 26%;
      right: 14px;
      font-family: "boxicons";
      content: "\EA1D";
      transition: all 200ms linear 0s;
      font-size: 1.2rem;
      font-weight: 600;
    }
</style>