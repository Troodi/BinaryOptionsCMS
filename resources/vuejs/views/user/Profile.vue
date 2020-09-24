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
                            <input v-model="phoneCode" type="text" class="form-control" v-mask="'9999'">
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button">Сделать звонок</button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light-secondary" data-dismiss="modal">
                            <i class="bx bx-x d-block d-sm-none"></i>
                            <span @click="sendPhoneCode" class="d-none d-sm-block">Закрыть</span>
                        </button>
                        <button v-bind:disabled="checkPhoneCodeDisabled" @click="checkPhoneCode" type="button" class="btn btn-primary ml-1">
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
                            <input v-model="emailCode" type="text" class="form-control" v-mask="'9999'">
                            <div class="input-group-append">
                                <button @click="sendEmailCode" class="btn btn-primary" type="button">Отправить код</button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light-secondary" data-dismiss="modal">
                            <i class="bx bx-x d-block d-sm-none"></i>
                            <span class="d-none d-sm-block">Закрыть</span>
                        </button>
                        <button v-bind:disabled="checkEmailCodeDisabled" @click="checkEmailCode" type="button" class="btn btn-primary ml-1" data-dismiss="modal">
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

                    <div v-for="value in main_error" class="alert bg-rgba-danger alert-dismissible mb-2" role="alert">
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
                                                <input type="text" class="form-control" v-model="email" v-bind:disabled="email_verified_at" v-mask="'*{1,25}@*{1,15}.*{1,7}'">
                                                <div class="input-group-append">
                                                    <button v-show="!email_verified_at" v-bind:disabled="emailSendDisabled" class="btn btn-primary" type="button" data-toggle="modal" data-target="#email">Подтвердить</button>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Телефон*</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" v-model="phone" v-bind:disabled="phone_verify_at" v-mask="'+9{9,20}'">
                                                <div class="input-group-append">
                                                    <button v-show="!phone_verify_at" v-bind:disabled="phoneSendDisabled" class="btn btn-primary" type="button" data-toggle="modal" data-target="#phone">Подтвердить</button>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Telegram</label>
                                            <input type="text" class="form-control" v-model="telegram" v-mask="'@*{3,25}'">
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
                                        <button v-bind:disabled="mainSaveDisabled" type="button" class="btn btn-outline-primary float-right">Сохранить изменения</button>
                                        <button type="button" @click="clearMain" class="btn btn-outline-danger float-right mr-1">Очистить поля</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-for="value in password_error" class="alert bg-rgba-danger alert-dismissible mb-2" role="alert">
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
                                            <input type="text" class="form-control" v-model="current_password">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Новый пароль</label>
                                            <input type="text" class="form-control" v-model="new_password">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Повтор нового пароля</label>
                                            <input type="text" class="form-control" v-model="repeat_password">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-8">
                                        <p>
                                            Сохраните пароль в надежном месте после его изменения, во избежание потери доступа к аккаунту.
                                        </p>
                                    </div>
                                    <div class="col-md-4">
                                        <button type="button" @click="changePassword" class="btn btn-outline-primary float-right" v-bind:disabled="passwordSaveDisabled">Сохранить изменения</button>
                                        <button type="button" @click="clearPassword" class="btn btn-outline-danger float-right mr-1">Очистить поля</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-for="value in private_error" class="alert bg-rgba-danger alert-dismissible mb-2" role="alert">
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
                                            <label>Отчество <small><i>(если есть)</i></small></label>
                                            <input type="text" class="form-control" v-model="patronymic" v-bind:disabled="privateDataIsset">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Дата рождения</label>
                                            <input type="text" class="form-control" v-model="birth" v-bind:disabled="privateDataIsset" v-mask="'99-99-9999'">
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
                                        <button v-show="!privateDataIsset" v-bind:disabled="privateSaveDisabled" type="button" class="btn btn-outline-primary float-right">Сохранить изменения</button>
                                        <button v-show="!privateDataIsset" @click="clearPrivate" type="button" class="btn btn-outline-danger float-right mr-1">Очистить поля</button>
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
                                <div v-show="document_first_page && !document_first_page_verify_at" class="alert bg-rgba-primary mb-0 alert-paddings" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-info-circle"></i>
                                        <span>
                                          Документ находится на проверке!
                                        </span>
                                    </div>
                                </div>

                                <div v-show="document_first_page_verify_at" class="alert bg-rgba-success mb-0 alert-paddings" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-info-circle"></i>
                                        <span>
                                          Документ успешно подтвержден!
                                        </span>
                                    </div>
                                </div>

                                <fieldset v-show="!document_first_page && !document_first_page_verify_at">
                                    <div class="input-group">
                                        <b-form-file v-model="document_first_page" :state="Boolean(document_first_page)" placeholder="Выберите изображение" drop-placeholder="Перетащите сюда файл..."></b-form-file>
                                    </div>
                                </fieldset>
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
                                <div v-show="document_second_page && !document_second_page_verify_at" class="alert bg-rgba-primary mb-0 alert-paddings" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-info-circle"></i>
                                        <span>
                                          Документ находится на проверке!
                                        </span>
                                    </div>
                                </div>

                                <div v-show="document_second_page_verify_at" class="alert bg-rgba-success mb-0 alert-paddings" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-info-circle"></i>
                                        <span>
                                          Документ успешно подтвержден!
                                        </span>
                                    </div>
                                </div>

                                <fieldset v-show="!document_second_page && !document_second_page_verify_at">
                                    <div class="input-group">
                                        <b-form-file v-model="document_second_page" :state="Boolean(document_second_page)" placeholder="Выберите изображение" drop-placeholder="Перетащите сюда файл..."></b-form-file>
                                    </div>
                                </fieldset>
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
                                <div v-show="document_additional && !document_additional_verify_at" class="alert bg-rgba-primary mb-0 alert-paddings" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-info-circle"></i>
                                        <span>
                                          Документ находится на проверке!
                                        </span>
                                    </div>
                                </div>

                                <div v-show="document_additional_verify_at" class="alert bg-rgba-success mb-0 alert-paddings" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-info-circle"></i>
                                        <span>
                                          Документ успешно подтвержден!
                                        </span>
                                    </div>
                                </div>

                                <fieldset v-show="!document_additional && !document_additional_verify_at">
                                    <div class="input-group">
                                        <b-form-file v-on:change="handleFileUploads" v-model="document_additional" :state="Boolean(document_additional)" placeholder="Выберите изображение" drop-placeholder="Перетащите сюда файл..."></b-form-file>
                                    </div>
                                </fieldset>
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
    import dateformat from "dateformat";
    export default {
        name: "Profile",
        mounted() {
            this.getProfile();
        },
        methods: {
            handleFileUploads: function(event){
                console.log(event);
            },
            getProfile: function(){
                let self = this;
                axios.post('/data/profile')
                    .then(function (response) {
                        self.email = response.data.email;
                        self.nickname = response.data.name;
                        self.address = response.data.profile.address;
                        self.birth = dateformat(response.data.profile.birth, 'dd-mm-yyyy');
                        self.email_verified_at = response.data.email_verified_at;
                        self.document_additional = response.data.profile.document_additional ? response.data.profile.document_additional : null;
                        self.document_first_page = response.data.profile.document_first_page ? response.data.profile.document_first_page : null;
                        self.document_number = response.data.profile.document_number;
                        self.document_second_page = response.data.profile.document_second_page ? response.data.profile.document_second_page : null;
                        self.gender = response.data.profile.gender ? response.data.profile.gender : 0;
                        self.language = response.data.profile.language ? response.data.profile.language : 'en';
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
            changePassword: function () {

            },
            clearPassword: function () {
                this.current_password = '';
                this.new_password = '';
                this.repeat_password = '';
            },
            clearPrivate: function () {
                this.name = '';
                this.last_name = '';
                this.patronymic = '';
                this.address = '';
                this.document_number = '';
                this.birth = '';
            },
            clearMain: function () {
                this.nickname = '';
                this.telegram = '';
            },
            checkPhoneCode: function () {

            },
            sendPhoneCode: function () {

            },
            checkEmailCode: function () {

            },
            sendEmailCode: function () {

            },
        },
        data: function () {
            return {
                email: '',
                nickname: '',
                address: '',
                birth: '',
                email_verified_at: true,
                document_additional: null,
                document_first_page: null,
                document_number: '',
                document_second_page: null,
                gender: '',
                language: '',
                last_name: '',
                name: '',
                patronymic: '',
                phone: '',
                phone_verify_at: true,
                telegram: '',
                document_first_page_verify_at: true,
                document_second_page_verify_at: true,
                document_additional_verify_at: true,
                current_password: '',
                new_password: '',
                repeat_password: '',
                options: [
                    { id: "ru", text: "Русский" },
                    { id: "en", text: "English" },
                ],
                genders: [
                    { id: "0", text: "Мужской" },
                    { id: "1", text: "Женский" },
                ],
                phoneCode: '',
                emailCode: '',
            }
        },
        computed: {
            private_error: function () { // Проверка валидности полей личных данных
                let errors = [];
                if(this.name.length > 0 && this.name.length < 2){
                    errors.push('Имя должно содержать более 2х символов!');
                }
                if(this.last_name.length > 0 && this.last_name.length < 2){
                    errors.push('Фамилия должна содержать более 2х символов!');
                }
                if(this.patronymic.length > 0 && this.patronymic.length < 2){
                    errors.push('Отчество должно содержать более 2х символов!');
                }
                if(this.address.length > 0 && this.address.length < 10){
                    errors.push('Адрес должен содержать не менее 10 символов!');
                }
                if(this.document_number.length > 0 && this.document_number.length < 5){
                    errors.push('Серия и номер удостоверяющего документа должены содержать не менее 5 символов!');
                }
                if(!(/[0-9]{2}-[0-9]{2}-[0-9]{4}/.test(this.birth)) && this.birth !== ''){
                    errors.push('Необходимо полностью заполнить дату рождения!');
                }
                return errors;
            },
            privateSaveDisabled: function () {
                return this.name.length < 2 || this.last_name.length < 2 || this.patronymic.length < 2 || this.address.length < 10 || this.document_number.length < 5 || !(/[0-9]{2}-[0-9]{2}-[0-9]{4}/.test(this.birth));
            },
            privateDataIsset: function () { // Проверка блокировать ли поля личных данных
                return this.document_first_page_verify_at || this.document_second_page_verify_at || this.document_additional_verify_at || this.document_first_page || this.document_second_page || this.document_additional;
            },
            password_error: function () { // Проверка блокировать ли поля личных данных
                let errors = [];
                if(this.current_password.length > 0 && this.current_password.length < 6){
                    errors.push('Текущий пароль не может быть короче 6 символов!');
                }
                if(this.new_password.length > 0 && this.new_password.length < 8){
                    errors.push('Новый пароль не может быть короче 8 символов!');
                }
                if(this.repeat_password.length > 0 && this.repeat_password.length < 8){
                    errors.push('Повтор нового пароля не может быть короче 8 символов!');
                }
                if(this.current_password === this.new_password && this.current_password.length >= 6 && this.new_password.length >= 8){
                    errors.push('Новый пароль совпадает со старым!');
                }
                if(this.new_password.length >= 8 && this.repeat_password.length >= 8 && this.new_password !== this.repeat_password){
                    errors.push('Повтор пароля не совпадает с новым паролем!');
                }
                return errors;
            },
            passwordSaveDisabled: function () {
                return this.current_password.length < 6 || this.new_password.length < 8 || this.repeat_password.length < 8 || this.new_password !== this.repeat_password || this.current_password === this.new_password && this.current_password.length >= 6 && this.new_password.length >= 8;
            },
            main_error: function () { // Проверка правильности ввода оснровных параметров профиля
                let errors = [];
                if(this.nickname.length > 0 && this.nickname.length < 3){
                    errors.push('Никнейм не может быть короче 3 символов!');
                }
                if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email)) && this.email !== ''){
                    errors.push('Введите корректный email адрес!');
                }
                if(!(/\+\d{6,20}/.test(this.phone)) && this.phone !== ''){
                    errors.push('Введите корректный номер телефона!');
                }
                return errors;
            },
            phoneSendDisabled: function(){
                return !(/\+\d{6,20}/.test(this.phone));
            },
            emailSendDisabled: function(){
                return !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email));
            },
            mainSaveDisabled: function () {
                return this.nickname.length < 3 || !(/\+\d{6,20}/.test(this.phone)) || !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email));
            },
            checkPhoneCodeDisabled: function () {
                return !(/\d{4}/.test(this.phoneCode));
            },
            checkEmailCodeDisabled: function () {
                return !(/\d{4}/.test(this.emailCode));
            }
        }
    }
</script>

<style scoped>
 .alert-paddings {
     padding-top:8px;padding-bottom:8px;
 }
</style>