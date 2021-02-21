(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_vuejs_views_user_Trading_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/components/TradingChartComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/components/TradingChartComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _assets_js_datafeed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/js/datafeed */ "./resources/assets/js/datafeed.js");
/* harmony import */ var _js_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/functions */ "./resources/vuejs/js/functions.js");
//
//
//
//
//
//


window.Datafeed = _assets_js_datafeed__WEBPACK_IMPORTED_MODULE_0__.default;
window.dataLoaded = false;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Trading",
  created: function created() {
    this.initChart();
  },
  methods: {
    initChart: function initChart() {
      var self = this;
      var symbol = '',
          tabSymbol = '',
          resolution = '';

      if (localStorage.getItem('symbol_full') && localStorage.getItem('symbol_short')) {
        symbol = localStorage.getItem('symbol_full');
        tabSymbol = localStorage.getItem('symbol_short');
      } else {
        symbol = 'Binary:EUR/USD';
        tabSymbol = 'EUR/USD';
      }

      if (localStorage.getItem('resolution')) {
        resolution = localStorage.getItem('resolution');
      } else {
        resolution = '1';
      }

      var interval = setInterval(function () {
        if (typeof window.Datafeed !== 'undefined') {
          clearInterval(interval);
          window.tvWidget = new window.TradingView.widget({
            locale: (0,_js_functions__WEBPACK_IMPORTED_MODULE_1__.getCookie)('currentLanguage') ? (0,_js_functions__WEBPACK_IMPORTED_MODULE_1__.getCookie)('currentLanguage') === 'es' ? 'en' : (0,_js_functions__WEBPACK_IMPORTED_MODULE_1__.getCookie)('currentLanguage') : 'en',
            symbol: symbol,
            // default symbol
            interval: resolution,
            // default interval
            autosize: true,
            container_id: 'tv_chart_container',
            datafeed: window.Datafeed,
            timezone: "Europe/Moscow",
            width: "100%",
            library_path: '/charts/charting_library/',
            theme: "dark",
            // "header_symbol_search",
            disabled_features: ["widget_logo", "header_compare", 'compare_symbol', 'timeframes_toolbar', 'display_market_status', 'header_screenshot'],
            favorites: {
              intervals: ['1s', '5s', '15s', '30s', '1', '3', '5', '10', '15', '30', '1H', '4H'],
              chartTypes: ["Candles", "Area", "Line", "Bars", "Hollow Candles", "Baseline"]
            },
            overrides: {
              "paneProperties.vertGridProperties.color": "#21283e",
              "paneProperties.horzGridProperties.color": "#21283e"
            }
          });
          window.tvWidget.onChartReady(function () {
            window.tvWidget.headerReady().then(function () {
              window.button = window.tvWidget.createButton();
              window.button.setAttribute('title', 'Выбрать символ для торговли');
              window.button.classList.add('apply-common-tooltip');
              window.button.classList.add('button-symbol-get');
              window.button.addEventListener('click', function () {
                return window.tvWidget.chart().executeActionById('symbolSearch');
              });
              window.button.innerHTML = '<strong style="color: #8a99b5; cursor: pointer;">' + tabSymbol + '</strong>';
              $('#' + window.tvWidget._iFrame.name).contents().find('#header-toolbar-symbol-search').replaceWith($('#' + window.tvWidget._iFrame.name).contents().find('.button-symbol-get'));
              $('#' + window.tvWidget._iFrame.name).contents().find('head').append($("<style type='text/css'> ._tv-dialog-nonmodal { width:350px !important; left: 57px !important; top: 41px !important; max-width: 70vw; } .symbol-edit-popup-td.name { width: 40% !important; } </style>"));
            });
          });
        }
      }, 100);
    }
  },
  destroyed: function destroyed() {
    window.tvObj.closeWebsocket();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Trading.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Trading.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_TradingChartComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../components/TradingChartComponent */ "./resources/vuejs/components/TradingChartComponent.vue");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _js_tv2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../js/tv2 */ "./resources/vuejs/js/tv2.js");
