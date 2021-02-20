(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_vuejs_views_user_Deposit_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Deposit.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Deposit.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue_currency_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-currency-input */ "./node_modules/vue-currency-input/dist/vue-currency-input.esm.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "Deposit",
  mounted: function mounted() {
    var self = this;
    axios.post('/data/getDepositPromocodes').then(function (response) {
      self.bonus = response.data;
      self.promocode = self.bonus.find(function (item) {
        return item.min_amount == 500;
      }).code;
      self.prev_promocode = self.promocode;
      self.promocode_info = self.bonus.find(function (item) {
        return item.min_amount == 500;
      });
    });
    axios.post('/data/getAllDepositSystems').then(function (response) {
      self.systems = response.data;
      self.system = response.data[0].id;
    });
  },
  data: function data() {
    return {
      depositLoaded: true,
      bonus: [],
      bonus_id: 500,
      amount: '500',
      prev_promocode: '',
      promocode: '',
      promocode_info: null,
      use_promocode: false,
      errors: [],
      success: [],
      system: '',
      systems: []
    };
  },
  methods: {
    setBonusId: function setBonusId(id) {
      this.use_promocode = true;
      this.bonus_id = id;
      this.promocode = this.bonus.find(function (item) {
        return item.min_amount == id;
      }).code;
      this.prev_promocode = this.promocode;
      this.promocode_info = this.bonus.find(function (item) {
        return item.min_amount == id;
      });
      this.setAmount(this.promocode_info.min_amount);

      if (id == 500) {
        toastr.warning(this.$i18n.t('deposit_recommended_amount'), this.$i18n.t('deposit_attention'), {
          positionClass: 'toast-bottom-left',
          containerId: 'toast-bottom-left'
        });
      }
    },
    setAmount: function setAmount(amount) {
      (0,vue_currency_input__WEBPACK_IMPORTED_MODULE_0__.setValue)(this.$refs.ci, amount.toFixed(2));
    },
    checkPromocode: function checkPromocode() {
      var self = this;
      this.errors = [];
      this.success = [];
      axios.post('/promocode', {
        code: this.promocode
      }).then(function (response) {
        if (response.data.success === false) {
          self.errors.push(response.data.message);
          self.promocode_info = null;
          self.prev_promocode = self.promocode;
        } else {
          self.prev_promocode = self.promocode;
          self.promocode_info = response.data.data;
          self.success.push(response.data.message);
        }
      });
    },
    proccess: function proccess() {
      var self = this;
      this.errors = [];
      this.success = [];
      this.depositLoaded = false;
      axios.post('/data/deposit', {
        amount: self.numericAmount,
        promocode: self.selected_promocode,
        system_id: this.system
      }).then(function (response) {
        if (response.data.success === true) {
          toastr.success(response.data.message, self.$i18n.t('deposit_success'), {
            positionClass: 'toast-bottom-left',
            containerId: 'toast-bottom-left'
          });
          self.$refs.datatables.updateDatatables();
          setTimeout(function () {
            window.location.href = response.data.link;
            self.depositLoaded = true;
          }, response.data.timeout);
        } else {
          self.errors.push(response.data.message);
          self.depositLoaded = true;
        }
      });
    }
  },
  computed: {
    isAdmin: function isAdmin() {
      return this.$route.meta.isAdmin;
    },
    numericAmount: function numericAmount() {
      return this.$ci.parse(this.amount);
    },
    show_amount: function show_amount() {
      var amount = this.numericAmount;

      if (this.promocode_info && this.use_promocode && this.prev_promocode === this.promocode) {
        amount = amount + amount * this.promocode_info.bonus_size * 0.01;
      }

      return amount.toLocaleString(undefined, {
        minimumFractionDigits: 2
      });
    },
    bonus_percent: function bonus_percent() {
      if (this.promocode_info && this.prev_promocode === this.promocode) {
        return this.promocode_info.bonus_size;
      }

      return null;
    },
    selected_promocode: function selected_promocode() {
      if (this.promocode_info && this.prev_promocode === this.promocode && this.use_promocode) {
        return this.promocode_info.id;
      }

      return '';
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Deposit.vue?vue&type=style&index=0&id=7430a733&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Deposit.vue?vue&type=style&index=0&id=7430a733&scoped=true&lang=css& ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.yellow-outline[data-v-7430a733] {\n    border: 1px solid #63630b;\n}\n.checked-box[data-v-7430a733] {\n    background-color: #3e536b !important;\n    border: 1px solid #8e8e10;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Deposit.vue?vue&type=style&index=0&id=7430a733&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Deposit.vue?vue&type=style&index=0&id=7430a733&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Deposit_vue_vue_type_style_index_0_id_7430a733_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Deposit.vue?vue&type=style&index=0&id=7430a733&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Deposit.vue?vue&type=style&index=0&id=7430a733&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Deposit_vue_vue_type_style_index_0_id_7430a733_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Deposit_vue_vue_type_style_index_0_id_7430a733_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./resources/vuejs/views/user/Deposit.vue":
/*!************************************************!*\
  !*** ./resources/vuejs/views/user/Deposit.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Deposit_vue_vue_type_template_id_7430a733_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Deposit.vue?vue&type=template&id=7430a733&scoped=true& */ "./resources/vuejs/views/user/Deposit.vue?vue&type=template&id=7430a733&scoped=true&");
/* harmony import */ var _Deposit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Deposit.vue?vue&type=script&lang=js& */ "./resources/vuejs/views/user/Deposit.vue?vue&type=script&lang=js&");
/* harmony import */ var _Deposit_vue_vue_type_style_index_0_id_7430a733_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Deposit.vue?vue&type=style&index=0&id=7430a733&scoped=true&lang=css& */ "./resources/vuejs/views/user/Deposit.vue?vue&type=style&index=0&id=7430a733&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _Deposit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Deposit_vue_vue_type_template_id_7430a733_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Deposit_vue_vue_type_template_id_7430a733_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "7430a733",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/vuejs/views/user/Deposit.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/vuejs/views/user/Deposit.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/vuejs/views/user/Deposit.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Deposit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Deposit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Deposit.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Deposit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/vuejs/views/user/Deposit.vue?vue&type=style&index=0&id=7430a733&scoped=true&lang=css&":
/*!*********************************************************************************************************!*\
  !*** ./resources/vuejs/views/user/Deposit.vue?vue&type=style&index=0&id=7430a733&scoped=true&lang=css& ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_36_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Deposit_vue_vue_type_style_index_0_id_7430a733_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Deposit.vue?vue&type=style&index=0&id=7430a733&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-36[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Deposit.vue?vue&type=style&index=0&id=7430a733&scoped=true&lang=css&");


/***/ }),

