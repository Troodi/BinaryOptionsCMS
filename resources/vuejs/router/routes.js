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
import i18n from '../../vuejs/locales/i18n.js';

const Trading = () => import("../views/user/Trading");
const Profile = () => import("../views/user/Profile");
const Deposit = () => import("../views/user/Deposit");
const History = () => import("../views/user/TradeHistory");
const Withdrawal = () => import("../views/user/Withdrawal");
const Support = () => import("../views/user/Support");
const Partner = () => import("../views/user/Partner");
const Promocode = () => import("../views/user/Promocode");
const PageNotFound = () => import("../views/layouts/PageNotFound");
const Empty = () => import("../views/user/Empty");
//
// /**
//  * Routes for vue components
//  */
export const routes = [
    { path: '/trading/:type?/:id?', name: i18n.t('menu_trading'), component: Empty, meta: { icon: 'desktop', hideFooter: true, hide: true } },
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