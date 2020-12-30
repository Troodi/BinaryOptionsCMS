<template>
    <div class="content-wrapper">
        <div class="modal fade text-left" id="phone" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" id="myModalLabel1">{{ $i18n.t('profile_confirm_phone_number') }}</h3>
                        <button type="button" class="close rounded-pill" data-dismiss="modal" aria-label="Close">
                            <i class="bx bx-x"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>
                          {{ $i18n.t('profile_call_made') }} <code>{{ $i18n.t('profile_do_not_answer') }}</code> {{ $i18n.t('profile_3_tries') }}
                        </p>

                        <div v-for="value in phoneModalErrors" class="alert bg-rgba-danger alert-dismissible mb-2" role="alert">
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

                        <div v-for="value in phoneModalSuccess" class="alert bg-rgba-success alert-dismissible mb-2" role="alert">
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

                        <div class="input-group">
                            <input v-model="phoneCode" type="text" class="form-control" v-mask="'9999'">
                            <div v-show="phoneCodeEnabled" class="input-group-append">
                                <button @click="sendPhoneCode" class="btn btn-primary" type="button">{{ $i18n.t('profile_make_call') }}</button>
                            </div>
                            <vue-countdown-timer v-show="!phoneCodeEnabled" class="input-group-append" :start-time="'2020-01-01 00:00:00'" :end-time="phoneTime" :interval="1000">
                                <template slot="countdown" slot-scope="scope">
                                    <button disabled="disabled" class="btn btn-primary" type="button">{{ $i18n.t('profile_repeat') }} ({{ scope.props.seconds }})</button>
                                </template>
                            </vue-countdown-timer>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light-secondary" data-dismiss="modal">
                            <i class="bx bx-x d-block d-sm-none"></i>
                            <span class="d-none d-sm-block">{{ $i18n.t('profile_close') }}</span>
                        </button>
                        <button v-bind:disabled="checkPhoneCodeDisabled" @click="checkPhoneCode" type="button" class="btn btn-primary ml-1">
                            <i class="bx bx-check d-block d-sm-none"></i>
                            <span class="d-none d-sm-block">{{ $i18n.t('profile_confirm') }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade text-left" id="email" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">{{ $i18n.t('profile_confirm_email') }}</h3>
                        <button type="button" class="close rounded-pill" data-dismiss="modal" aria-label="Close">
                            <i class="bx bx-x"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>
                          {{ $i18n.t('profile_email_be_send') }}
                        </p>

                        <div v-for="value in emailModalErrors" class="alert bg-rgba-danger alert-dismissible mb-2" role="alert">
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

                        <div v-for="value in emailModalSuccess" class="alert bg-rgba-success alert-dismissible mb-2" role="alert">
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

                        <div class="input-group">
                            <input v-model="emailCode" type="text" class="form-control" v-mask="'9999'">
                            <div v-show="emailCodeEnabled" class="input-group-append">
                                <button @click="sendEmailCode" class="btn btn-primary" type="button">{{ $i18n.t('profile_send_code') }}</button>
                            </div>
                            <vue-countdown-timer v-show="!emailCodeEnabled" class="input-group-append" :start-time="'2020-01-01 00:00:00'" :end-time="emailTime" :interval="1000">
                                <template slot="countdown" slot-scope="scope">
                                    <button disabled="disabled" class="btn btn-primary" type="button">{{ $i18n.t('profile_repeat') }} ({{ scope.props.seconds }})</button>
                                </template>
                            </vue-countdown-timer>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light-secondary" data-dismiss="modal">
                            <i class="bx bx-x d-block d-sm-none"></i>
                            <span class="d-none d-sm-block">{{ $i18n.t('profile_close') }}</span>
                        </button>
                        <button v-bind:disabled="checkEmailCodeDisabled" @click="checkEmailCode" type="button" class="btn btn-primary ml-1">
                            <i class="bx bx-check d-block d-sm-none"></i>
                            <span class="d-none d-sm-block">{{ $i18n.t('profile_confirm') }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="content-body">
            <div class="row">
                <div class="col-md-12">

                    <div v-for="value in general_error" class="alert bg-rgba-danger alert-dismissible mb-2" role="alert">
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

                    <div v-for="value in general_success" class="alert bg-rgba-success alert-dismissible mb-2" role="alert">
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
                            <h4 class="card-title">{{ $i18n.t('profile_general') }}</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>{{ $i18n.t('profile_nickname') }}</label>
                                            <input type="text" class="form-control" v-model="nickname">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>Email</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" v-model="email" v-bind:disabled="email_verified_at && !isAdmin" v-mask="'*{1,25}@*{1,15}.*{1,7}'">
                                                <div class="input-group-append" v-if="isAdmin">
                                                  <button v-bind:disabled="emailSendDisabled" class="btn btn-primary" type="button" @click="updateEmail">{{ $i18n.t('profile_refresh') }}</button>
                                                </div>
                                                <div class="input-group-append" v-if="!email_verified_at && !isAdmin">
                                                    <button v-bind:disabled="emailSendDisabled" class="btn btn-primary" type="button" data-toggle="modal" data-target="#email">{{ $i18n.t('profile_confirm') }}</button>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>{{ $i18n.t('profile_phone') }}*</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" v-model="phone" v-bind:disabled="phone_verify_at && !isAdmin" v-mask="'+9{9,20}'">
                                                <div class="input-group-append" v-if="isAdmin">
                                                  <button v-bind:disabled="phoneSendDisabled" @click="updatePhone" class="btn btn-primary" type="button">{{ $i18n.t('profile_refresh') }}</button>
                                                </div>
                                                <div class="input-group-append" v-if="!phone_verify_at && !isAdmin">
                                                  <button v-bind:disabled="phoneSendDisabled" class="btn btn-primary" type="button" data-toggle="modal" data-target="#phone">{{ $i18n.t('profile_confirm') }}</button>
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
                                            <label class="align-top">{{ $i18n.t('profile_gender') }}</label>
                                            <select2 v-model="gender" :options="genders" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label class="align-top">{{ $i18n.t('profile_language') }}</label>
                                            <select2 v-model="language" :options="options" :settings="{ settingOption: 'value', settingOption: 'value', minimumResultsForSearch: Infinity }"/>
                                        </fieldset>
                                    </div>
                                    <div class="col-md-8">
                                        <p>
                                          {{ $i18n.t('profile_dont_use_email') }}
                                        </p>
                                    </div>
                                    <div class="col-md-4">
                                        <button v-bind:disabled="mainSaveDisabled" @click="saveGeneral" type="button" class="btn btn-outline-primary float-right">{{ $i18n.t('profile_save') }}</button>
                                        <button type="button" @click="clearMain" class="btn btn-outline-danger float-right mr-1">{{ $i18n.t('profile_clear') }}</button>
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
                    <h4 class="card-title">{{ $i18n.t('profile_connect_social') }}</h4>
                  </div>
                  <div class="card-content">
                    <div class="card-body">
                      <div class="d-flex flex-md-row flex-column justify-content-around">
                        <a v-bind:class="{ 'disabled': disable_google || isAdmin }" href="/login/google" class="btn btn-social btn-google btn-block font-small-3 mr-md-1 mb-md-0 mb-1">
                          <i class="bx bxl-google font-medium-3"></i>
                          <span class="pl-50 d-block text-center">Google <small class="text-white" v-show="disable_google">({{ $i18n.t('profile_connected') }})</small></span>
                        </a>
                        <a v-bind:class="{ 'disabled': disable_facebook || isAdmin }" href="/login/facebook" class="btn btn-social btn-block mt-0 btn-facebook font-small-3">
                          <i class="bx bxl-facebook-square font-medium-3"></i>
                          <span class="pl-50 d-block text-center">Facebook <small class="text-white" v-show="disable_facebook">({{ $i18n.t('profile_connected') }})</small></span>
                        </a>
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

            <div v-for="value in password_success" class="alert bg-rgba-success alert-dismissible mb-2" role="alert">
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
                            <h4 class="card-title">{{ $i18n.t('profile_change_password') }}</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>{{ $i18n.t('profile_current_password') }}</label>
                                            <input type="text" class="form-control" v-model="current_password">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>{{ $i18n.t('profile_new_password') }}</label>
                                            <input type="text" class="form-control" v-model="new_password">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>{{ $i18n.t('profile_repeat_new_password') }}</label>
                                            <input type="text" class="form-control" v-model="repeat_password">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-8">
                                        <p>
                                          {{ $i18n.t('profile_save_password') }}
                                        </p>
                                    </div>
                                    <div class="col-md-4">
                                        <button type="button" @click="changePassword" class="btn btn-outline-primary float-right" v-bind:disabled="passwordSaveDisabled">{{ $i18n.t('profile_save') }}</button>
                                        <button type="button" @click="clearPassword" class="btn btn-outline-danger float-right mr-1">{{ $i18n.t('profile_clear') }}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-show="!user_verify_at" class="alert bg-rgba-warning mb-2" role="alert">
              <div class="d-flex align-items-center">
                <i class="bx bx-error-circle"></i>
                <span>
                  {{ $i18n.t('profile_dont_verified') }}
                </span>
              </div>
            </div>

            <div v-show="user_verify_at" class="alert bg-rgba-success mb-2" role="alert">
              <div class="d-flex align-items-center">
                <i class="bx bx-error-circle"></i>
                <span>
                  {{ $i18n.t('profile_verified') }}
                </span>
              </div>
            </div>

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

            <div v-for="value in main_success" class="alert bg-rgba-success alert-dismissible mb-2" role="alert">
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
                            <h4 class="card-title">{{ $i18n.t('profile_main') }} <small><i>({{ $i18n.t('profile_from_document') }})</i></small></h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>{{ $i18n.t('profile_last_name') }}</label>
                                            <input type="text" class="form-control" v-model="last_name" v-bind:disabled="privateDataIsset">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>{{ $i18n.t('profile_name') }}</label>
                                            <input type="text" class="form-control" v-model="name" v-bind:disabled="privateDataIsset">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>{{ $i18n.t('profile_patronymic') }} <small><i>({{ $i18n.t('profile_if_have') }})</i></small></label>
                                            <input type="text" class="form-control" v-model="patronymic" v-bind:disabled="privateDataIsset">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>{{ $i18n.t('profile_birth') }}</label>
                                            <input type="text" class="form-control" v-model="birth" v-bind:disabled="privateDataIsset" v-mask="'99-99-9999'">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>{{ $i18n.t('profile_registration') }}</label>
                                            <input type="text" class="form-control" v-model="address" v-bind:disabled="privateDataIsset">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-4">
                                        <fieldset class="form-group">
                                            <label>{{ $i18n.t('profile_document_number') }}</label>
                                            <input type="text" class="form-control" v-model="document_number" v-bind:disabled="privateDataIsset">
                                        </fieldset>
                                    </div>
                                    <div class="col-md-7">
                                        <p>
                                          {{ $i18n.t('profile_only_for_verify') }}
                                        </p>
                                    </div>
                                    <div class="col-md-5">
                                        <button v-show="!privateDataIsset" @click="saveMain" v-bind:disabled="privateSaveDisabled" type="button" class="btn btn-outline-primary float-right">{{ $i18n.t('profile_save') }}</button>
                                        <button v-show="!privateDataIsset && isAdmin" @click="verifyAccount" type="button" class="btn btn-outline-success float-right mr-1">{{ $i18n.t('profile_verify') }}</button>
                                        <button v-show="!privateDataIsset" @click="clearPrivate" type="button" class="btn btn-outline-danger float-right mr-1">{{ $i18n.t('profile_clear') }}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-for="value in fileError" class="alert bg-rgba-danger alert-dismissible mb-2" role="alert">
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

            <div v-for="value in fileSuccess" class="alert bg-rgba-success alert-dismissible mb-2" role="alert">
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
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ $i18n.t('profile_first_page') }}</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div v-show="firstDocumentLoading" class="alert bg-rgba-warning mb-0 alert-paddings" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-info-circle"></i>
                                        <span>
                                          {{ $i18n.t('profile_uploading') }}
                                        </span>
                                    </div>
                                </div>

                                <div v-show="document_first_page && !document_first_page_verify_at && !firstDocumentLoading" class="alert bg-rgba-primary mb-0 alert-paddings" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-info-circle"></i>
                                        <span>
                                          {{ $i18n.t('profile_checking') }}
                                        </span>
                                    </div>
                                </div>

                                <div v-show="document_first_page_verify_at" class="alert bg-rgba-success mb-0 alert-paddings" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-info-circle"></i>
                                        <span>
                                          {{ $i18n.t('profile_approved') }}
                                        </span>
                                    </div>
                                </div>

                                <div v-if="document_first_page && isAdmin" class="row">
                                  <div class="col-md-12">
                                    <a :href="'/admin/image/'+document_first_page" target="_blank">
                                      <img :src="'/admin/image/'+document_first_page" class="w-100 mt-1" style="border-radius: 3px;">
                                    </a>
                                  </div>
                                  <div class="col-md-12 mt-1">
                                    <textarea placeholder="Комментарий для пользователя..." class="form-control" style="height: 100px;" v-model="comment_first"></textarea>
                                  </div>
                                  <div class="col-md-4 mt-1">
                                    <button @click="actionVerify(comment_first, 0, 1)" type="button" class="btn btn-outline-warning w-100">{{ $i18n.t('profile_decline') }}</button>
                                  </div>
                                  <div class="col-md-4 mt-1">
                                    <button @click="actionVerify(comment_first, 2, 1)" type="button" class="btn btn-outline-danger w-100">{{ $i18n.t('profile_remove') }}</button>
                                  </div>
                                  <div class="col-md-4 mt-1">
                                    <button @click="actionVerify(comment_first, 1, 1)" type="button" class="btn btn-outline-primary w-100">{{ $i18n.t('profile_checked') }}</button>
                                  </div>
                                </div>

                                <fieldset v-show="!document_first_page && !document_first_page_verify_at">
                                    <div class="input-group">
                                        <b-form-file accept="image/jpg, image/jpeg, image/png, image/gif" v-on:change="firstUpload" v-model="document_first_page" :state="Boolean(document_first_page)" :placeholder="$i18n.t('profile_select_image')" :drop-placeholder="$i18n.t('profile_move_file')"></b-form-file>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ $i18n.t('profile_page_with_registration') }}</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div v-show="secondDocumentLoading" class="alert bg-rgba-warning mb-0 alert-paddings" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-info-circle"></i>
                                        <span>
                                          {{ $i18n.t('profile_uploading') }}
                                        </span>
                                    </div>
                                </div>

                                <div v-show="document_second_page && !document_second_page_verify_at && !secondDocumentLoading" class="alert bg-rgba-primary mb-0 alert-paddings" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-info-circle"></i>
                                        <span>
                                          {{ $i18n.t('profile_checking') }}
                                        </span>
                                    </div>
                                </div>

                                <div v-show="document_second_page_verify_at" class="alert bg-rgba-success mb-0 alert-paddings" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-info-circle"></i>
                                        <span>
                                          {{ $i18n.t('profile_approved') }}
                                        </span>
                                    </div>
                                </div>

                                <div v-if="document_second_page && isAdmin" class="row">
                                  <div class="col-md-12">
                                    <a :href="'/admin/image/'+document_second_page" target="_blank">
                                      <img :src="'/admin/image/'+document_second_page" class="w-100 mt-1" style="border-radius: 3px;">
                                    </a>
                                  </div>
                                  <div class="col-md-12 mt-1">
                                    <textarea placeholder="Комментарий для пользователя..." class="form-control" style="height: 100px;" v-model="comment_second"></textarea>
                                  </div>
                                  <div class="col-md-4 mt-1">
                                    <button @click="actionVerify(comment_second, 0, 2)" type="button" class="btn btn-outline-warning w-100">{{ $i18n.t('profile_decline') }}</button>
                                  </div>
                                  <div class="col-md-4 mt-1">
                                    <button @click="actionVerify(comment_second, 2, 2)" type="button" class="btn btn-outline-danger w-100">{{ $i18n.t('profile_remove') }}</button>
                                  </div>
                                  <div class="col-md-4 mt-1">
                                    <button @click="actionVerify(comment_second, 1, 2)" type="button" class="btn btn-outline-primary w-100">{{ $i18n.t('profile_checked') }}</button>
                                  </div>
                                </div>

                                <fieldset v-show="!document_second_page && !document_second_page_verify_at">
                                    <div class="input-group">
                                        <b-form-file accept="image/jpg, image/jpeg, image/png, image/gif" v-on:change="secondUpload" v-model="document_second_page" :state="Boolean(document_second_page)" :placeholder="$i18n.t('profile_select_image')" :drop-placeholder="$i18n.t('profile_move_file')"></b-form-file>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ $i18n.t('profile_additional_document') }}</h4>
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <div v-show="additionalDocumentLoading" class="alert bg-rgba-warning mb-0 alert-paddings" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-info-circle"></i>
                                        <span>
                                          {{ $i18n.t('profile_uploading') }}
                                        </span>
                                    </div>
                                </div>

                                <div v-show="document_additional && !document_additional_verify_at && !additionalDocumentLoading" class="alert bg-rgba-primary mb-0 alert-paddings" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-info-circle"></i>
                                        <span>
                                          {{ $i18n.t('profile_checking') }}
                                        </span>
                                    </div>
                                </div>

                                <div v-show="document_additional_verify_at" class="alert bg-rgba-success mb-0 alert-paddings" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="bx bx-info-circle"></i>
                                        <span>
                                          {{ $i18n.t('profile_approved') }}
                                        </span>
                                    </div>
                                </div>

                                <div v-if="document_additional && isAdmin" class="row">
                                  <div class="col-md-12">
                                    <a :href="'/admin/image/'+document_additional" target="_blank">
                                      <img :src="'/admin/image/'+document_additional" class="w-100 mt-1" style="border-radius: 3px;">
                                    </a>
                                  </div>
                                  <div class="col-md-12 mt-1">
                                    <textarea placeholder="Комментарий для пользователя..." class="form-control" style="height: 100px;" v-model="comment_third"></textarea>
                                  </div>
                                  <div class="col-md-4 mt-1">
                                    <button @click="actionVerify(comment_third, 0, 3)" type="button" class="btn btn-outline-warning w-100">{{ $i18n.t('profile_decline') }}</button>
                                  </div>
                                  <div class="col-md-4 mt-1">
                                    <button @click="actionVerify(comment_third, 2, 3)" type="button" class="btn btn-outline-danger w-100">{{ $i18n.t('profile_remove') }}</button>
                                  </div>
                                  <div class="col-md-4 mt-1">
                                    <button @click="actionVerify(comment_third, 1, 3)" type="button" class="btn btn-outline-primary w-100">{{ $i18n.t('profile_checked') }}</button>
                                  </div>
                                </div>

                                <fieldset v-show="!document_additional && !document_additional_verify_at">
                                    <div class="input-group">
                                        <b-form-file accept="image/jpg, image/jpeg, image/png, image/gif" v-on:change="additionalUpload" v-model="document_additional" :state="Boolean(document_additional)" :placeholder="$i18n.t('profile_select_image')" :drop-placeholder="$i18n.t('profile_move_file')"></b-form-file>
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
            actionVerify: function(message, status, page){ // 0 - отклонить без удаления файлов, 1 - подтвердить, 2 - удалить
              let self = this;
              axios.post('/admin/data/checkDocument', {
                id: self.userId,
                comment: message,
                status: status,
                page: page
              }).then((response) => {
                if(response.data.success === true) {
                  toastr.success(response.data.message, self.$i18n.t('profile_success'), {
                    positionClass: 'toast-bottom-left',
                    containerId: 'toast-bottom-left'
                  });
                  self.getProfile();
                } else {
                  toastr.error(response.data.message, self.$i18n.t('profile_error'), {
                    positionClass: 'toast-bottom-left',
                    containerId: 'toast-bottom-left'
                  });
                }
              });
            },
            sendDocument: function (event, page){
                this.fileError = [];
                this.fileSuccess = [];
                let formData = new FormData();
                formData.append('file', event.target.files[0]);
                formData.append('page', page);
                let self = this;
                if(page === '1'){
                    this.firstDocumentLoading = true;
                } else if (page === '2') {
                    this.secondDocumentLoading = true;
                } else if (page === '3') {
                    this.additionalDocumentLoading = true;
                }

                axios.post( this.isAdmin ? '/data/sendPhoto/'+this.userId : '/data/sendPhoto', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
                    .then(function(response){
                        let page = response.data.page;
                        if(response.data.success === true) {
                            self.fileSuccess.push(response.data.message);
                            if(page === '1'){
                                self.firstDocumentLoading = false;
                            } else if (page === '2') {
                                self.secondDocumentLoading = false;
                            } else if (page === '3') {
                                self.additionalDocumentLoading = false;
                            }
                            self.getProfile();
                        } else {
                            self.fileError.push(response.data.message);
                            if(page === '1'){
                                self.document_first_page = null;
                                self.firstDocumentLoading = false;
                            } else if (page === '2') {
                                self.document_second_page = null;
                                self.secondDocumentLoading = false;
                            } else if (page === '3') {
                                self.document_additional = null;
                                self.additionalDocumentLoading = false;
                            }
                        }
                    }).catch(function(error){
                      self.fileError = error.response.data.errors.file;
                      if(page === '1'){
                        self.document_first_page = null;
                        self.firstDocumentLoading = false;
                      } else if (page === '2') {
                        self.document_second_page = null;
                        self.secondDocumentLoading = false;
                      } else if (page === '3') {
                        self.document_additional = null;
                        self.additionalDocumentLoading = false;
                      }
                    });
            },
            firstUpload: function(event){
                this.sendDocument(event, '1');
            },
            secondUpload: function(event){
                this.sendDocument(event, '2');
            },
            additionalUpload: function(event){
                this.sendDocument(event, '3');
            },
            getProfile: function(){
                let self = this;
                let url = '/data/profile';
                if(this.isAdmin){
                  url = '/data/profile/'+this.$route.params.id;
                }
                axios.post(url)
                    .then(function (response) {
                        self.email = response.data.email ? response.data.email : '';
                        self.nickname = response.data.name ? response.data.name : '';
                        self.address = response.data.profile.address ? response.data.profile.address : '';
                        self.birth = dateformat(response.data.profile.birth, 'dd-mm-yyyy');
                        self.email_verified_at = response.data.email_verified_at;
                        self.document_additional = response.data.profile.document_additional ? response.data.profile.document_additional : null;
                        self.document_first_page = response.data.profile.document_first_page ? response.data.profile.document_first_page : null;
                        self.document_number = response.data.profile.document_number ? response.data.profile.document_number : '';
                        self.document_second_page = response.data.profile.document_second_page ? response.data.profile.document_second_page : null;
                        self.gender = response.data.profile.gender ? response.data.profile.gender : 0;
                        self.language = response.data.profile.language ? response.data.profile.language : 'en';
                        self.last_name = response.data.profile.last_name ? response.data.profile.last_name : '';
                        self.name = response.data.profile.name ? response.data.profile.name : '';
                        self.patronymic = response.data.profile.patronymic ? response.data.profile.patronymic : '';
                        self.phone = response.data.profile.phone ? response.data.profile.phone : '';
                        self.phone_verify_at = response.data.profile.phone_verify_at;
                        self.telegram = response.data.profile.telegram ? response.data.profile.telegram : '';
                        self.document_first_page_verify_at = response.data.profile.document_first_page_verify_at;
                        self.document_second_page_verify_at = response.data.profile.document_second_page_verify_at;
                        self.document_additional_verify_at = response.data.profile.document_additional_verify_at;
                        self.user_verify_at = response.data.profile.user_verify_at;
                        self.provider = response.data.provider;
                    });
            },
            changePassword: function () {
                let self = this;
                let url = '/data/changePassword';
                let data = {
                  old_password: self.current_password,
                  new_password: self.new_password,
                  repeat_password: self.repeat_password
                };
                if(this.isAdmin){
                  url = '/admin/data/updatePassword';
                  data = {
                    password: self.new_password,
                    id: this.$route.params.id
                  };
                }
                axios.post(url, data).then(function (response) {
                    self.password_error = [];
                    self.password_success = [];
                    if(response.data.success === true) {
                        self.password_success.push(response.data.message);
                    } else {
                        self.password_error.push(response.data.message);
                    }
                })
            },
            saveGeneral: function(){
                let self = this;
                let url = '/data/changeGeneralData';
                if(this.isAdmin){
                  url = '/data/changeGeneralData/'+this.$route.params.id;
                }
                axios.post(url, {
                    nickname: self.nickname,
                    telegram: self.telegram,
                    gender: self.gender,
                    language: self.language
                }).then(function (response) {
                    self.general_error = [];
                    self.general_success = [];
                    if(response.data.success === true) {
                        self.general_success.push(response.data.message);
                    } else {
                        self.general_error.push(response.data.message);
                    }
                })
            },
            saveMain: function(){
                let self = this;
                axios.post(this.isAdmin ? '/data/changeMainData/'+this.userId : '/data/changeMainData', {
                    name: self.name,
                    last_name: self.last_name,
                    patronymic: self.patronymic,
                    address: self.address,
                    document_number: self.document_number,
                    birth: self.birth
                }).then(function (response) {
                    self.main_error = [];
                    self.main_success = [];
                    if(response.data.success === true) {
                        self.main_success.push(response.data.message);
                    } else {
                        self.main_error.push(response.data.message);
                    }
                })
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
                this.phoneModalSuccess = [];
                this.phoneModalErrors = [];
                axios.post('/data/checkPhoneCode', { code: this.phoneCode }).then((response) => {
                    if(response.data.success === true) {
                        $('#phone').modal('hide');
                        $('.modal-backdrop').remove();
                        this.getProfile();
                    } else {
                        this.phoneModalErrors.push(response.data.message);
                    }
                });
            },
            sendPhoneCode: function () {
                this.phoneModalErrors = [];
                this.phoneModalSuccess = [];
                axios.post('/data/verifyPhone', { phone: this.phone }).then((response) => {
                    if(response.data.success === false) {
                      self.phoneModalErrors = [];
                      self.phoneModalErrors.push(response.data.message);
                    } else {
                      self.phoneModalSuccess = [];
                      self.phoneModalSuccess.push(response.data.message);
                    }
                });
                this.phoneCodeEnabled = false;
                this.phoneTime = Date.now() + 60000;
                let self = this;
                setTimeout(() => {
                    self.phoneCodeEnabled = true;
                }, 60000);
            },
            checkEmailCode: function () {
                this.emailModalSuccess = [];
                this.emailModalErrors = [];
                axios.post('/data/checkEmailCode', { code: this.emailCode }).then((response) => {
                    if(response.data.success === true) {
                        $('#email').modal('hide');
                        $('.modal-backdrop').remove();
                        this.getProfile();
                    } else {
                        this.emailModalErrors.push(response.data.message);
                    }
                });
            },
            verifyAccount: function (){
              let self = this;
              axios.post('/admin/data/verifyAccount', { id: this.$route.params.id }).then((response) => {
                if(response.data.success === true) {
                  toastr.success(response.data.message, self.$i18n.t('profile_success'), {
                    positionClass: 'toast-bottom-left',
                    containerId: 'toast-bottom-left'
                  });
                  self.getProfile();
                } else {
                  toastr.error(response.data.message, self.$i18n.t('profile_error'), {
                    positionClass: 'toast-bottom-left',
                    containerId: 'toast-bottom-left'
                  });
                }
              });
            },
            updatePhone: function (){
              axios.post('/admin/data/updatePhone', { phone: this.phone, id: this.$route.params.id }).then((response) => {
                if(response.data.success === true) {
                  toastr.success(response.data.message, self.$i18n.t('profile_success'), {
                    positionClass: 'toast-bottom-left',
                    containerId: 'toast-bottom-left'
                  });
                } else {
                  toastr.error(response.data.message, self.$i18n.t('profile_error'), {
                    positionClass: 'toast-bottom-left',
                    containerId: 'toast-bottom-left'
                  });
                }
              });
            },
            updateEmail: function (){
              axios.post('/admin/data/updateEmail', { email: this.email, id: this.$route.params.id }).then((response) => {
                if(response.data.success === true) {
                  toastr.success(response.data.message, self.$i18n.t('profile_success'), {
                    positionClass: 'toast-bottom-left',
                    containerId: 'toast-bottom-left'
                  });
                } else {
                  toastr.error(response.data.message, self.$i18n.t('profile_error'), {
                    positionClass: 'toast-bottom-left',
                    containerId: 'toast-bottom-left'
                  });
                }
              });
            },
            sendEmailCode: function () {
                this.emailModalErrors = [];
                this.emailModalSuccess = [];
                axios.post('/data/verifyEmail', { email: this.email }).then((response) => {
                    if(response.data.success === false) {
                        this.emailModalErrors = [];
                        this.emailModalErrors.push(response.data.message);
                    } else {
                        this.emailModalSuccess = [];
                        this.emailModalSuccess.push(response.data.message);
                    }
                });
                this.emailCodeEnabled = false;
                this.emailTime = Date.now() + 60000;
                let self = this;
                setTimeout(() => {
                    self.emailCodeEnabled = true;
                }, 60000);
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
                phoneCodeEnabled: true,
                emailCodeEnabled: true,
                phoneTime: true,
                emailTime: true,
                phoneModalErrors: [],
                phoneModalSuccess: [],
                emailModalErrors: [],
                emailModalSuccess: [],
                options: [
                    { id: "ru", text: "Русский" },
                    { id: "en", text: "English" },
                ],
                genders: [
                    { id: "0", text: this.$i18n.t('profile_man') },
                    { id: "1", text: this.$i18n.t('profile_woman') },
                ],
                phoneCode: '',
                emailCode: '',
                fileError: [],
                fileSuccess: [],
                firstDocumentLoading: false,
                secondDocumentLoading: false,
                additionalDocumentLoading: false,
                main_success: [],
                general_success: [],
                password_success: [],
                user_verify_at: null,
                provider: [],
                comment_first: '',
                comment_second: '',
                comment_third: '',
            }
        },
        computed: {
            disable_google: function (){
              return typeof this.provider.find(x => x.provider === 'google') !== 'undefined';
            },
            disable_facebook: function (){
              return typeof this.provider.find(x => x.provider === 'facebook') !== 'undefined';
            },
            main_error: function () { // Проверка валидности полей личных данных
                let errors = [];
                if(this.name.length > 0 && this.name.length < 2){
                    errors.push(this.$i18n.t('profile_name_more'));
                }
                if(this.last_name.length > 0 && this.last_name.length < 2){
                    errors.push(this.$i18n.t('profile_last_name_more'));
                }
                if(this.patronymic.length > 0 && this.patronymic.length < 2){
                    errors.push(this.$i18n.t('profile_patronymic_more'));
                }
                if(this.address.length > 0 && this.address.length < 10){
                    errors.push(this.$i18n.t('profile_address_more'));
                }
                if(this.document_number.length > 0 && this.document_number.length < 5){
                    errors.push(this.$i18n.t('profile_document_number_more'));
                }
                if(!(/[0-9]{2}-[0-9]{2}-[0-9]{4}/.test(this.birth)) && this.birth !== ''){
                    errors.push(this.$i18n.t('profile_birth_full'));
                }
                return errors;
            },
            privateSaveDisabled: function () {
                if(this.isAdmin){
                  return false;
                }
                return this.name.length < 2 || this.last_name.length < 2 || this.patronymic.length < 2 || this.address.length < 10 || this.document_number.length < 5 || !(/[0-9]{2}-[0-9]{2}-[0-9]{4}/.test(this.birth));
            },
            privateDataIsset: function () { // Проверка блокировать ли поля личных данных
                if(this.isAdmin){
                  return false;
                }
                return this.document_first_page_verify_at || this.document_second_page_verify_at || this.document_additional_verify_at || this.document_first_page || this.document_second_page || this.document_additional;
            },
            documentsLoading: function (){
                return this.firstDocumentLoading && this.secondDocumentLoading && this.additionalDocumentLoading;
            },
            password_error: function () { // Проверка блокировать ли поля личных данных
                let errors = [];
                if(this.current_password.length > 0 && this.current_password.length < 6 && !this.isAdmin){
                    errors.push(this.$i18n.t('profile_current_password_more'));
                }
                if(this.new_password.length > 0 && this.new_password.length < 8){
                    errors.push(this.$i18n.t('profile_new_password_more'));
                }
                if(this.repeat_password.length > 0 && this.repeat_password.length < 8){
                    errors.push(this.$i18n.t('profile_repeat_password_more'));
                }
                if(this.current_password === this.new_password && this.current_password.length >= 6 && this.new_password.length >= 8 && !this.isAdmin){
                    errors.push(this.$i18n.t('profile_new_password_same'));
                }
                if(this.new_password.length >= 8 && this.repeat_password.length >= 8 && this.new_password !== this.repeat_password){
                    errors.push(this.$i18n.t('profile_not_equal_password'));
                }
                return errors;
            },
            passwordSaveDisabled: function () {
                if(this.isAdmin){
                  return this.new_password.length < 8 || this.repeat_password.length < 8 || this.new_password !== this.repeat_password;
                } else {
                  return this.current_password.length < 6 || this.new_password.length < 8 || this.repeat_password.length < 8 || this.new_password !== this.repeat_password || this.current_password === this.new_password && this.current_password.length >= 6 && this.new_password.length >= 8;
                }
            },
            isAdmin: function (){
              return this.$route.meta.isAdmin;
            },
            userId: function (){
              return this.$route.params.id;
            },
            general_error: function () { // Проверка правильности ввода оснровных параметров профиля
                let errors = [];
                if(this.nickname.length > 0 && this.nickname.length < 3){
                    errors.push(this.$i18n.t('profile_nickname_more'));
                }
                if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email)) && this.email !== ''){
                    errors.push(this.$i18n.t('profile_enter_email'));
                }
                if(!(/\+\d{6,20}/.test(this.phone)) && this.phone !== ''){
                    errors.push(this.$i18n.t('profile_enter_phone'));
                }
                return errors;
            },
            phoneSendDisabled: function(){
                return !(/\+\d{6,20}/.test(this.phone));
            },
            emailSendDisabled: function(){
                return !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email));
            },
            mainSaveDisabled: function () { // Информация никнейм
                return this.nickname.length < 3;
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