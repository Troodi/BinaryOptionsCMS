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
//
// /**
//  * Routes for vue components
//  */
export const routes = [
    //Students
    { path: '/', name: 'Торговля', component: Trading, meta: { icon: 'desktop', hideFooter: true } },
    { path: '/finance', name: 'Финансы', component: Deposit, meta: { icon: 'gear' } },
    { path: '/history', name: 'История', component: Profile, meta: { icon: 'gear' } },
    { path: '/profile', name: 'Профиль', component: Profile, meta: { icon: 'gear' } },
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