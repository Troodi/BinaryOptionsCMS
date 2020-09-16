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
import Trading from "../views/user/Trading";
import Profile from "../views/user/Profile";
import Deposit from "../views/user/Deposit";
import History from "../views/user/TradeHistory";
import Withdrawal from "../views/user/Withdrawal";
import Support from "../views/user/Support";
//
// /**
//  * Routes for vue components
//  */
export const routes = [
    { path: '/', name: 'Торговля', component: Trading, meta: { icon: 'desktop', hideFooter: true } },
    { path: '/demo', name: 'Демо торговля', component: Trading, meta: { icon: 'line-chart', hideFooter: true } },
    { path: '/deposit', name: 'Пополнение', component: Deposit, meta: { icon: 'bank' } },
    { path: '/withdrawal', name: 'Вывод средств', component: Withdrawal, meta: { icon: 'coins' } },
    { path: '/promocodes', name: 'Промокоды', component: Deposit, meta: { icon: 'bulb' } },
    { path: '/history', name: 'История торговли', component: History, h_child: true, meta: {icon: 'calendar'}},
    { path: '/profile', name: 'Профиль', component: Profile, meta: { icon: 'settings' }},
    { path: '/partner', name: 'Партнерский кабинет', component: Profile, meta: { icon: 'users' }},
    { path: '/support', name: 'Поддержка', component: Support, meta: { icon: 'comments' } },
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

/**
 * Export object VueRouter with mode and routes
 */
export default router;