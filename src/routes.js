import Cover from './pages/Cover.vue';
import LogIn from './pages/access/LogIn.vue';
import NewDevice from './pages/access/NewDevice.vue';
import UserRegister from './pages/access/UserRegister.vue';
import DeviceRegister from './pages/access/DeviceRegister.vue';
import ForgotPassword from './pages/access/ForgotPassword.vue';
import Home from './pages/Home.vue';
import NotFoundPage from './pages/not-found.vue';
import UserInfo from './pages/UserInfo.vue';
import EmergenciesData from './pages/emergencies';
import Allergies from './pages/allergies/Allergies.vue';
import AllergiesInsert from './pages/allergies/AllergiesInsert.vue';
import AllergiesDetails from './pages/allergies/AllergiesDetails.vue';
import Medicines from './pages/medicines/Medicines.vue';
import MedicinesInsert from './pages/medicines/MedicinesInsert.vue';
import MedicinesDetails from './pages/medicines/MedicinesDetails.vue';
import MedicalVisitPreparations from './pages/medical_visit_preparations/MedicalVisitPreparations.vue';
import MedicalVisitPreparationsInsert from './pages/medical_visit_preparations/MedicalVisitPreparationsInsert.vue';
import MedicalVisitPreparationsDetails from './pages/medical_visit_preparations/MedicalVisitPreparationsDetails.vue';
import MedicalVisits from './pages/medical_visits/MedicalVisits.vue';
import MedicalVisitsInsert from './pages/medical_visits/MedicalVisitsInsert.vue';
import MedicalVisitsDetails from './pages/medical_visits/MedicalVisitsDetails.vue';
import DiagnosticTests from './pages/diagnostic_tests/DiagnosticTests.vue';
import DiagnosticTestsInsert from './pages/diagnostic_tests/DiagnosticTestsInsert.vue';
import DiagnosticTestsDetails from './pages/diagnostic_tests/DiagnosticTestsDetails.vue';
import CreateCustomField from './pages/CreateCustomField.vue';

export default [
    {
        path: '/',
        component: Cover
    },
    {
        path: '/login',
        component: LogIn
    },
    {
        path: '/new-device/:email/:password',
        component: NewDevice,
        props: true
    },
    {
        path: '/user-register',
        component: UserRegister
    },
    {
        path: '/device-register/:email/:password',
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
        path: '/user-info',
        component: UserInfo,
        props: true
    },
    {
        path: '/emergencies',
        component: EmergenciesData
    },
    {
        path: '/allergies',
        component: Allergies
    },
    {
        path: '/allergies/insert',
        component: AllergiesInsert
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
        path: '/medicines/insert',
        component: MedicinesInsert
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
        path: '/medical-visit-preparations/insert',
        component: MedicalVisitPreparationsInsert
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
        path: '/medical-visits/insert',
        component: MedicalVisitsInsert
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
        path: '/diagnostic-tests/insert',
        component: DiagnosticTestsInsert
    },
    {
        path: '/diagnostic-tests/:id',
        component: DiagnosticTestsDetails,
        props: true
    },
    {
        path: '/create-custom-field',
        component: CreateCustomField,
        props: true
    },
    {
        path: '(.*)',
        component: NotFoundPage
    }
];
