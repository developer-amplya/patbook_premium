import HomePage from './pages/home.vue';
import NotFoundPage from './pages/not-found.vue';
import UserData from './pages/user-data';
import EmergenciesData from './pages/emergencies';
import ListView from './pages/list-view.vue';

export default [
    {
        path: '/',
        component: HomePage
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
        path: '(.*)',
        component: NotFoundPage
    }
];
