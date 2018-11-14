import LogIn from './pages/LogIn.vue';
import NewDevice from './pages/NewDevice.vue';
import UserRegister from './pages/UserRegister.vue';
import DeviceRegister from './pages/DeviceRegister.vue';
import ForgotPassword from './pages/ForgotPassword.vue';
import Home from './pages/Home.vue';
import NotFoundPage from './pages/not-found.vue';
import UserData from './pages/user-data';
import EmergenciesData from './pages/emergencies';
import ListView from './pages/list-view.vue';
import Allergies from './pages/Allergies.vue';
import AllergiesDetails from './pages/AllergiesDetails.vue';

export default [
    {
        path: '/',
        component: LogIn
        //component: Home
    },
    {
        path: '/new-device',
        component: NewDevice
    },
    {
        path: '/user-register',
        component: UserRegister
    },
    {
        path: '/device-register/:email',
        component: DeviceRegister,
        props: true
    },
    {
        path: '/forgot-password',
        component: ForgotPassword
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
