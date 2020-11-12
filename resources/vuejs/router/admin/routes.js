/**
 * Import libs
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
//
// /**
//  * Import Components
//  */
// //Students
import Trading from "../../views/user/Trading";
import Profile from "../../views/user/Profile";
import Deposit from "../../views/user/Deposit";
import Withdrawal from "../../views/user/Withdrawal";
import Promocode from "../../views/user/Promocode";

//
// /**
//  * Routes for vue components
//  */
export const routes = [
    { path: '/admin', name: 'Статистика системы', component: Trading, meta: { icon: 'desktop', hideFooter: true } },
    { path: '/admin/demo', name: 'Пользователи', component: Trading, meta: { icon: 'line-chart', hideFooter: true, demoPage: true } },
    { path: '/deposit', name: 'Пополения', component: Deposit, meta: { icon: 'bank'} },
    { path: '/withdrawal', name: 'Выводы', component: Withdrawal, meta: { icon: 'coins' } },
    { path: '/promocodes', name: 'Мультиаккаунты', component: Promocode, meta: { icon: 'bulb' } },
    { path: '/logout', name: 'Выйти', component: Profile, meta: { icon: 'close' }},
];

Vue.use(VueRouter);

/**
 * Create object VueRouter
 */
const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    document.title = to.name
    next()
})

/**
 * Export object VueRouter with mode and routes
 */
export default router;