// Datafeed implementation, will be added later
import Datafeed from './datafeed.js';

window.tvWidget = new TradingView.widget({
	locale: "ru",
	symbol: 'Bitfinex:BTC/USD', // default symbol
	interval: '1', // default interval
	fullscreen: true, // displays the chart in the fullscreen mode
	container_id: 'tv_chart_container',
	datafeed: Datafeed,
	timezone: "Europe/Moscow",
	library_path: '/charts/charting_library/',
	theme: "dark",
	disabled_features: ["widget_logo", "header_symbol_search", "header_compare", 'compare_symbol', 'timeframes_toolbar', 'display_market_status', 'header_screenshot'],
	favorites: {
		intervals: ['1s', '3s', '5s', '10s', '15s', '30s', '1', '3', '5', '10', '15', '30'],
		chartTypes: ["Candles", "Area", "Line", "Bars", "Hollow Candles", "Baseline"]
	},
	overrides: {
		"paneProperties.vertGridProperties.color": "#21283e",
		"paneProperties.horzGridProperties.color": "#21283e",
	}
});