(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_vuejs_views_user_Profile_vue-_386f0"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Profile.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Profile.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var v_select2_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! v-select2-component */ "./node_modules/v-select2-component/dist/Select2.esm.js");
/* harmony import */ var dateformat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dateformat */ "./node_modules/dateformat/lib/dateformat.js");
/* harmony import */ var dateformat__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dateformat__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_the_mask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-the-mask */ "./node_modules/vue-the-mask/dist/vue-the-mask.js");
/* harmony import */ var vue_the_mask__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_the_mask__WEBPACK_IMPORTED_MODULE_2__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Profile",
  directives: {
    mask: vue_the_mask__WEBPACK_IMPORTED_MODULE_2__.mask
  },
  mounted: function mounted() {
    this.getProfile();
  },
  methods: {
    actionVerify: function actionVerify(message, status, page) {
      // 0 - отклонить без удаления файлов, 1 - подтвердить, 2 - удалить
      var self = this;
      axios.post('/admin/data/checkDocument', {
        id: self.userId,
        comment: message,
        status: status,
        page: page
      }).then(function (response) {
        if (response.data.success === true) {
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
    sendDocument: function sendDocument(event, page) {
      this.fileError = [];
      this.fileSuccess = [];
      var formData = new FormData();
      formData.append('file', event.target.files[0]);
      formData.append('page', page);
      var self = this;

      if (page === '1') {
        this.firstDocumentLoading = true;
      } else if (page === '2') {
        this.secondDocumentLoading = true;
      } else if (page === '3') {
        this.additionalDocumentLoading = true;
      }

      axios.post(this.isAdmin ? '/data/sendPhoto/' + this.userId : '/data/sendPhoto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        var page = response.data.page;

        if (response.data.success === true) {
          self.fileSuccess.push(response.data.message);

          if (page === '1') {
            self.firstDocumentLoading = false;
          } else if (page === '2') {
            self.secondDocumentLoading = false;
          } else if (page === '3') {
            self.additionalDocumentLoading = false;
          }

          self.getProfile();
        } else {
          self.fileError.push(response.data.message);

          if (page === '1') {
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
      })["catch"](function (error) {
        self.fileError = error.response.data.errors.file;

        if (page === '1') {
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
    firstUpload: function firstUpload(event) {
      this.sendDocument(event, '1');
    },
    secondUpload: function secondUpload(event) {
      this.sendDocument(event, '2');
    },
    additionalUpload: function additionalUpload(event) {
      this.sendDocument(event, '3');
    },
    getProfile: function getProfile() {
      var self = this;
      var url = '/data/profile';

      if (this.isAdmin) {
        url = '/data/profile/' + this.$route.params.id;
      }

      axios.post(url).then(function (response) {
        self.email = response.data.email ? response.data.email : '';
        self.nickname = response.data.name ? response.data.name : '';
        self.address = response.data.profile.address ? response.data.profile.address : '';
        self.birth = dateformat__WEBPACK_IMPORTED_MODULE_1___default()(response.data.profile.birth, 'dd-mm-yyyy');
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
    changePassword: function changePassword() {
      var self = this;
      var url = '/data/changePassword';
      var data = {
        old_password: self.current_password,
        new_password: self.new_password,
        repeat_password: self.repeat_password
      };

      if (this.isAdmin) {
        url = '/admin/data/updatePassword';
        data = {
          password: self.new_password,
          id: this.$route.params.id
        };
      }

      axios.post(url, data).then(function (response) {
        self.password_error = [];
        self.password_success = [];

        if (response.data.success === true) {
          self.password_success.push(response.data.message);
        } else {
          self.password_error.push(response.data.message);
        }
      });
    },
    saveGeneral: function saveGeneral() {
      var self = this;
      var url = '/data/changeGeneralData';

      if (this.isAdmin) {
        url = '/data/changeGeneralData/' + this.$route.params.id;
      }

      axios.post(url, {
        nickname: self.nickname,
        telegram: self.telegram,
        gender: self.gender,
        language: self.language
      }).then(function (response) {
        self.general_error = [];
        self.general_success = [];

        if (response.data.success === true) {
          self.general_success.push(response.data.message);
        } else {
          self.general_error.push(response.data.message);
        }
      });
    },
    saveMain: function saveMain() {
      var self = this;
      axios.post(this.isAdmin ? '/data/changeMainData/' + this.userId : '/data/changeMainData', {
        name: self.name,
        last_name: self.last_name,
        patronymic: self.patronymic,
        address: self.address,
        document_number: self.document_number,
        birth: self.birth
      }).then(function (response) {
        self.main_error = [];
        self.main_success = [];

        if (response.data.success === true) {
          self.main_success.push(response.data.message);
        } else {
          self.main_error.push(response.data.message);
        }
      });
    },
    clearPassword: function clearPassword() {
      this.current_password = '';
      this.new_password = '';
      this.repeat_password = '';
    },
    clearPrivate: function clearPrivate() {
      this.name = '';
      this.last_name = '';
      this.patronymic = '';
      this.address = '';
      this.document_number = '';
      this.birth = '';
    },
    clearMain: function clearMain() {
      this.nickname = '';
      this.telegram = '';
    },
    checkPhoneCode: function checkPhoneCode() {
      var _this = this;

      this.phoneModalSuccess = [];
      this.phoneModalErrors = [];
      axios.post('/data/checkPhoneCode', {
        code: this.phoneCode
      }).then(function (response) {
        if (response.data.success === true) {
          $('#phone').modal('hide');
          $('.modal-backdrop').remove();

          _this.getProfile();
        } else {
          _this.phoneModalErrors.push(response.data.message);
        }
      });
    },
    sendPhoneCode: function sendPhoneCode() {
      this.phoneModalErrors = [];
      this.phoneModalSuccess = [];
      axios.post('/data/verifyPhone', {
        phone: this.phone
      }).then(function (response) {
        if (response.data.success === false) {
          self.phoneModalErrors = [];
          self.phoneModalErrors.push(response.data.message);
        } else {
          self.phoneModalSuccess = [];
          self.phoneModalSuccess.push(response.data.message);
        }
      });
      this.phoneCodeEnabled = false;
      this.phoneTime = Date.now() + 60000;
      var self = this;
      setTimeout(function () {
        self.phoneCodeEnabled = true;
      }, 60000);
    },
    checkEmailCode: function checkEmailCode() {
      var _this2 = this;

      this.emailModalSuccess = [];
      this.emailModalErrors = [];
      axios.post('/data/checkEmailCode', {
        code: this.emailCode
      }).then(function (response) {
        if (response.data.success === true) {
          $('#email').modal('hide');
          $('.modal-backdrop').remove();

          _this2.getProfile();
        } else {
          _this2.emailModalErrors.push(response.data.message);
        }
      });
    },
    verifyAccount: function verifyAccount() {
      var self = this;
      axios.post('/admin/data/verifyAccount', {
        id: this.$route.params.id
      }).then(function (response) {
        if (response.data.success === true) {
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
    updatePhone: function updatePhone() {
      axios.post('/admin/data/updatePhone', {
        phone: this.phone,
        id: this.$route.params.id
      }).then(function (response) {
        if (response.data.success === true) {
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
    updateEmail: function updateEmail() {
      axios.post('/admin/data/updateEmail', {
        email: this.email,
        id: this.$route.params.id
      }).then(function (response) {
        if (response.data.success === true) {
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
    sendEmailCode: function sendEmailCode() {
      var _this3 = this;

      this.emailModalErrors = [];
      this.emailModalSuccess = [];
      axios.post('/data/verifyEmail', {
        email: this.email
      }).then(function (response) {
        if (response.data.success === false) {
          _this3.emailModalErrors = [];

          _this3.emailModalErrors.push(response.data.message);
        } else {
          _this3.emailModalSuccess = [];

          _this3.emailModalSuccess.push(response.data.message);
        }
      });
      this.emailCodeEnabled = false;
      this.emailTime = Date.now() + 60000;
      var self = this;
      setTimeout(function () {
        self.emailCodeEnabled = true;
      }, 60000);
    }
  },
  data: function data() {
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
      options: [{
        id: "ru",
        text: "Русский"
      }, {
        id: "en",
        text: "English"
      }],
      genders: [{
        id: "0",
        text: this.$i18n.t('profile_man')
      }, {
        id: "1",
        text: this.$i18n.t('profile_woman')
      }],
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
      comment_third: ''
    };
  },
  computed: {
    disable_google: function disable_google() {
      return typeof this.provider.find(function (x) {
        return x.provider === 'google';
      }) !== 'undefined';
    },
    disable_facebook: function disable_facebook() {
      return typeof this.provider.find(function (x) {
        return x.provider === 'facebook';
      }) !== 'undefined';
    },
    main_error: function main_error() {
      // Проверка валидности полей личных данных
      var errors = [];

      if (this.name.length > 0 && this.name.length < 2) {
        errors.push(this.$i18n.t('profile_name_more'));
      }

      if (this.last_name.length > 0 && this.last_name.length < 2) {
        errors.push(this.$i18n.t('profile_last_name_more'));
      }

      if (this.patronymic.length > 0 && this.patronymic.length < 2) {
        errors.push(this.$i18n.t('profile_patronymic_more'));
      }

      if (this.address.length > 0 && this.address.length < 10) {
        errors.push(this.$i18n.t('profile_address_more'));
      }

      if (this.document_number.length > 0 && this.document_number.length < 5) {
        errors.push(this.$i18n.t('profile_document_number_more'));
      }

      if (!/[0-9]{2}-[0-9]{2}-[0-9]{4}/.test(this.birth) && this.birth !== '') {
        errors.push(this.$i18n.t('profile_birth_full'));
      }

      return errors;
    },
    privateSaveDisabled: function privateSaveDisabled() {
      if (this.isAdmin) {
        return false;
      }

      return this.name.length < 2 || this.last_name.length < 2 || this.patronymic.length < 2 || this.address.length < 10 || this.document_number.length < 5 || !/[0-9]{2}-[0-9]{2}-[0-9]{4}/.test(this.birth);
    },
    privateDataIsset: function privateDataIsset() {
      // Проверка блокировать ли поля личных данных
      if (this.isAdmin) {
        return false;
      }

      return this.document_first_page_verify_at || this.document_second_page_verify_at || this.document_additional_verify_at || this.document_first_page || this.document_second_page || this.document_additional;
    },
    documentsLoading: function documentsLoading() {
      return this.firstDocumentLoading && this.secondDocumentLoading && this.additionalDocumentLoading;
    },
    password_error: function password_error() {
      // Проверка блокировать ли поля личных данных
      var errors = [];

      if (this.current_password.length > 0 && this.current_password.length < 6 && !this.isAdmin) {
        errors.push(this.$i18n.t('profile_current_password_more'));
      }

      if (this.new_password.length > 0 && this.new_password.length < 8) {
        errors.push(this.$i18n.t('profile_new_password_more'));
      }

      if (this.repeat_password.length > 0 && this.repeat_password.length < 8) {
        errors.push(this.$i18n.t('profile_repeat_password_more'));
      }

      if (this.current_password === this.new_password && this.current_password.length >= 6 && this.new_password.length >= 8 && !this.isAdmin) {
        errors.push(this.$i18n.t('profile_new_password_same'));
      }

      if (this.new_password.length >= 8 && this.repeat_password.length >= 8 && this.new_password !== this.repeat_password) {
        errors.push(this.$i18n.t('profile_not_equal_password'));
      }

      return errors;
    },
    passwordSaveDisabled: function passwordSaveDisabled() {
      if (this.isAdmin) {
        return this.new_password.length < 8 || this.repeat_password.length < 8 || this.new_password !== this.repeat_password;
      } else {
        return this.current_password.length < 6 || this.new_password.length < 8 || this.repeat_password.length < 8 || this.new_password !== this.repeat_password || this.current_password === this.new_password && this.current_password.length >= 6 && this.new_password.length >= 8;
      }
    },
    isAdmin: function isAdmin() {
      return this.$route.meta.isAdmin;
    },
    userId: function userId() {
      return this.$route.params.id;
    },
    general_error: function general_error() {
      // Проверка правильности ввода оснровных параметров профиля
      var errors = [];

      if (this.nickname.length > 0 && this.nickname.length < 3) {
        errors.push(this.$i18n.t('profile_nickname_more'));
      }

      if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email) && this.email !== '') {
        errors.push(this.$i18n.t('profile_enter_email'));
      }

      if (!/\+\d{6,20}/.test(this.phone) && this.phone !== '') {
        errors.push(this.$i18n.t('profile_enter_phone'));
      }

      return errors;
    },
    phoneSendDisabled: function phoneSendDisabled() {
      return !/\+\d{6,20}/.test(this.phone);
    },
    emailSendDisabled: function emailSendDisabled() {
      return !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email);
    },
    mainSaveDisabled: function mainSaveDisabled() {
      // Информация никнейм
      return this.nickname.length < 3;
    },
    checkPhoneCodeDisabled: function checkPhoneCodeDisabled() {
      return !/\d{4}/.test(this.phoneCode);
    },
    checkEmailCodeDisabled: function checkEmailCodeDisabled() {
      return !/\d{4}/.test(this.emailCode);
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Profile.vue?vue&type=style&index=0&id=e27cc684&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Profile.vue?vue&type=style&index=0&id=e27cc684&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.alert-paddings[data-v-e27cc684] {\n    padding-top:8px;padding-bottom:8px;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Profile.vue?vue&type=style&index=0&id=e27cc684&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Profile.vue?vue&type=style&index=0&id=e27cc684&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_style_index_0_id_e27cc684_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Profile.vue?vue&type=style&index=0&id=e27cc684&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Profile.vue?vue&type=style&index=0&id=e27cc684&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_style_index_0_id_e27cc684_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_style_index_0_id_e27cc684_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./resources/vuejs/views/user/Profile.vue":
/*!************************************************!*\
  !*** ./resources/vuejs/views/user/Profile.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Profile_vue_vue_type_template_id_e27cc684_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Profile.vue?vue&type=template&id=e27cc684&scoped=true& */ "./resources/vuejs/views/user/Profile.vue?vue&type=template&id=e27cc684&scoped=true&");
/* harmony import */ var _Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Profile.vue?vue&type=script&lang=js& */ "./resources/vuejs/views/user/Profile.vue?vue&type=script&lang=js&");
/* harmony import */ var _Profile_vue_vue_type_style_index_0_id_e27cc684_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Profile.vue?vue&type=style&index=0&id=e27cc684&scoped=true&lang=css& */ "./resources/vuejs/views/user/Profile.vue?vue&type=style&index=0&id=e27cc684&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Profile_vue_vue_type_template_id_e27cc684_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Profile_vue_vue_type_template_id_e27cc684_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "e27cc684",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/vuejs/views/user/Profile.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/vuejs/views/user/Profile.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/vuejs/views/user/Profile.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Profile.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Profile.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/vuejs/views/user/Profile.vue?vue&type=style&index=0&id=e27cc684&scoped=true&lang=css&":
/*!*********************************************************************************************************!*\
  !*** ./resources/vuejs/views/user/Profile.vue?vue&type=style&index=0&id=e27cc684&scoped=true&lang=css& ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_style_index_0_id_e27cc684_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Profile.vue?vue&type=style&index=0&id=e27cc684&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Profile.vue?vue&type=style&index=0&id=e27cc684&scoped=true&lang=css&");


/***/ }),

/***/ "./resources/vuejs/views/user/Profile.vue?vue&type=template&id=e27cc684&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/vuejs/views/user/Profile.vue?vue&type=template&id=e27cc684&scoped=true& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_template_id_e27cc684_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_template_id_e27cc684_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_template_id_e27cc684_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Profile.vue?vue&type=template&id=e27cc684&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Profile.vue?vue&type=template&id=e27cc684&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Profile.vue?vue&type=template&id=e27cc684&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Profile.vue?vue&type=template&id=e27cc684&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "content-wrapper" }, [
    _c(
      "div",
      {
        staticClass: "modal fade text-left",
        attrs: {
          id: "phone",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "myModalLabel1",
          "aria-hidden": "true",
          "data-keyboard": "false",
          "data-backdrop": "static"
        }
      },
      [
        _c(
          "div",
          {
            staticClass: "modal-dialog modal-dialog-scrollable",
            attrs: { role: "document" }
          },
          [
            _c("div", { staticClass: "modal-content" }, [
              _c("div", { staticClass: "modal-header" }, [
                _c(
                  "h3",
                  {
                    staticClass: "modal-title",
                    attrs: { id: "myModalLabel1" }
                  },
                  [_vm._v(_vm._s(_vm.$i18n.t("profile_confirm_phone_number")))]
                ),
                _vm._v(" "),
                _vm._m(0)
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "modal-body" },
                [
                  _c("p", [
                    _vm._v(
                      "\n                      " +
                        _vm._s(_vm.$i18n.t("profile_call_made")) +
                        " "
                    ),
                    _c("code", [
                      _vm._v(_vm._s(_vm.$i18n.t("profile_do_not_answer")))
                    ]),
                    _vm._v(
                      " " +
                        _vm._s(_vm.$i18n.t("profile_3_tries")) +
                        "\n                    "
                    )
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.phoneModalErrors, function(value) {
                    return _c(
                      "div",
                      {
                        staticClass:
                          "alert bg-rgba-danger alert-dismissible mb-2",
                        attrs: { role: "alert" }
                      },
                      [
                        _vm._m(1, true),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "d-flex align-items-center" },
                          [
                            _c("i", { staticClass: "bx bx-error" }),
                            _vm._v(" "),
                            _c("span", [
                              _vm._v(
                                "\n                              " +
                                  _vm._s(value) +
                                  "\n                            "
                              )
                            ])
                          ]
                        )
                      ]
                    )
                  }),
                  _vm._v(" "),
                  _vm._l(_vm.phoneModalSuccess, function(value) {
                    return _c(
                      "div",
                      {
                        staticClass:
                          "alert bg-rgba-success alert-dismissible mb-2",
                        attrs: { role: "alert" }
                      },
                      [
                        _vm._m(2, true),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "d-flex align-items-center" },
                          [
                            _c("i", { staticClass: "bx bx-error" }),
                            _vm._v(" "),
                            _c("span", [
                              _vm._v(
                                "\n                              " +
                                  _vm._s(value) +
                                  "\n                            "
                              )
                            ])
                          ]
                        )
                      ]
                    )
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "input-group" },
                    [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.phoneCode,
                            expression: "phoneCode"
                          },
                          {
                            name: "mask",
                            rawName: "v-mask",
                            value: "####",
                            expression: "'####'"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: { type: "text" },
                        domProps: { value: _vm.phoneCode },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.phoneCode = $event.target.value
                          }
                        }
                      }),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.phoneCodeEnabled,
                              expression: "phoneCodeEnabled"
                            }
                          ],
                          staticClass: "input-group-append"
                        },
                        [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-primary",
                              attrs: { type: "button" },
                              on: { click: _vm.sendPhoneCode }
                            },
                            [_vm._v(_vm._s(_vm.$i18n.t("profile_make_call")))]
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c("vue-countdown-timer", {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: !_vm.phoneCodeEnabled,
                            expression: "!phoneCodeEnabled"
                          }
                        ],
                        staticClass: "input-group-append",
                        attrs: {
                          "start-time": "2020-01-01 00:00:00",
                          "end-time": _vm.phoneTime,
                          interval: 1000
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "countdown",
                            fn: function(scope) {
                              return [
                                _c(
                                  "button",
                                  {
                                    staticClass: "btn btn-primary",
                                    attrs: {
                                      disabled: "disabled",
                                      type: "button"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(_vm.$i18n.t("profile_repeat")) +
                                        " (" +
                                        _vm._s(scope.props.seconds) +
                                        ")"
                                    )
                                  ]
                                )
                              ]
                            }
                          }
                        ])
                      })
                    ],
                    1
                  )
                ],
                2
              ),
              _vm._v(" "),
              _c("div", { staticClass: "modal-footer" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-light-secondary",
                    attrs: { type: "button", "data-dismiss": "modal" }
                  },
                  [
                    _c("i", { staticClass: "bx bx-x d-block d-sm-none" }),
                    _vm._v(" "),
                    _c("span", { staticClass: "d-none d-sm-block" }, [
                      _vm._v(_vm._s(_vm.$i18n.t("profile_close")))
                    ])
                  ]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-primary ml-1",
                    attrs: {
                      disabled: _vm.checkPhoneCodeDisabled,
                      type: "button"
                    },
                    on: { click: _vm.checkPhoneCode }
                  },
                  [
                    _c("i", { staticClass: "bx bx-check d-block d-sm-none" }),
                    _vm._v(" "),
                    _c("span", { staticClass: "d-none d-sm-block" }, [
                      _vm._v(_vm._s(_vm.$i18n.t("profile_confirm")))
                    ])
                  ]
                )
              ])
            ])
          ]
        )
      ]
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade text-left",
        attrs: {
          id: "email",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "myModalLabel1",
          "aria-hidden": "true",
          "data-keyboard": "false",
          "data-backdrop": "static"
        }
      },
      [
        _c(
          "div",
          {
            staticClass: "modal-dialog modal-dialog-scrollable",
            attrs: { role: "document" }
          },
          [
            _c("div", { staticClass: "modal-content" }, [
              _c("div", { staticClass: "modal-header" }, [
                _c("h3", { staticClass: "modal-title" }, [
                  _vm._v(_vm._s(_vm.$i18n.t("profile_confirm_email")))
                ]),
                _vm._v(" "),
                _vm._m(3)
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "modal-body" },
                [
                  _c("p", [
                    _vm._v(
                      "\n                      " +
                        _vm._s(_vm.$i18n.t("profile_email_be_send")) +
                        "\n                    "
                    )
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.emailModalErrors, function(value) {
                    return _c(
                      "div",
                      {
                        staticClass:
                          "alert bg-rgba-danger alert-dismissible mb-2",
                        attrs: { role: "alert" }
                      },
                      [
                        _vm._m(4, true),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "d-flex align-items-center" },
                          [
                            _c("i", { staticClass: "bx bx-error" }),
                            _vm._v(" "),
                            _c("span", [
                              _vm._v(
                                "\n                              " +
                                  _vm._s(value) +
                                  "\n                            "
                              )
                            ])
                          ]
                        )
                      ]
                    )
                  }),
                  _vm._v(" "),
                  _vm._l(_vm.emailModalSuccess, function(value) {
                    return _c(
                      "div",
                      {
                        staticClass:
                          "alert bg-rgba-success alert-dismissible mb-2",
                        attrs: { role: "alert" }
                      },
                      [
                        _vm._m(5, true),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "d-flex align-items-center" },
                          [
                            _c("i", { staticClass: "bx bx-error" }),
                            _vm._v(" "),
                            _c("span", [
                              _vm._v(
                                "\n                              " +
                                  _vm._s(value) +
                                  "\n                            "
                              )
                            ])
                          ]
                        )
                      ]
                    )
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "input-group" },
                    [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.emailCode,
                            expression: "emailCode"
                          },
                          {
                            name: "mask",
                            rawName: "v-mask",
                            value: "####",
                            expression: "'####'"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: { type: "text" },
                        domProps: { value: _vm.emailCode },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.emailCode = $event.target.value
                          }
                        }
                      }),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.emailCodeEnabled,
                              expression: "emailCodeEnabled"
                            }
                          ],
                          staticClass: "input-group-append"
                        },
                        [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-primary",
                              attrs: { type: "button" },
                              on: { click: _vm.sendEmailCode }
                            },
                            [_vm._v(_vm._s(_vm.$i18n.t("profile_send_code")))]
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c("vue-countdown-timer", {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: !_vm.emailCodeEnabled,
                            expression: "!emailCodeEnabled"
                          }
                        ],
                        staticClass: "input-group-append",
                        attrs: {
                          "start-time": "2020-01-01 00:00:00",
                          "end-time": _vm.emailTime,
                          interval: 1000
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "countdown",
                            fn: function(scope) {
                              return [
                                _c(
                                  "button",
                                  {
                                    staticClass: "btn btn-primary",
                                    attrs: {
                                      disabled: "disabled",
                                      type: "button"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(_vm.$i18n.t("profile_repeat")) +
                                        " (" +
                                        _vm._s(scope.props.seconds) +
                                        ")"
                                    )
                                  ]
                                )
                              ]
                            }
                          }
                        ])
                      })
                    ],
                    1
                  )
                ],
                2
              ),
              _vm._v(" "),
              _c("div", { staticClass: "modal-footer" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-light-secondary",
                    attrs: { type: "button", "data-dismiss": "modal" }
                  },
                  [
                    _c("i", { staticClass: "bx bx-x d-block d-sm-none" }),
                    _vm._v(" "),
                    _c("span", { staticClass: "d-none d-sm-block" }, [
                      _vm._v(_vm._s(_vm.$i18n.t("profile_close")))
                    ])
                  ]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-primary ml-1",
                    attrs: {
                      disabled: _vm.checkEmailCodeDisabled,
                      type: "button"
                    },
                    on: { click: _vm.checkEmailCode }
                  },
                  [
                    _c("i", { staticClass: "bx bx-check d-block d-sm-none" }),
                    _vm._v(" "),
                    _c("span", { staticClass: "d-none d-sm-block" }, [
                      _vm._v(_vm._s(_vm.$i18n.t("profile_confirm")))
                    ])
                  ]
                )
              ])
            ])
          ]
        )
      ]
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "content-body" },
      [
        _c("div", { staticClass: "row" }, [
          _c(
            "div",
            { staticClass: "col-md-12" },
            [
              _vm._l(_vm.general_error, function(value) {
                return _c(
                  "div",
                  {
                    staticClass: "alert bg-rgba-danger alert-dismissible mb-2",
                    attrs: { role: "alert" }
                  },
                  [
                    _vm._m(6, true),
                    _vm._v(" "),
                    _c("div", { staticClass: "d-flex align-items-center" }, [
                      _c("i", { staticClass: "bx bx-error" }),
                      _vm._v(" "),
                      _c("span", [
                        _vm._v(
                          "\n                          " +
                            _vm._s(value) +
                            "\n                        "
                        )
                      ])
                    ])
                  ]
                )
              }),
              _vm._v(" "),
              _vm._l(_vm.general_success, function(value) {
                return _c(
                  "div",
                  {
                    staticClass: "alert bg-rgba-success alert-dismissible mb-2",
                    attrs: { role: "alert" }
                  },
                  [
                    _vm._m(7, true),
                    _vm._v(" "),
                    _c("div", { staticClass: "d-flex align-items-center" }, [
                      _c("i", { staticClass: "bx bx-error" }),
                      _vm._v(" "),
                      _c("span", [
                        _vm._v(
                          "\n                          " +
                            _vm._s(value) +
                            "\n                        "
                        )
                      ])
                    ])
                  ]
                )
              }),
              _vm._v(" "),
              _c("div", { staticClass: "card" }, [
                _c("div", { staticClass: "card-header" }, [
                  _c("h4", { staticClass: "card-title" }, [
                    _vm._v(_vm._s(_vm.$i18n.t("profile_general")))
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "card-content" }, [
                  _c("div", { staticClass: "card-body" }, [
                    _c("div", { staticClass: "row" }, [
                      _c("div", { staticClass: "col-md-4" }, [
                        _c("fieldset", { staticClass: "form-group" }, [
                          _c("label", [
                            _vm._v(_vm._s(_vm.$i18n.t("profile_nickname")))
                          ]),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.nickname,
                                expression: "nickname"
                              }
                            ],
                            staticClass: "form-control",
                            attrs: { type: "text" },
                            domProps: { value: _vm.nickname },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.nickname = $event.target.value
                              }
                            }
                          })
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-md-4" }, [
                        _c("fieldset", { staticClass: "form-group" }, [
                          _c("label", [_vm._v("Email")]),
                          _vm._v(" "),
                          _c("div", { staticClass: "input-group" }, [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.email,
                                  expression: "email"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: {
                                type: "text",
                                disabled: _vm.email_verified_at && !_vm.isAdmin
                              },
                              domProps: { value: _vm.email },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.email = $event.target.value
                                }
                              }
                            }),
                            _vm._v(" "),
                            _vm.isAdmin
                              ? _c(
                                  "div",
                                  { staticClass: "input-group-append" },
                                  [
                                    _c(
                                      "button",
                                      {
                                        staticClass: "btn btn-primary",
                                        attrs: {
                                          disabled: _vm.emailSendDisabled,
                                          type: "button"
                                        },
                                        on: { click: _vm.updateEmail }
                                      },
                                      [
                                        _vm._v(
                                          _vm._s(_vm.$i18n.t("profile_refresh"))
                                        )
                                      ]
                                    )
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            !_vm.email_verified_at && !_vm.isAdmin
                              ? _c(
                                  "div",
                                  { staticClass: "input-group-append" },
                                  [
                                    _c(
                                      "button",
                                      {
                                        staticClass: "btn btn-primary",
                                        attrs: {
                                          disabled: _vm.emailSendDisabled,
                                          type: "button",
                                          "data-toggle": "modal",
                                          "data-target": "#email"
                                        }
                                      },
                                      [
                                        _vm._v(
                                          _vm._s(_vm.$i18n.t("profile_confirm"))
                                        )
                                      ]
                                    )
                                  ]
                                )
                              : _vm._e()
                          ])
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-md-4" }, [
                        _c("fieldset", { staticClass: "form-group" }, [
                          _c("label", [
                            _vm._v(_vm._s(_vm.$i18n.t("profile_phone")) + "*")
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "input-group" }, [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.phone,
                                  expression: "phone"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: {
                                type: "text",
                                disabled: _vm.phone_verify_at && !_vm.isAdmin,
                                placeholder: "+____________"
                              },
                              domProps: { value: _vm.phone },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.phone = $event.target.value
                                }
                              }
                            }),
                            _vm._v(" "),
                            _vm.isAdmin
                              ? _c(
                                  "div",
                                  { staticClass: "input-group-append" },
                                  [
                                    _c(
                                      "button",
                                      {
                                        staticClass: "btn btn-primary",
                                        attrs: {
                                          disabled: _vm.phoneSendDisabled,
                                          type: "button"
                                        },
                                        on: { click: _vm.updatePhone }
                                      },
                                      [
                                        _vm._v(
                                          _vm._s(_vm.$i18n.t("profile_refresh"))
                                        )
                                      ]
                                    )
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            !_vm.phone_verify_at && !_vm.isAdmin
                              ? _c(
                                  "div",
                                  { staticClass: "input-group-append" },
                                  [
                                    _c(
                                      "button",
                                      {
                                        staticClass: "btn btn-primary",
                                        attrs: {
                                          disabled: _vm.phoneSendDisabled,
                                          type: "button",
                                          "data-toggle": "modal",
                                          "data-target": "#phone"
                                        }
                                      },
                                      [
                                        _vm._v(
                                          _vm._s(_vm.$i18n.t("profile_confirm"))
                                        )
                                      ]
                                    )
                                  ]
                                )
                              : _vm._e()
                          ])
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-md-4" }, [
                        _c("fieldset", { staticClass: "form-group" }, [
                          _c("label", [_vm._v("Telegram")]),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.telegram,
                                expression: "telegram"
                              }
                            ],
                            staticClass: "form-control",
                            attrs: { type: "text", placeholder: "@_____" },
                            domProps: { value: _vm.telegram },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.telegram = $event.target.value
                              }
                            }
                          })
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-md-4" }, [
                        _c(
                          "fieldset",
                          { staticClass: "form-group" },
                          [
                            _c("label", { staticClass: "align-top" }, [
                              _vm._v(_vm._s(_vm.$i18n.t("profile_gender")))
                            ]),
                            _vm._v(" "),
                            _c("select2", {
                              attrs: {
                                options: _vm.genders,
                                settings: {
                                  settingOption: "value",
                                  settingOption: "value",
                                  minimumResultsForSearch: Infinity
                                }
                              },
                              model: {
                                value: _vm.gender,
                                callback: function($$v) {
                                  _vm.gender = $$v
                                },
                                expression: "gender"
                              }
                            })
                          ],
                          1
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-md-4" }, [
                        _c(
                          "fieldset",
                          { staticClass: "form-group" },
                          [
                            _c("label", { staticClass: "align-top" }, [
                              _vm._v(_vm._s(_vm.$i18n.t("profile_language")))
                            ]),
                            _vm._v(" "),
                            _c("select2", {
                              attrs: {
                                options: _vm.options,
                                settings: {
                                  settingOption: "value",
                                  settingOption: "value",
                                  minimumResultsForSearch: Infinity
                                }
                              },
                              model: {
                                value: _vm.language,
                                callback: function($$v) {
                                  _vm.language = $$v
                                },
                                expression: "language"
                              }
                            })
                          ],
                          1
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-md-8" }, [
                        _c("p", [
                          _vm._v(
                            "\n                                      " +
                              _vm._s(_vm.$i18n.t("profile_dont_use_email")) +
                              "\n                                    "
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-md-4" }, [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-outline-primary float-right",
                            attrs: {
                              disabled: _vm.mainSaveDisabled,
                              type: "button"
                            },
                            on: { click: _vm.saveGeneral }
                          },
                          [_vm._v(_vm._s(_vm.$i18n.t("profile_save")))]
                        ),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass:
                              "btn btn-outline-danger float-right mr-1",
                            attrs: { type: "button" },
                            on: { click: _vm.clearMain }
                          },
                          [_vm._v(_vm._s(_vm.$i18n.t("profile_clear")))]
                        )
                      ])
                    ])
                  ])
                ])
              ])
            ],
            2
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-md-12" }, [
            _c("div", { staticClass: "card" }, [
              _c("div", { staticClass: "card-header" }, [
                _c("h4", { staticClass: "card-title" }, [
                  _vm._v(_vm._s(_vm.$i18n.t("profile_connect_social")))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "card-content" }, [
                _c("div", { staticClass: "card-body" }, [
                  _c(
                    "div",
                    {
                      staticClass:
                        "d-flex flex-md-row flex-column justify-content-around"
                    },
                    [
                      _c(
                        "a",
                        {
                          staticClass:
                            "btn btn-social btn-google btn-block font-small-3 mr-md-1 mb-md-0 mb-1",
                          class: {
                            disabled: _vm.disable_google || _vm.isAdmin
                          },
                          attrs: { href: "/login/google" }
                        },
                        [
                          _c("i", {
                            staticClass: "bx bxl-google font-medium-3"
                          }),
                          _vm._v(" "),
                          _c(
                            "span",
                            { staticClass: "pl-50 d-block text-center" },
                            [
                              _vm._v("Google "),
                              _c(
                                "small",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: _vm.disable_google,
                                      expression: "disable_google"
                                    }
                                  ],
                                  staticClass: "text-white"
                                },
                                [
                                  _vm._v(
                                    "(" +
                                      _vm._s(_vm.$i18n.t("profile_connected")) +
                                      ")"
                                  )
                                ]
                              )
                            ]
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "a",
                        {
                          staticClass:
                            "btn btn-social btn-block mt-0 btn-facebook font-small-3",
                          class: {
                            disabled: _vm.disable_facebook || _vm.isAdmin
                          },
                          attrs: { href: "/login/facebook" }
                        },
                        [
                          _c("i", {
                            staticClass: "bx bxl-facebook-square font-medium-3"
                          }),
                          _vm._v(" "),
                          _c(
                            "span",
                            { staticClass: "pl-50 d-block text-center" },
                            [
                              _vm._v("Facebook "),
                              _c(
                                "small",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: _vm.disable_facebook,
                                      expression: "disable_facebook"
                                    }
                                  ],
                                  staticClass: "text-white"
                                },
                                [
                                  _vm._v(
                                    "(" +
                                      _vm._s(_vm.$i18n.t("profile_connected")) +
                                      ")"
                                  )
                                ]
                              )
                            ]
                          )
                        ]
                      )
                    ]
                  )
                ])
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _vm._l(_vm.password_error, function(value) {
          return _c(
            "div",
            {
              staticClass: "alert bg-rgba-danger alert-dismissible mb-2",
              attrs: { role: "alert" }
            },
            [
              _vm._m(8, true),
              _vm._v(" "),
              _c("div", { staticClass: "d-flex align-items-center" }, [
                _c("i", { staticClass: "bx bx-error" }),
                _vm._v(" "),
                _c("span", [
                  _vm._v(
                    "\n                    " +
                      _vm._s(value) +
                      "\n                  "
                  )
                ])
              ])
            ]
          )
        }),
        _vm._v(" "),
        _vm._l(_vm.password_success, function(value) {
          return _c(
            "div",
            {
              staticClass: "alert bg-rgba-success alert-dismissible mb-2",
              attrs: { role: "alert" }
            },
            [
              _vm._m(9, true),
              _vm._v(" "),
              _c("div", { staticClass: "d-flex align-items-center" }, [
                _c("i", { staticClass: "bx bx-error" }),
                _vm._v(" "),
                _c("span", [
                  _vm._v(
                    "\n                    " +
                      _vm._s(value) +
                      "\n                  "
                  )
                ])
              ])
            ]
          )
        }),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-md-12" }, [
            _c("div", { staticClass: "card" }, [
              _c("div", { staticClass: "card-header" }, [
                _c("h4", { staticClass: "card-title" }, [
                  _vm._v(_vm._s(_vm.$i18n.t("profile_change_password")))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "card-content" }, [
                _c("div", { staticClass: "card-body" }, [
                  _c("div", { staticClass: "row" }, [
                    _c("div", { staticClass: "col-md-4" }, [
                      _c("fieldset", { staticClass: "form-group" }, [
                        _c("label", [
                          _vm._v(
                            _vm._s(_vm.$i18n.t("profile_current_password"))
                          )
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.current_password,
                              expression: "current_password"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: { type: "text" },
                          domProps: { value: _vm.current_password },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.current_password = $event.target.value
                            }
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-4" }, [
                      _c("fieldset", { staticClass: "form-group" }, [
                        _c("label", [
                          _vm._v(_vm._s(_vm.$i18n.t("profile_new_password")))
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.new_password,
                              expression: "new_password"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: { type: "text" },
                          domProps: { value: _vm.new_password },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.new_password = $event.target.value
                            }
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-4" }, [
                      _c("fieldset", { staticClass: "form-group" }, [
                        _c("label", [
                          _vm._v(
                            _vm._s(_vm.$i18n.t("profile_repeat_new_password"))
                          )
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.repeat_password,
                              expression: "repeat_password"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: { type: "text" },
                          domProps: { value: _vm.repeat_password },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.repeat_password = $event.target.value
                            }
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-8" }, [
                      _c("p", [
                        _vm._v(
                          "\n                                      " +
                            _vm._s(_vm.$i18n.t("profile_save_password")) +
                            "\n                                    "
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-4" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-outline-primary float-right",
                          attrs: {
                            type: "button",
                            disabled: _vm.passwordSaveDisabled
                          },
                          on: { click: _vm.changePassword }
                        },
                        [_vm._v(_vm._s(_vm.$i18n.t("profile_save")))]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass:
                            "btn btn-outline-danger float-right mr-1",
                          attrs: { type: "button" },
                          on: { click: _vm.clearPassword }
                        },
                        [_vm._v(_vm._s(_vm.$i18n.t("profile_clear")))]
                      )
                    ])
                  ])
                ])
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: !_vm.user_verify_at,
                expression: "!user_verify_at"
              }
            ],
            staticClass: "alert bg-rgba-warning mb-2",
            attrs: { role: "alert" }
          },
          [
            _c("div", { staticClass: "d-flex align-items-center" }, [
              _c("i", { staticClass: "bx bx-error-circle" }),
              _vm._v(" "),
              _c("span", [
                _vm._v(
                  "\n              " +
                    _vm._s(_vm.$i18n.t("profile_dont_verified")) +
                    "\n            "
                )
              ])
            ])
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.user_verify_at,
                expression: "user_verify_at"
              }
            ],
            staticClass: "alert bg-rgba-success mb-2",
            attrs: { role: "alert" }
          },
          [
            _c("div", { staticClass: "d-flex align-items-center" }, [
              _c("i", { staticClass: "bx bx-error-circle" }),
              _vm._v(" "),
              _c("span", [
                _vm._v(
                  "\n              " +
                    _vm._s(_vm.$i18n.t("profile_verified")) +
                    "\n            "
                )
              ])
            ])
          ]
        ),
        _vm._v(" "),
        _vm._l(_vm.main_error, function(value) {
          return _c(
            "div",
            {
              staticClass: "alert bg-rgba-danger alert-dismissible mb-2",
              attrs: { role: "alert" }
            },
            [
              _vm._m(10, true),
              _vm._v(" "),
              _c("div", { staticClass: "d-flex align-items-center" }, [
                _c("i", { staticClass: "bx bx-error" }),
                _vm._v(" "),
                _c("span", [
                  _vm._v(
                    "\n                  " +
                      _vm._s(value) +
                      "\n                "
                  )
                ])
              ])
            ]
          )
        }),
        _vm._v(" "),
        _vm._l(_vm.main_success, function(value) {
          return _c(
            "div",
            {
              staticClass: "alert bg-rgba-success alert-dismissible mb-2",
              attrs: { role: "alert" }
            },
            [
              _vm._m(11, true),
              _vm._v(" "),
              _c("div", { staticClass: "d-flex align-items-center" }, [
                _c("i", { staticClass: "bx bx-error" }),
                _vm._v(" "),
                _c("span", [
                  _vm._v(
                    "\n                  " +
                      _vm._s(value) +
                      "\n                "
                  )
                ])
              ])
            ]
          )
        }),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-md-12" }, [
            _c("div", { staticClass: "card" }, [
              _c("div", { staticClass: "card-header" }, [
                _c("h4", { staticClass: "card-title" }, [
                  _vm._v(_vm._s(_vm.$i18n.t("profile_main")) + " "),
                  _c("small", [
                    _c("i", [
                      _vm._v(
                        "(" + _vm._s(_vm.$i18n.t("profile_from_document")) + ")"
                      )
                    ])
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "card-content" }, [
                _c("div", { staticClass: "card-body" }, [
                  _c("div", { staticClass: "row" }, [
                    _c("div", { staticClass: "col-md-4" }, [
                      _c("fieldset", { staticClass: "form-group" }, [
                        _c("label", [
                          _vm._v(_vm._s(_vm.$i18n.t("profile_last_name")))
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.last_name,
                              expression: "last_name"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            type: "text",
                            disabled: _vm.privateDataIsset
                          },
                          domProps: { value: _vm.last_name },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.last_name = $event.target.value
                            }
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-4" }, [
                      _c("fieldset", { staticClass: "form-group" }, [
                        _c("label", [
                          _vm._v(_vm._s(_vm.$i18n.t("profile_name")))
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.name,
                              expression: "name"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            type: "text",
                            disabled: _vm.privateDataIsset
                          },
                          domProps: { value: _vm.name },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.name = $event.target.value
                            }
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-4" }, [
                      _c("fieldset", { staticClass: "form-group" }, [
                        _c("label", [
                          _vm._v(
                            _vm._s(_vm.$i18n.t("profile_patronymic")) + " "
                          ),
                          _c("small", [
                            _c("i", [
                              _vm._v(
                                "(" +
                                  _vm._s(_vm.$i18n.t("profile_if_have")) +
                                  ")"
                              )
                            ])
                          ])
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.patronymic,
                              expression: "patronymic"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            type: "text",
                            disabled: _vm.privateDataIsset
                          },
                          domProps: { value: _vm.patronymic },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.patronymic = $event.target.value
                            }
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-4" }, [
                      _c("fieldset", { staticClass: "form-group" }, [
                        _c("label", [
                          _vm._v(_vm._s(_vm.$i18n.t("profile_birth")))
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.birth,
                              expression: "birth"
                            },
                            {
                              name: "mask",
                              rawName: "v-mask",
                              value: "##-##-####",
                              expression: "'##-##-####'"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            type: "text",
                            disabled: _vm.privateDataIsset
                          },
                          domProps: { value: _vm.birth },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.birth = $event.target.value
                            }
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-4" }, [
                      _c("fieldset", { staticClass: "form-group" }, [
                        _c("label", [
                          _vm._v(_vm._s(_vm.$i18n.t("profile_registration")))
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.address,
                              expression: "address"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            type: "text",
                            disabled: _vm.privateDataIsset
                          },
                          domProps: { value: _vm.address },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.address = $event.target.value
                            }
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-4" }, [
                      _c("fieldset", { staticClass: "form-group" }, [
                        _c("label", [
                          _vm._v(_vm._s(_vm.$i18n.t("profile_document_number")))
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.document_number,
                              expression: "document_number"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            type: "text",
                            disabled: _vm.privateDataIsset
                          },
                          domProps: { value: _vm.document_number },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.document_number = $event.target.value
                            }
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-7" }, [
                      _c("p", [
                        _vm._v(
                          "\n                                      " +
                            _vm._s(_vm.$i18n.t("profile_only_for_verify")) +
                            "\n                                    "
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-5" }, [
                      _c(
                        "button",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: !_vm.privateDataIsset,
                              expression: "!privateDataIsset"
                            }
                          ],
                          staticClass: "btn btn-outline-primary float-right",
                          attrs: {
                            disabled: _vm.privateSaveDisabled,
                            type: "button"
                          },
                          on: { click: _vm.saveMain }
                        },
                        [_vm._v(_vm._s(_vm.$i18n.t("profile_save")))]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: !_vm.privateDataIsset && _vm.isAdmin,
                              expression: "!privateDataIsset && isAdmin"
                            }
                          ],
                          staticClass:
                            "btn btn-outline-success float-right mr-1",
                          attrs: { type: "button" },
                          on: { click: _vm.verifyAccount }
                        },
                        [_vm._v(_vm._s(_vm.$i18n.t("profile_verify")))]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: !_vm.privateDataIsset,
                              expression: "!privateDataIsset"
                            }
                          ],
                          staticClass:
                            "btn btn-outline-danger float-right mr-1",
                          attrs: { type: "button" },
                          on: { click: _vm.clearPrivate }
                        },
                        [_vm._v(_vm._s(_vm.$i18n.t("profile_clear")))]
                      )
                    ])
                  ])
                ])
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _vm._l(_vm.fileError, function(value) {
          return _c(
            "div",
            {
              staticClass: "alert bg-rgba-danger alert-dismissible mb-2",
              attrs: { role: "alert" }
            },
            [
              _vm._m(12, true),
              _vm._v(" "),
              _c("div", { staticClass: "d-flex align-items-center" }, [
                _c("i", { staticClass: "bx bx-error" }),
                _vm._v(" "),
                _c("span", [
                  _vm._v(
                    "\n                      " +
                      _vm._s(value) +
                      "\n                    "
                  )
                ])
              ])
            ]
          )
        }),
        _vm._v(" "),
        _vm._l(_vm.fileSuccess, function(value) {
          return _c(
            "div",
            {
              staticClass: "alert bg-rgba-success alert-dismissible mb-2",
              attrs: { role: "alert" }
            },
            [
              _vm._m(13, true),
              _vm._v(" "),
              _c("div", { staticClass: "d-flex align-items-center" }, [
                _c("i", { staticClass: "bx bx-error" }),
                _vm._v(" "),
                _c("span", [
                  _vm._v(
                    "\n                      " +
                      _vm._s(value) +
                      "\n                    "
                  )
                ])
              ])
            ]
          )
        }),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-md-4" }, [
            _c("div", { staticClass: "card" }, [
              _c("div", { staticClass: "card-header" }, [
                _c("h4", { staticClass: "card-title" }, [
                  _vm._v(_vm._s(_vm.$i18n.t("profile_first_page")))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "card-content" }, [
                _c("div", { staticClass: "card-body" }, [
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.firstDocumentLoading,
                          expression: "firstDocumentLoading"
                        }
                      ],
                      staticClass: "alert bg-rgba-warning mb-0 alert-paddings",
                      attrs: { role: "alert" }
                    },
                    [
                      _c("div", { staticClass: "d-flex align-items-center" }, [
                        _c("i", { staticClass: "bx bx-info-circle" }),
                        _vm._v(" "),
                        _c("span", [
                          _vm._v(
                            "\n                                      " +
                              _vm._s(_vm.$i18n.t("profile_uploading")) +
                              "\n                                    "
                          )
                        ])
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value:
                            _vm.document_first_page &&
                            !_vm.document_first_page_verify_at &&
                            !_vm.firstDocumentLoading,
                          expression:
                            "document_first_page && !document_first_page_verify_at && !firstDocumentLoading"
                        }
                      ],
                      staticClass: "alert bg-rgba-primary mb-0 alert-paddings",
                      attrs: { role: "alert" }
                    },
                    [
                      _c("div", { staticClass: "d-flex align-items-center" }, [
                        _c("i", { staticClass: "bx bx-info-circle" }),
                        _vm._v(" "),
                        _c("span", [
                          _vm._v(
                            "\n                                      " +
                              _vm._s(_vm.$i18n.t("profile_checking")) +
                              "\n                                    "
                          )
                        ])
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.document_first_page_verify_at,
                          expression: "document_first_page_verify_at"
                        }
                      ],
                      staticClass: "alert bg-rgba-success mb-0 alert-paddings",
                      attrs: { role: "alert" }
                    },
                    [
                      _c("div", { staticClass: "d-flex align-items-center" }, [
                        _c("i", { staticClass: "bx bx-info-circle" }),
                        _vm._v(" "),
                        _c("span", [
                          _vm._v(
                            "\n                                      " +
                              _vm._s(_vm.$i18n.t("profile_approved")) +
                              "\n                                    "
                          )
                        ])
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _vm.document_first_page && _vm.isAdmin
                    ? _c("div", { staticClass: "row" }, [
                        _c("div", { staticClass: "col-md-12" }, [
                          _c(
                            "a",
                            {
                              attrs: {
                                href: "/admin/image/" + _vm.document_first_page,
                                target: "_blank"
                              }
                            },
                            [
                              _c("img", {
                                staticClass: "w-100 mt-1",
                                staticStyle: { "border-radius": "3px" },
                                attrs: {
                                  src: "/admin/image/" + _vm.document_first_page
                                }
                              })
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-12 mt-1" }, [
                          _c("textarea", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.comment_first,
                                expression: "comment_first"
                              }
                            ],
                            staticClass: "form-control",
                            staticStyle: { height: "100px" },
                            attrs: {
                              placeholder: "Комментарий для пользователя..."
                            },
                            domProps: { value: _vm.comment_first },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.comment_first = $event.target.value
                              }
                            }
                          })
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-4 mt-1" }, [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-outline-warning w-100",
                              attrs: { type: "button" },
                              on: {
                                click: function($event) {
                                  return _vm.actionVerify(
                                    _vm.comment_first,
                                    0,
                                    1
                                  )
                                }
                              }
                            },
                            [_vm._v(_vm._s(_vm.$i18n.t("profile_decline")))]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-4 mt-1" }, [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-outline-danger w-100",
                              attrs: { type: "button" },
                              on: {
                                click: function($event) {
                                  return _vm.actionVerify(
                                    _vm.comment_first,
                                    2,
                                    1
                                  )
                                }
                              }
                            },
                            [_vm._v(_vm._s(_vm.$i18n.t("profile_remove")))]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-4 mt-1" }, [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-outline-primary w-100",
                              attrs: { type: "button" },
                              on: {
                                click: function($event) {
                                  return _vm.actionVerify(
                                    _vm.comment_first,
                                    1,
                                    1
                                  )
                                }
                              }
                            },
                            [_vm._v(_vm._s(_vm.$i18n.t("profile_checked")))]
                          )
                        ])
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "fieldset",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value:
                            !_vm.document_first_page &&
                            !_vm.document_first_page_verify_at,
                          expression:
                            "!document_first_page && !document_first_page_verify_at"
                        }
                      ]
                    },
                    [
                      _c(
                        "div",
                        { staticClass: "input-group" },
                        [
                          _c("b-form-file", {
                            attrs: {
                              accept:
                                "image/jpg, image/jpeg, image/png, image/gif",
                              state: Boolean(_vm.document_first_page),
                              placeholder: _vm.$i18n.t("profile_select_image"),
                              "drop-placeholder": _vm.$i18n.t(
                                "profile_move_file"
                              )
                            },
                            on: { change: _vm.firstUpload },
                            model: {
                              value: _vm.document_first_page,
                              callback: function($$v) {
                                _vm.document_first_page = $$v
                              },
                              expression: "document_first_page"
                            }
                          })
                        ],
                        1
                      )
                    ]
                  )
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-md-4" }, [
            _c("div", { staticClass: "card" }, [
              _c("div", { staticClass: "card-header" }, [
                _c("h4", { staticClass: "card-title" }, [
                  _vm._v(_vm._s(_vm.$i18n.t("profile_page_with_registration")))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "card-content" }, [
                _c("div", { staticClass: "card-body" }, [
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.secondDocumentLoading,
                          expression: "secondDocumentLoading"
                        }
                      ],
                      staticClass: "alert bg-rgba-warning mb-0 alert-paddings",
                      attrs: { role: "alert" }
                    },
                    [
                      _c("div", { staticClass: "d-flex align-items-center" }, [
                        _c("i", { staticClass: "bx bx-info-circle" }),
                        _vm._v(" "),
                        _c("span", [
                          _vm._v(
                            "\n                                      " +
                              _vm._s(_vm.$i18n.t("profile_uploading")) +
                              "\n                                    "
                          )
                        ])
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value:
                            _vm.document_second_page &&
                            !_vm.document_second_page_verify_at &&
                            !_vm.secondDocumentLoading,
                          expression:
                            "document_second_page && !document_second_page_verify_at && !secondDocumentLoading"
                        }
                      ],
                      staticClass: "alert bg-rgba-primary mb-0 alert-paddings",
                      attrs: { role: "alert" }
                    },
                    [
                      _c("div", { staticClass: "d-flex align-items-center" }, [
                        _c("i", { staticClass: "bx bx-info-circle" }),
                        _vm._v(" "),
                        _c("span", [
                          _vm._v(
                            "\n                                      " +
                              _vm._s(_vm.$i18n.t("profile_checking")) +
                              "\n                                    "
                          )
                        ])
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.document_second_page_verify_at,
                          expression: "document_second_page_verify_at"
                        }
                      ],
                      staticClass: "alert bg-rgba-success mb-0 alert-paddings",
                      attrs: { role: "alert" }
                    },
                    [
                      _c("div", { staticClass: "d-flex align-items-center" }, [
                        _c("i", { staticClass: "bx bx-info-circle" }),
                        _vm._v(" "),
                        _c("span", [
                          _vm._v(
                            "\n                                      " +
                              _vm._s(_vm.$i18n.t("profile_approved")) +
                              "\n                                    "
                          )
                        ])
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _vm.document_second_page && _vm.isAdmin
                    ? _c("div", { staticClass: "row" }, [
                        _c("div", { staticClass: "col-md-12" }, [
                          _c(
                            "a",
                            {
                              attrs: {
                                href:
                                  "/admin/image/" + _vm.document_second_page,
                                target: "_blank"
                              }
                            },
                            [
                              _c("img", {
                                staticClass: "w-100 mt-1",
                                staticStyle: { "border-radius": "3px" },
                                attrs: {
                                  src:
                                    "/admin/image/" + _vm.document_second_page
                                }
                              })
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-12 mt-1" }, [
                          _c("textarea", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.comment_second,
                                expression: "comment_second"
                              }
                            ],
                            staticClass: "form-control",
                            staticStyle: { height: "100px" },
                            attrs: {
                              placeholder: "Комментарий для пользователя..."
                            },
                            domProps: { value: _vm.comment_second },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.comment_second = $event.target.value
                              }
                            }
                          })
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-4 mt-1" }, [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-outline-warning w-100",
                              attrs: { type: "button" },
                              on: {
                                click: function($event) {
                                  return _vm.actionVerify(
                                    _vm.comment_second,
                                    0,
                                    2
                                  )
                                }
                              }
                            },
                            [_vm._v(_vm._s(_vm.$i18n.t("profile_decline")))]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-4 mt-1" }, [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-outline-danger w-100",
                              attrs: { type: "button" },
                              on: {
                                click: function($event) {
                                  return _vm.actionVerify(
                                    _vm.comment_second,
                                    2,
                                    2
                                  )
                                }
                              }
                            },
                            [_vm._v(_vm._s(_vm.$i18n.t("profile_remove")))]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-4 mt-1" }, [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-outline-primary w-100",
                              attrs: { type: "button" },
                              on: {
                                click: function($event) {
                                  return _vm.actionVerify(
                                    _vm.comment_second,
                                    1,
                                    2
                                  )
                                }
                              }
                            },
                            [_vm._v(_vm._s(_vm.$i18n.t("profile_checked")))]
                          )
                        ])
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "fieldset",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value:
                            !_vm.document_second_page &&
                            !_vm.document_second_page_verify_at,
                          expression:
                            "!document_second_page && !document_second_page_verify_at"
                        }
                      ]
                    },
                    [
                      _c(
                        "div",
                        { staticClass: "input-group" },
                        [
                          _c("b-form-file", {
                            attrs: {
                              accept:
                                "image/jpg, image/jpeg, image/png, image/gif",
                              state: Boolean(_vm.document_second_page),
                              placeholder: _vm.$i18n.t("profile_select_image"),
                              "drop-placeholder": _vm.$i18n.t(
                                "profile_move_file"
                              )
                            },
                            on: { change: _vm.secondUpload },
                            model: {
                              value: _vm.document_second_page,
                              callback: function($$v) {
                                _vm.document_second_page = $$v
                              },
                              expression: "document_second_page"
                            }
                          })
                        ],
                        1
                      )
                    ]
                  )
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-md-4" }, [
            _c("div", { staticClass: "card" }, [
              _c("div", { staticClass: "card-header" }, [
                _c("h4", { staticClass: "card-title" }, [
                  _vm._v(_vm._s(_vm.$i18n.t("profile_additional_document")))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "card-content" }, [
                _c("div", { staticClass: "card-body" }, [
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.additionalDocumentLoading,
                          expression: "additionalDocumentLoading"
                        }
                      ],
                      staticClass: "alert bg-rgba-warning mb-0 alert-paddings",
                      attrs: { role: "alert" }
                    },
                    [
                      _c("div", { staticClass: "d-flex align-items-center" }, [
                        _c("i", { staticClass: "bx bx-info-circle" }),
                        _vm._v(" "),
                        _c("span", [
                          _vm._v(
                            "\n                                      " +
                              _vm._s(_vm.$i18n.t("profile_uploading")) +
                              "\n                                    "
                          )
                        ])
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value:
                            _vm.document_additional &&
                            !_vm.document_additional_verify_at &&
                            !_vm.additionalDocumentLoading,
                          expression:
                            "document_additional && !document_additional_verify_at && !additionalDocumentLoading"
                        }
                      ],
                      staticClass: "alert bg-rgba-primary mb-0 alert-paddings",
                      attrs: { role: "alert" }
                    },
                    [
                      _c("div", { staticClass: "d-flex align-items-center" }, [
                        _c("i", { staticClass: "bx bx-info-circle" }),
                        _vm._v(" "),
                        _c("span", [
                          _vm._v(
                            "\n                                      " +
                              _vm._s(_vm.$i18n.t("profile_checking")) +
                              "\n                                    "
                          )
                        ])
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.document_additional_verify_at,
                          expression: "document_additional_verify_at"
                        }
                      ],
                      staticClass: "alert bg-rgba-success mb-0 alert-paddings",
                      attrs: { role: "alert" }
                    },
                    [
                      _c("div", { staticClass: "d-flex align-items-center" }, [
                        _c("i", { staticClass: "bx bx-info-circle" }),
                        _vm._v(" "),
                        _c("span", [
                          _vm._v(
                            "\n                                      " +
                              _vm._s(_vm.$i18n.t("profile_approved")) +
                              "\n                                    "
                          )
                        ])
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _vm.document_additional && _vm.isAdmin
                    ? _c("div", { staticClass: "row" }, [
                        _c("div", { staticClass: "col-md-12" }, [
                          _c(
                            "a",
                            {
                              attrs: {
                                href: "/admin/image/" + _vm.document_additional,
                                target: "_blank"
                              }
                            },
                            [
                              _c("img", {
                                staticClass: "w-100 mt-1",
                                staticStyle: { "border-radius": "3px" },
                                attrs: {
                                  src: "/admin/image/" + _vm.document_additional
                                }
                              })
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-12 mt-1" }, [
                          _c("textarea", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.comment_third,
                                expression: "comment_third"
                              }
                            ],
                            staticClass: "form-control",
                            staticStyle: { height: "100px" },
                            attrs: {
                              placeholder: "Комментарий для пользователя..."
                            },
                            domProps: { value: _vm.comment_third },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.comment_third = $event.target.value
                              }
                            }
                          })
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-4 mt-1" }, [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-outline-warning w-100",
                              attrs: { type: "button" },
                              on: {
                                click: function($event) {
                                  return _vm.actionVerify(
                                    _vm.comment_third,
                                    0,
                                    3
                                  )
                                }
                              }
                            },
                            [_vm._v(_vm._s(_vm.$i18n.t("profile_decline")))]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-4 mt-1" }, [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-outline-danger w-100",
                              attrs: { type: "button" },
                              on: {
                                click: function($event) {
                                  return _vm.actionVerify(
                                    _vm.comment_third,
                                    2,
                                    3
                                  )
                                }
                              }
                            },
                            [_vm._v(_vm._s(_vm.$i18n.t("profile_remove")))]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-4 mt-1" }, [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-outline-primary w-100",
                              attrs: { type: "button" },
                              on: {
                                click: function($event) {
                                  return _vm.actionVerify(
                                    _vm.comment_third,
                                    1,
                                    3
                                  )
                                }
                              }
                            },
                            [_vm._v(_vm._s(_vm.$i18n.t("profile_checked")))]
                          )
                        ])
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "fieldset",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value:
                            !_vm.document_additional &&
                            !_vm.document_additional_verify_at,
                          expression:
                            "!document_additional && !document_additional_verify_at"
                        }
                      ]
                    },
                    [
                      _c(
                        "div",
                        { staticClass: "input-group" },
                        [
                          _c("b-form-file", {
                            attrs: {
                              accept:
                                "image/jpg, image/jpeg, image/png, image/gif",
                              state: Boolean(_vm.document_additional),
                              placeholder: _vm.$i18n.t("profile_select_image"),
                              "drop-placeholder": _vm.$i18n.t(
                                "profile_move_file"
                              )
                            },
                            on: { change: _vm.additionalUpload },
                            model: {
                              value: _vm.document_additional,
                              callback: function($$v) {
                                _vm.document_additional = $$v
                              },
                              expression: "document_additional"
                            }
                          })
                        ],
                        1
                      )
                    ]
                  )
                ])
              ])
            ])
          ])
        ])
      ],
      2
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close rounded-pill",
        attrs: {
          type: "button",
          "data-dismiss": "modal",
          "aria-label": "Close"
        }
      },
      [_c("i", { staticClass: "bx bx-x" })]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "alert",
          "aria-label": "Close"
        }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "alert",
          "aria-label": "Close"
        }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close rounded-pill",
        attrs: {
          type: "button",
          "data-dismiss": "modal",
          "aria-label": "Close"
        }
      },
      [_c("i", { staticClass: "bx bx-x" })]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "alert",
          "aria-label": "Close"
        }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "alert",
          "aria-label": "Close"
        }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "alert",
          "aria-label": "Close"
        }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "alert",
          "aria-label": "Close"
        }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "alert",
          "aria-label": "Close"
        }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "alert",
          "aria-label": "Close"
        }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "alert",
          "aria-label": "Close"
        }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "alert",
          "aria-label": "Close"
        }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "alert",
          "aria-label": "Close"
        }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "alert",
          "aria-label": "Close"
        }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-the-mask/dist/vue-the-mask.js":
