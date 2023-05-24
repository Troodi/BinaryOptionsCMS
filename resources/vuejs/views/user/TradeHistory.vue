<template>
    <div class="content-wrapper">
        <div class="content-body">
            <div class="row">
                <div class="col-md-12">
                    <section class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ $i18n.t('trade_history_title') }}</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <div class="table-responsive">
                                        <table class="table" id="real-history" style="width:100%">
                                            <thead>
                                            <tr>
                                                <th>{{ $i18n.t('trade_history_amount') }}</th>
                                                <th>{{ $i18n.t('trade_history_info') }}</th>
                                                <th>{{ $i18n.t('trade_history_profit') }}</th>
                                                <th>{{ $i18n.t('trade_history_instrument') }}</th>
                                                <th>{{ $i18n.t('trade_history_percent') }}</th>
                                                <th>{{ $i18n.t('trade_history_expiration') }}</th>
                                                <th>{{ $i18n.t('trade_history_date') }}</th>
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
                            <h4 class="card-title">{{ $i18n.t('trade_history_demo_title') }}</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <div class="table-responsive">
                                        <table class="table" id="demo-history" style="width:100%">
                                            <thead>
                                            <tr>
                                              <th>{{ $i18n.t('trade_history_amount') }}</th>
                                              <th>{{ $i18n.t('trade_history_info') }}</th>
                                              <th>{{ $i18n.t('trade_history_profit') }}</th>
                                              <th>{{ $i18n.t('trade_history_instrument') }}</th>
                                              <th>{{ $i18n.t('trade_history_percent') }}</th>
                                              <th>{{ $i18n.t('trade_history_expiration') }}</th>
                                              <th>{{ $i18n.t('trade_history_date') }}</th>
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
    import {getCookie} from "../../js/functions";

    require('../../../vendors/js/tables/datatable/datatables.min.js');
    require('../../../vendors/js/tables/datatable/dataTables.bootstrap4.min.js');
    require('../../../js/core/libraries/bootstrap.min.js');
    import dateformat from 'dateformat';

    export default {
        name: "TradeHistory",
        mounted() {
            let self = this;
            axios.get('/data/symbols')
                .then(function (response) {
                  self.symbols = response.data;
                  self.fillDT('#real-history', self.isAdmin ? "/trading/history/"+self.userId : "/trading/history");
                  self.fillDT('#demo-history', self.isAdmin ? "/trading/demo/history/"+self.userId : "/trading/demo/history");
                });
        },
        data: function () {
            return {

            }
        },
        computed: {
          isAdmin: function (){
            return this.$route.meta.isAdmin;
          },
          userId: function (){
            return this.$route.params.id;
          },
        },
        methods: {
          fillDT: function (element, url){
            let self = this;
            $(element).DataTable({
              "iDisplayLength": 10,
              "processing": true,
              "serverSide": true,
              "order": [[6, "desc"]],
              "drawCallback": function(settings) {
                $('[data-toggle="popover"]').popover({ html : true });
              },
              "ajax": {
                url: url,
                type: "POST"
              },
              "language": {
                "url": "/locales/"+ (getCookie('currentLanguage') ? getCookie('currentLanguage') : 'en') +".json"
              },
              columns: [
                {
                  orderable: false,
                  searchable: false,
                  data: 'amount',
                  name: 'amount',
                  render: function(data, type) {
                    return parseFloat(data).toFixed(2) + ' $';
                  }
                },
                {
                  orderable: false,
                  searchable: false,
                  data: 'amount',
                  name: 'amount',
                  render: function(data, type, row) {
                    let path = self.$i18n.t('trade_history_higher');
                    let classname = 'success';
                    if(row.type === 0){
                      path = self.$i18n.t('trade_history_lower');
                      classname = 'danger';
                    }
                    return '<div class="badge badge-secondary cursor-pointer" data-trigger="hover" data-toggle="popover" data-placement="top" data-container="body" data-original-title="' +
                        self.$i18n.t('trade_history_additional') + '" data-content="' +
                        self.$i18n.t('trade_history_open_price') + ': ' + row.open_price + '<br>' +
                        self.$i18n.t('trade_history_close_price') + ': '+ row.close_price+'<br>' +
                        self.$i18n.t('trade_history_path') + ': <div class=\'badge badge-'+classname+'\'>'+path+'</div><br>' +
                        self.$i18n.t('trade_history_open_time') + ': '+dateformat(row.open_at, 'HH:MM:ss dd-mm-yyyy')+'<br>' +
                        self.$i18n.t('trade_history_close_time') + ': '+dateformat(row.close_at, 'HH:MM:ss dd-mm-yyyy')+'' +
                        '">' + self.$i18n.t('trade_history_add') + '</div>'
                  }
                },
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
                      symbol = self.symbols.find(x => (x.broker + ':' + x.symbol.replace('/', '')) === data).symbol;
                    }
                    return '<div class="badge badge-primary">' + symbol + '</div>';
                  }
                },
                {
                  orderable: false,
                  searchable: false,
                  data: 'percent',
                  name: 'percent',
                  render: function(data, type) {
                    return parseFloat(data).toFixed(2) + ' %';
                  }
                },
                {
                  orderable: false,
                  searchable: false,
                  data: 'close_at',
                  name: 'close_at',
                  render: function(data, type, row) {
                    let date = new Date();
                    if (type === 'display') {
                      date = new Date(new Date(row.close_at).getTime() - new Date(row.open_at).getTime());
                      date.setHours(date.getHours() + new Date().getTimezoneOffset() / 60);
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
                    return dateformat(date, 'dd-mm-yyyy');
                  }
                },
              ]
            });
          }
        }
    }
</script>

<style scoped>

</style>
