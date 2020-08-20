import {
    barsFromWebSocket
} from '../../assets/js/streaming';

import {
    setLastBarsCache
} from '../../assets/js/datafeed';
window.socket = new WebSocket("ws://chart.getoption.pro:80");
let session = generateSession();
let chartSession = generateChartSession();
let sessionRegistered = false;
let subscriptions = [];
let tickerData = {};
let symbol = '';
let symbolInfoLocal, resolutionLocal, fromLocal, toLocal, onHistoryCallbackLocal, onErrorCallbackLocal, firstDataRequestLocal;
let checkBarsGot = false;

getTicker("FX:EURUSD");

export function barsCallback(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest){
    symbolInfoLocal = symbolInfo;
    resolutionLocal = resolution;
    fromLocal = from;
    toLocal = to;
    onHistoryCallbackLocal = onHistoryCallback;
    onErrorCallbackLocal = onErrorCallback;
    firstDataRequestLocal = firstDataRequest;
}


window.socket.onopen = function() {
    console.log("Соединение установлено.");
};

window.socket.onclose = function(event) {
    if (event.wasClean) {
        console.log('Соединение закрыто чисто');
    } else {
        console.log('Обрыв соединения'); // например, "убит" процесс сервера
    }
    console.log('Код: ' + event.code + ' причина: ' + event.reason);
};

window.socket.onmessage = function(data) {
    const packets = parseMessages(data.data);
    packets.forEach((packet) => {
        if (packet["~protocol~keepalive~"]) {
            sendRawMessage("~h~" + packet["~protocol~keepalive~"]);
        } else if (packet.session_id) {
            sendMessage("set_auth_token", ["unauthorized_user_token"]);
            sendMessage("quote_create_session", [session]);
            sendMessage("quote_set_fields", [
                session,
                "ch",
                "chp",
                "current_session",
                "description",
                "local_description",
                "language",
                "exchange",
                "fractional",
                "is_tradable",
                "lp",
                "minmov",
                "minmove2",
                "original_name",
                "pricescale",
                "pro_name",
                "short_name",
                "type",
                "update_mode",
                "volume",
                "ask",
                "bid",
                "fundamentals",
                "high_price",
                "is_tradable",
                "low_price",
                "open_price",
                "prev_close_price",
                "rch",
                "rchp",
                "rtc",
                "status",
                "basic_eps_net_income",
                "beta_1_year",
                "earnings_per_share_basic_ttm",
                "industry",
                "market_cap_basic",
                "price_earnings_ttm",
                "sector",
                "volume",
                "dividends_yield"
            ]);
            sessionRegistered = true;
            getHistoryTicker(symbol); // Loading history (create chart session)
        } else if (packet.m && packet.m === "qsd" && typeof packet.p === "object" && packet.p.length > 1 && packet.p[0] === session){
            const tticker = packet.p[1];
            const tickerName = tticker.n;
            const tickerStatus = tticker.s;
            const tickerUpdate = tticker.v;

            // set ticker data, adding all object parameters together
            tickerData[tickerName] = Object.assign(
                tickerData[tickerName] || { last_retrieved: new Date() },
                tickerUpdate,
                { s: tickerStatus },
                { last_update: new Date() }
            );
            tickerData[tickerName].last_retrieved = new Date();
            barsFromWebSocket(tickerData);
            if (Date.now() - Date.parse(tickerData[tickerName].last_retrieved) > 1000 * 60) {
                _deleteTicker(tickerName);
            }
        } else if (packet.m && packet.m === "symbol_resolved"){
            firstLoadHistoryData(); // Get history bars
            //barsFromWebSocket();
        } else if (packet.m && packet.m === "timescale_update"){
            let bars = [];
            packet.p[1].s1.s.forEach(bar => {
                //if (bar.time >= from && bar.time < to) {
                bars = [...bars, {
                    time: bar.v[0] * 1000,
                    low: bar.v[3],
                    high: bar.v[2],
                    open: bar.v[1],
                    close: bar.v[4],
                }];
                //}
            });
            const each = 10; // how much ms between runs
            let runs = 3000 / each; // time in ms divided by above
            const interval = setInterval(() => {
                --runs;
                if(typeof onHistoryCallbackLocal !== 'undefined')
                {
                    if (firstDataRequestLocal) {
                        setLastBarsCache(symbolInfoLocal, bars);
                    }
                    onHistoryCallbackLocal(bars, {
                        noData: false,
                    });
                    checkBarsGot = true;
                    clearInterval(interval);
                }
            }, each);
            //barsFromWebSocket();
        } else if (packet.m && packet.m === "series_completed"){
            const each = 10; // how much ms between runs
            let runs = 3000 / each; // time in ms divided by above
            const interval = setInterval(() => {
                --runs;
                if(typeof onHistoryCallbackLocal !== 'undefined')
                {
                    if(!checkBarsGot) {
                        onHistoryCallbackLocal([], {
                            noData: true,
                        });
                    }
                    clearInterval(interval);
                }
            }, each);
            checkBarsGot = false;
        }
    });
    //console.log("Получены данные " + data.data);
};

