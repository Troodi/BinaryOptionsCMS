<template>
    <div class="content-wrapper">
        <div class="modal fade text-left" id="phone" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" id="myModalLabel1">Подтвердить номер телефона</h3>
                        <button type="button" class="close rounded-pill" data-dismiss="modal" aria-label="Close">
                            <i class="bx bx-x"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>
                            На номер телефона будет совершен звонок. Введите посление 4 цифры номера для подтверждения.
                        </p>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="_ _ _ _">
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button">Сделать звонок</button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light-secondary" data-dismiss="modal">
                            <i class="bx bx-x d-block d-sm-none"></i>
                            <span class="d-none d-sm-block">Закрыть</span>
                        </button>
                        <button type="button" class="btn btn-primary ml-1" data-dismiss="modal">
                            <i class="bx bx-check d-block d-sm-none"></i>
                            <span class="d-none d-sm-block">Подтвердить</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade text-left" id="email" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">Подтвердить email адрес</h3>
                        <button type="button" class="close rounded-pill" data-dismiss="modal" aria-label="Close">
                            <i class="bx bx-x"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>
                            На указанную почту будет отправлен четырёхзначный код, введите его для подтверждения.
                        </p>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="_ _ _ _">
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button">Отправить код</button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light-secondary" data-dismiss="modal">
                            <i class="bx bx-x d-block d-sm-none"></i>
                            <span class="d-none d-sm-block">Закрыть</span>
                        </button>
                        <button type="button" class="btn btn-primary ml-1" data-dismiss="modal">
                            <i class="bx bx-check d-block d-sm-none"></i>
                            <span class="d-none d-sm-block">Подтвердить</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="content-body">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Основная информация</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Никнейм</label>
                                            <input type="text" class="form-control" v-model="nickname">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Email</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" v-model="email" v-bind:disabled="email_verified_at">
                                                <div class="input-group-append">
                                                    <button v-show="!email_verified_at" class="btn btn-primary" type="button" data-toggle="modal" data-target="#email">Подтвердить</button>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Телефон*</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" v-model="phone" v-bind:disabled="phone_verify_at">
                                                <div class="input-group-append">
                                                    <button v-show="!phone_verify_at" class="btn btn-primary" type="button" data-toggle="modal" data-target="#phone">Подтвердить</button>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Telegram</label>
                                            <input type="text" class="form-control" v-model="telegram">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label class="align-top">Пол</label>
                                            <select2 v-model="gender" :options="genders" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label class="align-top">Язык</label>
                                            <select2 v-model="language" :options="options" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-8">
                                        <p>
                                            * Не используем email для рассылок, мобильный телефон только для подтверждения личности - мы не будем вам звонить.
                                        </p>
                                    </div>
                                    <div class="col-md-4">
                                        <button type="button" class="btn btn-outline-primary float-right">Сохранить изменения</button>
                                        <button type="button" class="btn btn-outline-danger float-right mr-1">Очистить поля</button>
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
                            <h4 class="card-title">Изменение пароля</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Текущий пароль</label>
                                            <input type="text" class="form-control">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Новый пароль</label>
                                            <input type="text" class="form-control">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Повтор нового пароля</label>
                                            <input type="text" class="form-control">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-8">
                                        <p>
                                            Сохраните пароль в надежном месте после его изменения, во избежание потери доступа к аккаунту.
                                        </p>
                                    </div>
                                    <div class="col-md-4">
                                        <button type="button" class="btn btn-outline-primary float-right">Сохранить изменения</button>
                                        <button type="button" class="btn btn-outline-danger float-right mr-1">Очистить поля</button>
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
                            <h4 class="card-title">Личные данные <small><i>(из удостоверяющего документа)</i></small></h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Фамилия</label>
                                            <input type="text" class="form-control" v-model="last_name" v-bind:disabled="privateDataIsset">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Имя</label>
                                            <input type="text" class="form-control" v-model="name" v-bind:disabled="privateDataIsset">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Отчество</label>
                                            <input type="text" class="form-control" v-model="patronymic" v-bind:disabled="privateDataIsset">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Дата рождения</label>
                                            <input type="text" class="form-control" v-model="birth" v-bind:disabled="privateDataIsset">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Адрес регистрации</label>
                                            <input type="text" class="form-control" v-model="address" v-bind:disabled="privateDataIsset">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Серия и номер удостоверяющего документа</label>
                                            <input type="text" class="form-control" v-model="document_number" v-bind:disabled="privateDataIsset">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-8">
                                        <p>
                                            Используются только для верификации личности, это необходимо для защиты от отмывания денег.
                                        </p>
                                    </div>
                                    <div class="col-md-4">
                                        <button v-show="!privateDataIsset" type="button" class="btn btn-outline-primary float-right">Сохранить изменения</button>
                                        <button v-show="!privateDataIsset" type="button" class="btn btn-outline-danger float-right mr-1">Очистить поля</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Первая страница паспорта или ID</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div v-show="document_first_page && !document_first_page_verify_at" class="alert bg-rgba-primary" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-info-circle"></i>
                                        <span>
                                          Документ находится на проверке!
                                        </span>
                                    </div>
                                </div>

                                <div v-show="document_first_page_verify_at" class="alert bg-rgba-success" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-info-circle"></i>
                                        <span>
                                          Документ успешно подтвержден!
                                        </span>
                                    </div>
                                </div>

                                <fieldset v-show="!document_first_page && !document_first_page_verify_at">
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01">
                                            <label class="custom-file-label" for="inputGroupFile01">Выберите изображение</label>
                                        </div>
                                    </div>
                                </fieldset>
                                <div v-show="!document_first_page && !document_first_page_verify_at" class="row mt-1">
                                    <div class="col-md-12">
                                        <button type="button" class="btn btn-outline-danger">Очистить поле</button>
                                        <button type="button" class="btn btn-outline-primary float-right">Отправить на проверку</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Страница с пропиской или обратная сторона ID</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div v-show="document_second_page && !document_second_page_verify_at" class="alert bg-rgba-primary" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-info-circle"></i>
                                        <span>
                                          Документ находится на проверке!
                                        </span>
                                    </div>
                                </div>

                                <div v-show="document_second_page_verify_at" class="alert bg-rgba-success" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-info-circle"></i>
                                        <span>
                                          Документ успешно подтвержден!
                                        </span>
                                    </div>
                                </div>

                                <fieldset v-show="!document_second_page && !document_second_page_verify_at">
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="inputGroupFile02" aria-describedby="inputGroupFileAddon01">
                                            <label class="custom-file-label" for="inputGroupFile02">Выберите изображение</label>
                                        </div>
                                    </div>
                                </fieldset>
                                <div v-show="!document_second_page && !document_second_page_verify_at" class="row mt-1">
                                    <div class="col-md-12">
                                        <button type="button" class="btn btn-outline-danger">Очистить поле</button>
                                        <button type="button" class="btn btn-outline-primary float-right">Отправить на проверку</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Допольнительный документ</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div v-show="document_additional && !document_additional_verify_at" class="alert bg-rgba-primary" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-info-circle"></i>
                                        <span>
                                          Документ находится на проверке!
                                        </span>
                                    </div>
                                </div>

                                <div v-show="document_additional_verify_at" class="alert bg-rgba-success" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-info-circle"></i>
                                        <span>
                                          Документ успешно подтвержден!
                                        </span>
                                    </div>
                                </div>

                                <fieldset v-show="!document_additional && !document_additional_verify_at">
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="inputGroupFile03" aria-describedby="inputGroupFileAddon01">
                                            <label class="custom-file-label" for="inputGroupFile03">Выберите изображение</label>
                                        </div>
                                    </div>
                                </fieldset>
                                <div v-show="!document_additional && !document_additional_verify_at" class="row mt-1">
                                    <div class="col-md-12">
                                        <button type="button" class="btn btn-outline-danger">Очистить поле</button>
                                        <button type="button" class="btn btn-outline-primary float-right">Отправить на проверку</button>
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
    import select2 from 'v-select2-component';
    export default {
        name: "Profile",
        mounted() {
            let self = this;
            // $('.language').select2({
            //     minimumResultsForSearch: Infinity,
            // });
            axios.post('/data/profile')
                .then(function (response) {
                    self.email = response.data.email;
                    self.nickname = response.data.name;
                    self.address = response.data.profile.address;
                    self.birth = response.data.profile.birth;
                    self.email_verified_at = response.data.email_verified_at;
                    self.document_additional = response.data.profile.document_additional;
                    self.document_first_page = response.data.profile.document_first_page;
                    self.document_number = response.data.profile.document_number;
                    self.document_second_page = response.data.profile.document_second_page;
                    self.gender = response.data.profile.gender;
                    self.language = response.data.profile.language;
                    self.last_name = response.data.profile.last_name;
                    self.name = response.data.profile.name;
                    self.patronymic = response.data.profile.patronymic;
                    self.phone = response.data.profile.phone;
                    self.phone_verify_at = response.data.profile.phone_verify_at;
                    self.telegram = response.data.profile.telegram;
                    self.document_first_page_verify_at = response.data.profile.document_first_page_verify_at;
                    self.document_second_page_verify_at = response.data.profile.document_second_page_verify_at;
                    self.document_additional_verify_at = response.data.profile.document_additional_verify_at;
                });
        },
        data: function () {
            return {
                email: null,
                nickname: null,
                address: null,
                birth: null,
                email_verified_at: true,
                document_additional: null,
                document_first_page: null,
                document_number: null,
                document_second_page: null,
                gender: null,
                language: null,
                last_name: null,
                name: null,
                patronymic: null,
                phone: null,
                phone_verify_at: true,
                telegram: null,
                document_first_page_verify_at: true,
                document_second_page_verify_at: true,
                document_additional_verify_at: true,
                options: [
                    { id: "ru", text: "Русский" },
                    { id: "en", text: "English" },
                ],
                genders: [
                    { id: "0", text: "Мужской" },
                    { id: "1", text: "Женский" },
                ]
            }
        },
        computed: {
            privateDataIsset: function () {
                return this.document_first_page_verify_at || this.document_second_page_verify_at || this.document_additional_verify_at;
            }
        }
    }
</script>

<style scoped>

</style>