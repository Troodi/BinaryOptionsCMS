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
                                        <input type="text" class="form-control form-control-lg" value="00:00:30" placeholder="Amount">
                                        <div class="form-control-position" :style="{ 'top' : '14px'}">
                                            <i class="bx bx-timer"></i>
                                        </div>
                                    </fieldset>

                                    <small class="text-muted"><i>Сумма сделки</i></small>
                                    <fieldset class="form-group position-relative">
                                        <input type="text" class="form-control form-control-lg" :value="10.00" placeholder="Amount">
                                        <div class="form-control-position" :style="{ 'top' : '14px'}">
                                            <i class="bx bx-dollar"></i>
                                        </div>
                                    </fieldset>

                                    <button type="button" class="btn btn-success glow w-100 btn-lg">
                                        <i class="bx bx-trending-up"></i>
                                        <span class="align-middle ml-25">+ 75%</span>
                                    </button>

                                    <button type="button" class="btn btn-danger glow w-100 mt-1 btn-lg">
                                        <i class="bx bx-trending-down"></i>
                                        <span class="align-middle ml-25">+ 75%</span>
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
        }
    }
</script>

<style scoped>

</style>