/* harmony import */ var vue_currency_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-currency-input */ "./node_modules/vue-currency-input/dist/vue-currency-input.esm.js");
/* harmony import */ var dateformat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dateformat */ "./node_modules/dateformat/lib/dateformat.js");
/* harmony import */ var dateformat__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dateformat__WEBPACK_IMPORTED_MODULE_4__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Trading",
  props: ['user'],
  components: {
    TradingChartComponent: _components_TradingChartComponent__WEBPACK_IMPORTED_MODULE_0__.default
  },
  directives: {
    currency: vue_currency_input__WEBPACK_IMPORTED_MODULE_3__.CurrencyDirective
  },
  mounted: function mounted() {
    var _this = this;

    this.isDemo = 'demoPage' in this.$router.currentRoute.meta;
    this.localTV = new _js_tv2__WEBPACK_IMPORTED_MODULE_2__.TradingViewFastWebsocket();
    setInterval(function () {
      _this.fastData = _this.localTV.getTickerDataArray();

      _this.opened.forEach(function (open) {
        if (_this.symbols.length > 0) {
          try {
            var symbol = _this.symbols.find(function (item) {
              return item.id === open.symbol_id;
            });

            var lp = _this.fastData[symbol.broker + ':' + symbol.symbol.replace('/', '')].lp;

            var color = 'warning';
            var profitStatus = 2;
            var open_price = parseFloat(open.open_price);

            if (open.type === 1 && lp > open_price || open.type === 0 && lp < open_price) {
              color = 'success';
              profitStatus = 1;
            } else if (open.type === 0 && lp > open_price || open.type === 1 && lp < open_price) {
              color = 'danger';
              profitStatus = 0;
            }

            _this.$set(open, 'textColor', color);

            _this.$set(open, 'current_price', lp);

            _this.$set(open, 'profit_status', profitStatus);
          } catch (e) {}
        }
      });
    }, 100);
    window.addEventListener("resize", this.windowResized);

    try {
      this.historyHeight = jquery__WEBPACK_IMPORTED_MODULE_1___default()(window).height() - jquery__WEBPACK_IMPORTED_MODULE_1___default()('#line').offset().top - 30 + 'px';
    } catch (e) {
      this.historyHeight = '0px';
    }

    this.ps = new PerfectScrollbar("#accordionWrapa2");
    var self = this;
    axios.get('/data/symbols').then(function (response) {
      self.symbols = response.data;
      self.symbols.forEach(function (item) {
        self.localTV.getTicker(item.broker + ':' + item.symbol.replace('/', ''));
      });
    });
    this.$echo["private"]('closed.' + window.user_data.id).listen('CloseOptionEvent', function (payload) {
      var model = payload.model;
      self.latest.unshift(model);

      if (payload.success === true) {
        toastr.success(self.$i18n.t('trade_you_got_profit') + ' ' + model.profit + '$!', self.$i18n.t('trade_order_closed'), {
          positionClass: 'toast-bottom-left',
          containerId: 'toast-bottom-left'
        });

        _this.showDemoModal();
      } else {
        toastr.error(self.$i18n.t('trade_order_closed_without_profit'), self.$i18n.t('trade_order_closed'), {
          positionClass: 'toast-bottom-left',
          containerId: 'toast-bottom-left'
        });
      }

      self.opened = self.opened.filter(function (item) {
        return item.id !== payload.id;
      });

      try {
        self.lines[payload.id].remove();
      } catch (e) {}
    });
    setInterval(function () {
      if (!window.dataLoaded) {
        _this.percent = '';
        _this.symbol = null;
        _this.number_percent = null;
      }

      if (typeof window.symbolInfo !== 'undefined' && window.symbolInfo.full_name !== _this.symbol && window.dataLoaded && _this.symbol !== window.symbolInfo.id) {
        _this.symbol = window.symbolInfo.id;
        _this.percent = '+ ' + window.symbolInfo.description;
        _this.number_percent = window.symbolInfo.percent;

        if (self.opened.length === 0) {
          var urlOpened = '/data/opened';

          if (_this.isDemo) {
            urlOpened = '/data/demo/opened';
          }

          axios.post(urlOpened).then(function (response) {
            self.opened = response.data;
            var filtered = self.opened.filter(function (item) {
              return item.symbol_id === window.symbolInfo.id;
            });
            filtered.forEach(function (element) {
              try {
                self.lines[element.id].remove();
              } catch (e) {}

              var color = element.type === 1 ? '#23bd70' : '#FF5B5C';
              var order = window.tvWidget.chart().createOrderLine().setText(self.$i18n.t('trade_up')).setLineLength(1).setLineStyle(0).setQuantity(element.amount + '$').setLineColor(color).setQuantityBackgroundColor(color).setQuantityBorderColor(color).setBodyBorderColor(color).setBodyTextColor(color);
              order.setPrice(element.open_price);
              self.lines[element.id] = order;
            });
          });
        }

        if (self.latest.length === 0) {
          var urlLatest = '/data/latest';

          if (_this.isDemo) {
            urlLatest = '/data/demo/latest';
          }

          axios.post(urlLatest).then(function (response) {
            if (self.latest.length === 0) {
              self.latest = response.data;
            }

            self.historyLoaded = true;
          });
        }
      }
    });
  },
  methods: {
    moveToReal: function moveToReal() {
      jquery__WEBPACK_IMPORTED_MODULE_1___default()('#greatWorkModal').modal('hide');
      this.$router.push('/');
    },
    showDemoModal: function showDemoModal() {
      if (this.canVisibleDemoModal && this.getRnd(0, 20) === 10 && this.isDemo) {
        jquery__WEBPACK_IMPORTED_MODULE_1___default()('#discountModal').modal('show');
        this.canVisibleDemoModal = false;
        var self = this;
        setTimeout(function () {
          self.canVisibleDemoModal = true;
        }, 60 * 5 * 1000);
      }
    },
    getRnd: function getRnd(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    openedDate: function openedDate(date) {
      return dateformat__WEBPACK_IMPORTED_MODULE_4__(new Date(date), 'HH:MM:ss');
    },
    windowResized: function windowResized(e) {
      try {
        this.historyHeight = jquery__WEBPACK_IMPORTED_MODULE_1___default()(window).height() - jquery__WEBPACK_IMPORTED_MODULE_1___default()('#line').offset().top - 30 + 'px';
      } catch (e) {
        this.historyHeight = '0px';
      }

      this.ps.destroy();
      this.ps = new PerfectScrollbar("#accordionWrapa2");
    },
    buy: function buy() {
      var _this2 = this;

      toastr.warning(null, this.$i18n.t('trade_order_processing'), {
        positionClass: 'toast-bottom-left',
        containerId: 'toast-bottom-left'
      });
      var self = this;
      axios.post('/binary/buy', {
        symbol: this.symbol,
        hours: this.hours,
        minutes: this.minutes,
        seconds: this.seconds,
        amount: this.$ci.parse(this.amount),
        type: 1,
        demo: self.isDemo ? 1 : 0
      }).then(function (response) {
        self.opened.unshift(response.data);
        var order = window.tvWidget.chart().createOrderLine().setText(self.$i18n.t('trade_up')).setLineLength(1).setLineStyle(0).setQuantity(response.data.amount + '$').setLineColor('#23bd70').setQuantityBackgroundColor('#23bd70').setQuantityBorderColor('#23bd70').setBodyBorderColor('#23bd70').setBodyTextColor('#23bd70');
        order.setPrice(response.data.open_price);
        self.lines[response.data.id] = order;
        toastr.info(self.$i18n.t('trade_order_open_by_price') + ' ' + response.data.open_price, self.$i18n.t('trade_order_opened'), {
          positionClass: 'toast-bottom-left',
          containerId: 'toast-bottom-left'
        });
      })["catch"](function (error) {
        toastr.error(error.response.data.message, _this2.$i18n.t('trade_error'), {
          positionClass: 'toast-bottom-left',
          containerId: 'toast-bottom-left'
        });
      });
    },
    sell: function sell() {
      toastr.warning(null, this.$i18n.t('trade_order_processing'), {
        positionClass: 'toast-bottom-left',
        containerId: 'toast-bottom-left'
      });
      var self = this;
      axios.post('/binary/buy', {
        symbol: this.symbol,
        hours: this.hours,
        minutes: this.minutes,
        seconds: this.seconds,
        amount: this.$ci.parse(this.amount),
        type: 0,
        demo: self.isDemo ? 1 : 0
      }).then(function (response) {
        self.opened.unshift(response.data);
        var order = window.tvWidget.chart().createOrderLine().setText(self.$i18n.t('trade_down')).setLineLength(1).setLineStyle(0).setQuantity(response.data.amount + '$').setLineColor('#FF5B5C').setQuantityBackgroundColor('#FF5B5C').setQuantityBorderColor('#FF5B5C').setBodyBorderColor('#FF5B5C').setBodyTextColor('#FF5B5C');
        order.setPrice(response.data.open_price);
        self.lines[response.data.id] = order;
        toastr.info(self.$i18n.t('trade_order_open_by_price') + ' ' + response.data.open_price, self.$i18n.t('trade_order_opened'), {
          positionClass: 'toast-bottom-left',
          containerId: 'toast-bottom-left'
        });
      })["catch"](function (error) {
        toastr.error(error.response.data.message, 'Ошибка!', {
          positionClass: 'toast-bottom-left',
          containerId: 'toast-bottom-left'
        });
      });
    },
    timeClick: function timeClick() {
      this.clicked = true;
    },
    closeClick: function closeClick() {
      if (parseInt(this.minutes) < 5 && parseInt(this.hours) === 0) {
        toastr.error(this.$i18n.t('trade_minimal_expiration'), this.$i18n.t('trade_error'), {
          positionClass: 'toast-bottom-left',
          containerId: 'toast-bottom-left'
        });
      } else {
        this.clicked = false;
      }
    },
    addAmount: function addAmount() {
      this.amount = (parseFloat(this.amount.toString().replace(',', '')) + this.min).toFixed(2).toString();
    },
    subAmount: function subAmount() {
      this.amount = (parseFloat(this.amount.toString().replace(',', '')) - this.min).toFixed(2).toString();
    },
    setAmount: function setAmount(min) {
      (0,vue_currency_input__WEBPACK_IMPORTED_MODULE_3__.setValue)(this.$refs.ci, min.toFixed(2));
    },
    amountClick: function amountClick() {
      this.clickedAmount = true;
    },
    amountClickClose: function amountClickClose() {
      this.clickedAmount = false;
    },
    hourAdd: function hourAdd() {
      var parsed = parseInt(this.hours);
      parsed += 1;
      this.hours = parsed;
    },
    hourSub: function hourSub() {
      var parsed = parseInt(this.hours);
      parsed -= 1;
      this.hours = parsed;
    },
    minuteAdd: function minuteAdd() {
      var parsed = parseInt(this.minutes);
      parsed += 1;
      this.minutes = parsed;
    },
    minuteSub: function minuteSub() {
      var parsed = parseInt(this.minutes);
      parsed -= 1;
      this.minutes = parsed;
    },
    secondAdd: function secondAdd() {
      var parsed = parseInt(this.seconds);
      parsed += 5;
      this.seconds = parsed;
    },
    secondSub: function secondSub() {
      var parsed = parseInt(this.seconds);

      if (parsed === 59) {
        parsed -= 4;
      } else {
        parsed -= 5;
      }

      this.seconds = parsed;
    }
  },
  data: function data() {
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
      minutes: localStorage.getItem('minutes') ? localStorage.getItem('minutes') : '05',
      seconds: localStorage.getItem('seconds') ? localStorage.getItem('seconds') : '00',
      historyHeight: '300px',
      opened: [],
      fastData: [],
      latest: [],
      historyLoaded: false,
      isDemo: false,
      canVisibleDemoModal: true
    };
  },
  computed: {
    expiration: function expiration() {
      return this.hours + ':' + this.minutes + ':' + this.seconds;
    },
    isButtonDisabled: function isButtonDisabled() {
      return parseInt(this.minutes) < 5 && parseInt(this.hours) === 0;
    }
  },
  watch: {
    $route: function $route(to, from) {
      this.isDemo = 'demoPage' in this.$router.currentRoute.meta;
    },
    hours: function hours() {
      var number = parseInt(this.hours);
      var _final = number;

      if (number > 12) {
        _final = '12';
      } else if (number <= 0) {
        _final = '0';
      } else if (this.hours === '') {
        _final = '0';
      }

      if (_final < 10) {
        _final = '0' + _final.toString();
      }

      this.hours = _final;
      localStorage.setItem('hours', this.hours);
    },
    minutes: function minutes() {
      var number = parseInt(this.minutes);
      var _final2 = number;

      if (number > 59) {
        _final2 = '59';
      } else if (number <= 0) {
        _final2 = '0';
      } else if (this.minutes === '') {
        _final2 = '0';
      }

      if (_final2 < 10) {
        _final2 = '0' + _final2.toString();
      }

      this.minutes = _final2;
      localStorage.setItem('minutes', this.minutes);
    },
    seconds: function seconds() {
      var number = parseInt(this.seconds);
      var _final3 = number;

      if (number > 59) {
        _final3 = '59';
      } else if (number <= 0) {
        _final3 = '0';
      } else if (this.seconds === '') {
        _final3 = '0';
      }

      if (_final3 < 10) {
        _final3 = '0' + _final3.toString();
      }

      this.seconds = _final3;
      localStorage.setItem('seconds', this.seconds);
    },
    amount: function amount() {
      var min = Math.ceil(this.$ci.parse(this.amount) / 8);
      this.min = min;
      localStorage.setItem('amount', this.amount);
    },
    latest: function latest() {
      var _this3 = this;

      this.latest.forEach(function (last) {
        try {
          var color = 'warning';
          var open_price = parseFloat(last.open_price);
          var close_price = parseFloat(last.close_price);

          if (last.type === 1 && close_price > open_price || last.type === 0 && close_price < open_price) {
            color = 'success';
          } else if (last.type === 0 && close_price > open_price || last.type === 1 && close_price < open_price) {
            color = 'danger';
          }

          _this3.$set(last, 'textColor', color);
        } catch (e) {}
      });
    }
  },
  destroyed: function destroyed() {
    this.$echo.leave('closed.' + window.user_data.id);
  }
});

/***/ }),

