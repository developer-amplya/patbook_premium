import Cover from './pages/Cover.vue';
import UseGuide from './pages/UseGuide.vue';
import LogIn from './pages/access/LogIn.vue';
import NewDevice from './pages/access/NewDevice.vue';
import UserRegister from './pages/access/UserRegister.vue';
import DeviceRegister from './pages/access/DeviceRegister.vue';
import DeviceRegisterLater from './pages/access/DeviceRegisterLater.vue';
import ForgotPassword from './pages/access/ForgotPassword.vue';
import ResetPassword from './pages/access/ResetPassword.vue';
import Home from './pages/Home.vue';
import UserInfo from './pages/UserInfo.vue';
import EmergenciesPage from './pages/EmergenciesPage.vue';
import Agenda from './pages/agenda/Agenda.vue';
import AgendaEntryInsert from './pages/agenda/AgendaEntryInsert.vue';
import AgendaEntryDetails from './pages/agenda/AgendaEntryDetails.vue';
import AgendaEntryEdit from './pages/agenda/AgendaEntryEdit.vue';
import Allergies from './pages/allergies/Allergies.vue';
import AllergiesInsert from './pages/allergies/AllergiesInsert.vue';
import AllergiesDetails from './pages/allergies/AllergiesDetails.vue';
import AllergiesEdit from './pages/allergies/AllergiesEdit.vue';
import Medicines from './pages/medicines/Medicines.vue';
import MedicinesInsert from './pages/medicines/MedicinesInsert.vue';
import MedicinesDetails from './pages/medicines/MedicinesDetails.vue';
import MedicinesEdit from './pages/medicines/MedicinesEdit.vue';
import MedicalVisitPreparations from './pages/medical_visit_preparations/MedicalVisitPreparations.vue';
import MedicalVisitPreparationsInsert from './pages/medical_visit_preparations/MedicalVisitPreparationsInsert.vue';
import MedicalVisitPreparationsDetails from './pages/medical_visit_preparations/MedicalVisitPreparationsDetails.vue';
import MedicalVisitPreparationsEdit from './pages/medical_visit_preparations/MedicalVisitPreparationsEdit.vue';
import MedicalVisits from './pages/medical_visits/MedicalVisits.vue';
import MedicalVisitsInsert from './pages/medical_visits/MedicalVisitsInsert.vue';
import MedicalVisitsDetails from './pages/medical_visits/MedicalVisitsDetails.vue';
import MedicalVisitsEdit from './pages/medical_visits/MedicalVisitsEdit.vue';
import DiagnosticTests from './pages/diagnostic_tests/DiagnosticTests.vue';
import DiagnosticTestsInsert from './pages/diagnostic_tests/DiagnosticTestsInsert.vue';
import DiagnosticTestsDetails from './pages/diagnostic_tests/DiagnosticTestsDetails.vue';
import DiagnosticTestsEdit from './pages/diagnostic_tests/DiagnosticTestsEdit.vue';
import RegisterAccessGuide from './pages/use_guides/RegisterAccessGuide.vue';
import CreateCustomField from './pages/CreateCustomField.vue';
import ResetStorePage from './pages/ResetStorePage.vue';
import SendFeedback from './pages/SendFeedback.vue';
import DynamicRoutePage from './pages/dynamic-route.vue';
import Router from './Router.vue';
import NotFoundPage from './pages/not-found.vue';

import PanelRightPage from './pages/panel-right.vue';

export default [
    {
        path: '/',
        component: Cover
    },
    {
        path: '/use-guide',
        component: UseGuide
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
        path: '/device-register-later',
        component: DeviceRegisterLater
    },
    {
        path: '/forgot-password',
        component: ForgotPassword
    },
    {
        path: '/reset-password/:email',
        component: ResetPassword,
        props: true
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
        component: EmergenciesPage
    },
    {
        path: '/agenda',
        component: Agenda
    },
    {
        path: '/agenda/insert',
        component: AgendaEntryInsert
    },
    {
        path: '/agenda/:record_id',
        component: AgendaEntryDetails,
        props: true
    },
    {
        path: '/agenda/edit/:record_id',
        component: AgendaEntryEdit,
        props: true,
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
        path: '/allergies/:record_id',
        component: AllergiesDetails,
        props: true
    },
    {
        path: '/allergies/edit/:record_id',
        component: AllergiesEdit,
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
        path: '/medicines/:record_id',
        component: MedicinesDetails,
        props: true
    },
    {
        path: '/medicines/edit/:record_id',
        component: MedicinesEdit,
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
        path: '/medical-visit-preparations/:record_id',
        component: MedicalVisitPreparationsDetails,
        props: true
    },
    {
        path: '/medical-visit-preparations/edit/:record_id',
        component: MedicalVisitPreparationsEdit,
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
        path: '/medical-visits/:record_id',
        component: MedicalVisitsDetails,
        props: true
    },
    {
        path: '/medical-visits/edit/:record_id',
        component: MedicalVisitsEdit,
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
        path: '/diagnostic-tests/:record_id',
        component: DiagnosticTestsDetails,
        props: true
    },
    {
        path: '/diagnostic-tests/edit/:record_id',
        component: DiagnosticTestsEdit,
        props: true
    },
    {
        path: '/use-guides/register-access',
        component: RegisterAccessGuide,
    },
    {
        path: '/create-custom-field',
        component: CreateCustomField,
        props: true
    },
    {
        path: '/reset-store',
        component: ResetStorePage
    },
    {
        path: '/send-feedback',
        component: SendFeedback
    },
    {
        path: '/panel-right/',
        component: PanelRightPage,
    },
    {
        path: '/router/:url/:id',
        component: Router,
        props: true,
    },
    {
        path: '/dynamic-route/blog/:blogId/post/:postId/',
        component: DynamicRoutePage,
    },
    {
        path: '(.*)',
        component: NotFoundPage,
    },
];
