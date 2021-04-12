<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div class="row">
        <div class="col-md-12">

          <div v-for="value in errors" class="alert bg-rgba-danger alert-dismissible mb-2" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
            <div class="d-flex align-items-center">
              <i class="bx bx-error"></i>
              <span>
                {{ value }}
              </span>
            </div>
          </div>

          <div v-for="value in success" class="alert bg-rgba-success alert-dismissible mb-2" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
            <div class="d-flex align-items-center">
              <i class="bx bx-error"></i>
              <span>
                {{ value }}
              </span>
            </div>
          </div>

          <section class="card">
            <div class="card-header">
              <h4 class="card-title">{{ title }}</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="card-text">
                  <div class="row">
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>ID</label>
                        <input disabled="disabled" type="text" class="form-control" :value="idText">
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('Начальный баланс трейдера') }}</label>
                        <money v-bind="money" v-model="start_deposit" type="text" class="form-control"></money>
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('Цена участия') }}</label>
                        <money v-bind="money" v-model="cost" type="text" class="form-control"></money>
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label class="align-top">{{ $i18n.t('Цена за докупаемый баланс (цена за 1$)') }}</label>
                        <money v-model="add_cost" v-bind="money" class="form-control input-lg"></money>
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('Максимальный баланс, до которого можно докупить') }}</label>
                        <money v-model="max_balance" v-bind="money" class="form-control input-lg"></money>
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('Отображается на странице конкурсов') }}</label>
                        <select2 v-model="hidden" :options="hidden_options" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('Отображать количество зарегистрированных') }}</label>
                        <select2 v-model="show_registered" :options="show_registered_options" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label class="align-top">{{ $i18n.t('Выигрыш рассчитывается по') }}</label>
                        <select2 v-model="type_option" :options="type_options" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('Зарегистрировано пользователей') }}</label>
                        <b-form-input v-model="registered" :id="'type-number2'" :type="'number'" disabled></b-form-input>
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('Доход конкуса с учетом пополнений') }}</label>
                        <money v-model="earned" v-bind="money" class="form-control input-lg" disabled></money>
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_promocode_edit_active_from') }}</label>
                        <b-form-datepicker id="example-datepicker" class="mb-2" v-model="start_date"></b-form-datepicker>
                      </fieldset>
                    </div>
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_promocode_edit_active_to') }}</label>
                        <b-form-datepicker id="example-datepicker2" class="mb-2" v-model="end_date"></b-form-datepicker>
                      </fieldset>
                    </div>
                  </div>
                  <div class="row"></div>
                  <div class="row">
                    <div class="col-md-4" v-for="locale in locales">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('Название конкурса') }} (Язык: {{ locale }})</label>
                        <input type="text" class="form-control" v-model="name[locale]">
                      </fieldset>
                    </div>
                    <div class="col-md-12" v-for="locale in locales">
                      <fieldset class="form-group">
                        <label>{{ $i18n.t('admin_promocode_edit_desc') }} (Язык описания: {{ locale }})</label>
                        <textarea type="text" class="form-control" style="width: 100%; height: 150px;" v-model="desc[locale]"></textarea>
                      </fieldset>
                    </div>
                  </div>
                  <div class="row mt-3 mb-3">
                    <div class="col-md-12">
                      <div class="table-responsive table-bordered">
                        <table class="table">
                          <thead>
                          <tr>
                            <th>Место</th>
                            <th>Выигрыш в $</th>
                            <th>Действие</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="(place, index) in places" >
                            <td class="text-bold-500">#{{ index+1 }}</td>
                            <td><money v-model="place.reward" v-bind="money" :key="index" class="form-control"></money></td>
                            <td>
                              <button @click="addNewPlace()" type="button" class="btn btn-outline-success btn-sm" v-show="places.length === index+1">Добавить место</button>
                              <button @click="deletePlace(index)" type="button" class="btn btn-outline-danger btn-sm" v-bind:disabled="places.length === 1">Удалить</button>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <button v-show="contestId" type="button" class="btn btn-outline-info float-left">Участники и статистика</button>
                      <button type="button" @click="saveContest" class="btn btn-outline-primary float-right">{{ button_text }}</button>
                      <button type="button" class="btn btn-outline-danger float-right mr-1">{{ $i18n.t('admin_promocode_edit_back') }}</button>
                    </div>
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
import {Money} from 'v-money'

