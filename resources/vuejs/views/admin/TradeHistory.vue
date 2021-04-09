<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div class="row">
        <div class="col-md-12">
          <section class="card">
            <div class="card-header">
              <h4 class="card-title">{{ $i18n.t('admin_trade_title') }}</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <div class="table-responsive">
                    <table class="table" id="real-history">
                      <thead>
                      <tr>
                        <th>{{ $i18n.t('admin_trade_user') }}</th>
                        <th>{{ $i18n.t('admin_trade_amount') }}</th>
                        <th>{{ $i18n.t('admin_trade_info') }}</th>
                        <th>{{ $i18n.t('admin_trade_profit') }}</th>
                        <th>{{ $i18n.t('admin_trade_pair') }}</th>
                        <th>{{ $i18n.t('admin_trade_percent') }}</th>
                        <th>{{ $i18n.t('admin_trade_expiration') }}</th>
                        <th>{{ $i18n.t('admin_trade_date') }}</th>
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
              <h4 class="card-title">{{ $i18n.t('admin_trade_title_demo') }}</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <div class="table-responsive">
                    <table class="table" id="historyDemo">
                      <thead>
                      <tr>
                        <th>{{ $i18n.t('admin_trade_user') }}</th>
                        <th>{{ $i18n.t('admin_trade_amount') }}</th>
                        <th>{{ $i18n.t('admin_trade_info') }}</th>
                        <th>{{ $i18n.t('admin_trade_profit') }}</th>
                        <th>{{ $i18n.t('admin_trade_pair') }}</th>
                        <th>{{ $i18n.t('admin_trade_percent') }}</th>
                        <th>{{ $i18n.t('admin_trade_expiration') }}</th>
                        <th>{{ $i18n.t('admin_trade_date') }}</th>
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
          if(self.userId) {
            self.fillDT('#real-history', "/admin/data/history", self.userId);
            self.fillDT('#historyDemo', "/admin/data/history/demo", self.userId);
          } else {
            self.fillDT('#real-history', "/admin/data/history", 0);
            self.fillDT('#historyDemo', "/admin/data/history/demo", 0);
          }
        });
  },
  data: function () {
    return {

    }
  },
  computed: {
    userId: function (){
      return this.$route.params.id;
    }
  },
  methods: {
    fillDT: function (element, url, user_id){
      let self = this;
      $(element).DataTable({
        "iDisplayLength": 10,
        "processing": true,
        "serverSide": true,
        "order": [[7, "desc"]],
        "drawCallback": function(settings) {
          $('[data-toggle="popover"]').popover({ html : true });
          $('.router-push').on('click', function (){
            let url = $(this).attr('data-url');
            self.$router.push({ path: url });
            return false;
          });
        },
        "ajax": {
          url: url,
          data: {
            id: user_id
          },
          type: "POST"
        },
        "language": {
          "url": "/locales/"+ (getCookie('currentLanguage') ? getCookie('currentLanguage') : 'en') +".json"
        },
        columns: [
          {
            data: 'user_id',
            name: 'user_id',
            render: function(data, type, row) {
              let email ='';
              if (type === 'display') {
                email = row.email;
              }
              return '<a class="router-push" data-url="/admin/user/history/' + row.user_id + '" href="/admin/user/history/' + row.user_id + '">' + email + ' <i class="bx bx-link-external" style="font-size: 12px;"></i></a>';
            }
          },
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
              let path = 'выше';
              let classname = 'success';
              if(row.type === 0){
                path = 'ниже';
                classname = 'danger';
              }
              return '<div class="badge badge-secondary cursor-pointer" data-trigger="hover" data-toggle="popover" data-placement="top" data-container="body" data-original-title="' +
                  ''+self.$i18n.t('admin_trade_additional_info')+'" data-content="' +
                  ''+self.$i18n.t('admin_trade_open_price')+': ' + row.open_price + '<br>' +
                  ''+self.$i18n.t('admin_trade_close_price')+': '+ row.close_price+'<br>' +
                  ''+self.$i18n.t('admin_trade_path')+': <div class=\'badge badge-'+classname+'\'>'+path+'</div><br>' +
                  ''+self.$i18n.t('admin_trade_open_time')+': '+dateformat(row.open_at, 'HH:MM:ss dd-mm-yyyy')+'<br>' +
                  ''+self.$i18n.t('admin_trade_close_time')+': '+dateformat(row.close_at, 'HH:MM:ss dd-mm-yyyy')+'' +
                  '">'+self.$i18n.t('admin_trade_additional')+'</div>'
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
                symbol = self.symbols.find(x => x.id === data).symbol;
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