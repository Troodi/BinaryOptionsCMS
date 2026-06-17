import { parseFullSymbol } from './helpers.js';
import Echo from "laravel-echo"
window.io = require('socket.io-client');

const channelToSubscription = new Map();

let latestBar = {};
let latestchannelString = '';

export function barsFromWebSocket(data){
	if(!window.symbolInfo){
		return;
	}
	latestBar = data;
	let key = Object.keys(data)[0];
	let shortName = data[key].short_name;
	const tradePrice = data[key].lp;
	let tradeTime = Date.parse(data[key].last_update);
	const channelString = `0~${window.symbolInfo.broker}~${window.symbolInfo.ticker.replace('/', '')}`;
	latestchannelString = channelString;
	const subscriptionItem = channelToSubscription.get(channelString);
	if (subscriptionItem === undefined) {
		return;
	}
	const lastDailyBar = subscriptionItem.lastDailyBar;
	const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time, subscriptionItem.resolution);

	let bar;

	if (tradeTime >= nextDailyBarTime) {
	//if(newBar){
		bar = {
			time: tradeTime,
			open: lastDailyBar.close,
			high: tradePrice,
			low: tradePrice,
			close: tradePrice,
		};
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

// setInterval(() => {
// 	if(!_.isEmpty(latestBar)){
// 		const dateLocal = new Date();
// 		let key = Object.keys(latestBar)[0];
// 		let shortName = latestBar[key].short_name;
// 		const channelString = `0~${exchange}~${shortName}`;
// 		const subscriptionItem = channelToSubscription.get(channelString);
// 		if (subscriptionItem !== undefined) {
// 			let resolution = subscriptionItem.resolution;
// 			if(dateLocal.getMinutes() !== date.getMinutes()){
// 				if (resolution === '1' || resolution === '5' || resolution === '15' || resolution === '30' || resolution === '60' || resolution === '240') {
// 					let parsed = parseInt(resolution);
// 					if (dateLocal.getMinutes() % parsed === 0) {
// 						latestBar[key].last_update = new Date();
// 						barsFromWebSocket(latestBar, true);
// 					}
// 				}
// 			}
//
// 			if(dateLocal.getSeconds() !== date.getSeconds()){
// 				date = new Date();
// 				if(resolution === '1S' || resolution === '5S' || resolution === '15S' || resolution === '30S') {
// 					let parsed = parseInt(resolution.replace('S', ''));
// 					if (dateLocal.getSeconds() % parsed === 0) {
// 						latestBar[key].last_update = new Date();
// 						barsFromWebSocket(latestBar, true);
// 					}
// 				}
// 			}
// 		}
// 	}
// });

function getNextDailyBarTime(barTime, resolution) {
	if(resolution === '1' || resolution === '5' || resolution === '15' || resolution === '30' || resolution === '60' || resolution === '240') {
		const date = new Date(barTime);
		date.setMinutes(date.getMinutes() + parseInt(resolution));
		date.setSeconds(0);
		return date.getTime();
	}
	else if(resolution === '1S' || resolution === '5S' || resolution === '15S' || resolution === '30S') {
		const date = new Date(barTime);
		let parsed = parseInt(resolution.replace('S', ''));
		date.setSeconds(date.getSeconds() + parsed);
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
	window.symbolInfo = symbolInfo;
	const channelString = `0~${symbolInfo.broker}~${symbolInfo.ticker.replace('/', '')}`;
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
		info: symbolInfo,
	};
	channelToSubscription.set(channelString, subscriptionItem);
	//console.log('[subscribeBars]: Subscribe to streaming. Channel:', channelString);
	//socket.emit('SubAdd', { subs: [channelString] });
}

export function unsubscribeFromStream(subscriberUID, tvObj) {
	// find a subscription with id === subscriberUID
	window.dataLoaded = false;
	for (const channelString of channelToSubscription.keys()) {
		const subscriptionItem = channelToSubscription.get(channelString);
		tvObj._deleteTicker(subscriptionItem.info.broker+':' + subscriptionItem.info.ticker.replace('/', ''))
		//tvObj.removeSymbols(subscriptionItem.info.broker+':' + parsedSymbol.fromSymbol + parsedSymbol.toSymbol);
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
