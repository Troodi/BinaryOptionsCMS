<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div class="row">
        <div class="col-md-12">
          <section class="card">
            <div class="card-header">
              <h4 class="card-title">{{ $i18n.t('admin_deposit_title') }}</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <div class="table-responsive">
                    <table class="table" id="verify" style="width:100%">
                      <thead>
                      <tr>
                        <th>{{ $i18n.t('admin_deposit_user') }}</th>
                        <th>{{ $i18n.t('admin_deposit_amount') }}</th>
                        <th>{{ $i18n.t('admin_deposit_status') }}</th>
                        <th>{{ $i18n.t('admin_deposit_date') }}</th>
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
import dateformat from "dateformat";
import {getCookie} from "../../js/functions";

export default {
  name: "Deposit",
  mounted: function (){
    let self = this;
    $('#verify').DataTable({
      "iDisplayLength": 25,
      "processing": true,
      "serverSide": true,
      "drawCallback": function() {
        $('.router-push').on('click', function (){
          let url = $(this).attr('data-url');
          self.$router.push({ path: url });
          return false;
        });
      },
      "order": [[3, "desc"]],
      "ajax": {
        url: "/admin/data/deposits",
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
              email = row.user.email;
            }
            return '<a class="router-push" data-url="/admin/user/deposit/' + row.user_id + '" href="/admin/user/deposit/' + row.user_id + '">' + email + ' <i class="bx bx-link-external" style="font-size: 12px;"></i></a>';
          }
        },
        {
          data: 'amount',
          name: 'amount',
          render: function(data, type, row) {
            let amount = '';
            if (type === 'display') {
              amount = data;
            }
            return data + ' $';
          }
        },
        {
          data: 'status',
          name: 'status',
          render: function(data, type, row) {
            let text = '';
            if (type === 'display') {
              if(data == 0){
                text = '<span class="badge badge-primary text-white">'+self.$i18n.t('admin_deposit_waiting')+'</span>';
              } else if (data == 1){
                text = '<span class="badge badge-success text-white">'+self.$i18n.t('admin_deposit_accepted')+'</span>';
              } else if(data == 2){
                text = '<span class="badge badge-danger text-white">'+self.$i18n.t('admin_deposit_decline')+'</span>';
              }
            }
            return text;
          }
        },
        {
          data: 'created_at',
          name: 'created_at',
          render: function(data, type, row) {
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
</script>

<style scoped>

</style>
