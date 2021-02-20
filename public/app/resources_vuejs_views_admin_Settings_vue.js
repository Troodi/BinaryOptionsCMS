(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_vuejs_views_admin_Settings_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Settings.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Settings.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Settings",
  mounted: function mounted() {
    this.getSettings();
  },
  data: function data() {
    return {
      settingsErrors: [],
      settingsSuccess: [],
      settings: {},
      allInputs: []
    };
  },
  methods: {
    getSettings: function getSettings() {
      var self = this;
      axios.post('/admin/data/settings').then(function (response) {
        self.settings = response.data;
      });
    },
    save: function save() {
      this.settingsErrors = [];
      this.settingsSuccess = [];
      var serialized = $('#settingsForm').serialize();
      var self = this;
      axios.post('/admin/data/settings/save', {
        data: serialized
      }).then(function (response) {
        if (response.data.success === false) {
          self.settingsErrors = [];
          self.settingsErrors.push(response.data.message);
        } else {
          self.settingsSuccess = [];
          self.settingsSuccess.push(response.data.message);
        }

        $('html, body').animate({
          scrollTop: 0
        }, 1000);
        self.getSettings();
      });
    }
  }
});

/***/ }),

/***/ "./resources/vuejs/views/admin/Settings.vue":
/*!**************************************************!*\
  !*** ./resources/vuejs/views/admin/Settings.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Settings_vue_vue_type_template_id_ea239d88_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Settings.vue?vue&type=template&id=ea239d88&scoped=true& */ "./resources/vuejs/views/admin/Settings.vue?vue&type=template&id=ea239d88&scoped=true&");
/* harmony import */ var _Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Settings.vue?vue&type=script&lang=js& */ "./resources/vuejs/views/admin/Settings.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");

/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Settings_vue_vue_type_template_id_ea239d88_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Settings_vue_vue_type_template_id_ea239d88_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "ea239d88",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/vuejs/views/admin/Settings.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/vuejs/views/admin/Settings.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/vuejs/views/admin/Settings.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Settings.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Settings.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/vuejs/views/admin/Settings.vue?vue&type=template&id=ea239d88&scoped=true&":
/*!*********************************************************************************************!*\
  !*** ./resources/vuejs/views/admin/Settings.vue?vue&type=template&id=ea239d88&scoped=true& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_ea239d88_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_ea239d88_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_ea239d88_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Settings.vue?vue&type=template&id=ea239d88&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Settings.vue?vue&type=template&id=ea239d88&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Settings.vue?vue&type=template&id=ea239d88&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Settings.vue?vue&type=template&id=ea239d88&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************/
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
        _vm._l(_vm.settingsErrors, function(value) {
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
                  _vm._v("\n          " + _vm._s(value) + "\n        ")
                ])
              ])
            ]
          )
        }),
        _vm._v(" "),
        _vm._l(_vm.settingsSuccess, function(value) {
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
                  _vm._v("\n          " + _vm._s(value) + "\n        ")
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
                  _vm._v(_vm._s(_vm.$i18n.t("admin_settings_main_settings")))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "card-content" }, [
                _c("div", { staticClass: "card-body" }, [
                  _c("form", { attrs: { id: "settingsForm" } }, [
                    _c(
                      "div",
                      { staticClass: "row" },
                      [
                        _vm._l(_vm.settings, function(setting, index) {
                          return _c("div", { staticClass: "col-md-6" }, [
                            _c("fieldset", { staticClass: "form-group" }, [
                              _c("label", [
                                _vm._v(_vm._s(_vm.$i18n.t("settings_" + index)))
                              ]),
                              _vm._v(" "),
                              _c("input", {
                                staticClass: "form-control",
                                attrs: { type: "text", name: index },
                                domProps: { value: setting.value }
                              })
                            ])
                          ])
                        }),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-12" }, [
                          _c(
                            "button",
                            {
                              staticClass:
                                "btn btn-outline-primary float-right",
                              attrs: { type: "button" },
                              on: { click: _vm.save }
                            },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.$i18n.t("admin_settings_main_settings")
                                )
                              )
                            ]
                          )
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
  }
]
render._withStripped = true

/***/ })

}]);