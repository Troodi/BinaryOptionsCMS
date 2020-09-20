<template>
    <div class="content-wrapper">
        <div class="content-body">
            <div class="row">
                <div class="col-12">
                    <div v-show="show" class="alert alert-dismissible mb-2" :class="{'bg-rgba-success' : success, 'bg-rgba-danger' : !success}" role="alert">
                        <button @click="closeAlert" type="button" class="close" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <div class="d-flex align-items-center">
                            <i v-show="success" class="bx bx-like"></i>
                            <i v-show="!success" class="bx bx-error-circle"></i>
                            <span>
                              {{ message }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <section class="card">
                        <div class="card-header">
                            <h4 class="card-title">Использовать промокод</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <p style="margin-bottom: 1.7rem;">
                                        Используйте общедоступные или приватные промокоды для получения скидки, кэшбэка а также иных
                                        привилегий. Обратите внимание - некоторые промокоды имеют условия использования.
                                    </p>
                                    <fieldset class="form-group">
                                        <input type="text" class="form-control" placeholder="Введите промокод для его проверки" v-model="promocode">
                                    </fieldset>
                                    <button href="#" class="btn btn-primary">Очистить</button>
                                    <button @click="checkPromocode" class="btn btn-success float-right">Применить</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div class="col-md-3" v-for="promocode in promocodes">
                    <div class="card">
                        <div class="card-content">
                            <img class="card-img img-fluid" :src="promocode.image">
                            <div class="card-img-overlay overlay-dark d-flex justify-content-between flex-column">
                                <div class="overlay-content">
                                    <p class="card-text">
                                        {{ promocode.description }}
                                    </p>
                                </div>
                                <div class="overlay-status">
                                    <p class="mb-25"><small>Успейте воспользоваться предложением!</small></p>
                                    <button @click="setCode(promocode.code)" class="btn btn-outline-info">Использовать промокод</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-12">
                    <section class="card">
                        <div class="card-header">
                            <h4 class="card-title">История применений промокодов</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <div class="table-responsive">
                                        <table class="table" id="history">
                                            <thead>
                                            <tr>
                                                <th>Промокод</th>
                                                <th>Тип промокода</th>
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
        name: "Promocode",
        mounted() {
            let self = this;
            $('#history').DataTable({
                "language": {
                    "url": "/locales/Russian.json"
                }
            });
            axios.post('/promocodes')
                .then(function (response) {
                    self.promocodes = response.data;
                })
        },
        data: function () {
            return {
                promocode: '',
                promocodes: [],
                success: false,
                message: '',
                show: false
            }
        },
        methods: {
            setCode: function (promocode) {
                this.promocode = promocode;
            },
            checkPromocode: function(){
                let self = this;
                axios.post('/promocode', { code: this.promocode})
                    .then(function (response) {
                        self.success = response.data.success;
                        self.message = response.data.message;
                        self.show = true;
                    })
            },
            closeAlert: function () {
                this.show = false;
            }
        }
    }
</script>

<style scoped>
    .overlay-dark {
        background: rgba(57, 76, 98, 0.7) !important;
    }
</style>