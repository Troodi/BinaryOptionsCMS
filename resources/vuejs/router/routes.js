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
import Trading from "../views/Trading";
//
// /**
//  * Routes for vue components
//  */
export const routes = [
    //Students
    { path: '/', name: 'trading', component: Trading },
    { path: '/fuck', name: 'trading', component: Trading },
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