<template>
    <div class="content-wrapper">
      <div class="content-body">
        <UserBalanceControl :save_url="'/admin/data/contest/updateBalance/' + contestId + '/user/' + userId" :load_url="'/admin/data/contest/' + contestId + '/user/' + userId"></UserBalanceControl>
        <BanComponent :options="banActions" :url="'/admin/data/contest/updateBan/' + contestId + '/user/' + userId" :load_url="'/admin/data/contest/' + contestId + '/user/' + userId"></BanComponent>

        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">Информация об участнике конкурса</h4>
              </div>
              <div class="card-content">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>Начальный баланс пользователя</label>
                        <input disabled="disabled" type="text" class="form-control">
                      </fieldset>
                    </div>

                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>Пользователь всего оплатил</label>
                        <input disabled="disabled" type="text" class="form-control">
                      </fieldset>
                    </div>

                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>Процент доходности</label>
                        <input disabled="disabled" type="text" class="form-control">
                      </fieldset>
                    </div>

                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>Сколько раз оплачивал (докупал баланс)</label>
                        <input disabled="disabled" type="text" class="form-control">
                      </fieldset>
                    </div>

                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>Оборот торговли</label>
                        <input disabled="disabled" type="text" class="form-control">
                      </fieldset>
                    </div>

                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>Количество сделок</label>
                        <input disabled="disabled" type="text" class="form-control">
                      </fieldset>
                    </div>

                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>Текущее место</label>
                        <input disabled="disabled" type="text" class="form-control">
                      </fieldset>
                    </div>

                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>Выигрыш в случае победы</label>
                        <input disabled="disabled" type="text" class="form-control">
                      </fieldset>
                    </div>

                    <div class="col-md-4">
                      <fieldset class="form-group">
                        <label>Дата вступления</label>
                        <input disabled="disabled" type="text" class="form-control">
                      </fieldset>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <button type="button" class="btn btn-outline-primary float-right">Перейти к профилю пользователя</button>
                      <button type="button" class="btn btn-outline-danger float-right mr-1">Назад</button>
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
  data: function () {
    return {
      banActions: [
        { id: "0", text: this.$i18n.t('admin_control_unblocked') },
        { id: "1", text: 'Заблокирован' },
      ],
    }
  }
}
</script>

<style scoped>

</style>