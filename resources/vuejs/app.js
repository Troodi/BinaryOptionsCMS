require('./bootstrap');
require('./js/tv');
import Vue from 'vue';
import router from './router/routes';
import App from './views/layouts/App';
import VueEcho from 'vue-echo-laravel';
import VueCurrencyInput from "vue-currency-input";
import VueCountdownTimer from 'vuejs-countdown-timer'

window.axios = require('axios');

window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
};

Vue.use(VueCountdownTimer)
Vue.use(VueCurrencyInput);
Vue.component('menu-component', require('./views/layouts/Menu').default);
Vue.component('footer-component', require('./views/layouts/Footer').default);
Vue.component('header-component', require('./views/layouts/Header').default);

Vue.use(VueEcho, {
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001',
});

const app = new Vue({
    el: '#app',
    components: { App },
    router
});

