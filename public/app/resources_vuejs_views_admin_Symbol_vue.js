(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_vuejs_views_admin_Symbol_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Symbol.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Symbol.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "Symbol",
  mounted: function mounted() {
    this.getSymbols();

    for (var i = 0; i < 24; i++) {
      this.time_options.push({
        id: i,
        text: i.toString()
      });
    }

    for (var _i = 1; _i < 101; _i++) {
      this.percents_options.push({
        id: _i,
        text: _i.toString()
      });
    }

    this.resistance_options.push({
      id: 0,
      text: 'Отключено'
    });

    for (var _i2 = 1; _i2 < 101; _i2++) {
      this.resistance_options.push({
        id: _i2,
        text: _i2.toString()
      });
    }
  },
  methods: {
    setPage: function setPage(pageNumber) {
      this.currentPage = pageNumber;
    },
    save: function save(id) {
      this.$set(this.ajax, id, true);
      var obj = this.symbols.find(function (x) {
        return x.id === id;
      });
      var self = this;
      axios.post('/admin/data/symbol/save', {
        id: id,
        pair: obj.symbol,
        broker: obj.broker,
        fix: obj.fixed_percent,
        min: obj.min_percent,
        max: obj.max_percent,
        work_from: obj.work_from,
        work_to: obj.work_to,
        active: obj.status,
        min_expiration_time: obj.min_expiration_time,
        min_percent_tech: obj.min_percent_tech,
        min_percent_news: obj.min_percent_news,
        min_percent_user: obj.min_percent_user
      }).then(function (response) {
        if (response.data.success === false) {
          toastr.error(response.data.message, self.$i18n.t('profile_error'), {
            positionClass: 'toast-bottom-left',
            containerId: 'toast-bottom-left'
          });
        } else {
          toastr.success(response.data.message, self.$i18n.t('profile_success'), {
            positionClass: 'toast-bottom-left',
            containerId: 'toast-bottom-left'
          });
        }

        self.getSymbol(id);
      })["finally"](function () {
        self.$set(self.ajax, id, false);
      });
    },
    remove: function remove(id) {
      var self = this;
      axios.post('/admin/data/symbol/remove', {
        id: id
      }).then(function (response) {
        if (response.data.success === false) {
          toastr.error(response.data.message, self.$i18n.t('profile_error'), {
            positionClass: 'toast-bottom-left',
            containerId: 'toast-bottom-left'
          });
        } else {
          toastr.success(response.data.message, self.$i18n.t('profile_success'), {
            positionClass: 'toast-bottom-left',
            containerId: 'toast-bottom-left'
          });
          self.symbols.splice(self.symbols.findIndex(function (x) {
            return x.id === id;
          }), 1);

          self.symbols.__ob__.dep.notify();
        }
      });
    },
    create: function create() {
      var _this = this;

      this.create_ajax = true;
      var self = this;
      axios.post('/admin/data/symbol/create', {
        pair: self.pair,
        broker: self.broker,
        fix: self.fix,
        min: self.min,
        max: self.max,
        work_from: self.work_from,
        work_to: self.work_to,
        status: self.status,
        min_expiration_time: self.min_expiration_time,
        min_percent_tech: self.min_percent_tech,
        min_percent_news: self.min_percent_news,
        min_percent_user: self.min_percent_user,
        create_ajax: false
      }).then(function (response) {
        if (response.data.success === false) {
          toastr.error(response.data.message, self.$i18n.t('profile_error'), {
            positionClass: 'toast-bottom-left',
            containerId: 'toast-bottom-left'
          });
        } else {
          toastr.success(response.data.message, self.$i18n.t('profile_success'), {
            positionClass: 'toast-bottom-left',
            containerId: 'toast-bottom-left'
          });
          self.currentPage = self.totalPages;
          window.scrollTo(0, document.body.scrollHeight);
          self.pair = 'EUR/USD';
          self.broker = 'FX';
          self.fix = 75;
          self.min = 65;
          self.max = 85;
          self.work_from = 1;
          self.work_to = 23;
          self.status = 0;
          self.min_expiration_time = 30;
          self.min_percent_tech = 0;
          self.min_percent_news = 0;
          self.min_percent_user = 0;
          self.symbols.push(response.data.created);
        }
      })["finally"](function () {
        _this.create_ajax = false;
      });
    },
    getSymbols: function getSymbols() {
      var self = this;
      axios.post('/admin/data/symbols').then(function (response) {
        self.symbols = response.data;
      });
    },
    getSymbol: function getSymbol(id) {
      var self = this;
      axios.post('/admin/data/symbol', {
        id: id
      }).then(function (response) {
        var obj = self.symbols.find(function (x) {
          return x.id === id;
        });
        obj.symbol = response.data.symbol;
        obj.broker = response.data.broker;
        obj.fixed_percent = response.data.fixed_percent;
        obj.min_percent = response.data.min_percent;
        obj.max_percent = response.data.max_percent;
        obj.work_from = response.data.work_from;
        obj.work_to = response.data.work_to;
        obj.status = response.data.status;

        self.symbols.__ob__.dep.notify();
      });
    }
  },
  computed: {
    totalPages: function totalPages() {
      return Math.ceil(this.resultCount / this.itemsPerPage);
    },
    paginate: function paginate() {
      if (this.symbols.length === undefined || this.symbols.length < 1) {
        return;
      }

      this.resultCount = this.symbols.length;

      if (this.currentPage >= this.totalPages) {
        this.currentPage = this.totalPages;
      }

      var index = this.currentPage * this.itemsPerPage - this.itemsPerPage;
      return this.symbols.slice(index, index + this.itemsPerPage);
    }
  },
  data: function data() {
    return {
      maxPages: 3,
      currentPage: 1,
      itemsPerPage: 10,
      resultCount: 0,
      // Модели для создания
      pair: 'EUR/USD',
      broker: 'FX',
      fix: 75,
      min: 65,
      max: 85,
      work_from: 1,
      work_to: 23,
      status: 0,
      min_expiration_time: 30,
      min_percent_tech: 0,
      min_percent_news: 0,
      min_percent_user: 0,
      create_ajax: false,
      //
      symbols: {},
      errors: [],
      success: [],
      system_text: this.$i18n.t('admin_symbol_settings_new'),
      system_order: 1,
      loading: '<span class="spinner-border spinner-grow-sm" role="status" aria-hidden="true"></span>',
      ajax: [],
      hiddens: [{
        id: 0,
        text: this.$i18n.t('admin_symbol_settings_hidden')
      }, {
        id: 1,
        text: this.$i18n.t('admin_symbol_settings_active_status')
      }],
      min_percent_tech_options: [{
        id: 0,
        text: 'Отключено'
      }],
      min_percent_news_options: [{
        id: 0,
        text: 'Отключено'
      }],
      min_percent_user_options: [{
        id: 0,
        text: 'Отключено'
      }],
      time_options: [],
      percents_options: [],
      resistance_options: [],
      defaultHidden: 0
    };
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Symbol.vue?vue&type=style&index=0&id=a993971e&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Symbol.vue?vue&type=style&index=0&id=a993971e&scoped=true&lang=css& ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.td-symbols[data-v-a993971e] {\n  padding: 3px !important;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Symbol.vue?vue&type=style&index=0&id=a993971e&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Symbol.vue?vue&type=style&index=0&id=a993971e&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Symbol_vue_vue_type_style_index_0_id_a993971e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Symbol.vue?vue&type=style&index=0&id=a993971e&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Symbol.vue?vue&type=style&index=0&id=a993971e&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Symbol_vue_vue_type_style_index_0_id_a993971e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Symbol_vue_vue_type_style_index_0_id_a993971e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./resources/vuejs/views/admin/Symbol.vue":
/*!************************************************!*\
  !*** ./resources/vuejs/views/admin/Symbol.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Symbol_vue_vue_type_template_id_a993971e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Symbol.vue?vue&type=template&id=a993971e&scoped=true& */ "./resources/vuejs/views/admin/Symbol.vue?vue&type=template&id=a993971e&scoped=true&");
/* harmony import */ var _Symbol_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Symbol.vue?vue&type=script&lang=js& */ "./resources/vuejs/views/admin/Symbol.vue?vue&type=script&lang=js&");
/* harmony import */ var _Symbol_vue_vue_type_style_index_0_id_a993971e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Symbol.vue?vue&type=style&index=0&id=a993971e&scoped=true&lang=css& */ "./resources/vuejs/views/admin/Symbol.vue?vue&type=style&index=0&id=a993971e&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _Symbol_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Symbol_vue_vue_type_template_id_a993971e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Symbol_vue_vue_type_template_id_a993971e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "a993971e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/vuejs/views/admin/Symbol.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/vuejs/views/admin/Symbol.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/vuejs/views/admin/Symbol.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Symbol_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Symbol.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Symbol.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Symbol_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/vuejs/views/admin/Symbol.vue?vue&type=style&index=0&id=a993971e&scoped=true&lang=css&":
/*!*********************************************************************************************************!*\
  !*** ./resources/vuejs/views/admin/Symbol.vue?vue&type=style&index=0&id=a993971e&scoped=true&lang=css& ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Symbol_vue_vue_type_style_index_0_id_a993971e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Symbol.vue?vue&type=style&index=0&id=a993971e&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Symbol.vue?vue&type=style&index=0&id=a993971e&scoped=true&lang=css&");


/***/ }),

