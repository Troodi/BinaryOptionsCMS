require('./bootstrap');
require('./js/tv');
import Vue from 'vue';
import router from './router/routes';
import App from './views/layouts/App';
import VueEcho from 'vue-echo-laravel';

Vue.component('menu-component', require('./views/layouts/Menu').default);
Vue.component('footer-component', require('./views/layouts/Footer').default);

Vue.use(VueEcho, {
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001',
});

const app = new Vue({
    el: '#app',
    components: { App },
    router
});

