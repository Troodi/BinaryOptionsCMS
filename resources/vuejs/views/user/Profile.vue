<template>
    <div class="content-wrapper">
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
<!--                                            <input type="text" class="form-control" placeholder="">-->
                                            <fieldset class="form-group position-relative">
                                                <input readonly="readonly" type="text" class="form-control" style="opacity: 1;">
                                                <div class="form-control-position" style="top: 12px;">
                                                    <span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span>
                                                </div>
                                            </fieldset>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Email</label>
<!--                                            <input type="text" class="form-control" placeholder="">-->
                                            <fieldset class="form-group position-relative">
                                                <input readonly="readonly" type="text" class="form-control" style="opacity: 1;">
                                                <div class="form-control-position" style="top: 12px;">
                                                    <span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span>
                                                </div>
                                            </fieldset>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Телефон*</label>
<!--                                            <input type="text" class="form-control" placeholder="">-->
                                            <fieldset class="form-group position-relative">
                                                <input readonly="readonly" type="text" class="form-control" style="opacity: 1;">
                                                <div class="form-control-position" style="top: 12px;">
                                                    <span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span>
                                                </div>
                                            </fieldset>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Telegram для связи</label>
                                            <fieldset class="form-group position-relative">
                                                <input readonly="readonly" type="text" class="form-control" style="opacity: 1;">
                                                <div class="form-control-position" style="top: 12px;">
                                                    <span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span>
                                                </div>
                                            </fieldset>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Пол</label>
                                            <fieldset class="form-group position-relative">
                                                <input readonly="readonly" type="text" class="form-control" style="opacity: 1;">
                                                <div class="form-control-position" style="top: 12px;">
                                                    <span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span>
                                                </div>
                                            </fieldset>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Язык</label>
                                            <fieldset class="form-group position-relative">
                                                <input readonly="readonly" type="text" class="form-control" style="opacity: 1;">
                                                <div class="form-control-position" style="top: 12px;">
                                                    <span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span>
                                                </div>
                                            </fieldset>
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
                                            <fieldset class="form-group position-relative">
                                                <input readonly="readonly" type="text" class="form-control" style="opacity: 1;">
                                                <div class="form-control-position" style="top: 12px;">
                                                    <span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span>
                                                </div>
                                            </fieldset>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Новый пароль</label>
                                            <fieldset class="form-group position-relative">
                                                <input readonly="readonly" type="text" class="form-control" style="opacity: 1;">
                                                <div class="form-control-position" style="top: 12px;">
                                                    <span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span>
                                                </div>
                                            </fieldset>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Повтор нового пароля</label>
                                            <fieldset class="form-group position-relative">
                                                <input readonly="readonly" type="text" class="form-control" style="opacity: 1;">
                                                <div class="form-control-position" style="top: 12px;">
                                                    <span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span>
                                                </div>
                                            </fieldset>
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
                            <h4 class="card-title">Личные данные</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Фамилия</label>
                                            <fieldset class="form-group position-relative">
                                                <input readonly="readonly" type="text" class="form-control" style="opacity: 1;">
                                                <div class="form-control-position" style="top: 12px;">
                                                    <span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span>
                                                </div>
                                            </fieldset>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Имя</label>
                                            <fieldset class="form-group position-relative">
                                                <input readonly="readonly" type="text" class="form-control" style="opacity: 1;">
                                                <div class="form-control-position" style="top: 12px;">
                                                    <span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span>
                                                </div>
                                            </fieldset>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Отчество</label>
                                            <fieldset class="form-group position-relative">
                                                <input readonly="readonly" type="text" class="form-control" style="opacity: 1;">
                                                <div class="form-control-position" style="top: 12px;">
                                                    <span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span>
                                                </div>
                                            </fieldset>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Дата рождения</label>
                                            <fieldset class="form-group position-relative">
                                                <input readonly="readonly" type="text" class="form-control" style="opacity: 1;">
                                                <div class="form-control-position" style="top: 12px;">
                                                    <span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span>
                                                </div>
                                            </fieldset>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Адрес регистрации</label>
                                            <fieldset class="form-group position-relative">
                                                <input readonly="readonly" type="text" class="form-control" style="opacity: 1;">
                                                <div class="form-control-position" style="top: 12px;">
                                                    <span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span>
                                                </div>
                                            </fieldset>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Серия и номер удостоверяющего документа</label>
                                            <fieldset class="form-group position-relative">
                                                <input readonly="readonly" type="text" class="form-control" style="opacity: 1;">
                                                <div class="form-control-position" style="top: 12px;">
                                                    <span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span>
                                                </div>
                                            </fieldset>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-8">
                                        <p>
                                            Используются только для верификации личности, это необходимо для защиты от отмывания денег.
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
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Первая страница паспорта</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <fieldset>
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01">
                                            <label class="custom-file-label" for="inputGroupFile01"><span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span></label>
                                        </div>
                                    </div>
                                </fieldset>
                                <div class="row mt-1">
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
                            <h4 class="card-title">Страница с пропиской</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <fieldset>
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="inputGroupFile02" aria-describedby="inputGroupFileAddon01">
                                            <label class="custom-file-label" for="inputGroupFile02"><span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span> Выберите изображение</label>
                                        </div>
                                    </div>
                                </fieldset>
                                <div class="row mt-1">
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
                                <fieldset>
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="inputGroupFile03" aria-describedby="inputGroupFileAddon01">
                                            <label class="custom-file-label" for="inputGroupFile03"><span role="status" aria-hidden="true" class="spinner-border spinner-grow-sm"></span></label>
                                        </div>
                                    </div>
                                </fieldset>
                                <div class="row mt-1">
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
    export default {
        name: "Profile"
    }
</script>

<style scoped>

</style>