/***/ "./resources/vuejs/views/admin/Symbol.vue?vue&type=template&id=a993971e&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/vuejs/views/admin/Symbol.vue?vue&type=template&id=a993971e&scoped=true& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Symbol_vue_vue_type_template_id_a993971e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Symbol_vue_vue_type_template_id_a993971e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Symbol_vue_vue_type_template_id_a993971e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Symbol.vue?vue&type=template&id=a993971e&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Symbol.vue?vue&type=template&id=a993971e&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Symbol.vue?vue&type=template&id=a993971e&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Symbol.vue?vue&type=template&id=a993971e&scoped=true& ***!
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
    _c("div", { staticClass: "content-body" }, [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-12" }, [
          _c("div", { staticClass: "card" }, [
            _vm._m(0),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-md-2" }, [
                    _c("label", [
                      _c("small", [
                        _c("i", [
                          _vm._v(
                            _vm._s(_vm.$i18n.t("admin_symbol_settings_symbol"))
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
                          value: _vm.pair,
                          expression: "pair"
                        }
                      ],
                      staticClass: "form-control w-100",
                      attrs: {
                        disabled: _vm.create_ajax,
                        type: "text",
                        id: "create_pair"
                      },
                      domProps: { value: _vm.pair },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.pair = $event.target.value
                        }
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-2" }, [
                    _c("label", [
                      _c("small", [
                        _c("i", [
                          _vm._v(
                            _vm._s(_vm.$i18n.t("admin_symbol_settings_broker"))
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
                          value: _vm.broker,
                          expression: "broker"
                        }
                      ],
                      staticClass: "form-control w-100",
                      attrs: {
                        disabled: _vm.create_ajax,
                        type: "text",
                        id: "create_broker"
                      },
                      domProps: { value: _vm.broker },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.broker = $event.target.value
                        }
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "col-md-2" },
                    [
                      _c("label", [
                        _c("small", [
                          _c("i", [
                            _vm._v(
                              _vm._s(_vm.$i18n.t("admin_symbol_settings_fix")) +
                                " %"
                            )
                          ])
                        ])
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.create_ajax,
                            expression: "create_ajax"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: { disabled: "disabled", type: "text" }
                      }),
                      _vm._v(" "),
                      _c("select2", {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: !_vm.create_ajax,
                            expression: "!create_ajax"
                          }
                        ],
                        staticStyle: { width: "100%" },
                        attrs: {
                          id: "create_fix",
                          options: _vm.percents_options,
                          settings: {
                            settingOption: "value",
                            settingOption: "value"
                          }
                        },
                        model: {
                          value: _vm.fix,
                          callback: function($$v) {
                            _vm.fix = $$v
                          },
                          expression: "fix"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "col-md-2" },
                    [
                      _c("label", [
                        _c("small", [
                          _c("i", [
                            _vm._v(
                              _vm._s(_vm.$i18n.t("admin_symbol_settings_min")) +
                                " %"
                            )
                          ])
                        ])
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.create_ajax,
                            expression: "create_ajax"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: { disabled: "disabled", type: "text" }
                      }),
                      _vm._v(" "),
                      _c("select2", {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: !_vm.create_ajax,
                            expression: "!create_ajax"
                          }
                        ],
                        staticStyle: { width: "100%" },
                        attrs: {
                          id: "create_min",
                          options: _vm.percents_options,
                          settings: {
                            settingOption: "value",
                            settingOption: "value"
                          }
                        },
                        model: {
                          value: _vm.min,
                          callback: function($$v) {
                            _vm.min = $$v
                          },
                          expression: "min"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "col-md-2" },
                    [
                      _c("label", [
                        _c("small", [
                          _c("i", [
                            _vm._v(
                              _vm._s(_vm.$i18n.t("admin_symbol_settings_max")) +
                                " %"
                            )
                          ])
                        ])
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.create_ajax,
                            expression: "create_ajax"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: { disabled: "disabled", type: "text" }
                      }),
                      _vm._v(" "),
                      _c("select2", {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: !_vm.create_ajax,
                            expression: "!create_ajax"
                          }
                        ],
                        staticStyle: { width: "100%" },
                        attrs: {
                          id: "create_max",
                          options: _vm.percents_options,
                          settings: {
                            settingOption: "value",
                            settingOption: "value"
                          }
                        },
                        model: {
                          value: _vm.max,
                          callback: function($$v) {
                            _vm.max = $$v
                          },
                          expression: "max"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "col-md-2" },
                    [
                      _c("label", [
                        _c("small", [
                          _c("i", [
                            _vm._v(
                              _vm._s(
                                _vm.$i18n.t("admin_symbol_settings_work_from")
                              )
                            )
                          ])
                        ])
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.create_ajax,
                            expression: "create_ajax"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: { disabled: "disabled", type: "text" }
                      }),
                      _vm._v(" "),
                      _c("select2", {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: !_vm.create_ajax,
                            expression: "!create_ajax"
                          }
                        ],
                        staticStyle: { width: "100%" },
                        attrs: {
                          id: "create_from",
                          options: _vm.time_options,
                          settings: {
                            settingOption: "value",
                            settingOption: "value"
                          }
                        },
                        model: {
                          value: _vm.work_from,
                          callback: function($$v) {
                            _vm.work_from = $$v
                          },
                          expression: "work_from"
                        }
                      })
                    ],
                    1
                  )
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "row", staticStyle: { "margin-top": "5px" } },
                  [
                    _c(
                      "div",
                      { staticClass: "col-md-2" },
                      [
                        _c("label", [
                          _c("small", [
                            _c("i", [
                              _vm._v(
                                _vm._s(
                                  _vm.$i18n.t("admin_symbol_settings_work_to")
                                )
                              )
                            ])
                          ])
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.create_ajax,
                              expression: "create_ajax"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: { disabled: "disabled", type: "text" }
                        }),
                        _vm._v(" "),
                        _c("select2", {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: !_vm.create_ajax,
                              expression: "!create_ajax"
                            }
                          ],
                          staticStyle: { width: "100%" },
                          attrs: {
                            id: "create_to",
                            options: _vm.time_options,
                            settings: {
                              settingOption: "value",
                              settingOption: "value"
                            }
                          },
                          model: {
                            value: _vm.work_to,
                            callback: function($$v) {
                              _vm.work_to = $$v
                            },
                            expression: "work_to"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "col-md-2" },
                      [
                        _vm._m(1),
                        _vm._v(" "),
                        _c("b-form-input", {
                          attrs: {
                            disabled: _vm.create_ajax,
                            id: "create_min_exp",
                            type: "number",
                            min: "5"
                          },
                          model: {
                            value: _vm.min_expiration_time,
                            callback: function($$v) {
                              _vm.min_expiration_time = $$v
                            },
                            expression: "min_expiration_time"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "col-md-2" },
                      [
                        _vm._m(2),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.create_ajax,
                              expression: "create_ajax"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: { disabled: "disabled", type: "text" }
                        }),
                        _vm._v(" "),
                        _c("select2", {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: !_vm.create_ajax,
                              expression: "!create_ajax"
                            }
                          ],
                          staticStyle: { width: "100%" },
                          attrs: {
                            id: "create_tech",
                            options: _vm.resistance_options,
                            settings: {
                              settingOption: "value",
                              settingOption: "value"
                            }
                          },
                          model: {
                            value: _vm.min_percent_tech,
                            callback: function($$v) {
                              _vm.min_percent_tech = $$v
                            },
                            expression: "min_percent_tech"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "col-md-2" },
                      [
                        _vm._m(3),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.create_ajax,
                              expression: "create_ajax"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: { disabled: "disabled", type: "text" }
                        }),
                        _vm._v(" "),
                        _c("select2", {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: !_vm.create_ajax,
                              expression: "!create_ajax"
                            }
                          ],
                          staticStyle: { width: "100%" },
                          attrs: {
                            id: "create_news",
                            options: _vm.resistance_options,
                            settings: {
                              settingOption: "value",
                              settingOption: "value"
                            }
                          },
                          model: {
                            value: _vm.min_percent_news,
                            callback: function($$v) {
                              _vm.min_percent_news = $$v
                            },
                            expression: "min_percent_news"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "col-md-2" },
                      [
                        _vm._m(4),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.create_ajax,
                              expression: "create_ajax"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: { disabled: "disabled", type: "text" }
                        }),
                        _vm._v(" "),
                        _c("select2", {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: !_vm.create_ajax,
                              expression: "!create_ajax"
                            }
                          ],
                          staticStyle: { width: "100%" },
                          attrs: {
                            id: "create_user",
                            options: _vm.resistance_options,
                            settings: {
                              settingOption: "value",
                              settingOption: "value"
                            }
                          },
                          model: {
                            value: _vm.min_percent_user,
                            callback: function($$v) {
                              _vm.min_percent_user = $$v
                            },
                            expression: "min_percent_user"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "col-md-2" },
                      [
                        _c("label", [
                          _c("small", [
                            _c("i", [
                              _vm._v(
                                _vm._s(
                                  _vm.$i18n.t("admin_symbol_settings_active")
                                )
                              )
                            ])
                          ])
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.create_ajax,
                              expression: "create_ajax"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: { disabled: "disabled", type: "text" }
                        }),
                        _vm._v(" "),
                        _c("select2", {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: !_vm.create_ajax,
                              expression: "!create_ajax"
                            }
                          ],
                          staticStyle: { width: "100%" },
                          attrs: {
                            id: "create_status",
                            options: _vm.hiddens,
                            settings: {
                              settingOption: "value",
                              settingOption: "value",
                              minimumResultsForSearch: Infinity
                            }
                          },
                          model: {
                            value: _vm.status,
                            callback: function($$v) {
                              _vm.status = $$v
                            },
                            expression: "status"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-12 mt-2" }, [
                      _c("button", {
                        staticClass: "btn btn-outline-success w-100",
                        attrs: { disabled: _vm.create_ajax, type: "button" },
                        domProps: {
                          innerHTML: _vm._s(
                            _vm.create_ajax
                              ? _vm.loading
                              : _vm.$i18n.t("admin_symbol_settings_create")
                          )
                        },
                        on: { click: _vm.create }
                      })
                    ])
                  ]
                )
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-12" }, [
          _c("div", { staticClass: "card" }, [
            _c("div", { staticClass: "card-header" }, [
              _c("h4", { staticClass: "card-title" }, [
                _vm._v(_vm._s(_vm.$i18n.t("admin_symbol_settings_title")))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c(
                "div",
                { staticClass: "card-body" },
                [
                  _vm._l(_vm.paginate, function(symbol, index) {
                    return _c("div", [
                      _c("div", { staticClass: "row" }, [
                        _c("div", { staticClass: "col-md-2" }, [
                          _c("label", [
                            _c("small", [
                              _c("i", [
                                _vm._v(
                                  _vm._s(
                                    _vm.$i18n.t("admin_symbol_settings_symbol")
                                  )
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
                                value: symbol.symbol,
                                expression: "symbol.symbol"
                              }
                            ],
                            staticClass: "form-control w-100",
                            attrs: {
                              disabled: _vm.ajax[symbol.id],
                              type: "text",
                              id: "pair" + symbol.id
                            },
                            domProps: { value: symbol.symbol },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(symbol, "symbol", $event.target.value)
                              }
                            }
                          })
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-2" }, [
                          _c("label", [
                            _c("small", [
                              _c("i", [
                                _vm._v(
                                  _vm._s(
                                    _vm.$i18n.t("admin_symbol_settings_broker")
                                  )
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
                                value: symbol.broker,
                                expression: "symbol.broker"
                              }
                            ],
                            staticClass: "form-control w-100",
                            attrs: {
                              disabled: _vm.ajax[symbol.id],
                              type: "text",
                              id: "broker" + symbol.id
                            },
                            domProps: { value: symbol.broker },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(symbol, "broker", $event.target.value)
                              }
                            }
                          })
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-md-2" },
                          [
                            _c("label", [
                              _c("small", [
                                _c("i", [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$i18n.t("admin_symbol_settings_fix")
                                    ) + " %"
                                  )
                                ])
                              ])
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.ajax[symbol.id],
                                  expression: "ajax[symbol.id]"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: { disabled: "disabled", type: "text" }
                            }),
                            _vm._v(" "),
                            _c("select2", {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: !_vm.ajax[symbol.id],
                                  expression: "!ajax[symbol.id]"
                                }
                              ],
                              staticStyle: { width: "100%" },
                              attrs: {
                                id: "fix" + symbol.id,
                                options: _vm.percents_options,
                                settings: {
                                  settingOption: "value",
                                  settingOption: "value"
                                }
                              },
                              model: {
                                value: symbol.fixed_percent,
                                callback: function($$v) {
                                  _vm.$set(symbol, "fixed_percent", $$v)
                                },
                                expression: "symbol.fixed_percent"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-md-2" },
                          [
                            _c("label", [
                              _c("small", [
                                _c("i", [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$i18n.t("admin_symbol_settings_min")
                                    ) + " %"
                                  )
                                ])
                              ])
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.ajax[symbol.id],
                                  expression: "ajax[symbol.id]"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: { disabled: "disabled", type: "text" }
                            }),
                            _vm._v(" "),
                            _c("select2", {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: !_vm.ajax[symbol.id],
                                  expression: "!ajax[symbol.id]"
                                }
                              ],
                              staticStyle: { width: "100%" },
                              attrs: {
                                id: "min" + symbol.id,
                                options: _vm.percents_options,
                                settings: {
                                  settingOption: "value",
                                  settingOption: "value"
                                }
                              },
                              model: {
                                value: symbol.min_percent,
                                callback: function($$v) {
                                  _vm.$set(symbol, "min_percent", $$v)
                                },
                                expression: "symbol.min_percent"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-md-2" },
                          [
                            _c("label", [
                              _c("small", [
                                _c("i", [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$i18n.t("admin_symbol_settings_max")
                                    ) + " %"
                                  )
                                ])
                              ])
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.ajax[symbol.id],
                                  expression: "ajax[symbol.id]"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: { disabled: "disabled", type: "text" }
                            }),
                            _vm._v(" "),
                            _c("select2", {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: !_vm.ajax[symbol.id],
                                  expression: "!ajax[symbol.id]"
                                }
                              ],
                              staticStyle: { width: "100%" },
                              attrs: {
                                id: "max" + symbol.id,
                                options: _vm.percents_options,
                                settings: {
                                  settingOption: "value",
                                  settingOption: "value"
                                }
                              },
                              model: {
                                value: symbol.max_percent,
                                callback: function($$v) {
                                  _vm.$set(symbol, "max_percent", $$v)
                                },
                                expression: "symbol.max_percent"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-md-2" },
                          [
                            _c("label", [
                              _c("small", [
                                _c("i", [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$i18n.t(
                                        "admin_symbol_settings_work_from"
                                      )
                                    )
                                  )
                                ])
                              ])
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.ajax[symbol.id],
                                  expression: "ajax[symbol.id]"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: { disabled: "disabled", type: "text" }
                            }),
                            _vm._v(" "),
                            _c("select2", {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: !_vm.ajax[symbol.id],
                                  expression: "!ajax[symbol.id]"
                                }
                              ],
                              staticStyle: { width: "100%" },
                              attrs: {
                                id: "from" + symbol.id,
                                options: _vm.time_options,
                                settings: {
                                  settingOption: "value",
                                  settingOption: "value"
                                }
                              },
                              model: {
                                value: symbol.work_from,
                                callback: function($$v) {
                                  _vm.$set(symbol, "work_from", $$v)
                                },
                                expression: "symbol.work_from"
                              }
                            })
                          ],
                          1
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "row",
                          staticStyle: { "margin-top": "5px" }
                        },
                        [
                          _c(
                            "div",
                            { staticClass: "col-md-2" },
                            [
                              _c("label", [
                                _c("small", [
                                  _c("i", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$i18n.t(
                                          "admin_symbol_settings_work_to"
                                        )
                                      )
                                    )
                                  ])
                                ])
                              ]),
                              _vm._v(" "),
                              _c("input", {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: _vm.ajax[symbol.id],
                                    expression: "ajax[symbol.id]"
                                  }
                                ],
                                staticClass: "form-control",
                                attrs: { disabled: "disabled", type: "text" }
                              }),
                              _vm._v(" "),
                              _c("select2", {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: !_vm.ajax[symbol.id],
                                    expression: "!ajax[symbol.id]"
                                  }
                                ],
                                staticStyle: { width: "100%" },
                                attrs: {
                                  id: "to" + symbol.id,
                                  options: _vm.time_options,
                                  settings: {
                                    settingOption: "value",
                                    settingOption: "value"
                                  }
                                },
                                model: {
                                  value: symbol.work_to,
                                  callback: function($$v) {
                                    _vm.$set(symbol, "work_to", $$v)
                                  },
                                  expression: "symbol.work_to"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "col-md-2" },
                            [
                              _vm._m(5, true),
                              _vm._v(" "),
                              _c("b-form-input", {
                                attrs: {
                                  disabled: _vm.ajax[symbol.id],
                                  id: "min_exp" + symbol.id,
                                  type: "number",
                                  min: "5"
                                },
                                model: {
                                  value: symbol.min_expiration_time,
                                  callback: function($$v) {
                                    _vm.$set(symbol, "min_expiration_time", $$v)
                                  },
                                  expression: "symbol.min_expiration_time"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "col-md-2" },
                            [
                              _vm._m(6, true),
                              _vm._v(" "),
                              _c("input", {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: _vm.ajax[symbol.id],
                                    expression: "ajax[symbol.id]"
                                  }
                                ],
                                staticClass: "form-control",
                                attrs: { disabled: "disabled", type: "text" }
                              }),
                              _vm._v(" "),
                              _c("select2", {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: !_vm.ajax[symbol.id],
                                    expression: "!ajax[symbol.id]"
                                  }
                                ],
                                staticStyle: { width: "100%" },
                                attrs: {
                                  id: "tech" + symbol.id,
                                  options: _vm.resistance_options,
                                  settings: {
                                    settingOption: "value",
                                    settingOption: "value"
                                  }
                                },
                                model: {
                                  value: symbol.min_percent_tech,
                                  callback: function($$v) {
                                    _vm.$set(symbol, "min_percent_tech", $$v)
                                  },
                                  expression: "symbol.min_percent_tech"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "col-md-2" },
                            [
                              _vm._m(7, true),
                              _vm._v(" "),
                              _c("input", {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: _vm.ajax[symbol.id],
                                    expression: "ajax[symbol.id]"
                                  }
                                ],
                                staticClass: "form-control",
                                attrs: { disabled: "disabled", type: "text" }
                              }),
                              _vm._v(" "),
                              _c("select2", {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: !_vm.ajax[symbol.id],
                                    expression: "!ajax[symbol.id]"
                                  }
                                ],
                                staticStyle: { width: "100%" },
                                attrs: {
                                  id: "news" + symbol.id,
                                  options: _vm.resistance_options,
                                  settings: {
                                    settingOption: "value",
                                    settingOption: "value"
                                  }
                                },
                                model: {
                                  value: symbol.min_percent_news,
                                  callback: function($$v) {
                                    _vm.$set(symbol, "min_percent_news", $$v)
                                  },
                                  expression: "symbol.min_percent_news"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "col-md-2" },
                            [
                              _vm._m(8, true),
                              _vm._v(" "),
                              _c("input", {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: _vm.ajax[symbol.id],
                                    expression: "ajax[symbol.id]"
                                  }
                                ],
                                staticClass: "form-control",
                                attrs: { disabled: "disabled", type: "text" }
                              }),
                              _vm._v(" "),
                              _c("select2", {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: !_vm.ajax[symbol.id],
                                    expression: "!ajax[symbol.id]"
                                  }
                                ],
                                staticStyle: { width: "100%" },
                                attrs: {
                                  id: "user" + symbol.id,
                                  options: _vm.resistance_options,
                                  settings: {
                                    settingOption: "value",
                                    settingOption: "value"
                                  }
                                },
                                model: {
                                  value: symbol.min_percent_user,
                                  callback: function($$v) {
                                    _vm.$set(symbol, "min_percent_user", $$v)
                                  },
                                  expression: "symbol.min_percent_user"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "col-md-2" },
                            [
                              _c("label", [
                                _c("small", [
                                  _c("i", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$i18n.t(
                                          "admin_symbol_settings_active"
                                        )
                                      )
                                    )
                                  ])
                                ])
                              ]),
                              _vm._v(" "),
                              _c("input", {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: _vm.ajax[symbol.id],
                                    expression: "ajax[symbol.id]"
                                  }
                                ],
                                staticClass: "form-control",
                                attrs: { disabled: "disabled", type: "text" }
                              }),
                              _vm._v(" "),
                              _c("select2", {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: !_vm.ajax[symbol.id],
                                    expression: "!ajax[symbol.id]"
                                  }
                                ],
                                staticStyle: { width: "100%" },
                                attrs: {
                                  id: "active" + symbol.id,
                                  options: _vm.hiddens,
                                  settings: {
                                    settingOption: "value",
                                    settingOption: "value",
                                    minimumResultsForSearch: Infinity
                                  }
                                },
                                model: {
                                  value: symbol.status,
                                  callback: function($$v) {
                                    _vm.$set(symbol, "status", $$v)
                                  },
                                  expression: "symbol.status"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-md-6" }, [
                            _c("button", {
                              staticClass: "btn btn-outline-primary w-100 mt-1",
                              staticStyle: {
                                "margin-right": "3px",
                                width: "132px"
                              },
                              attrs: {
                                type: "button",
                                disabled: _vm.ajax[symbol.id]
                              },
                              domProps: {
                                innerHTML: _vm._s(
                                  _vm.ajax[symbol.id]
                                    ? _vm.loading
                                    : _vm.$i18n.t("admin_symbol_settings_save")
                                )
                              },
                              on: {
                                click: function($event) {
                                  return _vm.save(symbol.id)
                                }
                              }
                            })
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-md-6" }, [
                            _c("button", {
                              staticClass: "btn btn-outline-danger w-100 mt-1",
                              staticStyle: {
                                "margin-left": "3px",
                                width: "112px"
                              },
                              attrs: {
                                type: "button",
                                disabled: _vm.ajax[symbol.id]
                              },
                              domProps: {
                                innerHTML: _vm._s(
                                  _vm.ajax[symbol.id]
                                    ? _vm.loading
                                    : _vm.$i18n.t(
                                        "admin_symbol_settings_delete"
                                      )
                                )
                              },
                              on: {
                                click: function($event) {
                                  return _vm.remove(symbol.id)
                                }
                              }
                            })
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c("hr", {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value:
                              index % (_vm.itemsPerPage - 1) !== 0 ||
                              index === 0,
                            expression:
                              "index % (itemsPerPage-1) !== 0 || index === 0"
                          }
                        ]
                      })
                    ])
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "row" }, [
                    _c("div", { staticClass: "table-responsive" }, [
                      _c("nav", { staticClass: "mt-2" }, [
                        _c(
                          "ul",
                          { staticClass: "pagination justify-content-center" },
                          [
                            _vm._l(_vm.totalPages, function(pageNumber) {
                              return Math.abs(pageNumber - _vm.currentPage) <
                                _vm.maxPages ||
                                pageNumber === _vm.totalPages ||
                                pageNumber === 1
                                ? [
                                    pageNumber === _vm.totalPages &&
                                    Math.abs(pageNumber - _vm.currentPage) >
                                      _vm.maxPages
                                      ? _c("li", { staticClass: "page-item" }, [
                                          _c(
                                            "a",
                                            {
                                              staticClass: "page-link",
                                              staticStyle: {
                                                cursor: "not-allowed"
                                              }
                                            },
                                            [_vm._v("...")]
                                          )
                                        ])
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c(
                                      "li",
                                      {
                                        staticClass: "page-item",
                                        class: {
                                          active: _vm.currentPage === pageNumber
                                        }
                                      },
                                      [
                                        _c(
                                          "a",
                                          {
                                            key: pageNumber,
                                            staticClass: "page-link",
                                            staticStyle: { cursor: "pointer" },
                                            on: {
                                              click: function($event) {
                                                return _vm.setPage(pageNumber)
                                              }
                                            }
                                          },
                                          [_vm._v(_vm._s(pageNumber))]
                                        )
                                      ]
                                    ),
                                    _vm._v(" "),
                                    pageNumber === 1 &&
                                    Math.abs(pageNumber - _vm.currentPage) >
                                      _vm.maxPages
                                      ? _c("li", { staticClass: "page-item" }, [
                                          _c(
                                            "a",
                                            {
                                              staticClass: "page-link",
                                              staticStyle: {
                                                cursor: "not-allowed"
                                              }
                                            },
                                            [_vm._v("...")]
                                          )
                                        ])
                                      : _vm._e()
                                  ]
                                : _vm._e()
                            })
                          ],
                          2
                        )
                      ])
                    ])
                  ])
                ],
                2
              )
            ])
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header" }, [
      _c("h4", { staticClass: "card-title" }, [
        _vm._v("Добавление новой торговой пары")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _c("small", [_c("i", [_vm._v("Минимальная экспирация в сек")])])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _c("small", [_c("i", [_vm._v("Мин % для тех анализа")])])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [_c("small", [_c("i", [_vm._v("Мин % для новостей")])])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [_c("small", [_c("i", [_vm._v("Мин % для юзера")])])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _c("small", [_c("i", [_vm._v("Минимальная экспирация в сек")])])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _c("small", [_c("i", [_vm._v("Мин % для тех анализа")])])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [_c("small", [_c("i", [_vm._v("Мин % для новостей")])])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [_c("small", [_c("i", [_vm._v("Мин % для юзера")])])])
  }
]
render._withStripped = true



/***/ })

}]);