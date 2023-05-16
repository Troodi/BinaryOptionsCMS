<template>
  <div class="table-responsive">
    <table class="table" :id="tableId" style="width:100%">
      <thead>
      <tr>
        <th>ID</th>
        <th>{{ $i18n.t('admin_stat_email') }}</th>
        <th>{{ $i18n.t('admin_stat_geo') }}</th>
        <th>{{ $i18n.t('admin_stat_status') }}</th>
        <th>{{ $i18n.t('admin_stat_balance_usd') }}</th>
        <th>{{ $i18n.t('admin_stat_latest_active') }}</th>
        <th>{{ $i18n.t('admin_stat_registered') }}</th>
      </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import {getCookie} from "../js/functions";
import dateformat from "dateformat";

export default {
  name: "UsersTable",
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
          data: 'id',
          name: 'id'
        },
        {
          data: 'email',
          name: 'email',
          render: function(data, type, row) {
            let email ='';
            if (type === 'display') {
              email = data;
            }
            return '<a class="router-push" data-url="/admin/user/profile/' + row.id + '" href="/admin/user/profile/' + row.id + '">' + email + ' <i class="bx bx-link-external" style="font-size: 12px;"></i></a>';
          }
        },
        {
          data: 'geo',
          name: 'geo',
          render: function(data, type, row) {
            let geo ='';
            let geo_code = '';
            if (type === 'display') {
              geo = data;
              geo_code = row.geo_code;
            }
            return '<i data-trigger="hover" data-toggle="popover" data-placement="top" data-container="body" data-original-title="'+self.$i18n.t('admin_stat_country')+'" data-content="' + geo + '" class="flag-icon flag-icon-' + geo_code + '"></i>';
          }
        },
        {
          data: 'status',
          searchable: false,
          orderable: false,
          name: 'users.status',
          render: function (data) {
            if(data == 0){
              return '<span class="badge badge badge-danger text-white">'+self.$i18n.t('admin_stat_offline')+'</span>' } else { return '<span class="badge badge badge-success text-white">'+self.$i18n.t('admin_stat_online')+'</span>'; }
          }
        },
        {
          data: 'balance',
          name: 'balance'
        },
        {
          data: 'updated_at',
          name: 'updated_at',
          render: function(data, type) {
            let date = new Date();
            if (type === 'display') {
              date = new Date(data);
            }
            return dateformat(date, 'HH:MM dd-mm-yyyy');
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
            return dateformat(date, 'HH:MM dd-mm-yyyy');
          }
        },
      ]
    });
  }
}
</script>

<style scoped>

</style>