/***/ "./resources/vuejs/views/user/Deposit.vue?vue&type=template&id=7430a733&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/vuejs/views/user/Deposit.vue?vue&type=template&id=7430a733&scoped=true& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Deposit_vue_vue_type_template_id_7430a733_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Deposit_vue_vue_type_template_id_7430a733_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Deposit_vue_vue_type_template_id_7430a733_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Deposit.vue?vue&type=template&id=7430a733&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Deposit.vue?vue&type=template&id=7430a733&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Deposit.vue?vue&type=template&id=7430a733&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Deposit.vue?vue&type=template&id=7430a733&scoped=true& ***!
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
  return _c(
    "div",
    { staticClass: "content-wrapper" },
    [
      _c(
        "div",
        { staticClass: "content-body" },
        [
          _vm._l(_vm.errors, function(value) {
            return _c(
              "div",
              {
                staticClass: "alert bg-rgba-danger alert-dismissible mb-2",
                attrs: { role: "alert" }
              },
              [
                _vm._m(0, true),
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
          _vm._l(_vm.success, function(value) {
            return _c(
              "div",
              {
                staticClass: "alert bg-rgba-success alert-dismissible mb-2",
                attrs: { role: "alert" }
              },
              [
                _vm._m(1, true),
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
              _c("section", { staticClass: "card" }, [
                _c("div", { staticClass: "card-header" }, [
                  _c("h4", { staticClass: "card-title" }, [
                    _vm._v(_vm._s(_vm.$i18n.t("deposit_title")))
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "card-content" }, [
                  _c("div", { staticClass: "card-body" }, [
                    _c("div", { staticClass: "card-text" }, [
                      _c("div", { staticClass: "row" }, [
                        _c("div", { staticClass: "col-md-6 pt-3" }, [
                          _c("div", { staticClass: "row" }, [
                            _vm._m(2),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-md-6" }, [
                              _c("p", { staticClass: "mb-0" }, [
                                _c("i", {
                                  staticClass:
                                    "bx bxs-dollar-circle align-middle"
                                }),
                                _vm._v(
                                  " " +
                                    _vm._s(_vm.$i18n.t("deposit_min_amount")) +
                                    ": $5"
                                )
                              ]),
                              _vm._v(" "),
                              _c("p", { staticClass: "mb-0" }, [
                                _c("i", {
                                  staticClass: "bx bx-wallet align-middle"
                                }),
                                _vm._v(
                                  " " +
                                    _vm._s(
                                      _vm.$i18n.t("deposit_without_commission")
                                    )
                                )
                              ]),
                              _vm._v(" "),
                              _c("p", { staticClass: "mb-0" }, [
                                _c("i", {
                                  staticClass: "bx bx-undo align-middle"
                                }),
                                _vm._v(
                                  " " +
                                    _vm._s(
                                      _vm.$i18n.t("deposit_fast_withdrawal")
                                    )
                                )
                              ]),
                              _vm._v(" "),
                              _c("p", { staticClass: "mb-0" }, [
                                _c("i", {
                                  staticClass: "bx bx-check align-middle"
                                }),
                                _vm._v(
                                  " " +
                                    _vm._s(
                                      _vm.$i18n.t("deposit_minimal_withdrawal")
                                    ) +
                                    ": $10"
                                )
                              ])
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-md-12 mt-3" }, [
                              _c(
                                "fieldset",
                                { staticClass: "form-group" },
                                [
                                  _c("label", { staticClass: "align-top" }, [
                                    _vm._v(_vm._s(_vm.$i18n.t("payout_system")))
                                  ]),
                                  _vm._v(" "),
                                  _c("select2", {
                                    style: "width: 100%;",
                                    attrs: {
                                      options: _vm.systems,
                                      settings: {
                                        settingOption: "value",
                                        settingOption: "value",
                                        minimumResultsForSearch: Infinity
                                      }
                                    },
                                    model: {
                                      value: _vm.system,
                                      callback: function($$v) {
                                        _vm.system = $$v
                                      },
                                      expression: "system"
                                    }
                                  })
                                ],
                                1
                              )
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-md-6" }, [
                              _c(
                                "fieldset",
                                {
                                  staticClass: "form-group",
                                  staticStyle: { "margin-bottom": "3px" }
                                },
                                [
                                  _c("label", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$i18n.t("deposit_deposit_amount")
                                      )
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("small", { staticClass: "text-muted" }, [
                                    _vm._v(
                                      _vm._s(_vm.$i18n.t("deposit_min")) + ". "
                                    ),
                                    _c("i", [_vm._v("5$")])
                                  ]),
                                  _vm._v(" "),
                                  [
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.amount,
                                          expression: "amount"
                                        },
                                        {
                                          name: "currency",
                                          rawName: "v-currency",
                                          value: {
                                            currency: null,
                                            autoDecimalMode: true,
                                            valueRange: { min: 5, max: 10000 }
                                          },
                                          expression:
                                            "{currency: null, autoDecimalMode: true, valueRange: {min: 5, max: 10000}}"
                                        }
                                      ],
                                      ref: "ci",
                                      staticClass: "form-control",
                                      attrs: { type: "text" },
                                      domProps: { value: _vm.amount },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.amount = $event.target.value
                                        }
                                      }
                                    })
                                  ]
                                ],
                                2
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "row mb-1 mr-0 ml-0" }, [
                                _c(
                                  "div",
                                  {
                                    staticClass: "col-md-3 pl-0",
                                    staticStyle: { "padding-right": "3px" }
                                  },
                                  [
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "btn w-100 btn-sm btn-outline-dark",
                                        attrs: { type: "button" },
                                        on: {
                                          click: function($event) {
                                            return _vm.setAmount(150)
                                          }
                                        }
                                      },
                                      [_vm._v("$ 150")]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass: "col-md-3 pl-0",
                                    staticStyle: { "padding-right": "1.5px" }
                                  },
                                  [
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "btn w-100 btn-sm btn-outline-dark",
                                        attrs: { type: "button" },
                                        on: {
                                          click: function($event) {
                                            return _vm.setAmount(200)
                                          }
                                        }
                                      },
                                      [_vm._v("$ 200")]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass: "col-md-3 pr-0",
                                    staticStyle: { "padding-left": "1.5px" }
                                  },
                                  [
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "btn w-100 btn-sm btn-outline-dark",
                                        attrs: { type: "button" },
                                        on: {
                                          click: function($event) {
                                            return _vm.setAmount(300)
                                          }
                                        }
                                      },
                                      [_vm._v("$ 300")]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass: "col-md-3 pr-0",
                                    staticStyle: { "padding-left": "3px" }
                                  },
                                  [
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "btn w-100 btn-sm btn-outline-dark",
                                        attrs: { type: "button" },
                                        on: {
                                          click: function($event) {
                                            return _vm.setAmount(500)
                                          }
                                        }
                                      },
                                      [_vm._v("$ 500")]
                                    )
                                  ]
                                )
                              ])
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-md-6" }, [
                              _c(
                                "fieldset",
                                {
                                  staticClass: "form-group",
                                  staticStyle: { "margin-bottom": "10px" }
                                },
                                [
                                  _c("label", [
                                    _vm._v(
                                      _vm._s(_vm.$i18n.t("deposit_promo_code"))
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("small", { staticClass: "text-muted" }, [
                                    _vm._v(
                                      "(" +
                                        _vm._s(
                                          _vm.$i18n.t("deposit_not_necessary")
                                        ) +
                                        ")"
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "input-group" }, [
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.promocode,
                                          expression: "promocode"
                                        }
                                      ],
                                      staticClass: "form-control",
                                      attrs: { type: "text" },
                                      domProps: { value: _vm.promocode },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.promocode = $event.target.value
                                        }
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "input-group-append" },
                                      [
                                        _c(
                                          "button",
                                          {
                                            directives: [
                                              {
                                                name: "show",
                                                rawName: "v-show",
                                                value:
                                                  this.promocode !==
                                                  this.prev_promocode,
                                                expression:
                                                  "this.promocode !== this.prev_promocode"
                                              }
                                            ],
                                            staticClass: "btn btn-secondary",
                                            attrs: { type: "button" },
                                            on: { click: _vm.checkPromocode }
                                          },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                _vm.$i18n.t("deposit_check")
                                              )
                                            )
                                          ]
                                        )
                                      ]
                                    )
                                  ])
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "custom-control custom-switch custom-control-inline mb-1"
                                },
                                [
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.use_promocode,
                                        expression: "use_promocode"
                                      }
                                    ],
                                    staticClass: "custom-control-input",
                                    attrs: {
                                      type: "checkbox",
                                      id: "customSwitch1"
                                    },
                                    domProps: {
                                      checked: Array.isArray(_vm.use_promocode)
                                        ? _vm._i(_vm.use_promocode, null) > -1
                                        : _vm.use_promocode
                                    },
                                    on: {
                                      change: function($event) {
                                        var $$a = _vm.use_promocode,
                                          $$el = $event.target,
                                          $$c = $$el.checked ? true : false
                                        if (Array.isArray($$a)) {
                                          var $$v = null,
                                            $$i = _vm._i($$a, $$v)
                                          if ($$el.checked) {
                                            $$i < 0 &&
                                              (_vm.use_promocode = $$a.concat([
                                                $$v
                                              ]))
                                          } else {
                                            $$i > -1 &&
                                              (_vm.use_promocode = $$a
                                                .slice(0, $$i)
                                                .concat($$a.slice($$i + 1)))
                                          }
                                        } else {
                                          _vm.use_promocode = $$c
                                        }
                                      }
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("label", {
                                    staticClass: "custom-control-label mr-1",
                                    attrs: { for: "customSwitch1" }
                                  }),
                                  _vm._v(" "),
                                  _c("span", [
                                    _vm._v(
                                      _vm._s(_vm.$i18n.t("deposit_use_bonus")) +
                                        " "
                                    ),
                                    _vm.promocode_info
                                      ? _c(
                                          "small",
                                          {
                                            directives: [
                                              {
                                                name: "show",
                                                rawName: "v-show",
                                                value: _vm.use_promocode,
                                                expression: "use_promocode"
                                              },
                                              {
                                                name: "b-tooltip",
                                                rawName: "v-b-tooltip.hover",
                                                modifiers: { hover: true }
                                              }
                                            ],
                                            staticClass: "cursor-pointer",
                                            attrs: {
                                              title:
                                                _vm.$i18n.t(
                                                  "deposit_need_work_out"
                                                ) +
                                                " " +
                                                _vm.promocode_info.turnover +
                                                " " +
                                                _vm.$i18n.t(
                                                  "deposit_times_from_bonus"
                                                )
                                            }
                                          },
                                          [
                                            _vm._v(
                                              "(" +
                                                _vm._s(
                                                  _vm.$i18n.t("deposit_rules")
                                                ) +
                                                ")"
                                            )
                                          ]
                                        )
                                      : _vm._e()
                                  ])
                                ]
                              )
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-md-6 pt-2" }, [
                              _c(
                                "button",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: _vm.depositLoaded,
                                      expression: "depositLoaded"
                                    }
                                  ],
                                  staticClass:
                                    "btn btn-outline-secondary mr-1 mb-1",
                                  attrs: {
                                    disabled: _vm.isAdmin,
                                    type: "button"
                                  },
                                  on: { click: _vm.proccess }
                                },
                                [
                                  _vm._v(
                                    _vm._s(_vm.$i18n.t("deposit_continue"))
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "button",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: !_vm.depositLoaded,
                                      expression: "!depositLoaded"
                                    }
                                  ],
                                  staticClass:
                                    "btn btn-outline-secondary mr-1 mb-1",
                                  attrs: { disabled: true, type: "button" },
                                  on: { click: _vm.proccess }
                                },
                                [
                                  _c("span", {
                                    staticClass:
                                      "spinner-border spinner-border-sm",
                                    attrs: {
                                      role: "status",
                                      "aria-hidden": "true"
                                    }
                                  }),
                                  _vm._v(
                                    " " +
                                      _vm._s(_vm.$i18n.t("deposit_continue"))
                                  )
                                ]
                              )
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass:
                                  "col-md-6 pt-2 text-right align-bottom"
                              },
                              [
                                _c(
                                  "p",
                                  { staticStyle: { "padding-top": "10px" } },
                                  [
                                    _vm._v(
                                      "\n                                                  " +
                                        _vm._s(_vm.$i18n.t("deposit_you_get")) +
                                        "\n                                                    "
                                    ),
                                    _c(
                                      "span",
                                      {
                                        staticClass: "text-white",
                                        staticStyle: { "font-size": "1.3rem" }
                                      },
                                      [
                                        _vm._v(
                                          "$\n                                                        " +
                                            _vm._s(_vm.show_amount) +
                                            "\n                                                    "
                                        )
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _vm.promocode_info && _vm.bonus_percent
                                      ? _c(
                                          "span",
                                          {
                                            directives: [
                                              {
                                                name: "show",
                                                rawName: "v-show",
                                                value: _vm.use_promocode,
                                                expression: "use_promocode"
                                              }
                                            ]
                                          },
                                          [
                                            _vm._v(
                                              "(" +
                                                _vm._s(
                                                  _vm.$i18n.t("deposit_bonus")
                                                ) +
                                                " " +
                                                _vm._s(
                                                  _vm.promocode_info.bonus_size
                                                ) +
                                                "%)"
                                            )
                                          ]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      {
                                        directives: [
                                          {
                                            name: "show",
                                            rawName: "v-show",
                                            value:
                                              !_vm.use_promocode ||
                                              !_vm.bonus_percent,
                                            expression:
                                              "!use_promocode || !bonus_percent"
                                          }
                                        ]
                                      },
                                      [
                                        _vm._v(
                                          "(" +
                                            _vm._s(
                                              _vm.$i18n.t(
                                                "deposit_without_bonus"
                                              )
                                            ) +
                                            ")"
                                        )
                                      ]
                                    )
                                  ]
                                )
                              ]
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-md-6" },
                          [
                            _c("h4", { staticClass: "card-title" }, [
                              _vm._v(
                                _vm._s(_vm.$i18n.t("deposit_select_your_bonus"))
                              )
                            ]),
                            _vm._v(" "),
                            _vm._l(_vm.bonus, function(current) {
                              return _c(
                                "div",
                                {
                                  staticClass: "row",
                                  staticStyle: { "padding-bottom": "5px" }
                                },
                                [
                                  _c("div", { staticClass: "col-md-12" }, [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "btn btn-light-secondary w-100",
                                        class: {
                                          "yellow-outline":
                                            current.min_amount ===
                                              _vm.bonus_id ||
                                            current.min_amount === 500,
                                          "checked-box":
                                            current.min_amount === _vm.bonus_id
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.setBonusId(
                                              current.min_amount
                                            )
                                          }
                                        }
                                      },
                                      [
                                        _c("div", { staticClass: "row" }, [
                                          _c(
                                            "div",
                                            { staticClass: "col-md-3" },
                                            [
                                              _c("fieldset", [
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "radio radio-primary radio-glow",
                                                    staticStyle: {
                                                      "padding-top": "5px"
                                                    }
                                                  },
                                                  [
                                                    _c("input", {
                                                      directives: [
                                                        {
                                                          name: "model",
                                                          rawName: "v-model",
                                                          value: _vm.bonus_id,
                                                          expression: "bonus_id"
                                                        }
                                                      ],
                                                      attrs: {
                                                        type: "radio",
                                                        id:
                                                          "radio" +
                                                          current.min_amount,
                                                        name: "radioGlow",
                                                        disabled: "disabled"
                                                      },
                                                      domProps: {
                                                        value:
                                                          current.min_amount,
                                                        checked: _vm._q(
                                                          _vm.bonus_id,
                                                          current.min_amount
                                                        )
                                                      },
                                                      on: {
                                                        change: function(
                                                          $event
                                                        ) {
                                                          _vm.bonus_id =
                                                            current.min_amount
                                                        }
                                                      }
                                                    }),
                                                    _vm._v(" "),
                                                    _c("label", {
                                                      attrs: {
                                                        for:
                                                          "radio" +
                                                          current.min_amount
                                                      }
                                                    })
                                                  ]
                                                )
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            { staticClass: "col-md-2" },
                                            [
                                              _vm._v(
                                                "\n                                                            $ " +
                                                  _vm._s(
                                                    current.min_amount.toLocaleString(
                                                      undefined,
                                                      {
                                                        minimumFractionDigits: 0
                                                      }
                                                    )
                                                  ) +
                                                  "\n                                                        "
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "col-md-3 text-success"
                                            },
                                            [
                                              _vm._v(
                                                "\n                                                          " +
                                                  _vm._s(
                                                    _vm.$i18n.t("deposit_bonus")
                                                  ) +
                                                  " " +
                                                  _vm._s(current.bonus_size) +
                                                  " %\n                                                        "
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            { staticClass: "col-md-1" },
                                            [
                                              _vm._v(
                                                "\n                                                            =\n                                                        "
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            { staticClass: "col-md-2" },
                                            [
                                              _vm._v(
                                                "\n                                                            $ " +
                                                  _vm._s(
                                                    (
                                                      (parseInt(
                                                        current.min_amount
                                                          .toString()
                                                          .replace(" ", "")
                                                      ) *
                                                        current.bonus_size) /
                                                      100
                                                    )
                                                      .toString()
                                                      .replace(
                                                        /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
                                                        "$1 "
                                                      )
                                                  ) +
                                                  "\n                                                        "
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("i", {
                                            directives: [
                                              {
                                                name: "b-tooltip",
                                                rawName: "v-b-tooltip.hover",
                                                modifiers: { hover: true }
                                              }
                                            ],
                                            staticClass:
                                              "bx bx-help-circle cursor-pointer",
                                            staticStyle: { color: "#8a99b5" },
                                            attrs: {
                                              title:
                                                _vm.$i18n.t(
                                                  "deposit_need_work_out"
                                                ) +
                                                " " +
                                                current.turnover +
                                                " " +
                                                _vm.$i18n.t(
                                                  "deposit_times_from_bonus"
                                                )
                                            }
                                          })
                                        ])
                                      ]
                                    )
                                  ])
                                ]
                              )
                            })
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
        ],
        2
      ),
      _vm._v(" "),
      _c("deposit-history", { ref: "datatables" })
    ],
    1
  )
}
var staticRenderFns = [
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
    return _c("div", { staticClass: "col-md-6" }, [
      _c("img", {
        staticClass: "img-fluid",
        staticStyle: { "margin-top": "5px" },
        attrs: { src: "/images/icon/cards.png" }
      })
    ])
  }
]
render._withStripped = true



/***/ })

}]);