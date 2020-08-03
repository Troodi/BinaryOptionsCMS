require('./bootstrap');
import Vue from 'vue';
import router from './router/routes';
import App from './views/layouts/App';
// import Menu from './views/layouts/Menu';

Vue.component('menu-component', require('./views/layouts/Menu').default);

const app = new Vue({
    el: '#app',
    components: { App },
    router
});