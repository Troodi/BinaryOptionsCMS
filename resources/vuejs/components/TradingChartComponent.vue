<template>
  <div>
    <div id="tv_chart_container" class="trading-chart-height">
        <!-- This div will contain the Charting Library widget. -->
    </div>
    <div v-show="showError" class="alert alert-warning alert-dismissible mb-2" role="alert" style="margin-top: -84px;margin-left: 150px;margin-right: 150px;">

      <button onclick="location.reload()" type="button" class="close btn btn-light-danger btn-sm" style="font-size: 15px;top: 10px;padding: 10px;margin-right: 10px;">
        Переподключиться
      </button>
      <div class="d-flex align-items-center">
        <i class="bx bx-error-circle"></i>
        <span>
          <strong>Ошибка соединения!</strong>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
    import {getCookie} from "../js/functions";
    window.dataLoaded = false;

    export default {
        name: "Trading",
        created() {
            window.Datafeed = this.$datafeed;
            this.initChart();
        },
        data(){
            return {
              showError: false
            }
        },
        methods:{
            initChart(){
                let self = this;
                let symbol = '', tabSymbol = '', resolution = '';
                if(localStorage.getItem('symbol_full') && localStorage.getItem('symbol_short')) {
                    symbol = localStorage.getItem('symbol_full');
                    tabSymbol = localStorage.getItem('symbol_short');
                } else {
                    symbol = 'Binary:BTCUSDT';
                    tabSymbol = 'BTC/USDT';
                }
                console.log(symbol, tabSymbol);
                if(localStorage.getItem('resolution')){
                    resolution = localStorage.getItem('resolution');
                } else {
                    resolution = '1';
                }
                let interval = setInterval(function() {
                    if(typeof window.Datafeed !== 'undefined'){
                        clearInterval(interval);
                        window.tvWidget = new window.TradingView.widget({
                            locale: getCookie('currentLanguage') ? (getCookie('currentLanguage') === 'es' ? 'en' : getCookie('currentLanguage') ) : 'en',
                            symbol: symbol, // default symbol
                            interval: resolution, // default interval
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
                                "paneProperties.horzGridProperties.color": "#21283e",
                            }
                        });

                        window.tvWidget.onChartReady(() => {
                            window.tvWidget.headerReady().then(() => {
                                window.button = window.tvWidget.createButton();
                                window.button.setAttribute('title', 'Выбрать символ для торговли');
                                window.button.classList.add('apply-common-tooltip');
                                window.button.classList.add('button-symbol-get');
                                window.button.addEventListener('click', () => window.tvWidget.chart().executeActionById('symbolSearch'));
                                window.button.innerHTML = '<strong style="color: #8a99b5; cursor: pointer;">'+tabSymbol+'</strong>';
                                $('#' + window.tvWidget._iFrame.name).contents().find('#header-toolbar-symbol-search').replaceWith($('#' + window.tvWidget._iFrame.name).contents().find('.button-symbol-get'))
                                $('#' + window.tvWidget._iFrame.name).contents().find('head').append($("<style type='text/css'> ._tv-dialog-nonmodal { width:350px !important; left: 57px !important; top: 41px !important; max-width: 70vw; } .symbol-edit-popup-td.name { width: 40% !important; } </style>"));
                            });
                        });
                        setInterval(() => {
                          self.showError = window.chartTV.readyState !== 1 && window.chartTV.readyState !== 0 || ((new Date().getTime() / 1000) - (window.chartTVLatestTime / 1000) > 12);
                        }, 3000);
                    }
                }, 100);
            }
        },
        destroyed() {
            //window.tvObj.closeWebsocket();
        }
    }
</script>

<style scoped>
    @media screen and (max-width: 1000px) {
        .trading-chart-height {
            height: 50vh;
        }
    }
    @media screen and (min-width: 1000px) {
        .trading-chart-height {
            height: calc(100vh - 69px);
        }
    }
</style>