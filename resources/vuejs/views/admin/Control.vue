<template>
  <div class="content-wrapper">
    <div class="content-body">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Управление балансом</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-5">
                    <fieldset class="form-group">
                      <label>Сумма</label>
                      <input type="text" class="form-control" v-model="amount">
                    </fieldset>
                  </div>
                  <div class="col-md-5">
                    <fieldset class="form-group">
                      <label class="align-top">Действие</label>
                      <select2 v-model="balanceAction" :options="balanceActions" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                    </fieldset>
                  </div>
                  <div class="col-md-2">
                    <label class="align-top">&nbsp;</label>
                    <button  @click="balanceClick" type="button" class="btn btn-outline-primary w-100">Выполнить</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Блокировка пользователя</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-10">
                    <fieldset class="form-group">
                      <label class="align-top">Действие</label>
                      <select2 v-model="banAction" :options="banActions" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                    </fieldset>
                  </div>
                  <div class="col-md-2">
                    <label class="align-top">&nbsp;</label>
                    <button @click="banClick" type="button" class="btn btn-outline-primary w-100">Выполнить</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Верификация пользователя</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <button v-bind:disabled="'profile' in info && info.profile.user_verify_at || !('profile' in info)" @click="verifyClick" type="button" class="btn btn-outline-success w-100">Верифицировать пользователя</button>
                  </div>
                  <div class="col-md-6">
                    <button v-bind:disabled="'profile' in info && !info.profile.user_verify_at || !('profile' in info)" @click="unVerifyClick" type="button" class="btn btn-outline-danger w-100">Снять верификацию с пользователя</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Удаление пользователя</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <button v-bind:disabled="'user' in info && !info.user.deleted_at || !('user' in info)" @click="banClick" type="button" class="btn btn-outline-info w-100">Восстановление пользователя</button>
                  </div>
                  <div class="col-md-6">
                    <button v-bind:disabled="'user' in info && info.user.deleted_at || !('user' in info)" @click="banClick" type="button" class="btn btn-outline-light w-100">Удаление пользователя</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Подключить партнерский кабинет</h4>
            </div>
            <div class="card-content">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <button v-bind:disabled="'user' in info && info.user.partner_status || !('user' in info)" @click="changePartner('approvePartner')" type="button" class="btn btn-outline-primary w-100">Сделать партнером</button>
                  </div>
                  <div class="col-md-6">
                    <button v-bind:disabled="'user' in info && !info.user.partner_status || !('user' in info)" @click="changePartner('discardPartner')" type="button" class="btn btn-outline-warning w-100">Исключить из партнерской программы</button>
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
export default {
  name: "Control",
  data: function (){
    return {
      amount: 0,
      balanceAction: 2,
      balanceActions: [
        { id: "0", text: "Добавить к балансу" },
        { id: "1", text: "Вычесть с баланса" },
        { id: "2", text: "Установить баланс в значение" },
      ],
      banAction: 0,
      banActions: [
        { id: "0", text: "Разблокирован" },
        { id: "1", text: "Бан за мультиаккаунты" },
        { id: "2", text: "Бан по неактивности" },
        { id: "3", text: "Бан (нарушение правил)" },
        { id: "4", text: "Бан + все рефераллы" },
      ],
      info: {},
    }
  },
  mounted: function() {
    this.loadUserInfo();
  },
  methods: {
    verifyClick: function (){
      let self = this;
      axios.post('/admin/data/verifyAccount', { id: this.$route.params.id }).then((response) => {
        if(response.data.success === true) {
          toastr.success(response.data.message, self.$i18n.t('profile_success'), {
            positionClass: 'toast-bottom-left',
            containerId: 'toast-bottom-left'
          });
        } else {
          toastr.error(response.data.message, self.$i18n.t('profile_error'), {
            positionClass: 'toast-bottom-left',
            containerId: 'toast-bottom-left'
          });
        }
        self.loadUserInfo();
      });
    },
    unVerifyClick: function (){
      let self = this;
      axios.post('/admin/data/unVerifyAccount', { id: this.$route.params.id }).then((response) => {
        if(response.data.success === true) {
          toastr.success(response.data.message, self.$i18n.t('profile_success'), {
            positionClass: 'toast-bottom-left',
            containerId: 'toast-bottom-left'
          });
        } else {
          toastr.error(response.data.message, self.$i18n.t('profile_error'), {
            positionClass: 'toast-bottom-left',
            containerId: 'toast-bottom-left'
          });
        }
        self.loadUserInfo();
      });
    },
    changePartner: function(action){
      let self = this;
      axios.post('/admin/data/'+action, { id: self.userId })
          .then(function (response) {
            self.loadUserInfo();
            if(response.data.success === true) {
              toastr.success(response.data.message, 'Успешно!', {
                positionClass: 'toast-bottom-left',
                containerId: 'toast-bottom-left'
              });
            } else {
              toastr.error(response.data.message, 'Ошибка!', {
                positionClass: 'toast-bottom-left',
                containerId: 'toast-bottom-left'
              });
            }
          });
    },
    balanceClick: function (){
      let self = this;
      axios.post('/admin/data/changeBalance', {id: self.userId, balance: self.amount, action: self.balanceAction})
          .then(function (response) {
            self.loadUserInfo();
            if(response.data.success === true) {
              toastr.success(response.data.message, 'Успешно!', {
                positionClass: 'toast-bottom-left',
                containerId: 'toast-bottom-left'
              });
            } else {
              toastr.error(response.data.message, 'Ошибка!', {
                positionClass: 'toast-bottom-left',
                containerId: 'toast-bottom-left'
              });
            }
          });
    },
    banClick: function (){
      let self = this;
      axios.post('/admin/data/banAction', {id: self.userId, action: self.banAction})
          .then(function (response) {
            self.loadUserInfo();
            if(response.data.success === true) {
              toastr.success(response.data.message, 'Успешно!', {
                positionClass: 'toast-bottom-left',
                containerId: 'toast-bottom-left'
              });
            } else {
              toastr.error(response.data.message, 'Ошибка!', {
                positionClass: 'toast-bottom-left',
                containerId: 'toast-bottom-left'
              });
            }
          });
    },
    loadUserInfo: function (){
      let self = this;
      axios.post('/admin/data/getControlInfo', {id: self.userId})
          .then(function (response) {
            self.info = response.data;
            if(self.info.user.banned !== null) {
              self.banAction = self.info.user.banned;
            } else {
              self.banAction = 0;
            }
            self.amount = self.info.user.balance;
          });
    },
  },
  computed: {
    userId: function (){
      return this.$route.params.id;
    },
  },
}
</script>

<style scoped>

</style>