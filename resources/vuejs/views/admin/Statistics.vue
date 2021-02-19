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
                  <small class="text-muted">{{ $i18n.t('admin_stat_total_users') }}</small>
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
                  <small class="text-muted">{{ $i18n.t('admin_stat_banned_users') }}</small>
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
                  <small class="text-muted">{{ $i18n.t('admin_stat_deposits') }}</small>
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
                  <small class="text-muted">{{ $i18n.t('admin_stat_withdraws') }}</small>
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
                  <small class="text-muted">{{ $i18n.t('admin_stat_referrals') }}</small>
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
                  <small class="text-muted">{{ $i18n.t('admin_stat_profit') }}</small>
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
                  <small class="text-muted">{{ $i18n.t('admin_stat_all_trades') }}</small>
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
                  <small class="text-muted">{{ $i18n.t('admin_stat_all_turnover') }}</small>
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
                  <small class="text-muted">{{ $i18n.t('admin_stat_total_bonuses') }}</small>
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
                  <small class="text-muted">{{ $i18n.t('admin_stat_balance_without_bonuses') }}</small>
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
                  <small class="text-muted">{{ $i18n.t('admin_stat_profit_deals') }}</small>
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
                  <small class="text-muted">{{ $i18n.t('admin_stat_losses_deals') }}</small>
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
              <h4 class="card-title">{{ $i18n.t('admin_stat_user_list') }}</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <div class="table-responsive">
                    <table class="table" id="users">
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
              <h4 class="card-title">{{ $i18n.t('admin_stat_stats_of_days') }}</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <div class="table-responsive">
                    <table class="table" id="stat">
                      <thead>
                      <tr>
                        <th>{{ $i18n.t('admin_stat_all_deals') }}</th>
                        <th>{{ $i18n.t('admin_stat_sum_deals') }}</th>
                        <th>{{ $i18n.t('admin_stat_all_profit_deals') }}</th>
                        <th>{{ $i18n.t('admin_stat_all_losses_deals') }}</th>
                        <th>{{ $i18n.t('admin_stat_profitable') }}</th>
                        <th>{{ $i18n.t('admin_stat_losses') }}</th>
                        <th>{{ $i18n.t('admin_stat_date') }}</th>
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
import {getCookie} from "../../js/functions";

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
        url: "/admin/data/users",
        type: "POST"
      },
      "language": {
        "url": "/locales/"+ getCookie('currentLanguage') ? getCookie('currentLanguage') : 'en' +".json"
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
        "url": "/locales/"+ getCookie('currentLanguage') ? getCookie('currentLanguage') : 'en' +".json"
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