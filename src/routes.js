import Access from './pages/Access.vue';
import Register from './pages/Register.vue';
import LogIn from './pages/LogIn.vue';
import Home from './pages/Home.vue';
import NotFoundPage from './pages/not-found.vue';
import UserData from './pages/user-data';
import EmergenciesData from './pages/emergencies';
import ListView from './pages/list-view.vue';
import Allergies from './pages/allergies.vue';
import AllergiesDetails from './pages/allergiesDetails.vue';

export default [
    {
        path: '/',
        component: Access
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/login',
        component: LogIn
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/user-data/:category',
        component: UserData,
        props: true
    },
    {
        path: '/list-view/:category',
        component: ListView,
        props: true
    },
    {
        path: '/emergencies/:category',
        component: EmergenciesData,
        props: true
    },
    {
        path: '/allergies',
        component: Allergies
    },
    {
        path: '/allergies/:id',
        component: AllergiesDetails,
        props: true
    },
    {
        path: '(.*)',
        component: NotFoundPage
    }
];
