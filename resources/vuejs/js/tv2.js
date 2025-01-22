import $ from 'jquery';

export class TradingViewFastWebsocket {
    constructor() {
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
        window.TVsocket = this.socketTV = window.TVsocket != null ? window.TVsocket : new WebSocket(window.websocketAddress);
        this.socketTV.onmessage = (data) => { this.onmessage(data) };
        this.socketTV.onopen = () => { this.onopen() };
        this.socketTV.onclose = (data) => { this.onclose(data) };
        this.socketTV.onerror = (data) => { this.onerror(data) };
    }

    getTickerDataArray(){
        return this.tickerData;
    }

    closeWebsocket(){
        console.log('Closed!');
        this.socketTV.close();
    }

    onopen() {
        console.log("Connected to quotes socket.");
    }

    onclose(event) {
        if (event.wasClean) {
            console.log('Соединение закрыто чисто');
        } else {
            console.log('Обрыв соединения'); // например, "убит" процесс сервера
        }
        console.log('Код: ' + event.code + ' причина: ' + event.reason);
    }

    onerror(error) {
        console.log("Ошибка " + error.message);
    }

    onmessage(data) {
        const packets = this.parseMessages(data.data);
        packets.forEach((packet) => {
            if (packet["~protocol~keepalive~"]) {
                this.sendRawMessage("~h~" + packet["~protocol~keepalive~"]);
            } else if (packet.session_id) {
                let token = '';
                $.get("/data/getAuthToken", function (data) {
                    token = data;

                });

                const interval = setInterval(() => {
                    if (token !== '') { // OPEN
                        clearInterval(interval);
                        this.sendMessage("set_auth_token", [token]);
                        this.sendMessage("quote_create_session", [this.session]);
                        this.sendMessage("quote_set_fields", [
                            this.session,
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
                        this.sessionRegistered = true;
                    }
                }, 200);
            } else if (packet.m && packet.m === "qsd" && typeof packet.p === "object" && packet.p.length > 1 && packet.p[0] === this.session) {
                const tticker = packet.p[1];
                const tickerName = tticker.n;
                const tickerStatus = tticker.s;
                const tickerUpdate = tticker.v;
                // set ticker data, adding all object parameters together
                this.tickerData[tickerName] = Object.assign(
                    this.tickerData[tickerName] || {last_retrieved: new Date()},
                    tickerUpdate,
                    {s: tickerStatus},
                    {last_update: new Date()}
                );
                this.tickerData[tickerName].last_retrieved = new Date();
                if (Date.now() - Date.parse(this.tickerData[tickerName].last_retrieved) > 1000 * 60) {
                    this._deleteTicker(tickerName);
                }
            }
        });
        //console.log("Получены данные " + data.data);
    };

    resetWebSocket() {
        window.socket = new WebSocket(window.websocketAddress);
    }

    generateSession() {
        return "qs_" + this.randomString(12);
    }

    generateChartSession() {
        return "cs_" + this.randomString(12);
    }

    randomString(length) {
        return Math.random().toString(36).substring(2, length + 2) + Math.random().toString(36).substring(2, length + 2);
    }

    sendRawMessage(message) {
        this.socketTV.send(this.prependHeader(message));
    }

    sendMessage(func, args) {
        this.socketTV.send(this.createMessage(func, args));
    }

    registerTicker(ticker) {
        if (this.subscriptions.indexOf(ticker) !== -1) {
            return;
        }
        this.subscriptions.push(ticker);
        this.socketTV.send(
            this.createMessage("quote_add_symbols", [
                this.session,
                "={\"adjustment\":\"splits\",\"symbol\":\"" + ticker + "\"}"
            ])
        );
    }

    _getTicker(tickerName) {
        // check if ticker is tracked, and if it is, return stored data

        if (this.tickerData[tickerName] && this.tickerData[tickerName].pro_name) {
            this.tickerData[tickerName].last_retrieved = new Date();
            return;
        }

        // if not, register and wait for data

        this.registerTicker(tickerName);
        const each = 10; // how much ms between runs
        let runs = 3000 / each; // time in ms divided by above
        const interval = setInterval(() => {
            --runs;
            if (this.tickerData[tickerName] && this.tickerData[tickerName].pro_name) {
                this.tickerData[tickerName].last_retrieved = new Date();
                clearInterval(interval);
            } else if (!runs) {
                this._deleteTicker(tickerName);
                clearInterval(interval);
            }
        }, each);
    }

    _deleteTicker(ticker) {
        this.unregisterTicker(ticker);
        delete this.tickerData[ticker];
    }

    unregisterTicker(ticker) {
        const index = this.subscriptions.indexOf(ticker);
        if (index === -1) {
            return;
        }
        this.subscriptions.splice(index, 1);
        this.socketTV.send(
            this.createMessage("quote_remove_symbols", [this.session, ticker])
        );
    }

    removeSymbols(tickerName){
        const interval = setInterval(() => {
            if (this.sessionRegistered) {
                clearInterval(interval);
                this.socketTV.send(
                    this.createMessage("quote_remove_symbols", [
                        this.session,
                        tickerName
                    ])
                );
            }
        }, 200);
    }

    getTicker(tickerName) {
        this.symbol = tickerName;
        const each = 10;
        const runs = 3000 / each; // time in ms divided by above
        if (this.socketTV.readyState === 3) { //CLOSED
            this.resetWebSocket();
        }

        const interval = setInterval(() => {
            if (this.socketTV.readyState === 1 &&  this.sessionRegistered) { // OPEN
                this._getTicker(tickerName);
                clearInterval(interval);
            } else if (!runs) {
                console.log("WebSocket connection is closed.");
                clearInterval(interval);
            }
        }, each);
    }

    getHistoryTicker(tickerName = this.symbol) {
        this.symbolResolved = false;
        const interval = setInterval(() => {
            if (this.sessionRegistered) {
                clearInterval(interval);
                this.chartSession = this.generateChartSession();
                this.socketTV.send(
                    this.createMessage("chart_create_session", [ this.chartSession, ""])
                );
                this.socketTV.send(
                    this.createMessage("resolve_symbol", [
                        this.chartSession,
                        "symbol_" + (this.symbolNumber).toString(),
                        '={"symbol":"' + tickerName + '","adjustment":"splits"}'
                    ])
                );
            }
        }, 200);
    }


    firstLoadHistoryData() {
        this.socketTV.send(
            this.createMessage("create_series", [
                this.chartSession,
                "s1",
                "s1",
                "symbol_" + (this.symbolNumber++).toString(),
                this.resolutionLocal.toString(),
                5000
            ])
        );
    }

    getMoreData() {
        const interval = setInterval(() => {
            if (this.symbolResolved && this.seriesCompleted) {
                this.seriesCompleted = false;
                clearInterval(interval);
                this.socketTV.send(
                    this.createMessage("request_more_data", [
                        this.chartSession,
                        "s1",
                        2000
                    ])
                );
            }
        }, 200);
    }

// IO functions
    parseMessages(str) {
        const packets = [];
        str.split(/~m~\d+~m~/).filter(x => x).forEach(function (packet) {
            packet = packet.split('').reverse().join('');
            if (packet.indexOf('}') !== -1) {
                packet = packet.substr(packet.indexOf('}'));
            }
            packet = packet.split('').reverse().join('');
            if (packet.substr(0, 3) !== "~h~") {
                packets.push(JSON.parse(packet));
            } else {
                packets.push({"~protocol~keepalive~": packet.substr(3)});
            }
        });
        return packets;
    }

    prependHeader(str) {
        return "~m~" + str.length + "~m~" + str;
    }

    createMessage(func, paramList) {
        return this.prependHeader(this.constructMessage(func, paramList));
    }

    constructMessage(func, paramList) {
        return JSON.stringify({
            m: func,
            p: paramList
        });
    }
}
