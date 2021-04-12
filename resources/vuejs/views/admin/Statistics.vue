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
                  <UsersTable table_id="users_main" url="/admin/data/users"></UsersTable>
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
                  <StatisticsTable table_id="stat_main" url="/admin/data/daily"></StatisticsTable>
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
import UsersTable from "../../components/UsersTable";
import StatisticsTable from "../../components/StatisticsTable";

export default {
  name: "Statistics",
  components: { UsersTable: UsersTable, StatisticsTable: StatisticsTable },
  mounted() {
    let self = this;
    axios.post('/admin/data/statistics')
        .then(function (response) {
          self.statistics = response.data;
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