export default {
name: "ContestEdit",
  components: {Money},
  data: function (){
    return {
      success: [],
      errors: [],
      type_option: 1,
      registered: 0,
      earned: 0,
      start_deposit: 1000,
      cost: 10,
      add_cost: 0.1,
      max_balance: 5000,
      start_date: new Date(),
      places: [{'reward': 1000}],
      end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      type_options: [
        { id: 1, text: 'Максимальный баланс' },
        { id: 2, text: 'Максимальный прирост' },
        { id: 3, text: 'Максимальный оборот' },
      ],
      hidden_options: [
        { id: 1, text: 'Отображается в списке' },
        { id: 0, text: 'Скрыто из списка' },
      ],
      show_registered_options: [
        { id: 1, text: 'Отображать количество зарегистрированных' },
        { id: 0, text: 'Скрывать количество зарегистрированных' },
      ],
      show_registered: 0,
      name: [],
      desc: [],
      hidden: 1,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: '',
        suffix: ' $',
        precision: 2,
        masked: false
      },
      locales: window.locales,
    }
  },
  computed: {
    idText: function (){
      return this.contestId == null ? '*' : this.contestId;
    },
    contestId: function (){
      return this.$route.params.id == null ? null : this.$route.params.id;
    },
    title: function (){
      return this.$route.params.id == null ? this.$i18n.t('Создать новый конкурс') : this.$i18n.t('Редактирование конкурса');
    },
    button_text: function (){
      return this.$route.params.id == null ? this.$i18n.t('admin_promocode_edit_create_button') : this.$i18n.t('admin_promocode_edit_save');
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    addNewPlace() {
      this.places.push({'reward': 0});
    },
    deletePlace(index){
      this.places.splice(index, 1);
    },
    back: function (){
      this.$router.push({ path: '/admin/contest' });
    },
    loadData: function(){
      let self = this;
      if(this.contestId != null) {
        axios.post('/admin/data/contest/load', { id: self.contestId })
          .then(function (response) {
            self.id = response.data.id;
            self.name = response.data.title;
            self.desc = response.data.description;
            self.places = response.data.places;
            self.start_deposit = response.data.initial_balance;
            self.registered = response.data.registered_users;
            self.earned = response.data.earned;
            self.cost = response.data.initial_cost;
            self.show_registered = response.data.show_registered;
            self.add_cost = response.data.additional_cost;
            self.max_balance = response.data.max_bought_balance;
            self.hidden = response.data.hidden;
            self.type_option = response.data.type;
            self.start_date = new Date(response.data.started_at);
            self.end_date = new Date(response.data.ended_at);
          }).catch(function (error) {
        });
      }
    },
    saveContest: function (){
      let self = this;
      self.success = [];
      self.errors = [];
      let url = '/admin/data/contest/create';
      let newContest = this.contestId != null ? 0 : 1;
      axios.post(url, {
        id: self.contestId == null ? 0 : self.contestId,
        title: { ...self.name },
        description: { ...self.desc },
        places: { ...self.places },
        initial_balance: self.start_deposit,
        initial_cost: self.cost,
        additional_cost: self.add_cost,
        show_registered: self.show_registered,
        max_bought_balance: self.max_balance,
        hidden: self.hidden,
        type: self.type_option,
        started_at: self.start_date,
        ended_at: self.end_date,
        new: newContest,
      })
        .then(function (response) {
          self.success = [];
          self.errors = [];
          if(response.data.success === true) {
            if(self.contestId != null) {
              toastr.success(response.data.message, self.$i18n.t('partner_success'), {
                positionClass: 'toast-bottom-left',
                containerId: 'toast-bottom-left'
              });
              self.loadData();
            } else {
              toastr.success(response.data.message, self.$i18n.t('partner_success'), {
                positionClass: 'toast-bottom-left',
                containerId: 'toast-bottom-left'
              });
              if(newContest) {
                self.$router.push({path: '/admin/contest/edit/' + response.data.data.id});
              }
            }
          } else {
            self.errors.push(response.data.message);
          }
        })
        .catch(function (error) {
          self.errors = [];
          for (const [key, value] of Object.entries(error.response.data.errors)) {
            value.forEach(element => {
              self.errors.push(element);
            });
          }
        });
    }
  }
}
</script>

<style scoped>

</style>