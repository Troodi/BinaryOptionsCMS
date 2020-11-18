<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div class="row">
        <div class="col-md-3">
          <div class="card">
            <div class="card-body d-flex align-items-center justify-content-between" style="position: relative;">
              <div class="d-flex align-items-center">
                <div class="avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2">
                  <div class="avatar-content">
                    <i class="bx bx-user text-primary font-medium-2"></i>
                  </div>
                </div>
                <div class="total-amount">
                  <h5 class="mb-0" v-show="_.isEmpty(statistics)"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="margin-bottom: 3px;"></span></h5>
                  <h5 class="mb-0" v-if="!_.isEmpty(statistics)">{{ statistics.user_count }}</h5>
                  <small class="text-muted">Всего пользователей</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card">
            <div class="card-body d-flex align-items-center justify-content-between" style="position: relative;">
              <div class="d-flex align-items-center">
                <div class="avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2">
                  <div class="avatar-content">
                    <i class="bx bx-user text-primary font-medium-2"></i>
                  </div>
                </div>
                <div class="total-amount">
                  <h5 class="mb-0" v-show="_.isEmpty(statistics)"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="margin-bottom: 3px;"></span></h5>
                  <h5 class="mb-0" v-if="!_.isEmpty(statistics)">{{ statistics.banned_users }}</h5>
                  <small class="text-muted">Заблокировано пользователей</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card">
            <div class="card-body d-flex align-items-center justify-content-between" style="position: relative;">
              <div class="d-flex align-items-center">
                <div class="avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2">
                  <div class="avatar-content">
                    <i class="bx bx-user text-primary font-medium-2"></i>
                  </div>
                </div>
                <div class="total-amount">
                  <h5 class="mb-0" v-show="_.isEmpty(statistics)"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="margin-bottom: 3px;"></span></h5>
                  <h5 class="mb-0" v-if="!_.isEmpty(statistics)">{{ statistics.deposit_count }}</h5>
                  <small class="text-muted">Пополнений</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card">
            <div class="card-body d-flex align-items-center justify-content-between" style="position: relative;">
              <div class="d-flex align-items-center">
                <div class="avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2">
                  <div class="avatar-content">
                    <i class="bx bx-user text-primary font-medium-2"></i>
                  </div>
                </div>
                <div class="total-amount">
                  <h5 class="mb-0" v-show="_.isEmpty(statistics)"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="margin-bottom: 3px;"></span></h5>
                  <h5 class="mb-0" v-if="!_.isEmpty(statistics)">{{ statistics.withdrawal_count }}</h5>
                  <small class="text-muted">Выплат</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card">
            <div class="card-body d-flex align-items-center justify-content-between" style="position: relative;">
              <div class="d-flex align-items-center">
                <div class="avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2">
                  <div class="avatar-content">
                    <i class="bx bx-user text-primary font-medium-2"></i>
                  </div>
                </div>
                <div class="total-amount">
                  <h5 class="mb-0" v-show="_.isEmpty(statistics)"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="margin-bottom: 3px;"></span></h5>
                  <h5 class="mb-0" v-if="!_.isEmpty(statistics)">{{ statistics.referral_count }}</h5>
                  <small class="text-muted">Рефералов</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card">
            <div class="card-body d-flex align-items-center justify-content-between" style="position: relative;">
              <div class="d-flex align-items-center">
                <div class="avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2">
                  <div class="avatar-content">
                    <i class="bx bx-user text-primary font-medium-2"></i>
                  </div>
                </div>
                <div class="total-amount">
                  <h5 class="mb-0" v-show="_.isEmpty(statistics)"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="margin-bottom: 3px;"></span></h5>
                  <h5 class="mb-0" v-if="!_.isEmpty(statistics)">$ {{ statistics.profit }}</h5>
                  <small class="text-muted">Прибыль</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card">
            <div class="card-body d-flex align-items-center justify-content-between" style="position: relative;">
              <div class="d-flex align-items-center">
                <div class="avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2">
                  <div class="avatar-content">
                    <i class="bx bx-user text-primary font-medium-2"></i>
                  </div>
                </div>
                <div class="total-amount">
                  <h5 class="mb-0" v-show="_.isEmpty(statistics)"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="margin-bottom: 3px;"></span></h5>
                  <h5 class="mb-0" v-if="!_.isEmpty(statistics)">{{ statistics.deals }}</h5>
                  <small class="text-muted">Всего сделок</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card">
            <div class="card-body d-flex align-items-center justify-content-between" style="position: relative;">
              <div class="d-flex align-items-center">
                <div class="avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2">
                  <div class="avatar-content">
                    <i class="bx bx-user text-primary font-medium-2"></i>
                  </div>
                </div>
                <div class="total-amount">
                  <h5 class="mb-0" v-show="_.isEmpty(statistics)"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="margin-bottom: 3px;"></span></h5>
                  <h5 class="mb-0" v-if="!_.isEmpty(statistics)">$ {{ statistics.turnover }}</h5>
                  <small class="text-muted">Общий оборот</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card">
            <div class="card-body d-flex align-items-center justify-content-between" style="position: relative;">
              <div class="d-flex align-items-center">
                <div class="avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2">
                  <div class="avatar-content">
                    <i class="bx bx-user text-primary font-medium-2"></i>
                  </div>
                </div>
                <div class="total-amount">
                  <h5 class="mb-0" v-show="_.isEmpty(statistics)"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="margin-bottom: 3px;"></span></h5>
                  <h5 class="mb-0" v-if="!_.isEmpty(statistics)">$ {{ statistics.bonus }}</h5>
                  <small class="text-muted">Сумма бонусов</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card">
            <div class="card-body d-flex align-items-center justify-content-between" style="position: relative;">
              <div class="d-flex align-items-center">
                <div class="avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2">
                  <div class="avatar-content">
                    <i class="bx bx-user text-primary font-medium-2"></i>
                  </div>
                </div>
                <div class="total-amount">
                  <h5 class="mb-0" v-show="_.isEmpty(statistics)"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="margin-bottom: 3px;"></span></h5>
                  <h5 class="mb-0" v-if="!_.isEmpty(statistics)">$ {{ statistics.clear_balance }}</h5>
                  <small class="text-muted">Баланс без бонусов</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card">
            <div class="card-body d-flex align-items-center justify-content-between" style="position: relative;">
              <div class="d-flex align-items-center">
                <div class="avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2">
                  <div class="avatar-content">
                    <i class="bx bx-user text-primary font-medium-2"></i>
                  </div>
                </div>
                <div class="total-amount">
                  <h5 class="mb-0" v-show="_.isEmpty(statistics)"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="margin-bottom: 3px;"></span></h5>
                  <h5 class="mb-0" v-if="!_.isEmpty(statistics)">{{ statistics.total_profit_count }}</h5>
                  <small class="text-muted">Прибыльных сделок</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card">
            <div class="card-body d-flex align-items-center justify-content-between" style="position: relative;">
              <div class="d-flex align-items-center">
                <div class="avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2">
                  <div class="avatar-content">
                    <i class="bx bx-user text-primary font-medium-2"></i>
                  </div>
                </div>
                <div class="total-amount">
                  <h5 class="mb-0" v-show="_.isEmpty(statistics)"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="margin-bottom: 3px;"></span></h5>
                  <h5 class="mb-0" v-if="!_.isEmpty(statistics)">{{ statistics.total_loss_count }}</h5>
                  <small class="text-muted">Убыточных сделок</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <section class="card">
            <div class="card-header">
              <h4 class="card-title">Список пользователей</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <div class="table-responsive">
                    <table class="table" id="users">
                      <thead>
                      <tr>
                        <th>ID</th>
                        <th>E-mail</th>
                        <th>Гео</th>
                        <th>Статус</th>
                        <th>Баланс USD</th>
                        <th>Последняя активность</th>
                        <th>Зарегистрирован</th>
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
              <h4 class="card-title">Статистика системы по дням</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <div class="table-responsive">
                    <table class="table" id="stat">
                      <thead>
                      <tr>
                        <th>Всего сделок</th>
                        <th>Сумма сделок</th>
                        <th>Профит сделок</th>
                        <th>Убыток сделок</th>
                        <th>Профитных</th>
                        <th>Убыточных</th>
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
import _ from 'lodash'

