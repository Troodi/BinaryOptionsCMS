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
import i18n from "../../locales/i18n";

const Statistics = () => import("../../views/admin/Statistics");
const Profile = () => import("../../views/user/Profile");
const Deposit = () => import("../../views/user/Deposit");
const Deposits = () => import("../../views/admin/Deposit");
const Withdrawal = () => import("../../views/user/Withdrawal");
const Withdrawals = () => import("../../views/admin/Withdrawal");
const Promocode = () => import("../../views/user/Promocode");
const PromocodeAdmin = () => import("../../views/admin/Promocode");
const Verify = () => import("../../views/admin/Verify");
const TradeHistory = () => import("../../views/admin/TradeHistory");
const UserLayout = () => import("../../views/admin/layouts/User");
const Partner = () => import("../../views/user/Partner");
const Partners = () => import("../../views/admin/Partner");
const Control = () => import("../../views/admin/Control");
const Settings = () => import("../../views/admin/Settings");
const PageNotFound = () => import("../../views/layouts/PageNotFound");
const DepositSystem = () => import("../../views/admin/DepositSystem");
const WithdrawSystem = () => import("../../views/admin/WithdrawSystem");
const Symbol = () => import("../../views/admin/Symbol");

//
// /**
//  * Routes for vue components
//  */
export const routes = [
    { path: '/admin', name: 'Статистика системы', component: Statistics },
    { path: '/admin/settings', name: 'Настройки', component: Settings },
    { path: '/admin/deposit/systems', name: 'Системы пополения', component: DepositSystem },
    { path: '/admin/withdraw/systems', name: 'Системы вывода', component: WithdrawSystem },
    { path: '/admin/symbols', name: 'Валютные пары', component: Symbol },

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
    { path: '/admin/promocodes', name: 'Мультиаккаунты', component: PromocodeAdmin },
    { path: '/admin/history', name: 'История торговли', component: TradeHistory },
    { path: '/logout', name: 'Выйти', component: Profile },
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