/***/ "./resources/vuejs/js/tv2.js":
/*!***********************************!*\
  !*** ./resources/vuejs/js/tv2.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TradingViewFastWebsocket": () => (/* binding */ TradingViewFastWebsocket)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var TradingViewFastWebsocket = /*#__PURE__*/function () {
  function TradingViewFastWebsocket() {
    var _this = this;

    _classCallCheck(this, TradingViewFastWebsocket);

    this.session = this.generateSession();
    this.chartSession = this.generateChartSession();
    this.sessionRegistered = false;
    this.subscriptions = [];
    this.tickerData = {};
    this.symbol = '';
    this.symbolIndex = 0;
    this.checkBarsGot = false;
    this.symbolNumber = 1;
    this.symbolResolved = false;
    this.seriesCompleted = false;
    this.socketTV = new WebSocket(window.websocketAddress);

    this.socketTV.onmessage = function (data) {
      _this.onmessage(data);
    };

    this.socketTV.onopen = function () {
      _this.onopen();
    };

    this.socketTV.onclose = function (data) {
      _this.onclose(data);
    };

    this.socketTV.onerror = function (data) {
      _this.onerror(data);
    };
  }

  _createClass(TradingViewFastWebsocket, [{
    key: "getTickerDataArray",
    value: function getTickerDataArray() {
      return this.tickerData;
    }
  }, {
    key: "closeWebsocket",
    value: function closeWebsocket() {
      console.log('Closed!');
      this.socketTV.close();
    }
  }, {
    key: "onopen",
    value: function onopen() {
      console.log("Соединение установлено.");
    }
  }, {
    key: "onclose",
    value: function onclose(event) {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения'); // например, "убит" процесс сервера
      }

      console.log('Код: ' + event.code + ' причина: ' + event.reason);
    }
  }, {
    key: "onerror",
    value: function onerror(error) {
      console.log("Ошибка " + error.message);
    }
  }, {
    key: "onmessage",
    value: function onmessage(data) {
      var _this2 = this;

      var packets = this.parseMessages(data.data);
      packets.forEach(function (packet) {
        if (packet["~protocol~keepalive~"]) {
          _this2.sendRawMessage("~h~" + packet["~protocol~keepalive~"]);
        } else if (packet.session_id) {
          var token = '';
          jquery__WEBPACK_IMPORTED_MODULE_0___default().get("/data/getAuthToken", function (data) {
            token = data;
          });
          var interval = setInterval(function () {
            if (token !== '') {
              // OPEN
              clearInterval(interval);

              _this2.sendMessage("set_auth_token", [token]);

              _this2.sendMessage("quote_create_session", [_this2.session]);

              _this2.sendMessage("quote_set_fields", [_this2.session, "ch", "chp", "current_session", "description", "local_description", "language", "exchange", "fractional", "is_tradable", "lp", "minmov", "minmove2", "original_name", "pricescale", "pro_name", "short_name", "type", "update_mode", "volume", "ask", "bid", "fundamentals", "high_price", "is_tradable", "low_price", "open_price", "prev_close_price", "rch", "rchp", "rtc", "status", "basic_eps_net_income", "beta_1_year", "earnings_per_share_basic_ttm", "industry", "market_cap_basic", "price_earnings_ttm", "sector", "volume", "dividends_yield"]);

              _this2.sessionRegistered = true;
            }
          }, 200);
        } else if (packet.m && packet.m === "qsd" && _typeof(packet.p) === "object" && packet.p.length > 1 && packet.p[0] === _this2.session) {
          var tticker = packet.p[1];
          var tickerName = tticker.n;
          var tickerStatus = tticker.s;
          var tickerUpdate = tticker.v; // set ticker data, adding all object parameters together

          _this2.tickerData[tickerName] = Object.assign(_this2.tickerData[tickerName] || {
            last_retrieved: new Date()
          }, tickerUpdate, {
            s: tickerStatus
          }, {
            last_update: new Date()
          });
          _this2.tickerData[tickerName].last_retrieved = new Date();

          if (Date.now() - Date.parse(_this2.tickerData[tickerName].last_retrieved) > 1000 * 60) {
            _this2._deleteTicker(tickerName);
          }
        }
      }); //console.log("Получены данные " + data.data);
    }
  }, {
    key: "resetWebSocket",
    value: function resetWebSocket() {
      window.socket = new WebSocket(window.websocketAddress);
    }
  }, {
    key: "generateSession",
    value: function generateSession() {
      return "qs_" + this.randomString(12);
    }
  }, {
    key: "generateChartSession",
    value: function generateChartSession() {
      return "cs_" + this.randomString(12);
    }
  }, {
    key: "randomString",
    value: function randomString(length) {
      return Math.random().toString(36).substring(2, length + 2) + Math.random().toString(36).substring(2, length + 2);
    }
  }, {
    key: "sendRawMessage",
    value: function sendRawMessage(message) {
      this.socketTV.send(this.prependHeader(message));
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(func, args) {
      this.socketTV.send(this.createMessage(func, args));
    }
  }, {
    key: "registerTicker",
    value: function registerTicker(ticker) {
      if (this.subscriptions.indexOf(ticker) !== -1) {
        return;
      }

      this.subscriptions.push(ticker);
      this.socketTV.send(this.createMessage("quote_add_symbols", [this.session, ticker, {
        flags: ["force_permission"]
      }])); // this.socketTV.send(
      //     this.createMessage("quote_fast_symbols", [
      //         this.session,
      //         ticker
      //     ])
      // );
    }
  }, {
    key: "_getTicker",
    value: function _getTicker(tickerName) {
      var _this3 = this;

      // check if ticker is tracked, and if it is, return stored data
      if (this.tickerData[tickerName] && this.tickerData[tickerName].pro_name) {
        this.tickerData[tickerName].last_retrieved = new Date();
        return;
      } // if not, register and wait for data


      this.registerTicker(tickerName);
      var each = 10; // how much ms between runs

      var runs = 3000 / each; // time in ms divided by above

      var interval = setInterval(function () {
        --runs;

        if (_this3.tickerData[tickerName] && _this3.tickerData[tickerName].pro_name) {
          _this3.tickerData[tickerName].last_retrieved = new Date();
          clearInterval(interval);
        } else if (!runs) {
          _this3._deleteTicker(tickerName);

          console.log("Timed out.");
          clearInterval(interval);
        }
      }, each);
    }
  }, {
    key: "_deleteTicker",
    value: function _deleteTicker(ticker) {
      this.unregisterTicker(ticker);
      delete this.tickerData[ticker];
    }
  }, {
    key: "unregisterTicker",
    value: function unregisterTicker(ticker) {
      var index = this.subscriptions.indexOf(ticker);

      if (index === -1) {
        return;
      }

      this.subscriptions.splice(index, 1);
      this.socketTV.send(this.createMessage("quote_remove_symbols", [this.session, ticker]));
    }
  }, {
    key: "removeSymbols",
    value: function removeSymbols(tickerName) {
      var _this4 = this;

      var interval = setInterval(function () {
        if (_this4.sessionRegistered) {
          clearInterval(interval);

          _this4.socketTV.send(_this4.createMessage("quote_remove_symbols", [_this4.session, tickerName]));
        }
      }, 200);
    }
  }, {
    key: "getTicker",
    value: function getTicker(tickerName) {
      var _this5 = this;

      this.symbol = tickerName;
      var each = 10;
      var runs = 3000 / each; // time in ms divided by above

      if (this.socketTV.readyState === 3) {
        //CLOSED
        this.resetWebSocket();
      }

      var interval = setInterval(function () {
        if (_this5.socketTV.readyState === 1 && _this5.sessionRegistered) {
          // OPEN
          _this5._getTicker(tickerName);

          clearInterval(interval);
        } else if (!runs) {
          console.log("WebSocket connection is closed.");
          clearInterval(interval);
        }
      }, each);
    }
  }, {
    key: "getHistoryTicker",
    value: function getHistoryTicker() {
      var _this6 = this;

      var tickerName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.symbol;
      this.symbolResolved = false;
      var interval = setInterval(function () {
        if (_this6.sessionRegistered) {
          clearInterval(interval);
          _this6.chartSession = _this6.generateChartSession();

          _this6.socketTV.send(_this6.createMessage("chart_create_session", [_this6.chartSession, ""]));

          _this6.socketTV.send(_this6.createMessage("resolve_symbol", [_this6.chartSession, "symbol_" + _this6.symbolNumber.toString(), '={"symbol":"' + tickerName + '","adjustment":"splits"}']));
        }
      }, 200);
    }
  }, {
    key: "firstLoadHistoryData",
    value: function firstLoadHistoryData() {
      this.socketTV.send(this.createMessage("create_series", [this.chartSession, "s1", "s1", "symbol_" + (this.symbolNumber++).toString(), this.resolutionLocal.toString(), 5000]));
    }
  }, {
    key: "getMoreData",
    value: function getMoreData() {
      var _this7 = this;

      var interval = setInterval(function () {
        if (_this7.symbolResolved && _this7.seriesCompleted) {
          _this7.seriesCompleted = false;
          clearInterval(interval);

          _this7.socketTV.send(_this7.createMessage("request_more_data", [_this7.chartSession, "s1", 2000]));
        }
      }, 200);
    } // IO functions

  }, {
    key: "parseMessages",
    value: function parseMessages(str) {
      var packets = [];
      str.split(/~m~\d+~m~/).filter(function (x) {
        return x;
      }).forEach(function (packet) {
        packet = packet.split('').reverse().join('');

        if (packet.indexOf('}') !== -1) {
          packet = packet.substr(packet.indexOf('}'));
        }

        packet = packet.split('').reverse().join('');

        if (packet.substr(0, 3) !== "~h~") {
          packets.push(JSON.parse(packet));
        } else {
          packets.push({
            "~protocol~keepalive~": packet.substr(3)
          });
        }
      });
      return packets;
    }
  }, {
    key: "prependHeader",
    value: function prependHeader(str) {
      return "~m~" + str.length + "~m~" + str;
    }
  }, {
    key: "createMessage",
    value: function createMessage(func, paramList) {
      return this.prependHeader(this.constructMessage(func, paramList));
    }
  }, {
    key: "constructMessage",
    value: function constructMessage(func, paramList) {
      return JSON.stringify({
        m: func,
        p: paramList
      });
    } // End IO functions

  }]);

  return TradingViewFastWebsocket;
}();

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/components/TradingChartComponent.vue?vue&type=style&index=0&id=449b36df&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/components/TradingChartComponent.vue?vue&type=style&index=0&id=449b36df&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n@media screen and (max-width: 1000px) {\n.trading-chart-height[data-v-449b36df] {\n        height: 50vh;\n}\n}\n@media screen and (min-width: 1000px) {\n.trading-chart-height[data-v-449b36df] {\n        height: calc(100vh - 69px);\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Trading.vue?vue&type=style&index=0&id=0b4c4794&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Trading.vue?vue&type=style&index=0&id=0b4c4794&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\nbody.dark-layout .collapsible .card.open[data-v-0b4c4794], body.dark-layout .accordion .card.open[data-v-0b4c4794] {\n    box-shadow: 0px 0px 0px 0 rgba(11, 26, 51, 0.63) !important;\n}\n.progress-bar-success .progress-bar[data-v-0b4c4794] {\n    background-color: #157344;\n    box-shadow: 0 2px 6px 0 rgba(57, 218, 138, 0.2);\n}\n.progress-bar-primary .progress-bar[data-v-0b4c4794] {\n    background-color: #244177;\n    box-shadow: 0 2px 6px 0 rgba(90, 141, 238, 0.2);\n}\n@media screen and (max-width: 1000px) {\n.trading-card-height[data-v-0b4c4794] {\n       height: auto !important;\n}\n}\n@media screen and (min-width: 1000px) {\n.trading-card-height[data-v-0b4c4794] {\n        height: calc(100vh - 69px) !important;\n}\n}\n[data-v-0b4c4794]:focus {\n  outline: -webkit-focus-ring-color auto 0px;\n}\n.collapse-icon [data-toggle=collapse][data-v-0b4c4794]:before {\n  position: absolute;\n  top: 26%;\n  right: 14px;\n  font-family: \"boxicons\";\n  content: \"\\EA1D\";\n  transition: all 200ms linear 0s;\n  font-size: 1.2rem;\n  font-weight: 600;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/components/TradingChartComponent.vue?vue&type=style&index=0&id=449b36df&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/components/TradingChartComponent.vue?vue&type=style&index=0&id=449b36df&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TradingChartComponent_vue_vue_type_style_index_0_id_449b36df_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TradingChartComponent.vue?vue&type=style&index=0&id=449b36df&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/components/TradingChartComponent.vue?vue&type=style&index=0&id=449b36df&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TradingChartComponent_vue_vue_type_style_index_0_id_449b36df_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__.default, options);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TradingChartComponent_vue_vue_type_style_index_0_id_449b36df_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Trading.vue?vue&type=style&index=0&id=0b4c4794&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Trading.vue?vue&type=style&index=0&id=0b4c4794&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Trading_vue_vue_type_style_index_0_id_0b4c4794_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Trading.vue?vue&type=style&index=0&id=0b4c4794&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Trading.vue?vue&type=style&index=0&id=0b4c4794&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Trading_vue_vue_type_style_index_0_id_0b4c4794_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__.default, options);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Trading_vue_vue_type_style_index_0_id_0b4c4794_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./resources/vuejs/components/TradingChartComponent.vue":
/*!**************************************************************!*\
  !*** ./resources/vuejs/components/TradingChartComponent.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TradingChartComponent_vue_vue_type_template_id_449b36df_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TradingChartComponent.vue?vue&type=template&id=449b36df&scoped=true& */ "./resources/vuejs/components/TradingChartComponent.vue?vue&type=template&id=449b36df&scoped=true&");
/* harmony import */ var _TradingChartComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TradingChartComponent.vue?vue&type=script&lang=js& */ "./resources/vuejs/components/TradingChartComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _TradingChartComponent_vue_vue_type_style_index_0_id_449b36df_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TradingChartComponent.vue?vue&type=style&index=0&id=449b36df&scoped=true&lang=css& */ "./resources/vuejs/components/TradingChartComponent.vue?vue&type=style&index=0&id=449b36df&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");

;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _TradingChartComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _TradingChartComponent_vue_vue_type_template_id_449b36df_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _TradingChartComponent_vue_vue_type_template_id_449b36df_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "449b36df",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/vuejs/components/TradingChartComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/vuejs/views/user/Trading.vue":
/*!************************************************!*\
  !*** ./resources/vuejs/views/user/Trading.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Trading_vue_vue_type_template_id_0b4c4794_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Trading.vue?vue&type=template&id=0b4c4794&scoped=true& */ "./resources/vuejs/views/user/Trading.vue?vue&type=template&id=0b4c4794&scoped=true&");
/* harmony import */ var _Trading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Trading.vue?vue&type=script&lang=js& */ "./resources/vuejs/views/user/Trading.vue?vue&type=script&lang=js&");
/* harmony import */ var _Trading_vue_vue_type_style_index_0_id_0b4c4794_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Trading.vue?vue&type=style&index=0&id=0b4c4794&scoped=true&lang=css& */ "./resources/vuejs/views/user/Trading.vue?vue&type=style&index=0&id=0b4c4794&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");

