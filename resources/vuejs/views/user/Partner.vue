<template>
    <div class="content-wrapper">
        <div class="content-body">
            <div class="row">
                <div class="col-md-6">
                    <section class="card">
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
                    <section class="card">
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
                count: 0,
                reward: '0.0000000000',
                active: 0,
                deposit_count: 0,
                tracked: 0,
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