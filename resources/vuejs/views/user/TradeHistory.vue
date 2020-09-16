<template>
    <div class="content-wrapper">
        <div class="content-body">
            <div class="row">
                <div class="col-md-12">
                    <section class="card">
                        <div class="card-header">
                            <h4 class="card-title">История торговли</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <div class="table-responsive">
                                        <table class="table" id="history">
                                            <thead>
                                            <tr>
                                                <th>Сумма</th>
                                                <th>Направление</th>
                                                <th>Прибыль</th>
                                                <th>Инструмент</th>
                                                <th>Процент</th>
                                                <th>Экспирация</th>
                                                <th>Дата</th>
                                            </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <section class="card">
                        <div class="card-header">
                            <h4 class="card-title">История демо торговли</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <div class="table-responsive">
                                        <table class="table" id="demo-history">
                                            <thead>
                                            <tr>
                                                <th>Сумма</th>
                                                <th>Направление</th>
                                                <th>Прибыль</th>
                                                <th>Инструмент</th>
                                                <th>Процент</th>
                                                <th>Экспирация</th>
                                                <th>Дата</th>
                                            </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    require('../../../vendors/js/tables/datatable/datatables.min.js');
    require('../../../vendors/js/tables/datatable/dataTables.bootstrap4.min.js');

    export default {
        name: "TradeHistory",
        mounted() {
            $('#history').DataTable({
                "language": {
                    "url": "/locales/Russian.json"
                }
            });
            $('#demo-history').DataTable({
                "language": {
                    "url": "/locales/Russian.json"
                }
            });
        }
    }
</script>

<style scoped>

</style>