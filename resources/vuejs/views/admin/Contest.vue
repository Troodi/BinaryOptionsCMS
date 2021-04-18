<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div class="row">
        <div class="col-md-12">
          <section class="card">
            <div class="card-header">
              <h4 class="card-title">Список всех конкурсов</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <div class="table-responsive">
                    <table class="table" id="contestGlobalStatistics">
                      <thead>
                      <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Участников</th>
                        <th>Взнос</th>
                        <th>Прибыль</th>
                        <th>Тип</th>
                        <th>Действие</th>
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
import dateformat from "dateformat";

export default {
  name: "Contest",
  computed: {
    contestId: function (){
      return this.$route.params.contest_id == null ? null : this.$route.params.contest_id;
    },
  },
  mounted(){
    this.createTable();
  },
  data() {
    return {

    }
  },
  methods: {
    createTable(){
      let self = this;
      $('#contestGlobalStatistics').DataTable({
        "iDisplayLength": 10,
        "processing": true,
        "serverSide": true,
        "order": [[0, "desc"]],
        "ajax": {
          url: '/admin/data/contests',
          type: "POST"
        },
        "drawCallback": function() {
          $('.router-push').on('click', function (){
            let url = $(this).attr('data-url');
            self.$router.push({ path: url });
            return false;
          });
        },
        "language": {
          "url": "/locales/"+ (getCookie('currentLanguage') ? getCookie('currentLanguage') : 'en') +".json"
        },
        columns: [
          {
            data: 'id',
            name: 'id',
            render: function(data, type, row) {
              let text ='';
              if (type === 'display') {
                text = data;
              }
              return '#' + text;
            }
          },
          {
            data: 'title',
            name: 'title',
            render: function(data, type, row) {
              let text ='';
              if (type === 'display') {
                  text = getCookie('currentLanguage') in data ? data[getCookie('currentLanguage')] : 'Нет названия';
              }
              return '<a class="router-push" data-url="/admin/contest/edit/' + row.id + '" href="/admin/contest/edit/' + row.id + '">' + text + ' <i class="bx bx-link-external" style="font-size: 12px;"></i></a>';
            }
          },
          {
            data: 'registered_users',
            name: 'registered_users',
          },
          {
            data: 'initial_cost',
            name: 'initial_cost',
            render: function(data, type, row) {
              let text ='';
              if (type === 'display') {
                text = data;
              }
              return '$ ' + text;
            }
          },
          {
            data: 'earned',
            name: 'earned',
            render: function(data, type, row) {
              let text ='';
              if (type === 'display') {
                text = data;
              }
              return '$ ' + text;
            }
          },
          {
            data: 'type',
            name: 'type',
            render: function(data, type, row) {
              let text ='';
              if (type === 'display') {
                switch (data) {
                  case 1:
                    text = 'Максимальный баланс';
                    break;
                  case 2:
                    text = 'Максимальный прирост';
                    break;
                  case 3:
                    text = 'Максимальный оборот';
                    break;
                }
              }
              return text;
            }
          },
          {
            data: 'type',
            name: 'type',
            render: function(data, type, row) {
              let text ='';
              if (type === 'display') {
                text = '<div class="router-push badge badge-info mr-1 cursor-pointer" data-url="/admin/contest/statistics/' + row.id + '">Статистика</div>' +
                       '<div class="router-push badge badge-success mr-1 cursor-pointer" data-url="/admin/contest/edit/' + row.id + '">Редактировать</div>';
              }
              return text;
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