<template>
    <div class="content-wrapper">
        <div class="content-body">
            <div class="row">
                <div class="col-md-12">
                    <section class="card">
                        <div class="card-header">
                            <h4 class="card-title">Обращение в техническую поддержку</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="card-text">
                                    <p>
                                        Для обращения в техническую поддержку необходимо иметь подтвержденный email т.к. на него придет
                                        ответ, по Вашему обращению, а также подтвержденный номер мобильного телефона. Скорость ответа
                                        обычно составляет до 24х часов. В случае, если на Ваш вопрос не ответили в течение данного времени,
                                        пожалуйста, не дублируйте вопрос - скорее всего рассмотрение заявки требует большего времени.
                                    </p>
                                    <textarea class="form-control" style="height:200px" placeholder="Напишите свой вопрос..."></textarea>
                                    <button type="button" class="btn btn-secondary mt-2">Отменить</button>
                                    <button type="button" class="btn btn-primary mt-2 float-right">Отправить</button>
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
    export default {
        name: "Support",
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