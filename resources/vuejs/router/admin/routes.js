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
import ContestEdit from "../../views/admin/ContestEdit";

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
const PromocodeEdit = () => import("../../views/admin/PromocodeEdit");
//
// /**
//  * Routes for vue components
//  */
export const routes = [
    { path: '/admin', name: i18n.t('admin_menu_stat'), component: Statistics },
    { path: '/admin/settings', name: i18n.t('admin_menu_settings'), component: Settings },
    { path: '/admin/deposit/systems', name: i18n.t('admin_menu_deposit_systems'), component: DepositSystem },
    { path: '/admin/withdraw/systems', name: i18n.t('admin_menu_withdraw_systems'), component: WithdrawSystem },
    { path: '/admin/symbols', name: i18n.t('admin_menu_quotes'), component: Symbol },

    { path: '/admin/user/', name: i18n.t('admin_menu_user'), component: UserLayout, meta: { isAdmin: true },
        children: [
            { path: '/admin/user/profile/:id', name: i18n.t('admin_menu_profile'), component: Profile, meta: { isAdmin: true }},
            { path: '/admin/user/control/:id', name: i18n.t('admin_menu_control'), component: Control, meta: { isAdmin: true }},
            { path: '/admin/user/deposit/:id', name: i18n.t('admin_menu_deposits'), component: Deposit, meta: { isAdmin: true }},
            { path: '/admin/user/withdrawal/:id', name: i18n.t('admin_menu_withdraws'), component: Withdrawal, meta: { isAdmin: true }},
            { path: '/admin/user/history/:id', name: i18n.t('admin_menu_trading_history'), component: TradeHistory, meta: { isAdmin: true }},
            { path: '/admin/user/partner/:id', name: i18n.t('admin_menu_referrals'), component: Partner, meta: { isAdmin: true }},
            { path: '/admin/user/promocode/:id', name: i18n.t('admin_menu_promocodes'), component: Promocode, meta: { isAdmin: true }},
        ]
    },
    { path: '/admin/demo', name: i18n.t('admin_menu_promocodes'), component: Promocode },
    { path: '/admin/deposit', name: i18n.t('admin_menu_deposits'), component: Deposits },
    { path: '/admin/withdrawal', name: i18n.t('admin_menu_withdraws'), component: Withdrawals },
    { path: '/admin/partner', name: i18n.t('admin_menu_requests'), component: Partners },
    { path: '/admin/verify', name: i18n.t('admin_menu_verify'), component: Verify },
    { path: '/admin/contest/create', name: 'Создание конкурса', component: ContestEdit },
    { path: '/admin/contest/edit/:id', name: 'Редактирование конкурса', component: ContestEdit },
    { path: '/admin/promocodes', name: i18n.t('admin_menu_promocodes'), component: PromocodeAdmin },
    { path: '/admin/promocode/create', name: i18n.t('admin_menu_promocode_edit'), component: PromocodeEdit },
    { path: '/admin/promocode/edit/:id', name: i18n.t('admin_menu_promocodes'), component: PromocodeEdit },
    { path: '/admin/history', name: i18n.t('admin_menu_trading_history'), component: TradeHistory },
    { path: '/logout', name: i18n.t('admin_menu_exit'), component: Profile },
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