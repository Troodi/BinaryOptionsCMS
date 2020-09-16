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
                                                    <td><span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span></td>
                                                    <td><span class="badge badge-primary text-white"><span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span> $</span></td>
                                                    <td><span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span></td>
                                                    <td><span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span></td>
                                                    <td><span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span></td>
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
                            <h4 class="card-title">Список рефералов</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <div class="table-responsive">
                                        <table class="table" id="referals">
                                            <thead>
                                            <tr>
                                                <th>Сумма платежа</th>
                                                <th>Платежная система</th>
                                                <th>Статус</th>
                                                <th>Дата</th>
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
    require('../../../vendors/js/tables/datatable/datatables.min.js');
    require('../../../vendors/js/tables/datatable/dataTables.bootstrap4.min.js');

    export default {
        name: "Partner",
        mounted() {
            $('#referals').DataTable({
                "language": {
                    "url": "/locales/Russian.json"
                }
            });
        },
        data: function () {
            return {
                link: window.location.origin + '/offer/gjasdsda',
            }
        }
    }
</script>

<style scoped>
    .opacity-full{
        opacity: 1 !important;
    }
</style>