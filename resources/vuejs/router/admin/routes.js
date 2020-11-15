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
import Statistics from "../../views/admin/Statistics";
import Profile from "../../views/user/Profile";
import Deposit from "../../views/admin/Deposit";
import Withdrawal from "../../views/admin/Withdrawal";
import Promocode from "../../views/admin/Promocode";
import Verify from "../../views/admin/Verify";
import TradeHistory from "../../views/admin/TradeHistory";

//
// /**
//  * Routes for vue components
//  */
export const routes = [
    { path: '/admin', name: 'Статистика системы', component: Statistics, meta: { icon: 'desktop', hideFooter: true } },
    { path: '/admin/demo', name: 'Промокоды', component: Promocode, meta: { icon: 'line-chart', hideFooter: true } },
    { path: '/admin/deposit', name: 'Пополения', component: Deposit, meta: { icon: 'bank'} },
    { path: '/admin/withdrawal', name: 'Выплаты', component: Withdrawal, meta: { icon: 'coins' } },
    { path: '/admin/verify', name: 'Верификация', component: Verify, meta: { icon: 'bulb' } },
    { path: '/admin/promocodes', name: 'Мультиаккаунты', component: Promocode, meta: { icon: 'bulb' } },
    { path: '/admin/history', name: 'История торговли', component: TradeHistory, meta: { icon: 'bulb' } },
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