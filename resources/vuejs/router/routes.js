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
//
// /**
//  * Routes for vue components
//  */
export const routes = [
    //Students
    { path: '/', name: 'Trading', component: Trading, meta: { icon: 'desktop' } },
    { path: '/profile', name: 'Profile', component: Profile, meta: { icon: 'gear' } },
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