import {
	makeApiRequest,
	generateSymbol,
	parseFullSymbol,
} from './helpers.js';
import {
	subscribeOnStream,
	unsubscribeFromStream,
} from './streaming.js';

import {
	barsCallback,
	getMoreData
} from '../../vuejs/js/tv'

const lastBarsCache = new Map();

export function setLastBarsCache(symbolInfo, bars){
	lastBarsCache.set(symbolInfo.full_name, {
		...bars[bars.length - 1],
	});
}

const configurationData = {
	supported_resolutions: ['1s', '3s', '5s', '10s', '15s', '30s', '1', '3', '5', '10', '15', '30'],
	exchanges: [{
		value: 'Binary',
		name: 'Binary Option',
		desc: 'Binary Option',
	}
	],
	symbols_types: [{
		name: 'forex',

		// `symbolType` argument for the `searchSymbols` method, if a user selects this symbol type
		value: 'forex',
	},
		// ...
	],
};

async function getAllSymbols() {
	const data = await makeApiRequest('data/symbols');
	let allSymbols = [];

	for (const exchange of configurationData.exchanges) {
		const pairs = data;
		for(const symbol of pairs){
			let current = {
				symbol: symbol.symbol,
				full_name: "Binary:" + symbol.symbol,
				description: "75%",
				exchange: exchange.value,
				type: 'forex',
			};
			allSymbols.push(current);
		}
	}
	return allSymbols;
}

export default {
	onReady: (callback) => {
		//console.log('[onReady]: Method call');
		setTimeout(() => callback(configurationData));
	},

	searchSymbols: async (
		userInput,
		exchange,
		symbolType,
		onResultReadyCallback,
	) => {
		const symbols = await getAllSymbols();
		const newSymbols = symbols.filter(symbol => {
			const isExchangeValid = exchange === '' || symbol.exchange === exchange;
			const isFullSymbolContainsInput = symbol.full_name
				.toLowerCase()
				.indexOf(userInput.toLowerCase()) !== -1;
			return isExchangeValid && isFullSymbolContainsInput;
		});
		onResultReadyCallback(newSymbols);
	},

	resolveSymbol: async (
		symbolName,
		onSymbolResolvedCallback,
		onResolveErrorCallback,
	) => {
		//console.log('[resolveSymbol]: Method call', symbolName);
		const symbols = await getAllSymbols();
		const symbolItem = symbols.find(({
			full_name,
		}) => full_name === symbolName);
		if (!symbolItem) {
			//console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
			onResolveErrorCallback('cannot resolve symbol');
			return;
		}
		const symbolInfo = {
			name: symbolItem.symbol,
			description: symbolItem.description,
			type: symbolItem.type,
			session: '24x7',
			timezone: 'Etc/UTC',
			exchange: symbolItem.exchange,
			minmov: 1,
			pricescale: 100000,
			has_intraday: true,
			has_no_volume: true,
			has_weekly_and_monthly: true,
			supported_resolutions: configurationData.supported_resolutions,
			volume_precision: 2,
			data_status: 'streaming',
		};
		if(typeof window.button !== 'undefined') {
			window.button.innerHTML = '<strong style="color: #8a99b5; cursor: pointer;">' + symbolItem.symbol + '</strong>';
		}
		//console.log('[resolveSymbol]: Symbol resolved', symbolInfo);
		onSymbolResolvedCallback(symbolInfo);
	},

	getBars: async (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
		barsCallback(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest);
		getMoreData();
	},

	subscribeBars: (
		symbolInfo,
		resolution,
		onRealtimeCallback,
		subscribeUID,
		onResetCacheNeededCallback,
	) => {
		//console.log('[subscribeBars]: Method call with subscribeUID:', subscribeUID);
		subscribeOnStream(
			symbolInfo,
			resolution,
			onRealtimeCallback,
			subscribeUID,
			onResetCacheNeededCallback,
			lastBarsCache.get(symbolInfo.full_name),
		);
		//console.log(lastBarsCache);
	},

	unsubscribeBars: (subscriberUID) => {
		//console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
		unsubscribeFromStream(subscriberUID);
	},
};
