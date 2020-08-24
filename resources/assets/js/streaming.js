import { parseFullSymbol } from './helpers.js';
window.io = require('socket.io-client');

const channelToSubscription = new Map();

let latestBar = {};

export function barsFromWebSocket(data){
	latestBar = data;
	let key = Object.keys(data)[0];
	let shortName = data[key].short_name;
	const exchange = 'Binary';
	const tradePrice = data[key].lp;
	const tradeTime = Date.parse(data[key].last_update);
	const channelString = `0~${exchange}~${shortName}`;
	const subscriptionItem = channelToSubscription.get(channelString);
	if (subscriptionItem === undefined) {
		return;
	}
	const lastDailyBar = subscriptionItem.lastDailyBar;
	const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time, subscriptionItem.resolution);

	let bar;
	// if (tradeTime >= nextDailyBarTime) {
	// 	bar = {
	// 		time: tradeTime,
	// 		open: lastDailyBar.close,
	// 		high: tradePrice,
	// 		low: tradePrice,
	// 		close: tradePrice,
	// 	};
	// 	//console.log('[socket] Generate new bar', bar);
	// } else {
	//
	// 	//console.log('[socket] Update the latest bar by price', tradePrice);
	// }
	bar = {
		...lastDailyBar,
		high: Math.max(lastDailyBar.high, tradePrice),
		low: Math.min(lastDailyBar.low, tradePrice),
		close: tradePrice,
	};
	subscriptionItem.lastDailyBar = bar;

	// send data to every subscriber of that symbol
	subscriptionItem.handlers.forEach(handler => handler.callback(bar));
}

setInterval(() => {
	console.log(latestBar)
	console.log('----')
}, 1000);

export function createNewBar(barData) {
	if(_.isEmpty(latestBar)){
		return;
	}
	let key = Object.keys(latestBar)[0];
	let shortName = latestBar[key].short_name;
	const exchange = 'Binary';
	const tradePrice = latestBar[key].lp;
	const tradeTime = Date.parse(latestBar[key].last_update);
	const channelString = `0~${exchange}~${shortName}`;
	const subscriptionItem = channelToSubscription.get(channelString);
	if (subscriptionItem === undefined) {
		return;
	}
	const lastDailyBar = subscriptionItem.lastDailyBar;
	const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time, subscriptionItem.resolution);
	let bar = {
		time: barData.time,
		open: barData.close,
		high: barData.high,
		low: barData.low,
		close: barData.close,
	};
	subscriptionItem.lastDailyBar = bar;
	subscriptionItem.handlers.forEach(handler => handler.callback(bar));
}

function getNextDailyBarTime(barTime, resolution) {
	if(resolution === '1' || resolution === '3' || resolution === '5' || resolution === '10' || resolution === '15' || resolution === '30') {
		const date = new Date(barTime);
		date.setMinutes(date.getMinutes() + parseInt(resolution));
		date.setSeconds(0);
		return date.getTime();
	}
	else if(resolution === '1S' || resolution === '5S' || resolution === '15S' || resolution === '30S') {
		const date = new Date(barTime);
		date.setSeconds(date.getSeconds() + parseInt(resolution.replace('S', '')));
		return date.getTime();
	}
}

export function subscribeOnStream(
	symbolInfo,
	resolution,
	onRealtimeCallback,
	subscribeUID,
	onResetCacheNeededCallback,
	lastDailyBar,
) {
	const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
	const channelString = `0~${parsedSymbol.exchange}~${parsedSymbol.fromSymbol}${parsedSymbol.toSymbol}`;
	const handler = {
		id: subscribeUID,
		callback: onRealtimeCallback,
	};
	let subscriptionItem = channelToSubscription.get(channelString);
	if (subscriptionItem) {
		// already subscribed to the channel, use the existing subscription
		subscriptionItem.handlers.push(handler);
		return;
	}
	subscriptionItem = {
		subscribeUID,
		resolution,
		lastDailyBar,
		handlers: [handler],
	};
	channelToSubscription.set(channelString, subscriptionItem);
	//console.log('[subscribeBars]: Subscribe to streaming. Channel:', channelString);
	//socket.emit('SubAdd', { subs: [channelString] });
}

export function unsubscribeFromStream(subscriberUID) {
	// find a subscription with id === subscriberUID
	for (const channelString of channelToSubscription.keys()) {
		const subscriptionItem = channelToSubscription.get(channelString);
		const handlerIndex = subscriptionItem.handlers
			.findIndex(handler => handler.id === subscriberUID);

		if (handlerIndex !== -1) {
			// remove from handlers
			subscriptionItem.handlers.splice(handlerIndex, 1);

			if (subscriptionItem.handlers.length === 0) {
				// unsubscribe from the channel, if it was the last handler
				//console.log('[unsubscribeBars]: Unsubscribe from streaming. Channel:', channelString);
				//socket.emit('SubRemove', { subs: [channelString] });
				channelToSubscription.delete(channelString);
				break;
			}
		}
	}
}
