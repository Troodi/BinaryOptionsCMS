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
// //import StudentHomeComponent from '../views/home.vue';
//
// /**
//  * Routes for vue components
//  */
// export const routes = [
//     //Students
//     { path: '/home', name: 'home', beforeEnter: student, component: StudentHomeComponent },
//     { path: '/settings', name: 'settings', beforeEnter: student, component: StudentSettingsComponent },
//
//     //Teacher
//     { path: '/teacher', name: 'teacher.home', beforeEnter: teacher, component: TeacherHomeComponent },
//     { path: '/teacher/settings', name: 'teacher.settings', beforeEnter: teacher, component: TeacherSettingsComponent },
//     { path: '/teacher/number', name: 'teacher.number', beforeEnter: teacher, component: TeacherNumberComponent, props(route) { return { number: route.query.number, item: route.query.item }}},
//     //Assessments
//     { path: '/teacher/assessments', name: 'teacher.assessments', beforeEnter: teacher, component: TeacherAssessmentsComponent },
//     { path: '/teacher/assessments/number', name: 'teacher.assessments.number', beforeEnter: teacher, component: TeacherAssessmentsNumberComponent, props(route) { return { number: route.query.number, item: route.query.item }}}
// ];
//
// /**
//  * Middleware that checks the user role
//  */
// async function student(to, from, next) {
//     return await middleware().then(role => {
//         role == null ? next(true) : router.replace({ name: redirect(role) });
//     });
// };
//
// async function teacher(to, from, next) {
//     return await middleware().then(role => {
//         role == 0 ? next(true) : router.replace({ name: redirect(role) });
//     });
// };
//
// async function admin(to, from, next) {
//     return await middleware().then(role => {
//         role == 1 ? next(true) : router.replace({ name: redirect(role) });
//     });
// };
//
// async function system(to, from, next) {
//     return await middleware().then(role => {
//         role == 2 ? next(true) : router.replace({ name: redirect(role) });
//     });
// };
//
// /**
//  * Setting the user name, application, and role
//  *
//  * @return nullable|integer
//  */
// function middleware() {
//     return axios.get('/initApp').then(response => {
//         localStorage.name = response.data.name;
//         localStorage.app = response.data.app;
//         localStorage.role = response.data.role;
//         return response.data.role;
//     });
// };
//
// /**
//  * Returns the name of the router for a specific role
//  *
//  * @param {*} role
//  * @return string
//  */
// function redirect(role) {
//     if (role == null) {
//         return 'home';
//     } else if (role == 0) {
//         return 'teacher.home';
//     } else if (role == 1) {
//         return 'admin.home';
//     } else if (role == 2) {
//         return 'system.home';
//     }
// }
//
// /**
//  * Require VueRouter
//  */
// Vue.use(VueRouter);
//
// /**
//  * Create object VueRouter
//  */
// const router = new VueRouter({
//     mode: 'history',
//     routes
// });
//
// /**
//  * Export object VueRouter with mode and routes
//  */
// export default router;