export default {
  name: "Statistics",
  mounted() {
    let self = this;
    axios.post('/admin/data/statistics')
        .then(function (response) {
          self.statistics = response.data;
        });
    $('#users').DataTable({
      "iDisplayLength": 10,
      "processing": true,
      "serverSide": true,
      "order": [[0, "asc"]],
      "ajax": {
        url: "/admin/data/users",
        type: "POST"
      },
      "language": {
        "url": "/locales/Russian.json"
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
            return '<a href="/admin/user/' + row.id + '" target="_blank">' + email + ' <i class="bx bx-link-external" style="font-size: 12px;"></i></a>';
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
            return '<i data-toggle="tooltip" data-placement="top" data-original-title="' + geo + '" class="flag-icon flag-icon-' + geo_code + '"></i>';
          }
        },
        {
          data: 'status',
          searchable: false,
          orderable: false,
          name: 'users.status',
          render: function (data) {
            if(data == 0){
              return '<span class="badge badge badge-danger text-white">Оффлайн</span>' } else { return '<span class="badge badge badge-success text-white">Онлайн</span>'; }
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

    $('#stat').DataTable({
      "iDisplayLength": 10,
      "processing": true,
      "serverSide": true,
      "order": [[6, "desc"]],
      "ajax": {
        url: "/admin/data/daily",
        type: "POST"
      },
      "language": {
        "url": "/locales/Russian.json"
      },
      columns: [
        {
          data: 'daily_orders_count',
          name: 'daily_orders_count'
        },
        {
          data: 'daily_orders_amount',
          name: 'daily_orders_amount',
          render: function(data, type, row) {
            let text ='';
            if (type === 'display') {
              text = data;
            }
            return '$ ' + text;
          }
        },
        {
          data: 'daily_profit',
          name: 'daily_profit',
          render: function(data, type, row) {
            let text ='';
            if (type === 'display') {
              text = data;
            }
            return '$ ' + text;
          }
        },
        {
          data: 'daily_loss',
          name: 'daily_loss',
          render: function(data, type, row) {
            let text ='';
            if (type === 'display') {
              text = data;
            }
            return '$ ' + text;
          }
        },
        {
          data: 'daily_profit_count',
          name: 'daily_profit_count'
        },
        {
          data: 'daily_loss_count',
          name: 'daily_loss_count'
        },
        {
          data: 'created_at',
          name: 'created_at',
          render: function(data, type, row) {
            let date = new Date();
            if (type === 'display') {
              date = new Date(data);
            }
            return '<a href="/admin/day/' + dateformat(date, 'dd-mm-yyyy') + '" target="_blank">' + dateformat(date, 'dd-mm-yyyy') + ' <i class="bx bx-link-external" style="font-size: 12px;"></i></a>';
          }
        },
      ]
    });
  },
  data: function (){
    return {
      statistics: {},
    }
  }
}
</script>

<style scoped>

</style>