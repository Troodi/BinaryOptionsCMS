(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_vuejs_views_user_TradeHistory_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/TradeHistory.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/TradeHistory.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _js_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../js/functions */ "./resources/vuejs/js/functions.js");
/* harmony import */ var dateformat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dateformat */ "./node_modules/dateformat/lib/dateformat.js");
/* harmony import */ var dateformat__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dateformat__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


__webpack_require__(/*! ../../../vendors/js/tables/datatable/datatables.min.js */ "./resources/vendors/js/tables/datatable/datatables.min.js");

__webpack_require__(/*! ../../../vendors/js/tables/datatable/dataTables.bootstrap4.min.js */ "./resources/vendors/js/tables/datatable/dataTables.bootstrap4.min.js");

__webpack_require__(/*! ../../../js/core/libraries/bootstrap.min.js */ "./resources/js/core/libraries/bootstrap.min.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "TradeHistory",
  mounted: function mounted() {
    var self = this;
    axios.get('/data/symbols').then(function (response) {
      self.symbols = response.data;
      self.fillDT('#real-history', self.isAdmin ? "/trading/history/" + self.userId : "/trading/history");
      self.fillDT('#demo-history', self.isAdmin ? "/trading/demo/history/" + self.userId : "/trading/demo/history");
    });
  },
  data: function data() {
    return {};
  },
  computed: {
    isAdmin: function isAdmin() {
      return this.$route.meta.isAdmin;
    },
    userId: function userId() {
      return this.$route.params.id;
    }
  },
  methods: {
    fillDT: function fillDT(element, url) {
      var self = this;
      $(element).DataTable({
        "iDisplayLength": 10,
        "processing": true,
        "serverSide": true,
        "order": [[6, "desc"]],
        "drawCallback": function drawCallback(settings) {
          $('[data-toggle="popover"]').popover({
            html: true
          });
        },
        "ajax": {
          url: url,
          type: "POST"
        },
        "language": {
          "url": "/locales/" + ((0,_js_functions__WEBPACK_IMPORTED_MODULE_0__.getCookie)('currentLanguage') ? (0,_js_functions__WEBPACK_IMPORTED_MODULE_0__.getCookie)('currentLanguage') : 'en') + ".json"
        },
        columns: [{
          orderable: false,
          searchable: false,
          data: 'amount',
          name: 'amount',
          render: function render(data, type) {
            return parseFloat(data).toFixed(2) + ' $';
          }
        }, {
          orderable: false,
          searchable: false,
          data: 'amount',
          name: 'amount',
          render: function render(data, type, row) {
            var path = self.$i18n.t('trade_history_higher');
            var classname = 'success';

            if (row.type === 0) {
              path = self.$i18n.t('trade_history_lower');
              classname = 'danger';
            }

            return '<div class="badge badge-secondary cursor-pointer" data-trigger="hover" data-toggle="popover" data-placement="top" data-container="body" data-original-title="' + self.$i18n.t('trade_history_additional') + '" data-content="' + self.$i18n.t('trade_history_open_price') + ': ' + row.open_price + '<br>' + self.$i18n.t('trade_history_close_price') + ': ' + row.close_price + '<br>' + self.$i18n.t('trade_history_path') + ': <div class=\'badge badge-' + classname + '\'>' + path + '</div><br>' + self.$i18n.t('trade_history_open_time') + ': ' + dateformat__WEBPACK_IMPORTED_MODULE_1___default()(row.open_at, 'HH:MM:ss dd-mm-yyyy') + '<br>' + self.$i18n.t('trade_history_close_time') + ': ' + dateformat__WEBPACK_IMPORTED_MODULE_1___default()(row.close_at, 'HH:MM:ss dd-mm-yyyy') + '' + '">' + self.$i18n.t('trade_history_add') + '</div>';
          }
        }, {
          data: 'profit',
          name: 'profit',
          orderable: false,
          searchable: false,
          render: function render(data, type) {
            var classname = 'success';

            if (type === 'display') {
              if (data > 0) {
                classname = 'success';
              } else {
                classname = 'danger';
              }
            }

            return '<div class="badge badge-' + classname + '">' + parseFloat(data).toFixed(2) + ' $</div>';
          }
        }, {
          data: 'symbol_id',
          name: 'symbol_id',
          orderable: false,
          searchable: false,
          render: function render(data, type) {
            var symbol = '';

            if (type === 'display') {
              symbol = self.symbols.find(function (x) {
                return x.id === data;
              }).symbol;
            }

            return '<div class="badge badge-primary">' + symbol + '</div>';
          }
        }, {
          orderable: false,
          searchable: false,
          data: 'percent',
          name: 'percent',
          render: function render(data, type) {
            return parseFloat(data).toFixed(2) + ' %';
          }
        }, {
          orderable: false,
          searchable: false,
          data: 'close_at',
          name: 'close_at',
          render: function render(data, type, row) {
            var date = new Date();

            if (type === 'display') {
              date = new Date(new Date(row.close_at).getTime() - new Date(row.open_at).getTime());
              date.setHours(date.getHours() + new Date().getTimezoneOffset() / 60);
            }

            return dateformat__WEBPACK_IMPORTED_MODULE_1___default()(date, 'HH:MM:ss');
          }
        }, {
          data: 'created_at',
          name: 'created_at',
          render: function render(data, type) {
            var date = new Date();

            if (type === 'display') {
              date = new Date(data);
            }

            return dateformat__WEBPACK_IMPORTED_MODULE_1___default()(date, 'dd-mm-yyyy');
          }
        }]
      });
    }
  }
});