;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _Trading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Trading_vue_vue_type_template_id_0b4c4794_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Trading_vue_vue_type_template_id_0b4c4794_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "0b4c4794",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/vuejs/views/user/Trading.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/vuejs/components/TradingChartComponent.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/vuejs/components/TradingChartComponent.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TradingChartComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TradingChartComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/components/TradingChartComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TradingChartComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/vuejs/views/user/Trading.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/vuejs/views/user/Trading.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Trading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Trading.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Trading.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Trading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/vuejs/components/TradingChartComponent.vue?vue&type=style&index=0&id=449b36df&scoped=true&lang=css&":
/*!***********************************************************************************************************************!*\
  !*** ./resources/vuejs/components/TradingChartComponent.vue?vue&type=style&index=0&id=449b36df&scoped=true&lang=css& ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TradingChartComponent_vue_vue_type_style_index_0_id_449b36df_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TradingChartComponent.vue?vue&type=style&index=0&id=449b36df&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/components/TradingChartComponent.vue?vue&type=style&index=0&id=449b36df&scoped=true&lang=css&");


/***/ }),

/***/ "./resources/vuejs/views/user/Trading.vue?vue&type=style&index=0&id=0b4c4794&scoped=true&lang=css&":
/*!*********************************************************************************************************!*\
  !*** ./resources/vuejs/views/user/Trading.vue?vue&type=style&index=0&id=0b4c4794&scoped=true&lang=css& ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Trading_vue_vue_type_style_index_0_id_0b4c4794_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Trading.vue?vue&type=style&index=0&id=0b4c4794&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Trading.vue?vue&type=style&index=0&id=0b4c4794&scoped=true&lang=css&");


/***/ }),

/***/ "./resources/vuejs/components/TradingChartComponent.vue?vue&type=template&id=449b36df&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./resources/vuejs/components/TradingChartComponent.vue?vue&type=template&id=449b36df&scoped=true& ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TradingChartComponent_vue_vue_type_template_id_449b36df_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TradingChartComponent_vue_vue_type_template_id_449b36df_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TradingChartComponent_vue_vue_type_template_id_449b36df_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TradingChartComponent.vue?vue&type=template&id=449b36df&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/components/TradingChartComponent.vue?vue&type=template&id=449b36df&scoped=true&");


/***/ }),

