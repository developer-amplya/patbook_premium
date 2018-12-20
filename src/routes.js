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
import Medicines from './pages/Medicines.vue';
import MedicinesDetails from './pages/MedicinesDetails.vue';
import MedicalVisitPreparations from './pages/MedicalVisitPreparations.vue';
import MedicalVisitPreparationsDetails from './pages/MedicalVisitPreparationsDetails.vue';
import MedicalVisits from './pages/MedicalVisits.vue';
import MedicalVisitsDetails from './pages/MedicalVisitsDetails.vue';
import DiagnosticTests from './pages/DiagnosticTests.vue';
import DiagnosticTestsDetails from './pages/DiagnosticTestsDetails.vue';


export default [
    {
        path: '/',
        //component: LogIn
        component: Home
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
        path: '/medicines',
        component: Medicines
    },
    {
        path: '/medicines/:id',
        component: MedicinesDetails,
        props: true
    },
    {
        path: '/medical-visit-preparations',
        component: MedicalVisitPreparations
    },
    {
        path: '/medical-visit-preparations/:id',
        component: MedicalVisitPreparationsDetails,
        props: true
    },
    {
        path: '/medical-visits',
        component: MedicalVisits
    },
    {
        path: '/medical-visits/:id',
        component: MedicalVisitsDetails,
        props: true
    },
    {
        path: '/diagnostic-tests',
        component: DiagnosticTests
    },
    {
        path: '/diagnostic-tests/:id',
        component: DiagnosticTestsDetails,
        props: true
    },
    {
        path: '(.*)',
        component: NotFoundPage
    }
];
