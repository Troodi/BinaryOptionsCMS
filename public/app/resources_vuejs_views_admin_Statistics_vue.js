(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_vuejs_views_admin_Statistics_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Statistics.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Statistics.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dateformat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dateformat */ "./node_modules/dateformat/lib/dateformat.js");
/* harmony import */ var dateformat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dateformat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _js_functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../js/functions */ "./resources/vuejs/js/functions.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "Statistics",
  mounted: function mounted() {
    var self = this;
    axios.post('/admin/data/statistics').then(function (response) {
      self.statistics = response.data;
    });
    $('#users').DataTable({
      "iDisplayLength": 10,
      "processing": true,
      "serverSide": true,
      "order": [[0, "desc"]],
      "drawCallback": function drawCallback() {
        $('[data-toggle="popover"]').popover({
          html: true
        });
        $('.router-push').on('click', function () {
          var url = $(this).attr('data-url');
          self.$router.push({
            path: url
          });
          return false;
        });
      },
      "ajax": {
        url: "/admin/data/users",
        type: "POST"
      },
      "language": {
        "url": "/locales/" + ((0,_js_functions__WEBPACK_IMPORTED_MODULE_2__.getCookie)('currentLanguage') ? (0,_js_functions__WEBPACK_IMPORTED_MODULE_2__.getCookie)('currentLanguage') : 'en') + ".json"
      },
      columns: [{
        data: 'id',
        name: 'id'
      }, {
        data: 'email',
        name: 'email',
        render: function render(data, type, row) {
          var email = '';

          if (type === 'display') {
            email = data;
          }

          return '<a class="router-push" data-url="/admin/user/profile/' + row.id + '" href="/admin/user/profile/' + row.id + '">' + email + ' <i class="bx bx-link-external" style="font-size: 12px;"></i></a>';
        }
      }, {
        data: 'geo',
        name: 'geo',
        render: function render(data, type, row) {
          var geo = '';
          var geo_code = '';

          if (type === 'display') {
            geo = data;
            geo_code = row.geo_code;
          }

          return '<i data-trigger="hover" data-toggle="popover" data-placement="top" data-container="body" data-original-title="' + self.$i18n.t('admin_stat_country') + '" data-content="' + geo + '" class="flag-icon flag-icon-' + geo_code + '"></i>';
        }
      }, {
        data: 'status',
        searchable: false,
        orderable: false,
        name: 'users.status',
        render: function render(data) {
          if (data == 0) {
            return '<span class="badge badge badge-danger text-white">' + self.$i18n.t('admin_stat_offline') + '</span>';
          } else {
            return '<span class="badge badge badge-success text-white">' + self.$i18n.t('admin_stat_online') + '</span>';
          }
        }
      }, {
        data: 'balance',
        name: 'balance'
      }, {
        data: 'updated_at',
        name: 'updated_at',
        render: function render(data, type) {
          var date = new Date();

          if (type === 'display') {
            date = new Date(data);
          }

          return dateformat__WEBPACK_IMPORTED_MODULE_0___default()(date, 'HH:MM dd-mm-yyyy');
        }
      }, {
        data: 'created_at',
        name: 'created_at',
        render: function render(data, type) {
          var date = new Date();

          if (type === 'display') {
            date = new Date(data);
          }

          return dateformat__WEBPACK_IMPORTED_MODULE_0___default()(date, 'HH:MM dd-mm-yyyy');
        }
      }]
    });
    $('#stat').DataTable({
      "iDisplayLength": 10,
      "processing": true,
      "serverSide": true,
      "order": [[6, "desc"]],
      "ajax": {
        url: "/admin/data/daily",
        type: "POST"
      },
      "language": {
        "url": "/locales/" + ((0,_js_functions__WEBPACK_IMPORTED_MODULE_2__.getCookie)('currentLanguage') ? (0,_js_functions__WEBPACK_IMPORTED_MODULE_2__.getCookie)('currentLanguage') : 'en') + ".json"
      },
      columns: [{
        data: 'daily_orders_count',
        name: 'daily_orders_count'
      }, {
        data: 'daily_orders_amount',
        name: 'daily_orders_amount',
        render: function render(data, type, row) {
          var text = '';

          if (type === 'display') {
            text = data;
          }

          return '$ ' + text;
        }
      }, {
        data: 'daily_profit',
        name: 'daily_profit',
        render: function render(data, type, row) {
          var text = '';

          if (type === 'display') {
            text = data;
          }

          return '$ ' + text;
        }
      }, {
        data: 'daily_loss',
        name: 'daily_loss',
        render: function render(data, type, row) {
          var text = '';

          if (type === 'display') {
            text = data;
          }

          return '$ ' + text;
        }
      }, {
        data: 'daily_profit_count',
        name: 'daily_profit_count'
      }, {
        data: 'daily_loss_count',
        name: 'daily_loss_count'
      }, {
        data: 'created_at',
        name: 'created_at',
        render: function render(data, type, row) {
          var date = new Date();

          if (type === 'display') {
            date = new Date(data);
          }

          return dateformat__WEBPACK_IMPORTED_MODULE_0___default()(date, 'dd-mm-yyyy');
        }
      }]
    });
  },
  data: function data() {
    return {
      statistics: {}
    };
  }
});