window.socket.onerror = function(error) {
    console.log("Ошибка " + error.message);
};

function resetWebSocket(){
    window.socket = new WebSocket("ws://chart.getoption.pro:80");
}

function generateSession() {
    return "qs_" + randomString(12);
}

function generateChartSession() {
    return "cs_" + randomString(12);
}

function randomString(length) {
    return Math.random().toString(36).substring(2, length+2) + Math.random().toString(36).substring(2, length+2);
}

function sendRawMessage(message) {
    window.socket.send(prependHeader(message));
}

function sendMessage(func, args) {
    window.socket.send(createMessage(func, args));
}

function registerTicker(ticker) {
    if (subscriptions.indexOf(ticker) !== -1) {
        return;
    }
    subscriptions.push(ticker);
    window.socket.send(
        createMessage("quote_add_symbols", [
            session,
            ticker,
            { flags: ["force_permission"] }
        ])
    );
}

function _getTicker(tickerName) {
    // check if ticker is tracked, and if it is, return stored data

    if (tickerData[tickerName] && tickerData[tickerName].pro_name) {
        tickerData[tickerName].last_retrieved = new Date();
        return;
    }

    // if not, register and wait for data

    registerTicker(tickerName);
    const each = 10; // how much ms between runs
    let runs = 3000 / each; // time in ms divided by above
    const interval = setInterval(() => {
        --runs;
        if (tickerData[tickerName] && tickerData[tickerName].pro_name) {
            tickerData[tickerName].last_retrieved = new Date();
            clearInterval(interval);
        } else if (!runs) {
            _deleteTicker(tickerName);
            console.log("Timed out.");
            clearInterval(interval);
        }
    }, each);
}

function _deleteTicker(ticker) {
    unregisterTicker(ticker);
    delete tickerData[ticker];
}

function unregisterTicker(ticker) {
    const index = subscriptions.indexOf(ticker);
    if (index === -1) {
        return;
    }
    subscriptions.splice(index, 1);
    window.socket.send(
        createMessage("quote_remove_symbols", [session, ticker])
    );
}

function getTicker(tickerName) {
    symbol = tickerName;
    const each = 10;
    const runs = 3000 / each; // time in ms divided by above
    if (window.socket.readyState === 3) { //CLOSED
        resetWebSocket();
    }

    const interval = setInterval(() => {
        if (window.socket.readyState === 1 && sessionRegistered) { // OPEN
            _getTicker(tickerName);
            clearInterval(interval);
        } else if (!runs) {
            console.log("WebSocket connection is closed.");
            clearInterval(interval);
        }
    }, each);
}

function getHistoryTicker(tickerName){
    window.socket.send(
        createMessage("chart_create_session", [chartSession, ""])
    );
    window.socket.send(
        createMessage("resolve_symbol", [
            chartSession,
            "symbol_1",
            '={"symbol":"'+tickerName+'","adjustment":"splits"}'
        ])
    );
}

function firstLoadHistoryData(){
    window.socket.send(
        createMessage("create_series", [
            chartSession,
            "s1",
            "s1",
            "symbol_1",
            "1",
            5000
        ])
    );
}

export function getMoreData() {
    window.socket.send(
        createMessage("request_more_data", [
            chartSession,
            "s1",
            5000
        ])
    );
}

// IO functions
function parseMessages(str){
    const packets = [];
    str.split(/~m~\d+~m~/).filter(x => x).forEach(function(packet, index){
        packet = reverseString(packet);
        if(packet.indexOf('}') !== -1) {
            packet = packet.substr(packet.indexOf('}'));
        }
        packet = reverseString(packet);
        if (packet.substr(0, 3) !== "~h~") {
            packets.push(JSON.parse(packet));
        } else {
            packets.push({"~protocol~keepalive~": packet.substr(3)});
        }
    });
    return packets;
}

function reverseString(str) {
    return str.split( '' ).reverse( ).join( '' );
}

function prependHeader(str) {
    return "~m~" + str.length + "~m~" + str;
}

function createMessage (func, paramList){
    return prependHeader(constructMessage(func, paramList));
}

function constructMessage (func, paramList){
    return JSON.stringify({
        m: func,
        p: paramList
    });
}
// End IO functions