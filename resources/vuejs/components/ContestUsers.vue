<template>
  <div class="table-responsive">
    <table class="table" :id="tableId">
      <thead>
      <tr>
        <th>{{ $i18n.t('admin_stat_email') }}</th>
        <th>Онлайн</th>
        <th>Начальный баланс</th>
        <th>Баланс</th>
        <th>Докупил на сумму</th>
        <th>Доход %</th>
        <th>Оборот</th>
        <th>Место</th>
      </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import { getCookie } from "../js/functions";

export default {
  name: "ContestUsers",
  props: ['table_id', 'url'],
  data: function () {
    return {
      tableId: this.table_id,
      urlUsers: this.url,
    }
  },
  mounted() {
    let self = this;
    $('#' + self.tableId).DataTable({
      "iDisplayLength": 10,
      "processing": true,
      "serverSide": true,
      "order": [[0, "desc"]],
      "drawCallback": function() {
        $('[data-toggle="popover"]').popover({ html : true });
        $('.router-push').on('click', function (){
          let url = $(this).attr('data-url');
          self.$router.push({ path: url });
          return false;
        });
      },
      "ajax": {
        url: self.urlUsers,
        type: "POST"
      },
      "language": {
        "url": "/locales/"+ (getCookie('currentLanguage') ? getCookie('currentLanguage') : 'en') +".json"
      },
      columns: [
        {
          data: 'user.email',
          name: 'user.email',
          render: function(data, type, row) {
            let email ='';
            if (type === 'display') {
              email = data;
            }
            return '<a class="router-push" data-url="/admin/user/profile/' + row.id + '" href="/admin/user/profile/' + row.id + '">' + email + ' <i class="bx bx-link-external" style="font-size: 12px;"></i></a>';
          }
        },
        {
          data: 'status',
          searchable: false,
          orderable: false,
          name: 'user.status',
          render: function (data) {
            if(data == 0){
              return '<span class="badge badge badge-danger text-white">'+self.$i18n.t('admin_stat_offline')+'</span>' } else { return '<span class="badge badge badge-success text-white">'+self.$i18n.t('admin_stat_online')+'</span>'; }
          }
        },
        {
          data: 'initial_balance',
          name: 'initial_balance',
          render: function(data, type, row) {
            let text ='';
            if (type === 'display') {
              text = data + ' $';
            }
            return text;
          }
        },
        {
          data: 'balance',
          name: 'balance',
          render: function(data, type, row) {
            let text ='';
            if (type === 'display') {
              text = data + ' $';
            }
            return text;
          }
        },
        {
          data: 'paid',
          name: 'paid',
          render: function(data, type, row) {
            let text ='';
            if (type === 'display') {
              text = data + ' $';
            }
            return text;
          }
        },
        {
          data: 'profit_percent',
          name: 'profit_percent',
          render: function(data, type, row) {
            let text ='';
            if (type === 'display') {
              text = data + ' %';
            }
            return text;
          }
        },
        {
          data: 'turnover',
          name: 'turnover',
          render: function(data, type, row) {
            let text ='';
            if (type === 'display') {
              text = data + ' $';
            }
            return text;
          }
        },
        {
          data: 'winner_place',
          name: 'winner_place'
        },
      ]
    });
  }
}
</script>

<style scoped>

</style>