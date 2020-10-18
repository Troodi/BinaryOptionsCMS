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
import Partner from "../views/user/Partner";
import Promocode from "../views/user/Promocode";

//
// /**
//  * Routes for vue components
//  */
export const routes = [
    { path: '/', name: 'Торговля', component: Trading, meta: { icon: 'desktop', hideFooter: true } },
    { path: '/demo', name: 'Демо торговля', component: Trading, meta: { icon: 'line-chart', hideFooter: true } },
    { path: '/deposit', name: 'Пополнение', component: Deposit, meta: { icon: 'bank', badge : '50% OFF' } },
    { path: '/withdrawal', name: 'Вывод средств', component: Withdrawal, meta: { icon: 'coins' } },
    { path: '/promocodes', name: 'Промокоды', component: Promocode, meta: { icon: 'bulb', badge : '10$ GIFT' } },
    { path: '/history', name: 'История торговли', component: History, meta: {icon: 'calendar'}},
    { path: '/profile', name: 'Профиль', component: Profile, meta: { icon: 'settings' }},
    { path: '/partner', name: 'Партнерский кабинет', component: Partner, meta: { icon: 'users' }},
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

router.beforeEach((to, from, next) => {
    document.title = to.name
    next()
})

/**
 * Export object VueRouter with mode and routes
 */
export default router;