require('./bootstrap');
require('./js/tv');
import Vue from 'vue';
import router from './router/admin/routes';
import App from './views/layouts/App';
import VueEcho from 'vue-echo-laravel';
import VueCurrencyInput from "vue-currency-input";
import VueCountdownTimer from 'vuejs-countdown-timer'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import select2 from 'v-select2-component';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../sass/bootstrap.scss'
import '../sass/bootstrap-extended.scss'
import _ from 'lodash'
Vue.prototype._ = _

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    statusCode: {
        401: function(){
            window.location = '/login';
        },
        419: function () {
            location.reload();
        }
    }
});

const VueInputMask = require('vue-inputmask').default
window.axios = require('axios');

window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
};

window.axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        window.location = '/login';
    } else if (419 === error.response.status) {
        location.reload();
    } else {
        return Promise.reject(error);
    }
});

Vue.use(VueInputMask)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCountdownTimer)
Vue.use(VueCurrencyInput);
Vue.component('select2', select2);
Vue.component('deposit-history', require('./views/user/DepositHistory').default);
Vue.component('menu-component', require('./views/layouts/Menu').default);
Vue.component('footer-component', require('./views/layouts/Footer').default);
Vue.component('header-component', require('./views/layouts/Header').default);
Vue.component('ping-component', require('./components/PingComponent').default);

Vue.use(VueEcho, {
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001',
});

const app = new Vue({
    el: '#app',
    components: { App },
    router
});

