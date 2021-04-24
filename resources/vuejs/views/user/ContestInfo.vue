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
                  <h4 class="card-title mb-50">Информация</h4>
                    <div class="row card-text mt-1">
                      <div class="col-md-12 col-xxl-6">
                        <p><strong>Цена участия:</strong> <span class="float-right">{{ contest.initial_cost }} $</span></p>
                        <p><strong>Начальный баланс:</strong> <span class="float-right">{{ contest.initial_balance }} $</span></p>
                        <p><strong>Цена конкурсного 1$:</strong> <span class="float-right">{{ contest.additional_cost }} $</span></p>
                        <p><strong>Тип турнира:</strong> <span class="float-right">{{ contestTypeText(contest.type) }} </span></p>
                      </div>
                      <div class="col-md-12 col-xxl-6">
                        <p><strong>Макс можно докупить:</strong> <span class="float-right">{{ contest.max_bought_balance }} $</span></p>
                        <p><strong>Начало:</strong> <span class="float-right">{{ contest.started_at }}</span></p>
                        <p><strong>Окончание:</strong> <span class="float-right">{{ contest.ended_at }}</span></p>
                        <p><strong>Всего участников:</strong> <span class="float-right">{{ contest.registered_users }} </span></p>
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
                  <h4 class="card-title mb-50">Действия</h4>
                  <div class="row card-text mt-1">
                    <div class="col-md-12 col-xxl-6">
                      <fieldset class="form-group">
                        <label>Сколько хотите докупить:</label>
                        <input type="text" class="form-control">
                      </fieldset>
                      <button type="button" class="btn btn-outline-primary w-100">Докупить (стоимость 1.57 $)</button>
                    </div>
                    <div class="col-md-12 col-xxl-6">
                      <button type="button" class="btn btn-outline-info w-100" style="margin-top: 20px !important;">Участвовать за 10$</button>
                      <button type="button" class="btn btn-outline-success w-100 mt-1">Перейти к торговле</button>
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
              <h4 class="card-title">Распределение выигрышей</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <div class="table-responsive table-bordered">
                    <table class="table" style="width: 100%;">
                      <thead>
                        <tr>
                          <th style="width: 50%">Место</th>
                          <th style="width: 50%">Вознаграждение</th>
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
              <h4 class="card-title">Распределение победителей</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <div class="table-responsive">
                    <table class="table" style="width: 100%;">
                      <thead>
                      <tr>
                        <th>Место</th>
                        <th>Вознаграждение</th>
                        <th>Пользователь</th>
                        <th>Баланс</th>
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
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <button type="button" class="btn btn-outline-success float-right mb-2" @click="goToTrading(contest.id)">Перейти к торговле</button>
                  <button type="button" class="btn btn-outline-danger float-left mb-2" @click="goToContests">К списку турниров</button>
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

export default {
  name: "ContestInfo",
  data: function (){
    return {
      contest: [],
      blockHeight: 0
    }
  },
  computed: {
    contestId: function (){
      return this.$route.params.tournament_id == null ? null : this.$route.params.tournament_id;
    },
  },
  mounted() {
    let self = this;
    axios.post('/data/getContestInfo', { id: self.contestId })
      .then(function (response) {
        self.contest = response.data;
      });

    window.onresize = function(event) {
      self.blockHeight = self.$refs.blockText.clientHeight;
    };
  },
  methods: {
    getLocaleText(text){
      return findLocalizedText(text);
    },
    contestTypeText(type){
      switch(type){
        case 1:
          return 'Максимальный баланс';
        case 2:
          return 'Максимальный прирост';
        case 3:
          return 'Максимальный оборот';
      }
    },
    goToTrading(id){
      this.$router.push('/trading/tournament/' + id);
    },
    goToContests(){
      this.$router.push('/tournaments');
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