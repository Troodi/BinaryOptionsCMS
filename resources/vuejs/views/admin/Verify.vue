<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div class="row">
        <div class="col-md-12">
          <section class="card">
            <div class="card-header">
              <h4 class="card-title">Заявки на верификацию</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <div class="table-responsive">
                    <table class="table" id="verify">
                      <thead>
                      <tr>
                        <th>Пользователь</th>
                        <th>Документ</th>
                        <th>Действие</th>
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
        "url": "/locales/Russian.json"
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
            return '<a data-url="/admin/user/' + row.id + '" href="/admin/user/' + row.user.id + '" class="router-push w-100"><button type="button" class="btn btn-outline-primary btn-sm w-100">Проверить</button></a>';
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