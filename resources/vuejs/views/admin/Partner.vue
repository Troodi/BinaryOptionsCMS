<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div class="row">
        <div class="col-md-12">
          <section class="card">
            <div class="card-header">
              <h4 class="card-title">Заявки на партнерство</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <div class="table-responsive">
                    <table class="table" id="verify">
                      <thead>
                      <tr>
                        <th>Пользователь</th>
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
  </div>
</template>

<script>
import dateformat from "dateformat";

export default {
  name: "Partner",
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
      "order": [[1, "asc"]],
      "ajax": {
        url: "/admin/data/partner",
        type: "POST"
      },
      "language": {
        "url": "/locales/Russian.json"
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
            return '<a class="router-push" data-url="/admin/user/partner/' + row.user_id + '" href="/admin/user/partner/' + row.user_id + '">' + email + ' <i class="bx bx-link-external" style="font-size: 12px;"></i></a>';
          }
        },
        {
          data: 'status',
          name: 'status',
          render: function(data, type, row) {
            let text = '';
            if (type === 'display') {
              if(data == 0){
                text = '<span class="badge badge-primary text-white">На рассмотрении</span>';
              } else if (data == 1){
                text = '<span class="badge badge-success text-white">Подтверждена</span>';
              } else if(data == 2){
                text = '<span class="badge badge-danger text-white">Отклонена</span>';
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