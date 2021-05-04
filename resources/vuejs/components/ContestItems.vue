<template>
  <div class="row">
    <div class="col-md-12 mb-2" style="max-height: 200px;" v-show="contests_items.length === 0">
      <div class="card" style="max-height: 200px;">
        <div class="card-content" style="max-height: 200px;">
          <img class="card-img img-fluid" src="https://i.pinimg.com/736x/4a/16/43/4a16434691d860a0ef932fbfb9e5586e.jpg" style="max-height: 200px;object-fit: cover;">
          <div class="card-img-overlay overlay-dark d-flex justify-content-between flex-column" style="background: rgba(0, 19, 41, 0.7) !important;">
            <div class="overlay-content text-center">
              <h1 class="card-title mt-3 pt-2" style="font-size: 30px;color: #bdd1f8;">{{ $i18n.t('tournament_not_found') }}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-2" :class="getColClass(index)" v-for="(contest, index) in contests_items" style="max-height: 200px;">
      <div class="card" style="max-height: 200px;">
        <div class="card-content" style="max-height: 200px;">
          <img class="card-img img-fluid" :src="getImageByIndex(index)" style="max-height: 200px;object-fit: cover;">
          <div class="card-img-overlay overlay-dark d-flex justify-content-between flex-column" style="background: rgba(0, 19, 41, 0.7) !important;">
            <div class="overlay-content">
              <h4 class="card-title mb-50">{{ getLocaleText(contest.title) }}</h4>
              <div class="heading-elements" style="cursor: default;">
                <ul class="list-inline mb-0">
                  <li>
                    <span class="badge badge-primary badge-round text-white">{{ $i18n.t('tournament_bank') }}: {{ contest.bank }}$</span>
                  </li>
                </ul>
              </div>
              <p class="card-text text-max-lines">
                {{ getLocaleText(contest.description) }}
              </p>
            </div>
            <div class="overlay-status">
              <p class="mb-25"><small>{{ $i18n.t('tournament_type_item') }} - "{{ contestTypeText(contest.type) }}"</small></p>
              <button class="btn btn-outline-info" @click="goToInfo(contest.id)">{{ $i18n.t('tournament_more') }}</button>
              <button v-bind:disabled="contest.user == null || isNotActive" class="btn btn-success float-right" @click="goToTrading(contest.id)">{{ $i18n.t('tournament_go_to_trade') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findLocalizedText } from "../js/functions";

export default {
  name: "ContestItems",
  props: ['contests_items', 'type'],
  computed: {
    isNotActive: function (){
      return this.type === 'ended' || this.type === 'planned';
    },
    isAdmin: function (){
      return this.$route.meta.isAdmin;
    },
  },
  methods: {
    goToTrading(id){
      this.$router.push('/trading/tournament/' + id);
    },
    goToInfo(id){
      if(!this.isAdmin) {
        this.$router.push('/tournament/' + id);
      } else {
        this.$router.push('/admin/user/tournament/' + id + '/user_id/' + this.$route.params.id);
      }
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
    getImageByIndex(index){
      return this.images[index % this.images.length];
    },
    getColClass: function(index){
      if(this.contests_items == null){
        return '';
      }
      if(this.contests_items.length === 1){
        return 'col-md-12';
      }
      else if(this.contests_items.length > 1 && this.contests_items.length - 1 === index && index % 2 === 0){
        return 'col-md-12';
      }
      else {
        return 'col-md-6';
      }
    }
  },
  data: function (){
    return {
      images: [
        'https://image.freepik.com/free-vector/gradient-geometric-shapes-dark-background_23-2148411560.jpg',
        'https://image.freepik.com/free-vector/gradient-geometric-shapes-on-dark-background_23-2148417580.jpg',
        'https://image.freepik.com/free-vector/gradient-geometric-shapes-dark-background_23-2148445831.jpg',
      ],
    }
  }
}
</script>

<style scoped>

</style>