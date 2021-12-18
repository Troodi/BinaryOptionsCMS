(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_vuejs_views_user_Support_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Support.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Support.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Support",
  data: function data() {
    return {
      question: '',
      success: []
    };
  },
  methods: {
    clearForm: function clearForm() {
      this.question = '';
    },
    send: function send() {
      var self = this;
      axios.post('/data/support', {
        question: self.question
      }).then(function (response) {
        self.error = [];
        self.success = [];

        if (response.data.success === true) {
          self.success.push(response.data.message);
          self.clearForm();
        } else {
          self.error.push(response.data.message);
        }
      });
    }
  },
  computed: {
    error: function error() {
      var errors = [];

      if (this.question.length > 0 && this.question.length < 25) {
        errors.push(this.$i18n.t('support_question_error'));
      }

      return errors;
    },
    buttonDisabled: function buttonDisabled() {
      return this.question.length < 25;
    }
  }
});

/***/ }),

/***/ "./resources/vuejs/views/user/Support.vue":
/*!************************************************!*\
  !*** ./resources/vuejs/views/user/Support.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Support_vue_vue_type_template_id_15d20fe4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Support.vue?vue&type=template&id=15d20fe4&scoped=true& */ "./resources/vuejs/views/user/Support.vue?vue&type=template&id=15d20fe4&scoped=true&");
/* harmony import */ var _Support_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Support.vue?vue&type=script&lang=js& */ "./resources/vuejs/views/user/Support.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");

/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Support_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Support_vue_vue_type_template_id_15d20fe4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Support_vue_vue_type_template_id_15d20fe4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "15d20fe4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/vuejs/views/user/Support.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/vuejs/views/user/Support.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/vuejs/views/user/Support.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Support_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Support.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Support.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Support_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/vuejs/views/user/Support.vue?vue&type=template&id=15d20fe4&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/vuejs/views/user/Support.vue?vue&type=template&id=15d20fe4&scoped=true& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Support_vue_vue_type_template_id_15d20fe4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Support_vue_vue_type_template_id_15d20fe4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Support_vue_vue_type_template_id_15d20fe4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Support.vue?vue&type=template&id=15d20fe4&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Support.vue?vue&type=template&id=15d20fe4&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Support.vue?vue&type=template&id=15d20fe4&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/Support.vue?vue&type=template&id=15d20fe4&scoped=true& ***!
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
      { staticClass: "content-body" },
      [
        _vm._l(_vm.error, function(value) {
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
                  _vm._v(_vm._s(_vm.$i18n.t("support_title")))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "card-content" }, [
                _c("div", { staticClass: "card-body" }, [
                  _c("div", { staticClass: "card-text" }, [
                    _c("p", [
                      _vm._v(
                        "\n                                  " +
                          _vm._s(_vm.$i18n.t("support_desc")) +
                          "\n                                "
                      )
                    ]),
                    _vm._v(" "),
                    _c("textarea", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.question,
                          expression: "question"
                        }
                      ],
                      staticClass: "form-control",
                      staticStyle: { height: "200px" },
                      attrs: { placeholder: _vm.$i18n.t("support_write") },
                      domProps: { value: _vm.question },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.question = $event.target.value
                        }
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-secondary mt-2",
                        attrs: { type: "button" },
                        on: { click: _vm.clearForm }
                      },
                      [_vm._v(_vm._s(_vm.$i18n.t("support_clear")))]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-primary mt-2 float-right",
                        attrs: { type: "button", disabled: _vm.buttonDisabled },
                        on: { click: _vm.send }
                      },
                      [_vm._v(_vm._s(_vm.$i18n.t("support_send")))]
                    )
                  ])
                ])
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-md-4" }, [
            _c("section", { staticClass: "card" }, [
              _c("div", { staticClass: "card-header" }, [
                _c("h4", { staticClass: "card-title" }, [
                  _vm._v(_vm._s(_vm.$i18n.t("support_contacts")))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "card-content" }, [
                _c("div", { staticClass: "card-body" }, [
                  _c("div", { staticClass: "card-text" }, [
                    _c("p", [
                      _c("strong", [
                        _vm._v(_vm._s(_vm.$i18n.t("support_email")))
                      ]),
                      _vm._v(": "),
                      _c("a", { attrs: { href: "mailto:info@" } }, [
                        _vm._v("info@")
                      ])
                    ]),
                    _vm._v(" "),
                    _c("p", [
                      _c("strong", [
                        _vm._v(_vm._s(_vm.$i18n.t("support_working_time")))
                      ]),
                      _vm._v(": 09:00 - 23:00\n                    ")
                    ]),
                    _vm._v(" "),
                    _c("p", [
                      _c("strong", [
                        _vm._v(_vm._s(_vm.$i18n.t("support_phone")))
                      ]),
                      _vm._v(
                        ": " +
                          _vm._s(_vm.$i18n.t("support_not_known")) +
                          "\n                    "
                      )
                    ]),
                    _vm._v(" "),
                    _c("p", [
                      _c("strong", [
                        _vm._v(_vm._s(_vm.$i18n.t("support_address")))
                      ]),
                      _vm._v(
                        ": " +
                          _vm._s(_vm.$i18n.t("support_address_line")) +
                          "\n                    "
                      )
                    ])
                  ])
                ])
              ])
            ]),
            _vm._v(" "),
            _c("section", { staticClass: "card" }, [
              _c("div", { staticClass: "card-header" }, [
                _c("h4", { staticClass: "card-title" }, [
                  _vm._v(_vm._s(_vm.$i18n.t("support_info")))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "card-content" }, [
                _c("div", { staticClass: "card-body" }, [
                  _c("div", { staticClass: "card-text" }, [
                    _c("p", { staticStyle: { "margin-bottom": "7px" } }, [
                      _vm._v(
                        "\n                      " +
                          _vm._s(_vm.$i18n.t("support_info_desc")) +
                          "\n                    "
                      )
                    ]),
                    _vm._v(" "),
                    _c("p", [_vm._v(_vm._s(_vm.$i18n.t("support_thank_you")))])
                  ])
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-8" }, [
            _c("div", { staticClass: "card" }, [
              _c("div", { staticClass: "card-header" }, [
                _c("h4", { staticClass: "card-title" }, [
                  _vm._v(_vm._s(_vm.$i18n.t("support_place")))
                ])
              ]),
              _vm._v(" "),
              _vm._m(2)
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
    return _c("div", { staticClass: "card-content" }, [
      _c("div", { staticClass: "card-body" }, [
        _c("iframe", {
          staticStyle: { border: "0" },
          attrs: {
            src:
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2028.9795209859203!2d24.760501722233876!3d59.43341610207085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4692935fa172bce7%3A0x7b478f8bf92430aa!2sTartu%20Invest%20O%C3%9C!5e0!3m2!1sru!2sru!4v1604776694925!5m2!1sru!2sru",
            width: "100%",
            height: "400",
            frameborder: "0",
            allowfullscreen: "",
            "aria-hidden": "false",
            tabindex: "0"
          }
        })
      ])
    ])
  }
]
render._withStripped = true

/***/ })

}]);