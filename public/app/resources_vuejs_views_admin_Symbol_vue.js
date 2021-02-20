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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Symbol",
  mounted: function mounted() {
    this.getSymbols();
  },
  methods: {
    save: function save(id) {
      this.$set(this.ajax, id, true);
      var pair = $('#pair' + id).val();
      var broker = $('#broker' + id).val();
      var fix = $('#fix' + id).val();
      var min = $('#min' + id).val();
      var max = $('#max' + id).val();
      var work_from = $('#work_from' + id).val();
      var work_to = $('#work_to' + id).val();
      var active = $('#active' + id).val();
      var obj = this.symbols.find(function (x) {
        return x.id === id;
      });
      obj.symbol = pair;
      obj.broker = broker;
      obj.fixed_percent = fix;
      obj.min_percent = min;
      obj.max_percent = max;
      obj.work_from = work_from;
      obj.work_to = work_to;
      obj.status = active;
      var self = this;
      axios.post('/admin/data/symbol/save', {
        id: id,
        pair: pair,
        broker: broker,
        fix: fix,
        min: min,
        max: max,
        work_from: work_from,
        work_to: work_to,
        active: active
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
          self.pair = '';
          self.broker = '';
          self.fix = '';
          self.min = '';
          self.max = '';
          self.work_from = '';
          self.work_to = '';
          self.status = 0;
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
  data: function data() {
    return {
      // Модели для создания
      pair: '',
      broker: '',
      fix: '',
      min: '',
      max: '',
      work_from: '',
      work_to: '',
      status: 0,
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
            _c("div", { staticClass: "card-header" }, [
              _c("h4", { staticClass: "card-title" }, [
                _vm._v(_vm._s(_vm.$i18n.t("admin_symbol_settings_title")))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "table-responsive" }, [
                    _c("table", { staticClass: "table" }, [
                      _c("thead", [
                        _c("tr", [
                          _c("th", [
                            _vm._v(
                              _vm._s(
                                _vm.$i18n.t("admin_symbol_settings_symbol")
                              )
                            )
                          ]),
                          _vm._v(" "),
                          _c("th", [
                            _vm._v(
                              _vm._s(
                                _vm.$i18n.t("admin_symbol_settings_broker")
                              )
                            )
                          ]),
                          _vm._v(" "),
                          _c("th", [
                            _vm._v(
                              _vm._s(_vm.$i18n.t("admin_symbol_settings_fix")) +
                                " %"
                            )
                          ]),
                          _vm._v(" "),
                          _c("th", [
                            _vm._v(
                              _vm._s(_vm.$i18n.t("admin_symbol_settings_min")) +
                                " %"
                            )
                          ]),
                          _vm._v(" "),
                          _c("th", [
                            _vm._v(
                              _vm._s(_vm.$i18n.t("admin_symbol_settings_max")) +
                                " %"
                            )
                          ]),
                          _vm._v(" "),
                          _c("th", [
                            _vm._v(
                              _vm._s(
                                _vm.$i18n.t("admin_symbol_settings_work_from")
                              )
                            )
                          ]),
                          _vm._v(" "),
                          _c("th", [
                            _vm._v(
                              _vm._s(
                                _vm.$i18n.t("admin_symbol_settings_work_to")
                              )
                            )
                          ]),
                          _vm._v(" "),
                          _c("th", [
                            _vm._v(
                              _vm._s(
                                _vm.$i18n.t("admin_symbol_settings_active")
                              )
                            )
                          ]),
                          _vm._v(" "),
                          _c("th", [
                            _vm._v(
                              _vm._s(
                                _vm.$i18n.t("admin_symbol_settings_action")
                              )
                            )
                          ])
                        ])
                      ]),
                      _vm._v(" "),
                      _c(
                        "tbody",
                        [
                          _vm._l(_vm.symbols, function(symbol) {
                            return _c("tr", [
                              _c("td", { staticClass: "td-symbols" }, [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: symbol.symbol,
                                      expression: "symbol.symbol"
                                    }
                                  ],
                                  staticClass: "form-control",
                                  staticStyle: { width: "130px" },
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
                                      _vm.$set(
                                        symbol,
                                        "symbol",
                                        $event.target.value
                                      )
                                    }
                                  }
                                })
                              ]),
                              _vm._v(" "),
                              _c("td", { staticClass: "td-symbols" }, [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: symbol.broker,
                                      expression: "symbol.broker"
                                    }
                                  ],
                                  staticClass: "form-control",
                                  staticStyle: { width: "130px" },
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
                                      _vm.$set(
                                        symbol,
                                        "broker",
                                        $event.target.value
                                      )
                                    }
                                  }
                                })
                              ]),
                              _vm._v(" "),
                              _c("td", { staticClass: "td-symbols" }, [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: symbol.fixed_percent,
                                      expression: "symbol.fixed_percent"
                                    }
                                  ],
                                  staticClass: "form-control",
                                  attrs: {
                                    disabled: _vm.ajax[symbol.id],
                                    type: "number",
                                    id: "fix" + symbol.id
                                  },
                                  domProps: { value: symbol.fixed_percent },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        symbol,
                                        "fixed_percent",
                                        $event.target.value
                                      )
                                    }
                                  }
                                })
                              ]),
                              _vm._v(" "),
                              _c("td", { staticClass: "td-symbols" }, [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: symbol.min_percent,
                                      expression: "symbol.min_percent"
                                    }
                                  ],
                                  staticClass: "form-control",
                                  attrs: {
                                    disabled: _vm.ajax[symbol.id],
                                    type: "text",
                                    id: "min" + symbol.id
                                  },
                                  domProps: { value: symbol.min_percent },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        symbol,
                                        "min_percent",
                                        $event.target.value
                                      )
                                    }
                                  }
                                })
                              ]),
                              _vm._v(" "),
                              _c("td", { staticClass: "td-symbols" }, [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: symbol.max_percent,
                                      expression: "symbol.max_percent"
                                    }
                                  ],
                                  staticClass: "form-control",
                                  attrs: {
                                    disabled: _vm.ajax[symbol.id],
                                    type: "text",
                                    id: "max" + symbol.id
                                  },
                                  domProps: { value: symbol.max_percent },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        symbol,
                                        "max_percent",
                                        $event.target.value
                                      )
                                    }
                                  }
                                })
                              ]),
                              _vm._v(" "),
                              _c("td", { staticClass: "td-symbols" }, [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: symbol.work_from,
                                      expression: "symbol.work_from"
                                    }
                                  ],
                                  staticClass: "form-control",
                                  attrs: {
                                    disabled: _vm.ajax[symbol.id],
                                    type: "text",
                                    id: "work_from" + symbol.id
                                  },
                                  domProps: { value: symbol.work_from },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        symbol,
                                        "work_from",
                                        $event.target.value
                                      )
                                    }
                                  }
                                })
                              ]),
                              _vm._v(" "),
                              _c("td", { staticClass: "td-symbols" }, [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: symbol.work_to,
                                      expression: "symbol.work_to"
                                    }
                                  ],
                                  staticClass: "form-control",
                                  attrs: {
                                    disabled: _vm.ajax[symbol.id],
                                    type: "text",
                                    id: "work_to" + symbol.id
                                  },
                                  domProps: { value: symbol.work_to },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        symbol,
                                        "work_to",
                                        $event.target.value
                                      )
                                    }
                                  }
                                })
                              ]),
                              _vm._v(" "),
                              _c(
                                "td",
                                { staticClass: "td-symbols" },
                                [
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
                                    attrs: {
                                      disabled: "disabled",
                                      type: "text"
                                    }
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
                                    staticStyle: { width: "200px" },
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
                              _c("td", { staticClass: "td-symbols" }, [
                                _c("div", { staticStyle: { width: "250px" } }, [
                                  _c("button", {
                                    staticClass:
                                      "btn btn-outline-primary float-left",
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
                                          : _vm.$i18n.t(
                                              "admin_symbol_settings_save"
                                            )
                                      )
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.save(symbol.id)
                                      }
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("button", {
                                    staticClass:
                                      "btn btn-outline-danger float-left",
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
                              ])
                            ])
                          }),
                          _vm._v(" "),
                          _c("tr", [
                            _c("td", { staticClass: "td-symbols" }, [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.pair,
                                    expression: "pair"
                                  }
                                ],
                                staticClass: "form-control",
                                staticStyle: { width: "130px" },
                                attrs: {
                                  disabled: _vm.create_ajax,
                                  type: "text"
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
                            _c("td", { staticClass: "td-symbols" }, [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.broker,
                                    expression: "broker"
                                  }
                                ],
                                staticClass: "form-control",
                                staticStyle: { width: "130px" },
                                attrs: {
                                  disabled: _vm.create_ajax,
                                  type: "text"
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
                            _c("td", { staticClass: "td-symbols" }, [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.fix,
                                    expression: "fix"
                                  }
                                ],
                                staticClass: "form-control",
                                attrs: {
                                  disabled: _vm.create_ajax,
                                  type: "text"
                                },
                                domProps: { value: _vm.fix },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.fix = $event.target.value
                                  }
                                }
                              })
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "td-symbols" }, [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.min,
                                    expression: "min"
                                  }
                                ],
                                staticClass: "form-control",
                                attrs: {
                                  disabled: _vm.create_ajax,
                                  type: "text"
                                },
                                domProps: { value: _vm.min },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.min = $event.target.value
                                  }
                                }
                              })
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "td-symbols" }, [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.max,
                                    expression: "max"
                                  }
                                ],
                                staticClass: "form-control",
                                attrs: {
                                  disabled: _vm.create_ajax,
                                  type: "text"
                                },
                                domProps: { value: _vm.max },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.max = $event.target.value
                                  }
                                }
                              })
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "td-symbols" }, [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.work_from,
                                    expression: "work_from"
                                  }
                                ],
                                staticClass: "form-control",
                                attrs: {
                                  disabled: _vm.create_ajax,
                                  type: "text"
                                },
                                domProps: { value: _vm.work_from },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.work_from = $event.target.value
                                  }
                                }
                              })
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "td-symbols" }, [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.work_to,
                                    expression: "work_to"
                                  }
                                ],
                                staticClass: "form-control",
                                attrs: {
                                  disabled: _vm.create_ajax,
                                  type: "text"
                                },
                                domProps: { value: _vm.work_to },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.work_to = $event.target.value
                                  }
                                }
                              })
                            ]),
                            _vm._v(" "),
                            _c(
                              "td",
                              { staticClass: "td-symbols" },
                              [
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
                                  staticStyle: { width: "200px" },
                                  attrs: {
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
                            _c("td", { staticClass: "td-symbols" }, [
                              _c("div", { staticStyle: { width: "250px" } }, [
                                _c("button", {
                                  staticClass: "btn btn-outline-success w-100",
                                  attrs: {
                                    disabled: _vm.create_ajax,
                                    type: "button"
                                  },
                                  domProps: {
                                    innerHTML: _vm._s(
                                      _vm.create_ajax
                                        ? _vm.loading
                                        : _vm.$i18n.t(
                                            "admin_symbol_settings_create"
                                          )
                                    )
                                  },
                                  on: { click: _vm.create }
                                })
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
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

/***/ })

}]);