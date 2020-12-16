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
                            <h4 class="card-title">{{ $i18n.t('promo_code_title') }}</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <p style="margin-bottom: 1.7rem;">
                                      {{ $i18n.t('promo_code_use_desc') }}
                                    </p>
                                    <fieldset class="form-group">
                                        <input type="text" class="form-control" placeholder="Введите промокод для его проверки" v-model="promocode">
                                    </fieldset>
                                    <button @click="clearPromocode" class="btn btn-primary">{{ $i18n.t('promo_code_clear') }}</button>
                                    <button @click="checkPromocode" class="btn btn-success float-right" :class="{'disabled' : promocode.length < 3}">{{ $i18n.t('promo_code_apply') }}</button>
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
                                    <p class="mb-25"><small>{{ $i18n.t('promo_code_have_time') }}</small></p>
                                    <button @click="setCode(promocode.code)" class="btn btn-outline-info">{{ $i18n.t('promo_code_activate') }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-12">
                    <section class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ $i18n.t('promo_code_history') }}</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <div class="table-responsive">
                                        <table class="table" id="promocode">
                                            <thead>
                                            <tr>
                                                <th>{{ $i18n.t('promo_code_simple') }}</th>
                                                <th>{{ $i18n.t('promo_code_type') }}</th>
                                                <th>{{ $i18n.t('promo_code_status') }}</th>
                                                <th>{{ $i18n.t('promo_code_date') }}</th>
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
    import {getCookie} from "../../js/functions";

    require('../../../vendors/js/tables/datatable/datatables.min.js');
    require('../../../vendors/js/tables/datatable/dataTables.bootstrap4.min.js');

    export default {
        name: "Promocode",
        mounted() {
            let self = this;
            this.updateDatatable();
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
        computed: {
          isAdmin: function (){
            return this.$route.meta.isAdmin;
          },
        },
        methods: {
            updateDatatable: function(){
                let self = this;
                let url = '/promocode/history';
                if(this.isAdmin){
                  url = '/promocode/history/'+this.$route.params.id;
                }
                $("#promocode").dataTable().fnDestroy()
                $('#promocode').DataTable({
                    "iDisplayLength": 10,
                    "processing": true,
                    "serverSide": true,
                    "order": [[3, "desc"]],
                    "ajax": {
                        url: url,
                        type: "POST"
                    },
                    "language": {
                      "url": "/locales/"+ getCookie('currentLanguage') ? getCookie('currentLanguage') : 'en' +".json"
                    },
                    columns: [
                        { data: 'promocode.code', name: 'promocode.code' },
                        {
                            data: 'promocode.type',
                            name: 'promocode.type',
                            orderable: false,
                            searchable: false,
                            render: function(data, type) {
                                let status = '';
                                if (type === 'display') {
                                    switch (data) {
                                        case 1:
                                            status = self.$i18n.t('promo_code_without_deposit');
                                            break;
                                        case 2:
                                            status = self.$i18n.t('promo_code_percent');
                                            break;
                                    }
                                }
                                return '<div class="badge badge-primary">' + status + '</div>';
                            }
                        },
                        {
                            data: 'id',
                            name: 'promocode_id',
                            orderable: false,
                            searchable: false,
                            render: function(data, type) {
                                let status = '';
                                if (type === 'display') {
                                    status = self.$i18n.t('promo_code_active');
                                }
                                return '<div class="badge badge-success">' + status + '</div>';
                            }
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
            setCode: function (promocode) {
                this.promocode = promocode;
                this.checkPromocode();
            },
            checkPromocode: function(){
                let self = this;
                let url = '/promocode';
                if(this.isAdmin){
                  url = '/promocode/'+this.$route.params.id;
                }
                axios.post(url, { code: this.promocode})
                    .then(function (response) {
                        self.success = response.data.success;
                        self.message = response.data.message;
                        self.show = true;
                        self.updateDatatable();
                    })
            },
            closeAlert: function () {
                this.show = false;
            },
            clearPromocode: function () {
                this.promocode = '';
                this.closeAlert();
            }
        }
    }
</script>

<style scoped>
    .overlay-dark {
        background: rgba(57, 76, 98, 0.7) !important;
    }
</style>