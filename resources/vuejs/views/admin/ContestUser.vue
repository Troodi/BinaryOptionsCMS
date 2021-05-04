<template>
    <div class="content-wrapper">
      <div class="content-body">
        <UserBalanceControl :save_url="'/admin/data/contest/updateBalance/' + contestId + '/user/' + userId" :load_url="'/admin/data/contest/' + contestId + '/user/' + userId"></UserBalanceControl>
        <BanComponent :options="banActions" :url="'/admin/data/contest/updateBan/' + contestId + '/user/' + userId" :load_url="'/admin/data/contest/' + contestId + '/user/' + userId"></BanComponent>

        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">{{ $i18n.t('admin_tournament_info_about_user') }}</h4>
              </div>
              <div class="card-content">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_tournament_info_initial_balance') }}</label>
                        <input v-model="info.balance + ' $'" disabled="disabled" type="text" class="form-control">
                      </fieldset>
                    </div>

                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_tournament_info_user_bought') }}</label>
                        <input v-model="info.paid + ' $'" disabled="disabled" type="text" class="form-control">
                      </fieldset>
                    </div>

                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_tournament_info_spent_real') }}</label>
                        <input v-model="info.paid_real + ' $'" disabled="disabled" type="text" class="form-control">
                      </fieldset>
                    </div>

                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_tournament_info_paid_times') }}</label>
                        <input v-model="info.paid_times" disabled="disabled" type="text" class="form-control">
                      </fieldset>
                    </div>

                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_tournament_info_profit_percent') }}</label>
                        <input v-model="info.profit_percent + ' %'" disabled="disabled" type="text" class="form-control">
                      </fieldset>
                    </div>

                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_tournament_info_turnover') }}</label>
                        <input v-model="info.turnover + ' $'" disabled="disabled" type="text" class="form-control">
                      </fieldset>
                    </div>

                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_tournament_info_count_deals') }}</label>
                        <input v-model="info.order_count" disabled="disabled" type="text" class="form-control">
                      </fieldset>
                    </div>

                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_tournament_info_current_place') }}</label>
                        <input v-model="info.winner_place" disabled="disabled" type="text" class="form-control">
                      </fieldset>
                    </div>

                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_tournament_info_reward_for_winner') }}</label>
                        <input v-model="info.winner_reward + ' $'" disabled="disabled" type="text" class="form-control">
                      </fieldset>
                    </div>

                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_tournament_info_date_of_entry') }}</label>
                        <input v-model="info.created_at" disabled="disabled" type="text" class="form-control">
                      </fieldset>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <button @click="goUserProfile" type="button" class="btn btn-outline-primary float-right">{{ $i18n.t('admin_tournament_info_go_to_profile') }}</button>
                      <button @click="goBack" type="button" class="btn btn-outline-danger float-right mr-1">{{ $i18n.t('admin_tournament_info_back') }}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import UserBalanceControl from "../../components/UserBalanceControl";
import BanComponent from "../../components/BanComponent";
import dateformat from "dateformat";

export default {
  name: "ContestUser",
  components: {BanComponent, UserBalanceControl: UserBalanceControl },
  computed: {
    userId: function (){
      return this.$route.params.user_id == null ? null : this.$route.params.user_id;
    },
    contestId: function (){
      return this.$route.params.contest_id == null ? null : this.$route.params.contest_id;
    },
  },
  methods: {
    goBack(){
      this.$router.push('/admin/contest/statistics/'+this.contestId);
    },
    goUserProfile(){
      this.$router.push('/admin/user/profile/'+this.info.user_id);
    }
  },
  data: function () {
    return {
      banActions: [
        { id: "0", text: this.$i18n.t('admin_control_unblocked') },
        { id: "1", text: this.$i18n.t('admin_control_blocked') },
      ],
      info: [],
    }
  },
  mounted() {
    let self = this;
    axios.post('/admin/data/contest/' + self.contestId + '/user/' + self.userId, { balance: self.amount, action: self.balanceAction })
      .then(function (response) {
        self.info = response.data;
        self.info.created_at = dateformat(response.data.created_at, 'dd-mm-yyyy');
        if(response.data.success === true) {
          self.info = response.data;
        }
      });
  }
}
</script>

<style scoped>

</style>