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
                                                <th>Информация</th>
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
</template>

<script>
    require('../../../vendors/js/tables/datatable/datatables.min.js');
    require('../../../vendors/js/tables/datatable/dataTables.bootstrap4.min.js');
    import dateformat from 'dateformat';

    export default {
        name: "TradeHistory",
        mounted() {
            let self = this;
            axios.get('/data/symbols')
                .then(function (response) {
                    self.symbols = response.data;
                    $('#history').DataTable({
                        "iDisplayLength": 10,
                        "processing": true,
                        "serverSide": true,
                        "order": [[6, "desc"]],
                        "ajax": {
                            url: "/trading/history",
                            type: "POST"
                        },
                        "language": {
                            "url": "/locales/Russian.json"
                        },
                        columns: [
                            {
                                data: 'amount',
                                name: 'amount',
                                render: function(data, type) {
                                    return parseFloat(data).toFixed(2) + ' $';
                                }
                            },
                            { data: 'amount', name: 'amount' },
                            {
                                data: 'profit',
                                name: 'profit',
                                orderable: false,
                                searchable: false,
                                render: function(data, type) {
                                    let classname = 'success';
                                    if (type === 'display') {
                                        if(data > 0){
                                            classname = 'success';
                                        } else {
                                            classname = 'danger';
                                        }

                                    }
                                    return '<div class="badge badge-' + classname + '">' + parseFloat(data).toFixed(2) + ' $</div>';
                                }
                            },
                            {
                                data: 'symbol_id',
                                name: 'symbol_id',
                                orderable: false,
                                searchable: false,
                                render: function(data, type) {
                                    let symbol = '';
                                    if (type === 'display') {
                                        symbol = self.symbols.find(x => x.id === data).symbol;
                                    }
                                    return '<div class="badge badge-primary">' + symbol + '</div>';
                                }
                            },
                            {
                                data: 'percent',
                                name: 'percent',
                                render: function(data, type) {
                                    return parseFloat(data).toFixed(2) + ' %';
                                }
                            },
                            {
                                data: 'close_at',
                                name: 'close_at',
                                render: function(data, type, row) {
                                    let date = new Date();
                                    if (type === 'display') {
                                        date = new Date(new Date(row.close_at).getTime() - new Date(row.open_at).getTime());
                                        date.setHours(date.getHours() + new Date().getTimezoneOffset() / 60);
                                        console.log(new Date(row.close_at).getTime() - new Date(row.open_at).getTime())
                                    }
                                    return dateformat(date, 'HH:MM:ss');
                                }
                            },
                            {
                                data: 'created_at',
                                name: 'created_at',
                                render: function(data, type) {
                                    let date = new Date();
                                    if (type === 'display') {
                                        date = new Date(data);
                                    }
                                    return dateformat(date, 'HH:MM:ss dd-mm-yyyy');
                                }
                            },
                        ]
                    });
                });
            $('#demo-history').DataTable({
                "language": {
                    "url": "/locales/Russian.json"
                }
            });
        },
        data: function () {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>