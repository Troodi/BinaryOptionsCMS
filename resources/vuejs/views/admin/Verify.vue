<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div class="row">
        <div class="col-md-12">
          <section class="card">
            <div class="card-header">
              <h4 class="card-title">{{ $i18n.t('admin_verify_title') }}</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <div class="table-responsive">
                    <table class="table" id="verify">
                      <thead>
                      <tr>
                        <th>{{ $i18n.t('admin_verify_user') }}</th>
                        <th>{{ $i18n.t('admin_verify_document') }}</th>
                        <th>{{ $i18n.t('admin_verify_action') }}</th>
                        <th>{{ $i18n.t('admin_verify_date') }}</th>
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
  name: "Verify",
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
      //"order": [[0, "desc"]],
      "ajax": {
        url: "/admin/data/verify",
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
            let text = '';
            if (type === 'display') {
              text = row.user.email;
            }
            return text;
          }
        },
        {
          data: 'page',
          name: 'page',
          render: function(data, type, row) {
            let text = '';
            if (type === 'display') {
              text = data;
            }
            return 'Страница №' + text;
          }
        },
        {
          data: 'page',
          name: 'page',
          render: function(data, type, row) {
            return '<a data-url="/admin/user/profile/' + row.user.id + '" href="/admin/user/profile/' + row.user.id + '" class="router-push w-100"><button type="button" class="btn btn-outline-primary btn-sm w-100">'+self.$i18n.t('admin_verify_check')+'</button></a>';
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