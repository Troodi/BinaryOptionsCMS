<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div class="row">

        <div class="col-md-12">
          <div class="card">
            <div class="card-content">
              <img class="card-img img-fluid" src="https://image.freepik.com/free-vector/gradient-geometric-shapes-dark-background_23-2148411560.jpg"  :style="{'max-height': `calc(${blockHeight}px + 70px)`, 'height': `calc(${blockHeight}px + 70px)`}" style="object-fit: cover;">
              <div class="card-img-overlay overlay-dark d-flex justify-content-between flex-column" style="background: rgba(0, 19, 41, 0.7) !important;">
                <div class="overlay-content">
                  <h4 class="card-title mb-50">{{ getLocaleText(contest.title) }}</h4>
                  <p class="card-text" ref="blockText">
                    {{ getLocaleText(contest.description) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-content">
              <img class="card-img img-fluid" src="https://image.freepik.com/free-vector/gradient-geometric-shapes-on-dark-background_23-2148417580.jpg" style="max-height: 200px;object-fit: cover;">
              <div class="card-img-overlay overlay-dark d-flex justify-content-between flex-column" style="background: rgba(0, 19, 41, 0.7) !important;">
                <div class="overlay-content">
                  <h4 class="card-title mb-50">{{ $i18n.t('tournament_information') }}</h4>
                    <div class="row card-text mt-1">
                      <div class="col-md-12 col-xxl-6">
                        <p><strong>{{ $i18n.t('tournament_cost') }}:</strong> <span class="float-right">{{ contest.initial_cost }} $</span></p>
                        <p><strong>{{ $i18n.t('tournament_init_balance') }}:</strong> <span class="float-right">{{ contest.initial_balance }} $</span></p>
                        <p><strong>{{ $i18n.t('tournament_price_for_1_dollar') }}:</strong> <span class="float-right">{{ contest.additional_cost }} $</span></p>
                        <p><strong>{{ $i18n.t('tournament_type') }}:</strong> <span class="float-right">{{ contestTypeText(contest.type) }} </span></p>
                      </div>
                      <div class="col-md-12 col-xxl-6">
                        <p><strong>{{ $i18n.t('tournament_max_re_buy') }}:</strong> <span class="float-right">{{ contest.max_bought_balance }} $</span></p>
                        <p><strong>{{ $i18n.t('tournament_start') }}:</strong> <span class="float-right">{{ contest.started_at }}</span></p>
                        <p><strong>{{ $i18n.t('tournament_end') }}:</strong> <span class="float-right">{{ contest.ended_at }}</span></p>
                        <p><strong>{{ $i18n.t('tournament_total_users') }}:</strong> <span class="float-right">{{ contest.registered_users }} </span></p>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-content">
              <img class="card-img img-fluid" src="https://image.freepik.com/free-vector/gradient-geometric-shapes-dark-background_23-2148445831.jpg" style="max-height: 200px;object-fit: cover;">
              <div class="card-img-overlay overlay-dark d-flex justify-content-between flex-column" style="background: rgba(0, 19, 41, 0.7) !important;">
                <div class="overlay-content">
                  <h4 class="card-title mb-50">{{ $i18n.t('tournament_actions') }}</h4>
                  <div class="row card-text mt-1">
                    <div class="col-md-12 col-xxl-6">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('tournament_what_to_buy') }}:</label>
                        <money v-bind:disabled="contest.user == null" v-model="buy_balance" v-bind="money" class="form-control"></money>
                      </fieldset>
                      <button @click="buyBalanceOnContest" type="button" v-bind:disabled="buy_balance < 0 || contest.user == null || isTournamentEnded" class="btn btn-outline-primary w-100">{{ $i18n.t('tournament_re_buy') }} ({{ $i18n.t('tournament_price') }} {{ final_price.toFixed(2) }} $)</button>
                    </div>
                    <div class="col-md-12 col-xxl-6">
                      <button @click="registerOnContest" type="button" v-bind:disabled="contest.user != null || isTournamentEnded" class="btn btn-outline-info w-100" style="margin-top: 20px !important;">{{ $i18n.t('tournament_participate_for') }} {{ contest.initial_cost }}$</button>
                      <button type="button" v-bind:disabled="contest.user == null || isTournamentEnded || isAdmin" class="btn btn-outline-success w-100 mt-1" @click="goToTrading(contest.id)">{{ $i18n.t('tournament_go_to_trade') }}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 col-xxl-6">
          <section class="card">
            <div class="card-header">
              <h4 class="card-title">{{ $i18n.t('tournament_distribution_places') }}</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <div class="table-responsive table-bordered">
                    <table class="table" style="width: 100%;">
                      <thead>
                        <tr>
                          <th style="width: 50%">{{ $i18n.t('tournament_place') }}</th>
                          <th style="width: 50%">{{ $i18n.t('tournament_reward') }}</th>
                        </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(reward, index) in contest.places">
                        <td>#{{ index+1 }}</td>
                        <td>{{ reward.reward }} $</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="col-md-12 col-xxl-6">
          <section class="card">
            <div class="card-header">
              <h4 class="card-title">{{ $i18n.t('tournament_distribution_winners') }}</h4>
              <div class="heading-elements" style="cursor: default;" v-show="contest.user != null">
                <ul class="list-inline mb-0">
                  <li>
                    {{ $i18n.t('tournament_your_place') }} - <span class="badge badge-info badge-round text-white"><strong>{{ getUserPlace }}</strong> {{ $i18n.t('tournament_current_place') }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <div class="table-responsive">
                    <table class="table" style="width: 100%;">
                      <thead>
                      <tr>
                        <th>{{ $i18n.t('tournament_place') }}</th>
                        <th>{{ $i18n.t('tournament_reward') }}</th>
                        <th>{{ $i18n.t('tournament_current_user') }}</th>
                        <th>{{ $i18n.t('tournament_balance') }}</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(winner, index) in winners" v-if="'places' in contest" :style="contest.user != null && winner.user_id === contest.user.user_id ? 'background-color: rgba(35, 189, 112, 0.1);' : ''">
                        <td>#{{ index+1 }}</td>
                        <td><span class="badge badge-success badge-round text-white">{{ contest.places[index].reward }} $</span></td>
                        <td>{{ winner.user.email }}</td>
                        <td>{{ winner.balance }} $</td>
                      </tr>
                      <tr v-if="winners.length == 0">
                      <td colspan="4" class="text-center">{{ $i18n.t('tournament_list_of_users') }}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div class="row" v-if="contest.user != null">
        <div class="col-md-12">
          <section class="card">
            <div class="card-header">
              <h4 class="card-title">{{ $i18n.t('admin_trade_title') }}</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <TradeHistoryTable :show_it="false" :load_url="datatableUrl" :element_id="'tournament_trade_history'"></TradeHistoryTable>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <section class="card">
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <button type="button" v-bind:disabled="contest.user == null || isAdmin" class="btn btn-outline-success float-right mb-2" @click="goToTrading(contest.id)">{{ $i18n.t('tournament_go_to_trade') }}</button>
                  <button type="button" class="btn btn-outline-danger float-left mb-2" @click="goToContests">{{ $i18n.t('tournament_go_to_tournaments_list') }}</button>
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
import { findLocalizedText } from "../../js/functions";
import { Money } from "v-money";
import TradeHistoryTable from "../../components/TradeHistoryTable";

export default {
  components: { Money, TradeHistoryTable },
  name: "ContestInfo",
  data: function (){
    return {
      money: {
        decimal: ',',
        thousands: '.',
        prefix: '$ ',
        suffix: ' ',
        precision: 0,
        masked: false
      },
      place: 100,
      buy_balance: 1000,
      contest: [],
      winners: [],
      blockHeight: 0
    }
  },
  computed: {
    datatableUrl: function (){
      return this.isAdmin ? '/data/tournament/history/' + this.$route.params.tournament_id + '/' + this.$route.params.id : '/data/tournament/history/' + this.$route.params.tournament_id;
    },
    isAdmin: function (){
      return this.$route.meta.isAdmin;
    },
    getUserPlace: function (){
      if(this.place > 100){
        return '>100';
      }
      if(this.place == 0){
        return '('+ this.$i18n.t('tournament_counting') +'...)';
      }
      return this.place;
    },
    isTournamentEnded: function () {
      if('additional_cost' in this.contest) {
        return new Date(this.contest.ended_at) < new Date();
      }
      return true;
    },
    contestId: function (){
      return this.$route.params.tournament_id == null ? null : this.$route.params.tournament_id;
    },
    final_price: function (){
      if('additional_cost' in this.contest){
        return this.buy_balance * this.contest.additional_cost;
      }
      return 0;
    }
  },
  mounted() {
    this.getContestInfo();
    window.onresize = function(event) {
      try {
        this.blockHeight = this.$refs.blockText.clientHeight;
      } catch (e) { }
    };
  },
  methods: {
    buyBalanceOnContest: function (){
      let self = this;
      let url = this.isAdmin ? '/data/tournament/buy/' + this.$route.params.id : '/data/tournament/buy';
      axios.post(url, { contest_id: self.contestId, amount: self.buy_balance })
        .then(function (response) {
          self.getContestInfo();
          if(response.data.success === true) {
            toastr.success(response.data.message, self.$i18n.t('partner_success'), {
              positionClass: 'toast-bottom-left',
              containerId: 'toast-bottom-left'
            });
          } else {
            toastr.error(response.data.message, self.$i18n.t('partner_error'), {
              positionClass: 'toast-bottom-left',
              containerId: 'toast-bottom-left'
            });
          }
        });
    },
    registerOnContest: function (){
      let self = this;
      let url = this.isAdmin ? '/data/tournament/register/' + this.$route.params.id : '/data/tournament/register';
      axios.post(url, { contest_id: self.contestId })
        .then(function (response) {
          self.getContestInfo();
          if(response.data.success === true) {
            toastr.success(response.data.message, self.$i18n.t('partner_success'), {
              positionClass: 'toast-bottom-left',
              containerId: 'toast-bottom-left'
            });
          } else {
            toastr.error(response.data.message, self.$i18n.t('partner_error'), {
              positionClass: 'toast-bottom-left',
              containerId: 'toast-bottom-left'
            });
          }
        });
    },
    getContestInfo: function (){
      let self = this;
      let url = this.isAdmin ? '/data/getContestInfo/' + this.$route.params.id : '/data/getContestInfo';
      axios.post(url, { id: self.contestId })
        .then(function (response) {
          self.contest = response.data;
        });
      url = this.isAdmin ? '/data/tournament/winners/' + this.$route.params.id : '/data/tournament/winners';
      axios.post(url, { contest_id: self.contestId })
        .then(function (response) {
          self.winners = response.data;
        });
      url = this.isAdmin ? '/data/tournament/place/' + this.$route.params.id : '/data/tournament/place';
      axios.post(url, { contest_id: self.contestId })
        .then(function (response) {
          self.place = response.data.data;
        });
    },
    getLocaleText(text){
      return findLocalizedText(text);
    },
    contestTypeText(type){
      switch(type){
        case 1:
          return this.$i18n.t('tournament_max_balance');
        case 2:
          return this.$i18n.t('tournament_max_percent');
        case 3:
          return this.$i18n.t('tournament_max_turnover');
      }
    },
    goToTrading(id){
      this.$router.push('/trading/tournament/' + id);
    },
    goToContests(){
      if(!this.isAdmin) {
        this.$router.push('/tournaments');
      } else {
        this.$router.push('/admin/user/tournaments/' + this.$route.params.id);
      }
    },
  },
  updated: function () {
    this.$nextTick(function () {
      this.blockHeight = this.$refs.blockText.clientHeight;
    })
  }
}
</script>

<style scoped>

</style>