/***/ }),

/***/ "./resources/vuejs/views/user/TradeHistory.vue":
/*!*****************************************************!*\
  !*** ./resources/vuejs/views/user/TradeHistory.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TradeHistory_vue_vue_type_template_id_11a8164b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TradeHistory.vue?vue&type=template&id=11a8164b&scoped=true& */ "./resources/vuejs/views/user/TradeHistory.vue?vue&type=template&id=11a8164b&scoped=true&");
/* harmony import */ var _TradeHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TradeHistory.vue?vue&type=script&lang=js& */ "./resources/vuejs/views/user/TradeHistory.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _TradeHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _TradeHistory_vue_vue_type_template_id_11a8164b_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _TradeHistory_vue_vue_type_template_id_11a8164b_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "11a8164b",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/vuejs/views/user/TradeHistory.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/vuejs/views/user/TradeHistory.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/vuejs/views/user/TradeHistory.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TradeHistory.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/TradeHistory.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/vuejs/views/user/TradeHistory.vue?vue&type=template&id=11a8164b&scoped=true&":
/*!************************************************************************************************!*\
  !*** ./resources/vuejs/views/user/TradeHistory.vue?vue&type=template&id=11a8164b&scoped=true& ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeHistory_vue_vue_type_template_id_11a8164b_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeHistory_vue_vue_type_template_id_11a8164b_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeHistory_vue_vue_type_template_id_11a8164b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TradeHistory.vue?vue&type=template&id=11a8164b&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/TradeHistory.vue?vue&type=template&id=11a8164b&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/TradeHistory.vue?vue&type=template&id=11a8164b&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/vuejs/views/user/TradeHistory.vue?vue&type=template&id=11a8164b&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************/
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
          _c("section", { staticClass: "card" }, [
            _c("div", { staticClass: "card-header" }, [
              _c("h4", { staticClass: "card-title" }, [
                _vm._v(_vm._s(_vm.$i18n.t("trade_history_title")))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "card-text" }, [
                  _c("div", { staticClass: "table-responsive" }, [
                    _c(
                      "table",
                      { staticClass: "table", attrs: { id: "real-history" } },
                      [
                        _c("thead", [
                          _c("tr", [
                            _c("th", [
                              _vm._v(
                                _vm._s(_vm.$i18n.t("trade_history_amount"))
                              )
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(_vm._s(_vm.$i18n.t("trade_history_info")))
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(
                                _vm._s(_vm.$i18n.t("trade_history_profit"))
                              )
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(
                                _vm._s(_vm.$i18n.t("trade_history_instrument"))
                              )
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(
                                _vm._s(_vm.$i18n.t("trade_history_percent"))
                              )
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(
                                _vm._s(_vm.$i18n.t("trade_history_expiration"))
                              )
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(_vm._s(_vm.$i18n.t("trade_history_date")))
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
                _vm._v(_vm._s(_vm.$i18n.t("trade_history_demo_title")))
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "card-text" }, [
                  _c("div", { staticClass: "table-responsive" }, [
                    _c(
                      "table",
                      { staticClass: "table", attrs: { id: "demo-history" } },
                      [
                        _c("thead", [
                          _c("tr", [
                            _c("th", [
                              _vm._v(
                                _vm._s(_vm.$i18n.t("trade_history_amount"))
                              )
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(_vm._s(_vm.$i18n.t("trade_history_info")))
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(
                                _vm._s(_vm.$i18n.t("trade_history_profit"))
                              )
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(
                                _vm._s(_vm.$i18n.t("trade_history_instrument"))
                              )
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(
                                _vm._s(_vm.$i18n.t("trade_history_percent"))
                              )
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(
                                _vm._s(_vm.$i18n.t("trade_history_expiration"))
                              )
                            ]),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(_vm._s(_vm.$i18n.t("trade_history_date")))
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
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);