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
import Deposit from "../../views/user/Deposit";
import Deposits from "../../views/admin/Deposit";
import Withdrawal from "../../views/user/Withdrawal";
import Withdrawals from "../../views/admin/Withdrawal";
import Promocode from "../../views/user/Promocode";
import Verify from "../../views/admin/Verify";
import TradeHistory from "../../views/admin/TradeHistory";
import UserLayout from "../../views/admin/layouts/User";
import Partner from "../../views/user/Partner";
import Partners from "../../views/admin/Partner";
import Control from "../../views/admin/Control";
//
// /**
//  * Routes for vue components
//  */
export const routes = [
    { path: '/admin', name: 'Статистика системы', component: Statistics },
    { path: '/admin/user/', name: 'Пользователь', component: UserLayout, meta: { isAdmin: true },
        children: [
            { path: '/admin/user/profile/:id', name: 'Профиль', component: Profile, meta: { isAdmin: true }},
            { path: '/admin/user/control/:id', name: 'Управление пользователем', component: Control, meta: { isAdmin: true }},
            { path: '/admin/user/deposit/:id', name: 'Пополнения пользователя', component: Deposit, meta: { isAdmin: true }},
            { path: '/admin/user/withdrawal/:id', name: 'Выплаты пользователя', component: Withdrawal, meta: { isAdmin: true }},
            { path: '/admin/user/history/:id', name: 'История торговли пользователя', component: TradeHistory, meta: { isAdmin: true }},
            { path: '/admin/user/partner/:id', name: 'Рефералы пользователя', component: Partner, meta: { isAdmin: true }},
            { path: '/admin/user/promocode/:id', name: 'Промокоды пользователя', component: Promocode, meta: { isAdmin: true }},
        ]
    },
    { path: '/admin/demo', name: 'Промокоды', component: Promocode },
    { path: '/admin/deposit', name: 'Пополения', component: Deposits },
    { path: '/admin/withdrawal', name: 'Выплаты', component: Withdrawals },
    { path: '/admin/partner', name: 'Заявки на партнерство', component: Partners },
    { path: '/admin/verify', name: 'Верификация', component: Verify },
    { path: '/admin/promocodes', name: 'Мультиаккаунты', component: Promocode },
    { path: '/admin/history', name: 'История торговли', component: TradeHistory },
    { path: '/logout', name: 'Выйти', component: Profile },
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