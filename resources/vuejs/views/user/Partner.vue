<template>
    <div class="content-wrapper">
        <div class="content-body">
            <div class="row">
                <div class="col-md-6">
                    <section class="card mb-2">
                        <div class="card-header">
                            <h4 class="card-title">Ваша партнерская ссылка</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <fieldset class="form-group">
                                        <label for="basicInput">Ваша ссылка для привлечения пользователей</label>
                                        <input :value="link" type="text" class="form-control opacity-full" id="basicInput" readonly="readonly">
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="col-md-6">
                    <section class="card mb-2">
                        <div class="card-header">
                            <h4 class="card-title">Условия партнерской программы</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <p style="margin-bottom: 0.3rem;">
                                        Каждый приглашенный пользователь приносит партнеру вознаграждение в размере <code>2%</code> с торгового оборота, исключая бонусные средства.
                                        Накрутка и иные способы фальсификации регистраций приведут к остановке действия аккаунта.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div class="col-md-12">
                  <div class="alert bg-rgba-primary mb-2" role="alert">
                    <div class="d-flex align-items-center">
                      <i class="bx bx-error-circle"></i>
                      <span>
                        У вас обычный статус партнера, но вы можете его улучшить отправив заявку для получение "премиум" статуса.
                      </span>
                    </div>
                  </div>

                  <section class="card">
                    <div class="card-header">
                      <h4 class="card-title">«Премиум» партнер</h4>
                    </div>
                    <div class="card-content">
                      <div class="card-body">
                        <div class="card-text">
                          <p>
                            Станьте «премиум» партнером чтобы получать повышенные выплаты за приглашенных пользователей. Вы сможете получать <span class="badge badge-warning text-white">10 процентов</span> с пополнения баланса приглашенного пользователя, <span class="badge badge-primary text-white">5 центов</span> за подтвержденную регистрацию (аккаунт на котором подтверждена почта) и <span class="badge badge-success text-white">3 процента</span> с торгового оборота приглашенного пользователя. Для получения статуса "премиум" партнера необходимо отправить заявку на рассмотрение.
                          </p>
                          <div class="row">
                            <div class="col-md-6">
                              <fieldset class="form-group">
                                <label>Telegram для связи:</label>
                                <input type="text" class="form-control" v-model="amount">
                              </fieldset>
                            </div>
                            <div class="col-md-6">
                              <fieldset class="form-group">
                                <label class="align-top">Планируемое количество приглашенных в день:</label>
                                <select2 v-model="traficQuantity" :options="traficQuantityOptions" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                              </fieldset>
                            </div>
                            <div class="col-md-12">
                              <fieldset class="form-group">
                                <textarea class="form-control" style="height:150px" placeholder="Опишите максимально подробно источники трафика, потенциальный охват, предложения"></textarea>
                              </fieldset>
                            </div>
                          </div>
                          <button type="button" class="btn btn-secondary mt-0">Очистить</button>
                          <button type="button"  class="btn btn-primary mt-0 float-right">Отправить</button>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <div class="col-md-12">
                    <section class="card">
                        <div class="card-header">
                            <h4 class="card-title">Общая статистика партнера</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                            <tr>
                                                <th>Количество приглашенных</th>
                                                <th>Вознаграждение</th>
                                                <th>Активных</th>
                                                <th>Пополнивших баланс</th>
                                                <th>Переходов по ссылке</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td v-text="count"></td>
                                                    <td><span class="badge badge-primary text-white" v-text="reward + ' $'"></span></td>
                                                    <td v-text="active"></td>
                                                    <td v-text="deposit_count"></td>
                                                    <td v-text="tracked"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div class="col-md-12">
                    <section class="card">
                        <div class="card-header">
                            <h4 class="card-title">Список приглашенных</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <div class="table-responsive">
                                        <table class="table" id="referrals">
                                            <thead>
                                            <tr>
                                                <th>Токен пользователя</th>
<!--                                                <th>Вознаграждение</th>-->
<!--                                                <th>Статус</th>-->
                                                <th>Дата регистрации</th>
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
    require('../../../vendors/js/tables/datatable/datatables.min.js');
    require('../../../vendors/js/tables/datatable/dataTables.bootstrap4.min.js');

    export default {
        name: "Partner",
        mounted() {
            let self = this;
            axios.post(this.isAdmin ? '/data/referralsInfo/'+this.userId : '/data/referralsInfo')
                .then(function (response) {
                    self.count = response.data.total_referrals;
                    self.reward = response.data.reward;
                    self.active = response.data.active;
                    self.deposit_count = response.data.deposit_count;
                    self.tracked = response.data.tracked;
                });
            if(this.isAdmin) {
              axios.post('/admin/data/userinfo/' + this.userId)
                  .then(function (response) {
                    self.link = window.location.origin + '/offer/' + response.data.token;
                  });
            } else {
              self.link = window.location.origin + '/offer/' + window.user_data.token;
            }
            let url = this.isAdmin ? '/data/referrals/'+this.userId : '/data/referrals';
            $('#referrals').DataTable({
                "iDisplayLength": 10,
                "processing": true,
                "serverSide": true,
                "order": [[1, "desc"]],
                "ajax": {
                    url: url,
                    type: "POST"
                },
                "language": {
                    "url": "/locales/Russian.json"
                },
                columns: [
                    {
                        data: 'token',
                        name: 'token'
                    },
                    {
                        data: 'created_at',
                        name: 'created_at',
                        render: function(data, type) {
                            let date = new Date();
                            if (type === 'display') {
                                date = new Date(data);
                            }
                            return dateformat(date, 'HH:MM:ss dd-mm-yyyy');
                        }
                    },
                ]
            });
        },
        computed: {
          isAdmin: function (){
            return this.$route.meta.isAdmin;
          },
          userId: function (){
            return this.$route.params.id;
          }
        },
        data: function () {
            return {
                traficQuantity: 0,
                traficQuantityOptions: [
                  { id: "0", text: "1-5 человек" },
                  { id: "1", text: "5-15 человек" },
                  { id: "2", text: "15-50 человек" },
                  { id: "3", text: "50+ человек" },
                  { id: "4", text: "Не известно" },
                ],
                count: '-',
                reward: '-',
                active: '-',
                deposit_count: '-',
                tracked: '-',
                link: '',
            }
        }
    }
</script>

<style scoped>
    .opacity-full{
        opacity: 1 !important;
    }
</style>