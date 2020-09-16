<template>
    <div class="content-body">
        <div class="row">
            <div class="col-md-12">
                <section class="card">
                    <div class="card-header">
                        <h4 class="card-title">История пополнений</h4>
                    </div>
                    <div class="card-content">
                        <div class="card-body">
                            <div class="card-text">
                                <div class="table-responsive">
                                    <table class="table" id="history">
                                        <thead>
                                        <tr>
                                            <th>Сумма платежа</th>
                                            <th>Платежная система</th>
                                            <th>Статус</th>
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
</template>

<script>
    require('../../../vendors/js/tables/datatable/datatables.min.js');
    require('../../../vendors/js/tables/datatable/dataTables.bootstrap4.min.js');

    export default {
        name: "DepositHistory",
        mounted() {
            $('#history').DataTable({
                "language": {
                    "url": "/locales/Russian.json"
                }
            });
        }
    }
</script>

<style scoped>

</style>