/***/ "./resources/vuejs/views/user/Trading.vue?vue&type=template&id=0b4c4794&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/vuejs/views/user/Trading.vue?vue&type=template&id=0b4c4794&scoped=true& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Trading_vue_vue_type_template_id_0b4c4794_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Trading_vue_vue_type_template_id_0b4c4794_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Trading_vue_vue_type_template_id_0b4c4794_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Trading.vue?vue&type=template&id=0b4c4794&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Trading.vue?vue&type=template&id=0b4c4794&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/components/TradingChartComponent.vue?vue&type=template&id=449b36df&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/components/TradingChartComponent.vue?vue&type=template&id=449b36df&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", {
    staticClass: "trading-chart-height",
    attrs: { id: "tv_chart_container" }
  })
}
var staticRenderFns = []
render._withStripped = true

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Trading.vue?vue&type=template&id=0b4c4794&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Trading.vue?vue&type=template&id=0b4c4794&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "content-fluld", style: { "margin-top": "4.6rem" } },
    [
      _c(
        "div",
        {
          staticClass: "modal fade",
          attrs: {
            id: "greatWorkModal",
            tabindex: "-1",
            role: "dialog",
            "aria-labelledby": "discountModalLabel",
            "aria-hidden": "true"
          }
        },
        [
          _c(
            "div",
            {
              staticClass: "modal-dialog gradient-border",
              staticStyle: { top: "25vh" },
              attrs: { role: "document" }
            },
            [
              _c("div", { staticClass: "modal-content" }, [
                _c("div", { staticClass: "modal-header" }, [
                  _c(
                    "h5",
                    {
                      staticClass: "modal-title",
                      attrs: { id: "exampleModalLabel" }
                    },
                    [_vm._v(_vm._s(_vm.$i18n.t("trade_good_work")))]
                  ),
                  _vm._v(" "),
                  _vm._m(0)
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "modal-body" }, [
                  _c("div", { staticClass: "text-center" }, [
                    _c("div", { staticClass: "text-center mb-2" }, [
                      _vm._v(
                        "\n                  " +
                          _vm._s(_vm.$i18n.t("trade_profit_modal")) +
                          "\n                "
                      )
                    ]),
                    _vm._v(" "),
                    _vm._m(1),
                    _vm._v(" "),
                    _c("div", { staticClass: "text-center mb-2" }, [
                      _vm._v(
                        "\n                  " +
                          _vm._s(_vm.$i18n.t("trade_profit_modal_desc")) +
                          "\n                "
                      )
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "modal-footer" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-warning w-100",
                      attrs: { type: "button" },
                      on: { click: _vm.moveToReal }
                    },
                    [_vm._v(_vm._s(_vm.$i18n.t("trade_go_real")))]
                  )
                ])
              ])
            ]
          )
        ]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "content-body" }, [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-lg-8 col-xxl-10 pr-0 pb-0" }, [
            _c("section", { staticClass: "card mb-0" }, [
              _c("div", { staticClass: "card-content" }, [
                _c("div", { staticClass: "card-body p-0" }, [
                  _c(
                    "div",
                    { staticClass: "card-text" },
                    [_c("TradingChartComponent")],
                    1
                  )
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-lg-4 col-xxl-2 p-0" }, [
            _c("section", { staticClass: "card mb-0 trading-card-height" }, [
              _c("div", { staticClass: "card-content" }, [
                _c("div", { staticClass: "card-body" }, [
                  _c("div", { staticClass: "card-text" }, [
                    _c("small", { staticClass: "text-muted" }, [
                      _c("i", [_vm._v(_vm._s(_vm.$i18n.t("trade_expiration")))])
                    ]),
                    _vm._v(" "),
                    _c(
                      "fieldset",
                      {
                        staticClass: "form-group position-relative",
                        style: { "margin-bottom": "0.3rem !important" }
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.expiration,
                              expression: "expiration"
                            }
                          ],
                          staticClass: "form-control form-control-lg",
                          staticStyle: { opacity: "1" },
                          attrs: {
                            id: "time",
                            readonly: "readonly",
                            type: "text"
                          },
                          domProps: { value: _vm.expiration },
                          on: {
                            click: _vm.timeClick,
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.expiration = $event.target.value
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "form-control-position",
                            style: { top: "14px" }
                          },
                          [_c("i", { staticClass: "bx bx-timer" })]
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.clicked,
                            expression: "clicked"
                          }
                        ],
                        staticClass: "row pb-1"
                      },
                      [
                        _c("div", { staticClass: "col-4 pr-0" }, [
                          _c("small", { staticClass: "text-muted" }, [
                            _c("i", [
                              _vm._v(_vm._s(_vm.$i18n.t("trade_hours")))
                            ])
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "d-inline-block w-100" }, [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "input-group bootstrap-touchspin bootstrap-touchspin-injected"
                              },
                              [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.hours,
                                      expression: "hours"
                                    }
                                  ],
                                  staticClass:
                                    "touchspin-vertical form-control",
                                  attrs: { type: "number" },
                                  domProps: { value: _vm.hours },
                                  on: {
                                    focus: function($event) {
                                      return $event.target.select()
                                    },
                                    click: function($event) {
                                      return $event.target.select()
                                    },
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.hours = $event.target.value
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  { staticClass: "input-group-btn-vertical" },
                                  [
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "btn btn-primary bootstrap-touchspin-up",
                                        staticStyle: { width: "20px" },
                                        attrs: { type: "button" },
                                        on: { click: _vm.hourAdd }
                                      },
                                      [_vm._v("+")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "btn btn-primary bootstrap-touchspin-down",
                                        staticStyle: { width: "20px" },
                                        attrs: { type: "button" },
                                        on: { click: _vm.hourSub }
                                      },
                                      [_vm._v("-")]
                                    )
                                  ]
                                )
                              ]
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "col-4 pr-0",
                            staticStyle: {
                              "padding-left": "7.5px",
                              "padding-right": "7.5px !important"
                            }
                          },
                          [
                            _c("small", { staticClass: "text-muted" }, [
                              _c("i", [
                                _vm._v(_vm._s(_vm.$i18n.t("trade_minutes")))
                              ])
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "d-inline-block w-100" }, [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "input-group bootstrap-touchspin bootstrap-touchspin-injected"
                                },
                                [
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.minutes,
                                        expression: "minutes"
                                      }
                                    ],
                                    staticClass:
                                      "touchspin-vertical form-control",
                                    attrs: { type: "number" },
                                    domProps: { value: _vm.minutes },
                                    on: {
                                      focus: function($event) {
                                        return $event.target.select()
                                      },
                                      click: function($event) {
                                        return $event.target.select()
                                      },
                                      input: function($event) {
                                        if ($event.target.composing) {
                                          return
                                        }
                                        _vm.minutes = $event.target.value
                                      }
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "span",
                                    { staticClass: "input-group-btn-vertical" },
                                    [
                                      _c(
                                        "button",
                                        {
                                          staticClass:
                                            "btn btn-primary bootstrap-touchspin-up",
                                          staticStyle: { width: "20px" },
                                          attrs: { type: "button" },
                                          on: { click: _vm.minuteAdd }
                                        },
                                        [_vm._v("+")]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "button",
                                        {
                                          staticClass:
                                            "btn btn-primary bootstrap-touchspin-down",
                                          staticStyle: { width: "20px" },
                                          attrs: { type: "button" },
                                          on: { click: _vm.minuteSub }
                                        },
                                        [_vm._v("-")]
                                      )
                                    ]
                                  )
                                ]
                              )
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-4 pl-0" }, [
                          _c("small", { staticClass: "text-muted" }, [
                            _c("i", [
                              _vm._v(_vm._s(_vm.$i18n.t("trade_seconds")))
                            ])
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "d-inline-block w-100" }, [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "input-group bootstrap-touchspin bootstrap-touchspin-injected"
                              },
                              [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.seconds,
                                      expression: "seconds"
                                    }
                                  ],
                                  staticClass:
                                    "touchspin-vertical form-control",
                                  attrs: { type: "number" },
                                  domProps: { value: _vm.seconds },
                                  on: {
                                    focus: function($event) {
                                      return $event.target.select()
                                    },
                                    click: function($event) {
                                      return $event.target.select()
                                    },
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.seconds = $event.target.value
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  { staticClass: "input-group-btn-vertical" },
                                  [
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "btn btn-primary bootstrap-touchspin-up",
                                        staticStyle: { width: "20px" },
                                        attrs: { type: "button" },
                                        on: { click: _vm.secondAdd }
                                      },
                                      [_vm._v("+")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "btn btn-primary bootstrap-touchspin-down",
                                        staticStyle: { width: "20px" },
                                        attrs: { type: "button" },
                                        on: { click: _vm.secondSub }
                                      },
                                      [_vm._v("-")]
                                    )
                                  ]
                                )
                              ]
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "col-md-12",
                            staticStyle: { "padding-top": "5px" }
                          },
                          [
                            _c(
                              "button",
                              {
                                staticClass:
                                  "btn btn-outline-primary btn-sm w-100",
                                attrs: { type: "button" },
                                on: { click: _vm.closeClick }
                              },
                              [_vm._v(_vm._s(_vm.$i18n.t("trade_close")))]
                            )
                          ]
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c("small", { staticClass: "text-muted" }, [
                      _c("i", [_vm._v(_vm._s(_vm.$i18n.t("trade_amount")))])
                    ]),
                    _vm._v(" "),
                    _c(
                      "fieldset",
                      {
                        staticClass: "form-group position-relative",
                        style: { "margin-bottom": "0.3rem !important" }
                      },
                      [
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.amount,
                                expression: "amount"
                              },
                              {
                                name: "currency",
                                rawName: "v-currency",
                                value: {
                                  currency: null,
                                  autoDecimalMode: true,
                                  valueRange: { min: 1, max: 1000 }
                                },
                                expression:
                                  "{currency: null, autoDecimalMode: true, valueRange: {min: 1, max: 1000}}"
                              }
                            ],
                            ref: "ci",
                            staticClass: "form-control form-control-lg",
                            attrs: { type: "text" },
                            domProps: { value: _vm.amount },
                            on: {
                              click: _vm.amountClick,
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.amount = $event.target.value
                              }
                            }
                          })
                        ],
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "form-control-position",
                            style: { top: "14px" }
                          },
                          [_c("i", { staticClass: "bx bx-dollar" })]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: _vm.clickedAmount,
                                expression: "clickedAmount"
                              }
                            ],
                            staticClass: "row",
                            style: { "margin-top": "0.3rem !important" }
                          },
                          [
                            _c("div", { staticClass: "col-4 pr-0" }, [
                              _c(
                                "button",
                                {
                                  staticClass:
                                    "btn btn-outline-primary btn-sm w-100",
                                  staticStyle: {
                                    "padding-left": "3px",
                                    "padding-right": "3px"
                                  },
                                  attrs: { type: "button" },
                                  on: {
                                    click: function($event) {
                                      return _vm.setAmount(_vm.min)
                                    }
                                  }
                                },
                                [_vm._v(_vm._s(_vm.min) + "$")]
                              )
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass: "col-4",
                                staticStyle: {
                                  "padding-left": "7.5px",
                                  "padding-right": "7.5px !important"
                                }
                              },
                              [
                                _c(
                                  "button",
                                  {
                                    staticClass:
                                      "btn btn-outline-primary btn-sm w-100",
                                    staticStyle: {
                                      "padding-left": "3px",
                                      "padding-right": "3px"
                                    },
                                    attrs: { type: "button" },
                                    on: {
                                      click: function($event) {
                                        return _vm.setAmount(_vm.min * 2)
                                      }
                                    }
                                  },
                                  [_vm._v(_vm._s(_vm.min * 2) + "$")]
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-4 pl-0" }, [
                              _c(
                                "button",
                                {
                                  staticClass:
                                    "btn btn-outline-primary btn-sm w-100",
                                  staticStyle: {
                                    "padding-left": "3px",
                                    "padding-right": "3px"
                                  },
                                  attrs: { type: "button" },
                                  on: {
                                    click: function($event) {
                                      return _vm.setAmount(_vm.min * 4)
                                    }
                                  }
                                },
                                [_vm._v(_vm._s(_vm.min * 4) + "$")]
                              )
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: _vm.clickedAmount,
                                expression: "clickedAmount"
                              }
                            ],
                            staticClass: "row",
                            style: { "margin-top": "0.3rem !important" }
                          },
                          [
                            _c("div", { staticClass: "col-4 pr-0" }, [
                              _c(
                                "button",
                                {
                                  staticClass:
                                    "btn btn-outline-primary btn-sm w-100",
                                  staticStyle: {
                                    "padding-left": "3px",
                                    "padding-right": "3px"
                                  },
                                  attrs: { type: "button" },
                                  on: {
                                    click: function($event) {
                                      return _vm.setAmount(_vm.min * 8)
                                    }
                                  }
                                },
                                [_vm._v(_vm._s(_vm.min * 8) + "$")]
                              )
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass: "col-4",
                                staticStyle: {
                                  "padding-left": "7.5px",
                                  "padding-right": "7.5px !important"
                                }
                              },
                              [
                                _c(
                                  "button",
                                  {
                                    staticClass:
                                      "btn btn-outline-primary btn-sm w-100",
                                    staticStyle: {
                                      "padding-left": "3px",
                                      "padding-right": "3px"
                                    },
                                    attrs: { type: "button" },
                                    on: {
                                      click: function($event) {
                                        return _vm.setAmount(_vm.min * 16)
                                      }
                                    }
                                  },
                                  [_vm._v(_vm._s(_vm.min * 16) + "$")]
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-4 pl-0" }, [
                              _c(
                                "button",
                                {
                                  staticClass:
                                    "btn btn-outline-primary btn-sm w-100",
                                  staticStyle: {
                                    "padding-left": "3px",
                                    "padding-right": "3px"
                                  },
                                  attrs: { type: "button" },
                                  on: {
                                    click: function($event) {
                                      return _vm.setAmount(_vm.min * 32)
                                    }
                                  }
                                },
                                [_vm._v(_vm._s(_vm.min * 32) + "$")]
                              )
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: _vm.clickedAmount,
                                expression: "clickedAmount"
                              }
                            ],
                            staticClass: "row",
                            style: { "margin-top": "0.3rem !important" }
                          },
                          [
                            _c("div", { staticClass: "col-4 pr-0" }, [
                              _c(
                                "button",
                                {
                                  staticClass:
                                    "btn btn-outline-primary btn-sm w-100",
                                  attrs: { type: "button" },
                                  on: { click: _vm.subAmount }
                                },
                                [_vm._v("-")]
                              )
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass: "col-4",
                                staticStyle: {
                                  "padding-left": "7.5px",
                                  "padding-right": "7.5px !important"
                                }
                              },
                              [
                                _c(
                                  "button",
                                  {
                                    staticClass:
                                      "btn btn-outline-success btn-sm w-100",
                                    attrs: { type: "button" },
                                    on: { click: _vm.amountClickClose }
                                  },
                                  [_vm._v("ОК")]
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-4 pl-0" }, [
                              _c(
                                "button",
                                {
                                  staticClass:
                                    "btn btn-outline-primary btn-sm w-100",
                                  attrs: { type: "button" },
                                  on: { click: _vm.addAmount }
                                },
                                [_vm._v("+")]
                              )
                            ])
                          ]
                        )
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _c("small", { staticClass: "text-muted" }, [
                      _c("i", [_vm._v(_vm._s(_vm.$i18n.t("trade_potential")))])
                    ]),
                    _vm._v(" "),
                    _c(
                      "fieldset",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.number_percent === null,
                            expression: "number_percent === null"
                          }
                        ],
                        staticClass: "form-group position-relative"
                      },
                      [
                        _c("input", {
                          staticClass: "form-control form-control-lg",
                          attrs: {
                            type: "text",
                            disabled: "",
                            placeholder: _vm.$i18n.t("trade_loading"),
                            "aria-describedby": "basic-addon2"
                          }
                        }),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "form-control-position",
                            style: { top: "14px" }
                          },
                          [
                            _c("span", {
                              staticClass: "spinner-border spinner-grow-sm",
                              attrs: { role: "status", "aria-hidden": "true" }
                            })
                          ]
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "fieldset",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.number_percent !== null,
                            expression: "number_percent !== null"
                          }
                        ],
                        staticClass: "form-group position-relative"
                      },
                      [
                        _c("input", {
                          staticClass: "form-control form-control-lg",
                          attrs: { type: "text", disabled: "" },
                          domProps: {
                            value: (
                              (this.$ci.parse(this.amount) *
                                _vm.number_percent) /
                              100
                            ).toFixed(2)
                          }
                        }),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "form-control-position",
                            style: { top: "14px" }
                          },
                          [_c("i", { staticClass: "bx bx-dollar" })]
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.percent === "",
                            expression: "percent === ''"
                          }
                        ],
                        staticClass: "btn btn-success mb-1 w-100 btn-lg",
                        attrs: { type: "button", disabled: "" }
                      },
                      [
                        _c("span", {
                          staticClass: "spinner-border spinner-grow-sm",
                          attrs: { role: "status", "aria-hidden": "true" }
                        }),
                        _vm._v(
                          "\n                                        " +
                            _vm._s(_vm.$i18n.t("trade_loading")) +
                            "\n                                    "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value:
                              _vm.number_percent === 0 && _vm.percent !== "",
                            expression: "number_percent === 0 && percent !== ''"
                          }
                        ],
                        staticClass:
                          "disabled btn btn-success mb-1 w-100 btn-lg",
                        attrs: { type: "button", disabled: "disabled" }
                      },
                      [
                        _vm._v(
                          "\n                                      " +
                            _vm._s(_vm.$i18n.t("trade_closed_market")) +
                            "\n                                    "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value:
                              _vm.percent !== "" && _vm.number_percent !== 0,
                            expression: "percent !== '' && number_percent !== 0"
                          }
                        ],
                        staticClass: "btn btn-success glow w-100 btn-lg",
                        attrs: {
                          type: "button",
                          disabled: _vm.isButtonDisabled
                        },
                        on: { click: _vm.buy }
                      },
                      [
                        _c("i", { staticClass: "bx bx-trending-up" }),
                        _vm._v(" "),
                        _c("span", {
                          staticClass: "align-middle ml-25",
                          domProps: { textContent: _vm._s(_vm.percent) }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.percent === "",
                            expression: "percent === ''"
                          }
                        ],
                        staticClass: "btn btn-danger mb-1 w-100 btn-lg",
                        attrs: { type: "button", disabled: "" }
                      },
                      [
                        _c("span", {
                          staticClass: "spinner-border spinner-grow-sm",
                          attrs: { role: "status", "aria-hidden": "true" }
                        }),
                        _vm._v(
                          "\n                                        " +
                            _vm._s(_vm.$i18n.t("trade_loading")) +
                            "\n                                    "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value:
                              _vm.number_percent === 0 && _vm.percent !== "",
                            expression: "number_percent === 0 && percent !== ''"
                          }
                        ],
                        staticClass:
                          "disabled btn btn-danger mb-1 w-100 btn-lg",
                        attrs: { type: "button", disabled: "disabled" }
                      },
                      [
                        _vm._v(
                          "\n                                      " +
                            _vm._s(_vm.$i18n.t("trade_closed_market")) +
                            "\n                                    "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value:
                              _vm.percent !== "" && _vm.number_percent !== 0,
                            expression: "percent !== '' && number_percent !== 0"
                          }
                        ],
                        staticClass: "btn btn-danger glow w-100 mt-1 btn-lg",
                        attrs: {
                          type: "button",
                          disabled: _vm.isButtonDisabled
                        },
                        on: { click: _vm.sell }
                      },
                      [
                        _c("i", { staticClass: "bx bx-trending-down" }),
                        _c("span", {
                          staticClass: "align-middle ml-25",
                          domProps: { textContent: _vm._s(_vm.percent) }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    _c("hr", { staticClass: "mt-2", attrs: { id: "line" } })
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "row" }, [
                    _c(
                      "div",
                      { staticClass: "col-md-12", attrs: { id: "history" } },
                      [
                        _c(
                          "div",
                          {
                            staticClass:
                              "accordion collapse-icon accordion-icon-rotate ps ps--active-y",
                            style: { height: _vm.historyHeight },
                            attrs: { id: "accordionWrapa2" }
                          },
                          [
                            _c(
                              "p",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: _vm.opened.length > 0,
                                    expression: "opened.length > 0"
                                  }
                                ],
                                staticClass: "text-center"
                              },
                              [_vm._v(_vm._s(_vm.$i18n.t("trade_open_orders")))]
                            ),
                            _vm._v(" "),
                            _vm._l(_vm.opened, function(open, index) {
                              return _c(
                                "b-card",
                                {
                                  key: index,
                                  staticClass: "collapse-header",
                                  attrs: { "no-body": "" }
                                },
                                [
                                  _c(
                                    "div",
                                    {
                                      directives: [
                                        {
                                          name: "b-toggle",
                                          rawName: "v-b-toggle",
                                          value: "opened-orders" + index,
                                          expression: "'opened-orders' + index"
                                        }
                                      ],
                                      staticClass: "card-header p-1",
                                      attrs: { "data-toggle": "collapse" }
                                    },
                                    [
                                      _c(
                                        "span",
                                        { staticClass: "collapse-title" },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass: "align-middle",
                                              class: "text-" + open.textColor
                                            },
                                            [
                                              _vm._v(
                                                "\n                                                      " +
                                                  _vm._s(
                                                    _vm.symbols.find(function(
                                                      item
                                                    ) {
                                                      return (
                                                        item.id ===
                                                        open.symbol_id
                                                      )
                                                    }).symbol
                                                  ) +
                                                  "\n                                                  "
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "small",
                                            {
                                              class: "text-" + open.textColor,
                                              staticStyle: {
                                                float: "right",
                                                "padding-right": "20px",
                                                "padding-top": "5px"
                                              }
                                            },
                                            [
                                              _c("strong", {
                                                directives: [
                                                  {
                                                    name: "show",
                                                    rawName: "v-show",
                                                    value:
                                                      open.profit_status === 0,
                                                    expression:
                                                      "open.profit_status === 0"
                                                  }
                                                ],
                                                domProps: {
                                                  textContent: _vm._s("0 $")
                                                }
                                              }),
                                              _vm._v(" "),
                                              _c("strong", {
                                                directives: [
                                                  {
                                                    name: "show",
                                                    rawName: "v-show",
                                                    value:
                                                      open.profit_status === 1,
                                                    expression:
                                                      "open.profit_status === 1"
                                                  }
                                                ],
                                                domProps: {
                                                  textContent: _vm._s(
                                                    (
                                                      parseFloat(open.amount) +
                                                      (open.amount *
                                                        open.percent) /
                                                        100
                                                    ).toFixed(2) + " $"
                                                  )
                                                }
                                              }),
                                              _vm._v(" "),
                                              _c("strong", {
                                                directives: [
                                                  {
                                                    name: "show",
                                                    rawName: "v-show",
                                                    value:
                                                      open.profit_status === 2,
                                                    expression:
                                                      "open.profit_status === 2"
                                                  }
                                                ],
                                                domProps: {
                                                  textContent: _vm._s(
                                                    open.amount + " $"
                                                  )
                                                }
                                              })
                                            ]
                                          ),
                                          _vm._v(" "),
                                          [
                                            _c("vue-countdown-timer", {
                                              attrs: {
                                                "start-time":
                                                  "2020-01-01 00:00:00",
                                                "end-time": open.timestamp,
                                                interval: 1000
                                              },
                                              scopedSlots: _vm._u(
                                                [
                                                  {
                                                    key: "countdown",
                                                    fn: function(scope) {
                                                      return [
                                                        _c(
                                                          "div",
                                                          {
                                                            staticClass:
                                                              "progress position-relative",
                                                            class:
                                                              "progress-bar-" +
                                                              open.textColor,
                                                            staticStyle: {
                                                              "text-shadow":
                                                                "1px 1px 2px black"
                                                            }
                                                          },
                                                          [
                                                            _c("div", {
                                                              staticClass:
                                                                "progress-bar progress-bar-striped",
                                                              style: {
                                                                width:
                                                                  100 -
                                                                  ((scope.props
                                                                    .hours *
                                                                    60 *
                                                                    60 +
                                                                    scope.props
                                                                      .minutes *
                                                                      60 +
                                                                    scope.props
                                                                      .seconds) /
                                                                    open.expiration) *
                                                                    100 +
                                                                  "%"
                                                              },
                                                              attrs: {
                                                                role:
                                                                  "progressbar",
                                                                "aria-valuenow":
                                                                  "0",
                                                                "aria-valuemin":
                                                                  "0",
                                                                "aria-valuemax":
                                                                  "100"
                                                              }
                                                            }),
                                                            _vm._v(" "),
                                                            _c(
                                                              "small",
                                                              {
                                                                staticClass:
                                                                  "text-white justify-content-center d-flex position-absolute w-100",
                                                                staticStyle: {
                                                                  "margin-top":
                                                                    "-3.4px",
                                                                  "font-size":
                                                                    "12px"
                                                                }
                                                              },
                                                              [
                                                                _vm._v(
                                                                  "\n                                                                      " +
                                                                    _vm._s(
                                                                      scope
                                                                        .props
                                                                        .hours
                                                                    ) +
                                                                    ":" +
                                                                    _vm._s(
                                                                      scope
                                                                        .props
                                                                        .minutes
                                                                    ) +
                                                                    ":" +
                                                                    _vm._s(
                                                                      scope
                                                                        .props
                                                                        .seconds
                                                                    ) +
                                                                    "\n                                                                  "
                                                                )
                                                              ]
                                                            ),
                                                            _vm._v(" "),
                                                            _c(
                                                              "small",
                                                              {
                                                                staticClass:
                                                                  "text-white justify-content-left d-flex position-absolute w-100",
                                                                staticStyle: {
                                                                  "margin-top":
                                                                    "-3.4px",
                                                                  "font-size":
                                                                    "10px"
                                                                }
                                                              },
                                                              [
                                                                _c("i", {
                                                                  directives: [
                                                                    {
                                                                      name:
                                                                        "show",
                                                                      rawName:
                                                                        "v-show",
                                                                      value:
                                                                        open.type ===
                                                                        1,
                                                                      expression:
                                                                        "open.type === 1"
                                                                    }
                                                                  ],
                                                                  staticClass:
                                                                    "bx bx-trending-up",
                                                                  staticStyle: {
                                                                    "font-size":
                                                                      "12px",
                                                                    "padding-left":
                                                                      "1px",
                                                                    "padding-top":
                                                                      "3px"
                                                                  }
                                                                }),
                                                                _vm._v(" "),
                                                                _c("i", {
                                                                  directives: [
                                                                    {
                                                                      name:
                                                                        "show",
                                                                      rawName:
                                                                        "v-show",
                                                                      value:
                                                                        open.type ===
                                                                        0,
                                                                      expression:
                                                                        "open.type === 0"
                                                                    }
                                                                  ],
                                                                  staticClass:
                                                                    "bx bx-trending-down",
                                                                  staticStyle: {
                                                                    "font-size":
                                                                      "12px",
                                                                    "padding-left":
                                                                      "1px",
                                                                    "padding-top":
                                                                      "1px"
                                                                  }
                                                                }),
                                                                _vm._v(" "),
                                                                _c(
                                                                  "span",
                                                                  {
                                                                    staticClass:
                                                                      "text-white",
                                                                    staticStyle: {
                                                                      "padding-top":
                                                                        "1px"
                                                                    }
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      _vm._s(
                                                                        open.percent
                                                                      ) + "%"
                                                                    )
                                                                  ]
                                                                )
                                                              ]
                                                            ),
                                                            _vm._v(" "),
                                                            _c("small", {
                                                              staticClass:
                                                                "text-white justify-content-end d-flex position-absolute w-100",
                                                              staticStyle: {
                                                                "margin-top":
                                                                  "-3.4px",
                                                                "font-size":
                                                                  "12px",
                                                                "padding-right":
                                                                  "1px"
                                                              },
                                                              domProps: {
                                                                textContent: _vm._s(
                                                                  open.amount +
                                                                    " $"
                                                                )
                                                              }
                                                            })
                                                          ]
                                                        )
                                                      ]
                                                    }
                                                  },
                                                  {
                                                    key: "end-text",
                                                    fn: function(scope) {
                                                      return [
                                                        _c(
                                                          "div",
                                                          {
                                                            staticClass:
                                                              "progress progress-sm progress-bar-success"
                                                          },
                                                          [
                                                            _c("div", {
                                                              staticClass:
                                                                "progress-bar progress-bar-striped",
                                                              style: {
                                                                width: "100%"
                                                              },
                                                              attrs: {
                                                                role:
                                                                  "progressbar",
                                                                "aria-valuenow":
                                                                  "0",
                                                                "aria-valuemin":
                                                                  "0",
                                                                "aria-valuemax":
                                                                  "100"
                                                              }
                                                            })
                                                          ]
                                                        )
                                                      ]
                                                    }
                                                  }
                                                ],
                                                null,
                                                true
                                              )
                                            })
                                          ]
                                        ],
                                        2
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "b-collapse",
                                    {
                                      attrs: {
                                        id: "opened-orders" + index,
                                        accordion: "opened-orders",
                                        role: "tabpanel"
                                      }
                                    },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "card-content" },
                                        [
                                          _c(
                                            "div",
                                            {
                                              staticClass: "card-body",
                                              staticStyle: {
                                                padding: "15px",
                                                "background-color":
                                                  "#22283e !important",
                                                border: "1px solid",
                                                "border-top": "1px",
                                                "border-bottom-left-radius":
                                                  "5px",
                                                "border-bottom-right-radius":
                                                  "5px"
                                              }
                                            },
                                            [
                                              _vm._v(
                                                "\n                                                    " +
                                                  _vm._s(
                                                    _vm.$i18n.t("trade_open")
                                                  ) +
                                                  ": " +
                                                  _vm._s(
                                                    _vm.openedDate(
                                                      open.created_at
                                                    )
                                                  )
                                              ),
                                              _c("br"),
                                              _vm._v(
                                                "\n                                                    " +
                                                  _vm._s(
                                                    _vm.$i18n.t(
                                                      "trade_opened_price"
                                                    )
                                                  ) +
                                                  ": " +
                                                  _vm._s(
                                                    parseFloat(open.open_price)
                                                  )
                                              ),
                                              _c("br"),
                                              _vm._v(
                                                "\n                                                    " +
                                                  _vm._s(
                                                    _vm.$i18n.t("trade_path")
                                                  ) +
                                                  ": "
                                              ),
                                              _c(
                                                "div",
                                                {
                                                  directives: [
                                                    {
                                                      name: "show",
                                                      rawName: "v-show",
                                                      value: open.type === 1,
                                                      expression:
                                                        "open.type === 1"
                                                    }
                                                  ],
                                                  staticClass:
                                                    "badge badge-success"
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.$i18n.t("trade_up")
                                                    )
                                                  )
                                                ]
                                              ),
                                              _c(
                                                "div",
                                                {
                                                  directives: [
                                                    {
                                                      name: "show",
                                                      rawName: "v-show",
                                                      value: open.type === 0,
                                                      expression:
                                                        "open.type === 0"
                                                    }
                                                  ],
                                                  staticClass:
                                                    "badge badge-danger"
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.$i18n.t("trade_down")
                                                    )
                                                  )
                                                ]
                                              )
                                            ]
                                          )
                                        ]
                                      )
                                    ]
                                  )
                                ],
                                1
                              )
                            }),
                            _vm._v(" "),
                            _c("p", { staticClass: "text-center" }, [
                              _vm._v(
                                _vm._s(_vm.$i18n.t("trade_orders_history"))
                              )
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value:
                                      _vm.latest.length === 0 &&
                                      _vm.historyLoaded,
                                    expression:
                                      "latest.length === 0 && historyLoaded"
                                  }
                                ]
                              },
                              [
                                _c("ul", { staticClass: "list-group" }, [
                                  _c(
                                    "li",
                                    {
                                      staticClass:
                                        "list-group-item d-flex justify-content-between align-items-center"
                                    },
                                    [
                                      _c("span", [
                                        _vm._v(
                                          " " +
                                            _vm._s(
                                              _vm.$i18n.t("trade_no_orders")
                                            )
                                        )
                                      ]),
                                      _vm._v(" "),
                                      _vm._m(2)
                                    ]
                                  )
                                ])
                              ]
                            ),
                            _vm._v(" "),
                            _vm._l(_vm.latest, function(open, index) {
                              return _c(
                                "b-card",
                                {
                                  key: "latest" + index,
                                  staticClass: "collapse-header",
                                  attrs: { "no-body": "" }
                                },
                                [
                                  _c(
                                    "div",
                                    {
                                      directives: [
                                        {
                                          name: "b-toggle",
                                          rawName: "v-b-toggle",
                                          value: "latest-orders" + index,
                                          expression: "'latest-orders' + index"
                                        }
                                      ],
                                      staticClass: "card-header p-1",
                                      attrs: { "data-toggle": "collapse" }
                                    },
                                    [
                                      _c(
                                        "span",
                                        { staticClass: "collapse-title" },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass: "align-middle",
                                              class: "text-" + open.textColor
                                            },
                                            [
                                              _vm._v(
                                                "\n                                                            " +
                                                  _vm._s(
                                                    _vm.symbols.find(function(
                                                      item
                                                    ) {
                                                      return (
                                                        item.id ===
                                                        open.symbol_id
                                                      )
                                                    }).symbol
                                                  ) +
                                                  "\n                                                        "
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "small",
                                            {
                                              class: "text-" + open.textColor,
                                              staticStyle: {
                                                float: "right",
                                                "padding-right": "20px",
                                                "padding-top": "5px"
                                              }
                                            },
                                            [
                                              _c("strong", {
                                                domProps: {
                                                  textContent: _vm._s(
                                                    parseFloat(
                                                      open.profit
                                                    ).toFixed(2) + " $"
                                                  )
                                                }
                                              })
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "progress position-relative",
                                              class: "progress-bar-primary",
                                              staticStyle: {
                                                "text-shadow":
                                                  "1px 1px 2px black"
                                              }
                                            },
                                            [
                                              _c("div", {
                                                staticClass: "progress-bar",
                                                staticStyle: { width: "100%" },
                                                attrs: {
                                                  role: "progressbar",
                                                  "aria-valuenow": "0",
                                                  "aria-valuemin": "0",
                                                  "aria-valuemax": "100"
                                                }
                                              }),
                                              _vm._v(" "),
                                              _c(
                                                "small",
                                                {
                                                  staticClass:
                                                    "text-white justify-content-center d-flex position-absolute w-100",
                                                  staticStyle: {
                                                    "margin-top": "-3.4px",
                                                    "font-size": "12px"
                                                  }
                                                },
                                                [
                                                  _vm._v(
                                                    "\n                                                                " +
                                                      _vm._s(open.expiration) +
                                                      "\n                                                            "
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "small",
                                                {
                                                  staticClass:
                                                    "text-white justify-content-left d-flex position-absolute w-100",
                                                  staticStyle: {
                                                    "margin-top": "-3.4px",
                                                    "font-size": "10px"
                                                  }
                                                },
                                                [
                                                  _c("i", {
                                                    directives: [
                                                      {
                                                        name: "show",
                                                        rawName: "v-show",
                                                        value: open.type === 1,
                                                        expression:
                                                          "open.type === 1"
                                                      }
                                                    ],
                                                    staticClass:
                                                      "bx bx-trending-up",
                                                    staticStyle: {
                                                      "font-size": "12px",
                                                      "padding-left": "1px",
                                                      "padding-top": "3px"
                                                    }
                                                  }),
                                                  _vm._v(" "),
                                                  _c("i", {
                                                    directives: [
                                                      {
                                                        name: "show",
                                                        rawName: "v-show",
                                                        value: open.type === 0,
                                                        expression:
                                                          "open.type === 0"
                                                      }
                                                    ],
                                                    staticClass:
                                                      "bx bx-trending-down",
                                                    staticStyle: {
                                                      "font-size": "12px",
                                                      "padding-left": "1px",
                                                      "padding-top": "1px"
                                                    }
                                                  }),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass: "text-white",
                                                      staticStyle: {
                                                        "padding-top": "1px"
                                                      }
                                                    },
                                                    [
                                                      _vm._v(
                                                        _vm._s(open.percent) +
                                                          "%"
                                                      )
                                                    ]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c("small", {
                                                staticClass:
                                                  "text-white justify-content-end d-flex position-absolute w-100",
                                                staticStyle: {
                                                  "margin-top": "-3.4px",
                                                  "font-size": "12px",
                                                  "padding-right": "1px"
                                                },
                                                domProps: {
                                                  textContent: _vm._s(
                                                    open.amount + " $"
                                                  )
                                                }
                                              })
                                            ]
                                          )
                                        ]
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "b-collapse",
                                    {
                                      attrs: {
                                        id: "latest-orders" + index,
                                        accordion: "latest-orders",
                                        role: "tabpanel"
                                      }
                                    },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "card-content" },
                                        [
                                          _c(
                                            "div",
                                            {
                                              staticClass: "card-body",
                                              staticStyle: {
                                                padding: "15px",
                                                "background-color":
                                                  "#22283e !important",
                                                border: "1px solid",
                                                "border-top": "1px",
                                                "border-bottom-left-radius":
                                                  "5px",
                                                "border-bottom-right-radius":
                                                  "5px"
                                              }
                                            },
                                            [
                                              _vm._v(
                                                "\n                                                      " +
                                                  _vm._s(
                                                    _vm.$i18n.t("trade_open")
                                                  ) +
                                                  ": " +
                                                  _vm._s(
                                                    _vm.openedDate(open.open_at)
                                                  )
                                              ),
                                              _c("br"),
                                              _vm._v(
                                                "\n                                                      " +
                                                  _vm._s(
                                                    _vm.$i18n.t(
                                                      "trade_opened_price"
                                                    )
                                                  ) +
                                                  ": " +
                                                  _vm._s(
                                                    parseFloat(open.open_price)
                                                  )
                                              ),
                                              _c("br"),
                                              _vm._v(
                                                "\n                                                      " +
                                                  _vm._s(
                                                    _vm.$i18n.t("trade_time")
                                                  ) +
                                                  ": " +
                                                  _vm._s(open.expiration)
                                              ),
                                              _c("br"),
                                              _vm._v(
                                                "\n                                                      " +
                                                  _vm._s(
                                                    _vm.$i18n.t("trade_path")
                                                  ) +
                                                  ": "
                                              ),
                                              _c(
                                                "div",
                                                {
                                                  directives: [
                                                    {
                                                      name: "show",
                                                      rawName: "v-show",
                                                      value: open.type === 1,
                                                      expression:
                                                        "open.type === 1"
                                                    }
                                                  ],
                                                  staticClass:
                                                    "badge badge-success"
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.$i18n.t("trade_up")
                                                    )
                                                  )
                                                ]
                                              ),
                                              _c(
                                                "div",
                                                {
                                                  directives: [
                                                    {
                                                      name: "show",
                                                      rawName: "v-show",
                                                      value: open.type === 0,
                                                      expression:
                                                        "open.type === 0"
                                                    }
                                                  ],
                                                  staticClass:
                                                    "badge badge-danger"
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.$i18n.t("trade_down")
                                                    )
                                                  )
                                                ]
                                              )
                                            ]
                                          )
                                        ]
                                      )
                                    ]
                                  )
                                ],
                                1
                              )
                            }),
                            _vm._v(" "),
                            _c("div", { staticClass: "text-center mb-2" }, [
                              _c("span", {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: !_vm.historyLoaded,
                                    expression: "!historyLoaded"
                                  }
                                ],
                                staticClass: "spinner-border spinner-grow-sm",
                                staticStyle: { width: "3rem", height: "3rem" },
                                attrs: { role: "status", "aria-hidden": "true" }
                              })
                            ]),
                            _vm._v(" "),
                            _c(
                              "router-link",
                              { attrs: { to: "/history" } },
                              [
                                [
                                  _c(
                                    "button",
                                    {
                                      staticClass:
                                        "btn btn-outline-primary w-100",
                                      attrs: { type: "button" }
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.$i18n.t(
                                            "trade_full_orders_history"
                                          )
                                        )
                                      )
                                    ]
                                  )
                                ]
                              ],
                              2
                            )
                          ],
                          2
                        )
                      ]
                    )
                  ])
                ])
              ])
            ])
          ])
        ])
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "modal",
          "aria-label": "Close"
        }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "text-center mb-2" }, [
      _c("img", {
        staticClass: "img-fluid",
        attrs: { src: "/images/icon/cup.png", height: "155", width: "155" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "span",
      {
        staticClass:
          "badge-circle badge-circle-warning badge-circle-sm text-white"
      },
      [
        _c("i", {
          staticClass: "bx bx-info-circle font-size-base",
          staticStyle: { "font-size": "1rem", "margin-left": "-1.5px" }
        })
      ]
    )
  }
]
render._withStripped = true

/***/ })

}]);