/***/ }),

/***/ "./resources/vuejs/views/admin/Statistics.vue":
/*!****************************************************!*\
  !*** ./resources/vuejs/views/admin/Statistics.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Statistics_vue_vue_type_template_id_6492a9fc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Statistics.vue?vue&type=template&id=6492a9fc&scoped=true& */ "./resources/vuejs/views/admin/Statistics.vue?vue&type=template&id=6492a9fc&scoped=true&");
/* harmony import */ var _Statistics_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Statistics.vue?vue&type=script&lang=js& */ "./resources/vuejs/views/admin/Statistics.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Statistics_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Statistics_vue_vue_type_template_id_6492a9fc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Statistics_vue_vue_type_template_id_6492a9fc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "6492a9fc",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/vuejs/views/admin/Statistics.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/vuejs/views/admin/Statistics.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/vuejs/views/admin/Statistics.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Statistics_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Statistics.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Statistics.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Statistics_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/vuejs/views/admin/Statistics.vue?vue&type=template&id=6492a9fc&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./resources/vuejs/views/admin/Statistics.vue?vue&type=template&id=6492a9fc&scoped=true& ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Statistics_vue_vue_type_template_id_6492a9fc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Statistics_vue_vue_type_template_id_6492a9fc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Statistics_vue_vue_type_template_id_6492a9fc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Statistics.vue?vue&type=template&id=6492a9fc&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Statistics.vue?vue&type=template&id=6492a9fc&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Statistics.vue?vue&type=template&id=6492a9fc&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/admin/Statistics.vue?vue&type=template&id=6492a9fc&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
        _c("div", { staticClass: "col-md-3" }, [
          _c("div", { staticClass: "card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-body d-flex align-items-center justify-content-between",
                staticStyle: { position: "relative" }
              },
              [
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _vm._m(0),
                  _vm._v(" "),
                  _c("div", { staticClass: "total-amount" }, [
                    _c(
                      "h5",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm._.isEmpty(_vm.statistics),
                            expression: "_.isEmpty(statistics)"
                          }
                        ],
                        staticClass: "mb-0"
                      },
                      [
                        _c("span", {
                          staticClass: "spinner-border spinner-border-sm",
                          staticStyle: { "margin-bottom": "3px" },
                          attrs: { role: "status", "aria-hidden": "true" }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    !_vm._.isEmpty(_vm.statistics)
                      ? _c("h5", { staticClass: "mb-0" }, [
                          _vm._v(_vm._s(_vm.statistics.user_count))
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("small", { staticClass: "text-muted" }, [
                      _vm._v(_vm._s(_vm.$i18n.t("admin_stat_total_users")))
                    ])
                  ])
                ])
              ]
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-3" }, [
          _c("div", { staticClass: "card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-body d-flex align-items-center justify-content-between",
                staticStyle: { position: "relative" }
              },
              [
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _vm._m(1),
                  _vm._v(" "),
                  _c("div", { staticClass: "total-amount" }, [
                    _c(
                      "h5",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm._.isEmpty(_vm.statistics),
                            expression: "_.isEmpty(statistics)"
                          }
                        ],
                        staticClass: "mb-0"
                      },
                      [
                        _c("span", {
                          staticClass: "spinner-border spinner-border-sm",
                          staticStyle: { "margin-bottom": "3px" },
                          attrs: { role: "status", "aria-hidden": "true" }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    !_vm._.isEmpty(_vm.statistics)
                      ? _c("h5", { staticClass: "mb-0" }, [
                          _vm._v(_vm._s(_vm.statistics.banned_users))
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("small", { staticClass: "text-muted" }, [
                      _vm._v(_vm._s(_vm.$i18n.t("admin_stat_banned_users")))
                    ])
                  ])
                ])
              ]
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-3" }, [
          _c("div", { staticClass: "card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-body d-flex align-items-center justify-content-between",
                staticStyle: { position: "relative" }
              },
              [
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _vm._m(2),
                  _vm._v(" "),
                  _c("div", { staticClass: "total-amount" }, [
                    _c(
                      "h5",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm._.isEmpty(_vm.statistics),
                            expression: "_.isEmpty(statistics)"
                          }
                        ],
                        staticClass: "mb-0"
                      },
                      [
                        _c("span", {
                          staticClass: "spinner-border spinner-border-sm",
                          staticStyle: { "margin-bottom": "3px" },
                          attrs: { role: "status", "aria-hidden": "true" }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    !_vm._.isEmpty(_vm.statistics)
                      ? _c("h5", { staticClass: "mb-0" }, [
                          _vm._v(_vm._s(_vm.statistics.deposit_count))
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("small", { staticClass: "text-muted" }, [
                      _vm._v(_vm._s(_vm.$i18n.t("admin_stat_deposits")))
                    ])
                  ])
                ])
              ]
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-3" }, [
          _c("div", { staticClass: "card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-body d-flex align-items-center justify-content-between",
                staticStyle: { position: "relative" }
              },
              [
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _vm._m(3),
                  _vm._v(" "),
                  _c("div", { staticClass: "total-amount" }, [
                    _c(
                      "h5",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm._.isEmpty(_vm.statistics),
                            expression: "_.isEmpty(statistics)"
                          }
                        ],
                        staticClass: "mb-0"
                      },
                      [
                        _c("span", {
                          staticClass: "spinner-border spinner-border-sm",
                          staticStyle: { "margin-bottom": "3px" },
                          attrs: { role: "status", "aria-hidden": "true" }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    !_vm._.isEmpty(_vm.statistics)
                      ? _c("h5", { staticClass: "mb-0" }, [
                          _vm._v(_vm._s(_vm.statistics.withdrawal_count))
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("small", { staticClass: "text-muted" }, [
                      _vm._v(_vm._s(_vm.$i18n.t("admin_stat_withdraws")))
                    ])
                  ])
                ])
              ]
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-3" }, [
          _c("div", { staticClass: "card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-body d-flex align-items-center justify-content-between",
                staticStyle: { position: "relative" }
              },
              [
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _vm._m(4),
                  _vm._v(" "),
                  _c("div", { staticClass: "total-amount" }, [
                    _c(
                      "h5",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm._.isEmpty(_vm.statistics),
                            expression: "_.isEmpty(statistics)"
                          }
                        ],
                        staticClass: "mb-0"
                      },
                      [
                        _c("span", {
                          staticClass: "spinner-border spinner-border-sm",
                          staticStyle: { "margin-bottom": "3px" },
                          attrs: { role: "status", "aria-hidden": "true" }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    !_vm._.isEmpty(_vm.statistics)
                      ? _c("h5", { staticClass: "mb-0" }, [
                          _vm._v(_vm._s(_vm.statistics.referral_count))
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("small", { staticClass: "text-muted" }, [
                      _vm._v(_vm._s(_vm.$i18n.t("admin_stat_referrals")))
                    ])
                  ])
                ])
              ]
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-3" }, [
          _c("div", { staticClass: "card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-body d-flex align-items-center justify-content-between",
                staticStyle: { position: "relative" }
              },
              [
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _vm._m(5),
                  _vm._v(" "),
                  _c("div", { staticClass: "total-amount" }, [
                    _c(
                      "h5",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm._.isEmpty(_vm.statistics),
                            expression: "_.isEmpty(statistics)"
                          }
                        ],
                        staticClass: "mb-0"
                      },
                      [
                        _c("span", {
                          staticClass: "spinner-border spinner-border-sm",
                          staticStyle: { "margin-bottom": "3px" },
                          attrs: { role: "status", "aria-hidden": "true" }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    !_vm._.isEmpty(_vm.statistics)
                      ? _c("h5", { staticClass: "mb-0" }, [
                          _vm._v("$ " + _vm._s(_vm.statistics.profit))
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("small", { staticClass: "text-muted" }, [
                      _vm._v(_vm._s(_vm.$i18n.t("admin_stat_profit")))
                    ])
                  ])
                ])
              ]
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-3" }, [
          _c("div", { staticClass: "card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-body d-flex align-items-center justify-content-between",
                staticStyle: { position: "relative" }
              },
              [
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _vm._m(6),
                  _vm._v(" "),
                  _c("div", { staticClass: "total-amount" }, [
                    _c(
                      "h5",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm._.isEmpty(_vm.statistics),
                            expression: "_.isEmpty(statistics)"
                          }
                        ],
                        staticClass: "mb-0"
                      },
                      [
                        _c("span", {
                          staticClass: "spinner-border spinner-border-sm",
                          staticStyle: { "margin-bottom": "3px" },
                          attrs: { role: "status", "aria-hidden": "true" }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    !_vm._.isEmpty(_vm.statistics)
                      ? _c("h5", { staticClass: "mb-0" }, [
                          _vm._v(_vm._s(_vm.statistics.deals))
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("small", { staticClass: "text-muted" }, [
                      _vm._v(_vm._s(_vm.$i18n.t("admin_stat_all_trades")))
                    ])
                  ])
                ])
              ]
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-3" }, [
          _c("div", { staticClass: "card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-body d-flex align-items-center justify-content-between",
                staticStyle: { position: "relative" }
              },
              [
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _vm._m(7),
                  _vm._v(" "),
                  _c("div", { staticClass: "total-amount" }, [
                    _c(
                      "h5",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm._.isEmpty(_vm.statistics),
                            expression: "_.isEmpty(statistics)"
                          }
                        ],
                        staticClass: "mb-0"
                      },
                      [
                        _c("span", {
                          staticClass: "spinner-border spinner-border-sm",
                          staticStyle: { "margin-bottom": "3px" },
                          attrs: { role: "status", "aria-hidden": "true" }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    !_vm._.isEmpty(_vm.statistics)
                      ? _c("h5", { staticClass: "mb-0" }, [
                          _vm._v("$ " + _vm._s(_vm.statistics.turnover))
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("small", { staticClass: "text-muted" }, [
                      _vm._v(_vm._s(_vm.$i18n.t("admin_stat_all_turnover")))
                    ])
                  ])
                ])
              ]
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-3" }, [
          _c("div", { staticClass: "card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-body d-flex align-items-center justify-content-between",
                staticStyle: { position: "relative" }
              },
              [
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _vm._m(8),
                  _vm._v(" "),
                  _c("div", { staticClass: "total-amount" }, [
                    _c(
                      "h5",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm._.isEmpty(_vm.statistics),
                            expression: "_.isEmpty(statistics)"
                          }
                        ],
                        staticClass: "mb-0"
                      },
                      [
                        _c("span", {
                          staticClass: "spinner-border spinner-border-sm",
                          staticStyle: { "margin-bottom": "3px" },
                          attrs: { role: "status", "aria-hidden": "true" }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    !_vm._.isEmpty(_vm.statistics)
                      ? _c("h5", { staticClass: "mb-0" }, [
                          _vm._v("$ " + _vm._s(_vm.statistics.bonus))
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("small", { staticClass: "text-muted" }, [
                      _vm._v(_vm._s(_vm.$i18n.t("admin_stat_total_bonuses")))
                    ])
                  ])
                ])
              ]
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-3" }, [
          _c("div", { staticClass: "card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-body d-flex align-items-center justify-content-between",
                staticStyle: { position: "relative" }
              },
              [
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _vm._m(9),
                  _vm._v(" "),
                  _c("div", { staticClass: "total-amount" }, [
                    _c(
                      "h5",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm._.isEmpty(_vm.statistics),
                            expression: "_.isEmpty(statistics)"
                          }
                        ],
                        staticClass: "mb-0"
                      },
                      [
                        _c("span", {
                          staticClass: "spinner-border spinner-border-sm",
                          staticStyle: { "margin-bottom": "3px" },
                          attrs: { role: "status", "aria-hidden": "true" }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    !_vm._.isEmpty(_vm.statistics)
                      ? _c("h5", { staticClass: "mb-0" }, [
                          _vm._v("$ " + _vm._s(_vm.statistics.clear_balance))
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("small", { staticClass: "text-muted" }, [
                      _vm._v(
                        _vm._s(
                          _vm.$i18n.t("admin_stat_balance_without_bonuses")
                        )
                      )
                    ])
                  ])
                ])
              ]
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-3" }, [
          _c("div", { staticClass: "card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-body d-flex align-items-center justify-content-between",
                staticStyle: { position: "relative" }
              },
              [
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _vm._m(10),
                  _vm._v(" "),
                  _c("div", { staticClass: "total-amount" }, [
                    _c(
                      "h5",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm._.isEmpty(_vm.statistics),
                            expression: "_.isEmpty(statistics)"
                          }
                        ],
                        staticClass: "mb-0"
                      },
                      [
                        _c("span", {
                          staticClass: "spinner-border spinner-border-sm",
                          staticStyle: { "margin-bottom": "3px" },
                          attrs: { role: "status", "aria-hidden": "true" }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    !_vm._.isEmpty(_vm.statistics)
                      ? _c("h5", { staticClass: "mb-0" }, [
                          _vm._v(_vm._s(_vm.statistics.total_profit_count))
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("small", { staticClass: "text-muted" }, [
                      _vm._v(_vm._s(_vm.$i18n.t("admin_stat_profit_deals")))
                    ])
                  ])
                ])
              ]
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-3" }, [
          _c("div", { staticClass: "card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-body d-flex align-items-center justify-content-between",
                staticStyle: { position: "relative" }
              },
              [
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _vm._m(11),
                  _vm._v(" "),
                  _c("div", { staticClass: "total-amount" }, [
                    _c(
                      "h5",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm._.isEmpty(_vm.statistics),
                            expression: "_.isEmpty(statistics)"
                          }
                        ],
                        staticClass: "mb-0"
                      },
                      [
                        _c("span", {
                          staticClass: "spinner-border spinner-border-sm",
                          staticStyle: { "margin-bottom": "3px" },
                          attrs: { role: "status", "aria-hidden": "true" }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    !_vm._.isEmpty(_vm.statistics)
                      ? _c("h5", { staticClass: "mb-0" }, [
                          _vm._v(_vm._s(_vm.statistics.total_loss_count))
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("small", { staticClass: "text-muted" }, [
                      _vm._v(_vm._s(_vm.$i18n.t("admin_stat_losses_deals")))
                    ])
                  ])
                ])
              ]
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-12" }, [
          _c("section", { staticClass: "card" }, [
            _c("div", { staticClass: "card-header" }, [
              _c("h4", { staticClass: "card-title" }, [
                _vm._v(_vm._s(_vm.$i18n.t("admin_stat_user_list")))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "card-text" }, [
                  _c("div", { staticClass: "table-responsive" }, [
                    _c(
                      "table",
                      { staticClass: "table", attrs: { id: "users" } },
                      [
                        _c("thead", [
                          _c("tr", [
                            _c("th", [_vm._v("ID")]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(_vm._s(_vm.$i18n.t("admin_stat_email")))
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(_vm._s(_vm.$i18n.t("admin_stat_geo")))
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(_vm._s(_vm.$i18n.t("admin_stat_status")))
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(
                                _vm._s(_vm.$i18n.t("admin_stat_balance_usd"))
                              )
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(
                                _vm._s(_vm.$i18n.t("admin_stat_latest_active"))
                              )
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(
                                _vm._s(_vm.$i18n.t("admin_stat_registered"))
                              )
                            ])
                          ])
                        ])
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
          _c("section", { staticClass: "card" }, [
            _c("div", { staticClass: "card-header" }, [
              _c("h4", { staticClass: "card-title" }, [
                _vm._v(_vm._s(_vm.$i18n.t("admin_stat_stats_of_days")))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "card-text" }, [
                  _c("div", { staticClass: "table-responsive" }, [
                    _c(
                      "table",
                      { staticClass: "table", attrs: { id: "stat" } },
                      [
                        _c("thead", [
                          _c("tr", [
                            _c("th", [
                              _vm._v(
                                _vm._s(_vm.$i18n.t("admin_stat_all_deals"))
                              )
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(
                                _vm._s(_vm.$i18n.t("admin_stat_sum_deals"))
                              )
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(
                                _vm._s(
                                  _vm.$i18n.t("admin_stat_all_profit_deals")
                                )
                              )
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(
                                _vm._s(
                                  _vm.$i18n.t("admin_stat_all_losses_deals")
                                )
                              )
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(
                                _vm._s(_vm.$i18n.t("admin_stat_profitable"))
                              )
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(_vm._s(_vm.$i18n.t("admin_stat_losses")))
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(_vm._s(_vm.$i18n.t("admin_stat_date")))
                            ])
                          ])
                        ])
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
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2" },
      [
        _c("div", { staticClass: "avatar-content" }, [
          _c("i", { staticClass: "bx bx-user text-primary font-medium-2" })
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2" },
      [
        _c("div", { staticClass: "avatar-content" }, [
          _c("i", { staticClass: "bx bx-user text-primary font-medium-2" })
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2" },
      [
        _c("div", { staticClass: "avatar-content" }, [
          _c("i", { staticClass: "bx bx-user text-primary font-medium-2" })
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2" },
      [
        _c("div", { staticClass: "avatar-content" }, [
          _c("i", { staticClass: "bx bx-user text-primary font-medium-2" })
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2" },
      [
        _c("div", { staticClass: "avatar-content" }, [
          _c("i", { staticClass: "bx bx-user text-primary font-medium-2" })
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2" },
      [
        _c("div", { staticClass: "avatar-content" }, [
          _c("i", { staticClass: "bx bx-user text-primary font-medium-2" })
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2" },
      [
        _c("div", { staticClass: "avatar-content" }, [
          _c("i", { staticClass: "bx bx-user text-primary font-medium-2" })
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2" },
      [
        _c("div", { staticClass: "avatar-content" }, [
          _c("i", { staticClass: "bx bx-user text-primary font-medium-2" })
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2" },
      [
        _c("div", { staticClass: "avatar-content" }, [
          _c("i", { staticClass: "bx bx-user text-primary font-medium-2" })
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2" },
      [
        _c("div", { staticClass: "avatar-content" }, [
          _c("i", { staticClass: "bx bx-user text-primary font-medium-2" })
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2" },
      [
        _c("div", { staticClass: "avatar-content" }, [
          _c("i", { staticClass: "bx bx-user text-primary font-medium-2" })
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "avatar bg-rgba-primary m-0 p-25 mr-75 mr-xl-2" },
      [
        _c("div", { staticClass: "avatar-content" }, [
          _c("i", { staticClass: "bx bx-user text-primary font-medium-2" })
        ])
      ]
    )
  }
]
render._withStripped = true



/***/ })

}]);