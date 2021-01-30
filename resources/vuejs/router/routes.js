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
import PageNotFound from "../views/layouts/PageNotFound";
import i18n from '../../vuejs/locales/i18n.js'
//
// /**
//  * Routes for vue components
//  */
export const routes = [
    { path: '/trading', name: i18n.t('menu_trading'), component: Trading, meta: { icon: 'desktop', hideFooter: true } },
    { path: '/demo', name: i18n.t('menu_demo'), component: Trading, meta: { icon: 'line-chart', hideFooter: true, demoPage: true } },
    { path: '/deposit', name: i18n.t('menu_deposit'), component: Deposit, meta: { icon: 'bank', badge : '50% OFF' } },
    { path: '/withdrawal', name: i18n.t('menu_withdrawal'), component: Withdrawal, meta: { icon: 'coins' } },
    { path: '/promocodes', name: i18n.t('menu_promo_codes'), component: Promocode, meta: { icon: 'bulb' } },
    { path: '/history', name: i18n.t('menu_history'), component: History, meta: {icon: 'calendar'}},
    { path: '/profile', name: i18n.t('menu_profile'), component: Profile, meta: { icon: 'settings' }},
    { path: '/partner', name: i18n.t('menu_partner'), component: Partner, meta: { icon: 'users' }},
    { path: '/support', name: i18n.t('menu_support'), component: Support, meta: { icon: 'help' } },
    { path: '*', name: i18n.t('menu_404'), component: PageNotFound, meta: { icon: 'help', hide: true } },
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