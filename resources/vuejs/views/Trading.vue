<template>
    <section id="trading" class="card">
        <div class="card-content">
            <div class="card-body p-0">
                <div class="card-text">
                    <TradingChartComponent></TradingChartComponent>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import TradingChartComponent from "../components/TradingChartComponent";
    export default {
        name: "Trading",
        components : {
            TradingChartComponent
        }
    }
</script>

<style scoped>

</style>