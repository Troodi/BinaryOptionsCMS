<template>
    <div class="row">
        <div class="col-md-10">
            <section class="card">
                <div class="card-content">
                    <div class="card-body p-0">
                        <div class="card-text">
                            <TradingChartComponent></TradingChartComponent>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div class="col-md-2">
            <section class="card">
                <div class="card-content">
                    <div class="card-body">
                        <div class="card-text">
                            sdf
                        </div>
                    </div>
                </div>
            </section>
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