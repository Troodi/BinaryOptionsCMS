(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_vuejs_views_admin_Control_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Control.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Control.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Control",
  data: function data() {
    var self = this;
    return {
      amount: 0,
      balanceAction: 2,
      balanceActions: [{
        id: "0",
        text: self.$i18n.t('admin_control_add_to_balance')
      }, {
        id: "1",
        text: self.$i18n.t('admin_control_sub_from_balance')
      }, {
        id: "2",
        text: self.$i18n.t('admin_control_set_balance')
      }],
      banAction: 0,
      banActions: [{
        id: "0",
        text: self.$i18n.t('admin_control_unblocked')
      }, {
        id: "1",
        text: self.$i18n.t('admin_control_ban_multi_account')
      }, {
        id: "2",
        text: self.$i18n.t('admin_control_ban_inactive')
      }, {
        id: "3",
        text: self.$i18n.t('admin_control_ban_rules')
      }, {
        id: "4",
        text: self.$i18n.t('admin_control_ban_and_referrals')
      }],
      info: {}
    };
  },
  mounted: function mounted() {
    this.loadUserInfo();
  },
  methods: {
    verifyClick: function verifyClick() {
      var self = this;
      axios.post('/admin/data/verifyAccount', {
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

        self.loadUserInfo();
      });
    },
    unVerifyClick: function unVerifyClick() {
      var self = this;
      axios.post('/admin/data/unVerifyAccount', {
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

        self.loadUserInfo();
      });
    },
    changePartner: function changePartner(action) {
      var self = this;
      axios.post('/admin/data/' + action, {
        id: self.userId
      }).then(function (response) {
        self.loadUserInfo();

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
    balanceClick: function balanceClick() {
      var self = this;
      axios.post('/admin/data/changeBalance', {
        id: self.userId,
        balance: self.amount,
        action: self.balanceAction
      }).then(function (response) {
        self.loadUserInfo();

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
    banClick: function banClick() {
      var self = this;
      axios.post('/admin/data/banAction', {
        id: self.userId,
        action: self.banAction
      }).then(function (response) {
        self.loadUserInfo();

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
    loadUserInfo: function loadUserInfo() {
      var self = this;
      axios.post('/admin/data/getControlInfo', {
        id: self.userId
      }).then(function (response) {
        self.info = response.data;

        if (self.info.user.banned !== null) {
          self.banAction = self.info.user.banned;
        } else {
          self.banAction = 0;
        }

        self.amount = self.info.user.balance;
      });
    }
  },
  computed: {
    userId: function userId() {
      return this.$route.params.id;
    }
  }
});

/***/ }),

/***/ "./resources/vuejs/views/admin/Control.vue":
/*!*************************************************!*\
  !*** ./resources/vuejs/views/admin/Control.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Control_vue_vue_type_template_id_6b9a9154_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Control.vue?vue&type=template&id=6b9a9154&scoped=true& */ "./resources/vuejs/views/admin/Control.vue?vue&type=template&id=6b9a9154&scoped=true&");
/* harmony import */ var _Control_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Control.vue?vue&type=script&lang=js& */ "./resources/vuejs/views/admin/Control.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Control_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Control_vue_vue_type_template_id_6b9a9154_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Control_vue_vue_type_template_id_6b9a9154_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "6b9a9154",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/vuejs/views/admin/Control.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/vuejs/views/admin/Control.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/vuejs/views/admin/Control.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Control_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Control.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Control.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Control_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/vuejs/views/admin/Control.vue?vue&type=template&id=6b9a9154&scoped=true&":
/*!********************************************************************************************!*\
  !*** ./resources/vuejs/views/admin/Control.vue?vue&type=template&id=6b9a9154&scoped=true& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Control_vue_vue_type_template_id_6b9a9154_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Control_vue_vue_type_template_id_6b9a9154_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Control_vue_vue_type_template_id_6b9a9154_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Control.vue?vue&type=template&id=6b9a9154&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Control.vue?vue&type=template&id=6b9a9154&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Control.vue?vue&type=template&id=6b9a9154&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Control.vue?vue&type=template&id=6b9a9154&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************/
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
                _vm._v(_vm._s(_vm.$i18n.t("admin_control_balance")))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-md-5" }, [
                    _c("fieldset", { staticClass: "form-group" }, [
                      _c("label", [
                        _vm._v(_vm._s(_vm.$i18n.t("admin_control_amount")))
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.amount,
                            expression: "amount"
                          }
                        ],
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
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-5" }, [
                    _c(
                      "fieldset",
                      { staticClass: "form-group" },
                      [
                        _c("label", { staticClass: "align-top" }, [
                          _vm._v(_vm._s(_vm.$i18n.t("admin_control_action")))
                        ]),
                        _vm._v(" "),
                        _c("select2", {
                          attrs: {
                            options: _vm.balanceActions,
                            settings: {
                              settingOption: "value",
                              settingOption: "value",
                              minimumResultsForSearch: Infinity
                            }
                          },
                          model: {
                            value: _vm.balanceAction,
                            callback: function($$v) {
                              _vm.balanceAction = $$v
                            },
                            expression: "balanceAction"
                          }
                        })
                      ],
                      1
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-2" }, [
                    _c("label", { staticClass: "align-top" }, [_vm._v(" ")]),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-outline-primary w-100",
                        attrs: { type: "button" },
                        on: { click: _vm.balanceClick }
                      },
                      [_vm._v(_vm._s(_vm.$i18n.t("admin_control_execute")))]
                    )
                  ])
                ])
              ])
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-12" }, [
          _c("div", { staticClass: "card" }, [
            _c("div", { staticClass: "card-header" }, [
              _c("h4", { staticClass: "card-title" }, [
                _vm._v(_vm._s(_vm.$i18n.t("admin_control_block_user")))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-md-10" }, [
                    _c(
                      "fieldset",
                      { staticClass: "form-group" },
                      [
                        _c("label", { staticClass: "align-top" }, [
                          _vm._v(_vm._s(_vm.$i18n.t("admin_control_action")))
                        ]),
                        _vm._v(" "),
                        _c("select2", {
                          attrs: {
                            options: _vm.banActions,
                            settings: {
                              settingOption: "value",
                              settingOption: "value",
                              minimumResultsForSearch: Infinity
                            }
                          },
                          model: {
                            value: _vm.banAction,
                            callback: function($$v) {
                              _vm.banAction = $$v
                            },
                            expression: "banAction"
                          }
                        })
                      ],
                      1
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-2" }, [
                    _c("label", { staticClass: "align-top" }, [_vm._v(" ")]),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-outline-primary w-100",
                        attrs: { type: "button" },
                        on: { click: _vm.banClick }
                      },
                      [_vm._v(_vm._s(_vm.$i18n.t("admin_control_execute")))]
                    )
                  ])
                ])
              ])
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-12" }, [
          _c("div", { staticClass: "card" }, [
            _c("div", { staticClass: "card-header" }, [
              _c("h4", { staticClass: "card-title" }, [
                _vm._v(_vm._s(_vm.$i18n.t("admin_control_verify_user")))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-md-6" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-outline-success w-100",
                        attrs: {
                          disabled:
                            ("profile" in _vm.info &&
                              _vm.info.profile.user_verify_at) ||
                            !("profile" in _vm.info),
                          type: "button"
                        },
                        on: { click: _vm.verifyClick }
                      },
                      [
                        _vm._v(
                          _vm._s(
                            _vm.$i18n.t("admin_control_verify_user_action")
                          )
                        )
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-6" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-outline-danger w-100",
                        attrs: {
                          disabled:
                            ("profile" in _vm.info &&
                              !_vm.info.profile.user_verify_at) ||
                            !("profile" in _vm.info),
                          type: "button"
                        },
                        on: { click: _vm.unVerifyClick }
                      },
                      [
                        _vm._v(
                          _vm._s(_vm.$i18n.t("admin_control_take_off_verify"))
                        )
                      ]
                    )
                  ])
                ])
              ])
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-12" }, [
          _c("div", { staticClass: "card" }, [
            _c("div", { staticClass: "card-header" }, [
              _c("h4", { staticClass: "card-title" }, [
                _vm._v(_vm._s(_vm.$i18n.t("admin_control_delete_user")))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-md-6" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-outline-info w-100",
                        attrs: {
                          disabled:
                            ("user" in _vm.info && !_vm.info.user.deleted_at) ||
                            !("user" in _vm.info),
                          type: "button"
                        },
                        on: { click: _vm.banClick }
                      },
                      [_vm._v(_vm._s(_vm.$i18n.t("admin_control_delete_user")))]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-6" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-outline-light w-100",
                        attrs: {
                          disabled:
                            ("user" in _vm.info && _vm.info.user.deleted_at) ||
                            !("user" in _vm.info),
                          type: "button"
                        },
                        on: { click: _vm.banClick }
                      },
                      [
                        _vm._v(
                          _vm._s(_vm.$i18n.t("admin_control_restore_user"))
                        )
                      ]
                    )
                  ])
                ])
              ])
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-12" }, [
          _c("div", { staticClass: "card" }, [
            _c("div", { staticClass: "card-header" }, [
              _c("h4", { staticClass: "card-title" }, [
                _vm._v(_vm._s(_vm.$i18n.t("admin_control_connect_partner")))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-md-6" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-outline-primary w-100",
                        attrs: {
                          disabled:
                            ("user" in _vm.info &&
                              _vm.info.user.partner_status) ||
                            !("user" in _vm.info),
                          type: "button"
                        },
                        on: {
                          click: function($event) {
                            return _vm.changePartner("approvePartner")
                          }
                        }
                      },
                      [
                        _vm._v(
                          _vm._s(_vm.$i18n.t("admin_control_make_partner"))
                        )
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-6" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-outline-warning w-100",
                        attrs: {
                          disabled:
                            ("user" in _vm.info &&
                              !_vm.info.user.partner_status) ||
                            !("user" in _vm.info),
                          type: "button"
                        },
                        on: {
                          click: function($event) {
                            return _vm.changePartner("discardPartner")
                          }
                        }
                      },
                      [
                        _vm._v(
                          _vm._s(_vm.$i18n.t("admin_control_exclude_partner"))
                        )
                      ]
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
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);