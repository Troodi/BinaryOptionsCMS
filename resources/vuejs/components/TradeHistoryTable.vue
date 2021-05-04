<template>
  <div class="table-responsive">
    <table class="table" :id="element" style="width: 100%;">
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
</template>

<script>
import {getCookie} from "../js/functions";

require('../../vendors/js/tables/datatable/datatables.min.js');
require('../../vendors/js/tables/datatable/dataTables.bootstrap4.min.js');
require('../../js/core/libraries/bootstrap.min.js');
import dateformat from 'dateformat';

export default {
  name: "TradeHistoryTable",
  props: ['load_url', 'element_id', 'show_it'],
  data: function (){
    return {
      url: this.load_url,
      element: this.element_id,
    }
  },
  mounted() {
    let self = this;
    axios.get('/data/symbols')
      .then(function (response) {
        self.symbols = response.data;
        $('#'+self.element).DataTable({
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
          "ajax": { url: self.url, type: "POST" },
          "language": {
            "url": "/locales/"+ (getCookie('currentLanguage') ? getCookie('currentLanguage') : 'en') +".json"
          },
          columns: [
            {
              data: 'user_id',
              name: 'user_id',
              visible: self.show_it,
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
                let path = self.$i18n.t('trade_up');
                let classname = 'success';
                if(row.type === 0){
                  path = self.$i18n.t('trade_down');
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
      });
  }
}
</script>

<style scoped>

</style>