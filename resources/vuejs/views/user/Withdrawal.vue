<template>
    <div class="content-wrapper">
        <div class="content-body">
            <div class="row">
                <div class="col-md-7">
                    <section class="card">
                        <div class="card-header">
                            <h4 class="card-title">Вывод средств</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <div class="row">
                                        <div class="col-md-12 pt-3">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <img class="img-fluid" src="https://cdn.freelogovectors.net/wp-content/uploads/2019/02/payeer-logo.png">
                                                </div>
                                                <div class="col-md-6">
                                                    <p class="mb-0"><i class="bx bxs-dollar-circle align-middle"></i> Вывод без отработки бонуса</p>
                                                    <p class="mb-0"><i class="bx bx-wallet align-middle"></i> Без комиссии</p>
                                                    <p class="mb-0"><i class="bx bx-undo align-middle"></i> Вывод в течение 24х часов</p>
                                                    <p class="mb-0"><i class="bx bx-check align-middle"></i> Минимальная сумма вывода: $10</p>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-md-6">
                                                    <fieldset class="form-group" style="margin-bottom: 3px;">
                                                        <label>Сумма вывода</label>
                                                        <small class="text-muted">мин. <i>10$</i></small>
                                                        <template>
                                                            <input ref="ci" type="text" class="form-control" v-model="amount" v-currency="{currency: null, autoDecimalMode: true, valueRange: {min: 10, max: 100000}}">
                                                        </template>
                                                    </fieldset>
                                                </div>
                                                <div class="col-md-6">
                                                    <fieldset class="form-group" style="margin-bottom: 10px;">
                                                        <label>Платежная система</label>
                                                        <small class="text-muted"><i>(может взиматься комиссия)</i></small>
                                                        <input type="text" class="form-control" value="START50">
                                                    </fieldset>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 pt-2">
                                                    <button type="button" class="btn btn-outline-secondary mr-1 mb-1">Продолжить</button>
                                                </div>
                                                <div class="col-md-6 pt-2 text-right align-bottom">
                                                    <p style="padding-top:10px;">Вы получите <span class="text-white" style="font-size: 1.3rem;">$ 1,000.00</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div class="col-md-5">
                    <section class="card">
                        <div class="card-header">
                            <h4 class="card-title">Ваши активные бонусы</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="d-flex justify-content-between align-items-end">
                                                        <div class="dashboard-content-left">
                                                            <h1 class="text-primary font-large-2 text-bold-500">$ 250.00</h1>
                                                            <p>Вы успешно отработали 57.6% от общей суммы бонуса.</p>
                                                            <button type="button" class="btn btn-primary glow">Отказаться от получения бонуса</button>
                                                        </div>
                                                        <div class="dashboard-content-right">
                                                            <img src="/images/icon/cup.png" height="155" width="155" class="img-fluid" style="float-right"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="card">
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    Условия отключения бонуса и комиссия. Условия отключения бонуса и комиссия. Условия отключения бонуса и комиссия. Условия отключения бонуса и комиссия. Условия отключения бонуса и комиссия. Условия отключения бонуса и комиссия. Условия отключения бонуса и комиссия. Условия отключения бонуса и комиссия.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>

        <deposit-history></deposit-history>
    </div>
</template>

<script>
    export default {
        name: "Deposit",
        data: function () {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>