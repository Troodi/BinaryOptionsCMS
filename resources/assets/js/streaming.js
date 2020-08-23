import { parseFullSymbol } from './helpers.js';
import Echo from "laravel-echo"
window.io = require('socket.io-client');

const channelToSubscription = new Map();

let latestBar = {};
let date = new Date();
export function clearLatestBar(){

}

export function barsFromWebSocket(data, setNewBar = false){
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
	if (tradeTime >= nextDailyBarTime) {
		bar = {
			time: tradeTime,
			open: lastDailyBar.close,
			high: tradePrice,
			low: tradePrice,
			close: tradePrice,
		};
		//console.log('[socket] Generate new bar', bar);
	} else {
		bar = {
			...lastDailyBar,
			high: Math.max(lastDailyBar.high, tradePrice),
			low: Math.min(lastDailyBar.low, tradePrice),
			close: tradePrice,
		};
		//console.log('[socket] Update the latest bar by price', tradePrice);
	}

	subscriptionItem.lastDailyBar = bar;

	// send data to every subscriber of that symbol
	subscriptionItem.handlers.forEach(handler => handler.callback(bar));
}

setInterval(() => {
	if(!_.isEmpty(latestBar)){
		const dateLocal = new Date();
		if(dateLocal.getSeconds() !== date.getSeconds()){
			date = new Date();
			console.log('New second!', dateLocal.getSeconds())
			//barsFromWebSocket(latestBar);
		}
	}
}, 0);

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
