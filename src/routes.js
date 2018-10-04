import HomePage from './pages/home.vue';
import NotFoundPage from './pages/not-found.vue';
import ListView from './pages/list-view.vue';

export default [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/',
        component: ListView
    },
    {
        path: '(.*)',
        component: NotFoundPage
    }
];