/*!********************************************************!*\
  !*** ./node_modules/vue-the-mask/dist/vue-the-mask.js ***!
  \********************************************************/
/***/ (function(module) {

(function(e,t){ true?module.exports=t():0})(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p=".",t(t.s=10)}([function(e,t){e.exports={"#":{pattern:/\d/},X:{pattern:/[0-9a-zA-Z]/},S:{pattern:/[a-zA-Z]/},A:{pattern:/[a-zA-Z]/,transform:function(e){return e.toLocaleUpperCase()}},a:{pattern:/[a-zA-Z]/,transform:function(e){return e.toLocaleLowerCase()}},"!":{escape:!0}}},function(e,t,n){"use strict";function r(e){var t=document.createEvent("Event");return t.initEvent(e,!0,!0),t}var a=n(2),o=n(0),i=n.n(o);t.a=function(e,t){var o=t.value;if((Array.isArray(o)||"string"==typeof o)&&(o={mask:o,tokens:i.a}),"INPUT"!==e.tagName.toLocaleUpperCase()){var u=e.getElementsByTagName("input");if(1!==u.length)throw new Error("v-mask directive requires 1 input, found "+u.length);e=u[0]}e.oninput=function(t){if(t.isTrusted){var i=e.selectionEnd,u=e.value[i-1];for(e.value=n.i(a.a)(e.value,o.mask,!0,o.tokens);i<e.value.length&&e.value.charAt(i-1)!==u;)i++;e===document.activeElement&&(e.setSelectionRange(i,i),setTimeout(function(){e.setSelectionRange(i,i)},0)),e.dispatchEvent(r("input"))}};var s=n.i(a.a)(e.value,o.mask,!0,o.tokens);s!==e.value&&(e.value=s,e.dispatchEvent(r("input")))}},function(e,t,n){"use strict";var r=n(6),a=n(5);t.a=function(e,t){var o=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=arguments[3];return Array.isArray(t)?n.i(a.a)(r.a,t,i)(e,t,o,i):n.i(r.a)(e,t,o,i)}},function(e,t,n){"use strict";function r(e){e.component(s.a.name,s.a),e.directive("mask",i.a)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),o=n.n(a),i=n(1),u=n(7),s=n.n(u);n.d(t,"TheMask",function(){return s.a}),n.d(t,"mask",function(){return i.a}),n.d(t,"tokens",function(){return o.a}),n.d(t,"version",function(){return c});var c="0.11.1";t.default=r,"undefined"!=typeof window&&window.Vue&&window.Vue.use(r)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),a=n(0),o=n.n(a),i=n(2);t.default={name:"TheMask",props:{value:[String,Number],mask:{type:[String,Array],required:!0},masked:{type:Boolean,default:!1},tokens:{type:Object,default:function(){return o.a}}},directives:{mask:r.a},data:function(){return{lastValue:null,display:this.value}},watch:{value:function(e){e!==this.lastValue&&(this.display=e)},masked:function(){this.refresh(this.display)}},computed:{config:function(){return{mask:this.mask,tokens:this.tokens,masked:this.masked}}},methods:{onInput:function(e){e.isTrusted||this.refresh(e.target.value)},refresh:function(e){this.display=e;var e=n.i(i.a)(e,this.mask,this.masked,this.tokens);e!==this.lastValue&&(this.lastValue=e,this.$emit("input",e))}}}},function(e,t,n){"use strict";function r(e,t,n){return t=t.sort(function(e,t){return e.length-t.length}),function(r,a){for(var o=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=0;i<t.length;){var u=t[i];i++;var s=t[i];if(!(s&&e(r,s,!0,n).length>u.length))return e(r,u,o,n)}return""}}t.a=r},function(e,t,n){"use strict";function r(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=arguments[3];e=e||"",t=t||"";for(var a=0,o=0,i="";a<t.length&&o<e.length;){var u=t[a],s=r[u],c=e[o];s&&!s.escape?(s.pattern.test(c)&&(i+=s.transform?s.transform(c):c,a++),o++):(s&&s.escape&&(a++,u=t[a]),n&&(i+=u),c===u&&o++,a++)}for(var f="";a<t.length&&n;){var u=t[a];if(r[u]){f="";break}f+=u,a++}return i+f}t.a=r},function(e,t,n){var r=n(8)(n(4),n(9),null,null);e.exports=r.exports},function(e,t){e.exports=function(e,t,n,r){var a,o=e=e||{},i=typeof e.default;"object"!==i&&"function"!==i||(a=e,o=e.default);var u="function"==typeof o?o.options:o;if(t&&(u.render=t.render,u.staticRenderFns=t.staticRenderFns),n&&(u._scopeId=n),r){var s=u.computed||(u.computed={});Object.keys(r).forEach(function(e){var t=r[e];s[e]=function(){return t}})}return{esModule:a,exports:o,options:u}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("input",{directives:[{name:"mask",rawName:"v-mask",value:e.config,expression:"config"}],attrs:{type:"text"},domProps:{value:e.display},on:{input:e.onInput}})},staticRenderFns:[]}},function(e,t,n){e.exports=n(3)}])});

/***/ })

}]);