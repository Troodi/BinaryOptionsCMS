<template>
    <div class="content-wrapper">
        <div class="content-body">

            <div v-for="value in error" class="alert bg-rgba-danger alert-dismissible mb-2" role="alert">
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
                                        Скорость ответа обычно составляет до 24х часов. В случае, если на Ваш вопрос не ответили в течение данного времени,
                                        пожалуйста, не дублируйте вопрос - скорее всего рассмотрение заявки требует большего времени. Можно задать не более 1
                                        вопроса в 10 минут. Ответ придет на email адрес текущего аккаунта.
                                    </p>
                                    <textarea class="form-control" style="height:200px" placeholder="Напишите свой вопрос..." v-model="question"></textarea>
                                    <button type="button" @click="clearForm" class="btn btn-secondary mt-2">Очистить</button>
                                    <button type="button" v-bind:disabled="buttonDisabled" @click="send" class="btn btn-primary mt-2 float-right">Отправить</button>
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
                question: '',
                success: []
            }
        },
        methods: {
            clearForm: function () {
                this.question = '';
            },
            send: function () {
                let self = this;
                axios.post('/data/support', {
                    question: self.question,
                }).then(function (response) {
                    self.error = [];
                    self.success = [];
                    if(response.data.success === true) {
                        self.success.push(response.data.message);
                        self.clearForm();
                    } else {
                        self.error.push(response.data.message);
                    }
                })
            }
        },
        computed: {
            error: function () {
                let errors = [];
                if(this.question.length > 0 && this.question.length < 25){
                    errors.push('Вопрос не может быть короче 25 символов!');
                }
                return errors;
            },
            buttonDisabled: function () {
                return this.question.length < 25;
            }
        }
    }
</script>

<style scoped>

</style>