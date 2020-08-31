<template>
    <div class="content-fluld" :style="{ 'margin-top': '4.6rem' }">
        <div class="content-body">
            <div class="row">
                <div class="col-md-10 pr-0 pb-0">
                    <section class="card mb-0" :style="{ 'height': 'calc(100vh - 69px)' }">
                        <div class="card-content">
                            <div class="card-body p-0">
                                <div class="card-text">
                                    <TradingChartComponent></TradingChartComponent>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="col-md-2 p-0">
                    <section class="card mb-0" :style="{ 'height': 'calc(100vh - 69px)' }">
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <small class="text-muted"><i>Время экспирации</i></small>
                                    <fieldset class="form-group position-relative" :style="{ 'margin-bottom': '0.3rem !important'}">
                                        <input type="text" class="form-control form-control-lg" v-model="expiration" placeholder="Amount">
                                        <div class="form-control-position" :style="{ 'top' : '14px'}">
                                            <i class="bx bx-timer"></i>
                                        </div>
                                    </fieldset>

                                    <small class="text-muted"><i>Сумма сделки</i></small>
                                    <fieldset :style="{ 'margin-bottom': '0.3rem !important'}" class="form-group position-relative">
                                        <input type="text" v-model="amount" class="form-control form-control-lg">
                                        <div class="form-control-position" :style="{ 'top' : '14px'}">
                                            <i class="bx bx-dollar"></i>
                                        </div>
                                    </fieldset>

                                    <small class="text-muted"><i>Потенциальная прибыль</i></small>
                                    <fieldset class="form-group position-relative" v-show="number_percent === null">
                                        <input type="text" disabled class="form-control form-control-lg" placeholder="Загрузка..." aria-describedby="basic-addon2">
                                        <div class="form-control-position" :style="{ 'top' : '14px'}">
                                            <span class="spinner-border spinner-grow-sm" role="status" aria-hidden="true"></span>
                                        </div>
                                    </fieldset>

                                    <fieldset v-show="number_percent !== null" class="form-group position-relative">
                                        <input type="text" class="form-control form-control-lg" :value="amount * number_percent / 100" disabled>
                                        <div class="form-control-position" :style="{ 'top' : '14px'}">
                                            <i class="bx bx-dollar"></i>
                                        </div>
                                    </fieldset>

                                    <button v-show="percent === ''" class="btn btn-success mb-1 w-100 btn-lg" type="button" disabled="">
                                        <span class="spinner-border spinner-grow-sm" role="status" aria-hidden="true"></span>
                                        Загрузка...
                                    </button>

                                    <button v-show="percent !== ''" type="button" @click="buy" class="btn btn-success glow w-100 btn-lg">
                                        <i class="bx bx-trending-up"></i> <span class="align-middle ml-25" v-text="percent"></span>
                                    </button>

                                    <button v-show="percent === ''" class="btn btn-danger mb-1 w-100 btn-lg" type="button" disabled="">
                                        <span class="spinner-border spinner-grow-sm" role="status" aria-hidden="true"></span>
                                        Загрузка...
                                    </button>

                                    <button v-show="percent !== ''" @click="sell" type="button" class="btn btn-danger glow w-100 mt-1 btn-lg">
                                        <i class="bx bx-trending-down"></i><span class="align-middle ml-25" v-text="percent"></span>
                                    </button>
                                    <hr class="mt-2">
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TradingChartComponent from "./../../components/TradingChartComponent";

    export default {
        name: "Trading",
        components : {
            TradingChartComponent
        },
        mounted() {
            setInterval(() => {
                if(!window.dataLoaded){
                    this.percent = '';
                    this.symbol = null;
                    this.number_percent = null;
                }
                if(typeof window.symbolInfo !== 'undefined' && window.symbolInfo.full_name !== this.symbol && window.dataLoaded) {
                    this.symbol = window.symbolInfo.id;
                    this.percent = '+ ' + window.symbolInfo.description;
                    this.number_percent = window.symbolInfo.percent;
                }
            });
        },
        methods: {
            buy: function () {
                axios.post('/binary/buy', {
                    symbol: this.symbol,
                    expiration: this.expiration,
                    amount: this.amount,
                })
                .then(function (response) {
                    console.log(response);
                    let order = window.tvWidget.chart().createOrderLine()
                        .setText("Выше")
                        .setLineLength(1)
                        .setLineStyle(0)
                        .setQuantity(response.data.quantity + '$')
                        .setLineColor('#23bd70')
                        .setQuantityBackgroundColor('#23bd70')
                        .setQuantityBorderColor('#23bd70')
                        .setBodyBorderColor('#23bd70')
                        .setBodyTextColor('#23bd70')
                    order.setPrice(response.data.price);
                    toastr.info('Открыта сделка по цене ' + response.data.price, 'Сделка открыта', { positionClass: 'toast-bottom-left', containerId: 'toast-bottom-left' })
                })
            },
            sell: function(){
                axios.post('/binary/buy', {
                    symbol: this.symbol,
                    expiration: this.expiration,
                    amount: this.amount,
                })
                    .then(function (response) {
                        console.log(response);
                        let order = window.tvWidget.chart().createOrderLine()
                            .setText("Ниже")
                            .setLineLength(1)
                            .setLineStyle(0)
                            .setQuantity(response.data.quantity + '$')
                            .setLineColor('#FF5B5C')
                            .setQuantityBackgroundColor('#FF5B5C')
                            .setQuantityBorderColor('#FF5B5C')
                            .setBodyBorderColor('#FF5B5C')
                            .setBodyTextColor('#FF5B5C')
                        order.setPrice(response.data.price);
                        toastr.info('Открыта сделка по цене ' + response.data.price, 'Сделка открыта', { positionClass: 'toast-bottom-left', containerId: 'toast-bottom-left' })
                    })
            }
        },
        data() {
            return {
                percent: '',
                symbol: null,
                number_percent: null,
                amount: 10,
                expiration: '00:00:30',
            }
        }
    }
</script>

<style scoped>

</style>