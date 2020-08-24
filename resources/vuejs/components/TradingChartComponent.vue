<template>
        <div id="tv_chart_container" style="height: calc(100vh - 69px)">
            <!-- This div will contain the Charting Library widget. -->
        </div>
</template>

<script>
    import Datafeed from "../../assets/js/datafeed";
    import {TradingViewWebsocket} from "../js/tv";
    window.Datafeed = Datafeed;

    export default {
        name: "Trading",
        created() {
            this.initChart();
        },
        methods:{
            initChart(){
                let symbol = 'Binary:EUR/USD';
                let tabSymbol = 'EUR/USD';
                var interval = setInterval(function() {
                    if(typeof window.Datafeed !== 'undefined'){
                        clearInterval(interval);
                        window.tvWidget = new window.TradingView.widget({
                            locale: "ru",
                            symbol: symbol, // default symbol
                            interval: '5s', // default interval
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
                                intervals: ['1s', '5s', '15s', '30s', '1', '3', '5', '10', '15', '30', '1H', '4H', '1D'],
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
                                // window.tvWidget.chart().onSymbolChanged ().subscribe(null, function(symbol) {
                                //     console.log(symbol)
                                // });
                            });
                        });
                    }
                }, 100);
            }
        }
    }
</script>

<style scoped>

</style>