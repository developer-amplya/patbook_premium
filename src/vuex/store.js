import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import actions from './actions';
import {
    SET_USER_ID,
    SET_USER_EMAIL,
    SET_USER_NAME,
    SET_USER_LASTNAME,
    SET_USER_PROFILE_IMG,
    SET_USER_BIRTHDATE,
    SET_USER_SEX,
    SET_USER_WEIGHT,
    SET_USER_HEIGHT,
    SET_USER_COUNTRY,
    SET_USER_ADDRESS,
    SET_USER_PHONE,
    SET_USER_PROFESSION,
    SET_USER_COMPANY,
    SET_USER_BLOODTYPE,
    SET_CLINIC_NAME,
    SET_CLINIC_ADDRESS,
    SET_CLINIC_PHONE,
    SET_DEVICE_CODE,
    SET_DOCUMENT_COUNTING,
    INCREMENT_DOCUMENT_COUNTING,
    DECREMENT_DOCUMENT_COUNTING,
    SET_CURRENT_MAIN_COLOR
} from './mutations';

Vue.use(Vuex)

const state = {
    user_id: '',
    user_email: '',
    user_name: '',
    user_lastname: '',
    user_profile_img: '',
    user_birthdate: '',
    user_sex: '',
    user_height: '',
    user_weight: '',
    user_country: '',
    user_address: '',
    user_phone: '',
    user_profession: '',
    user_company: '',
    user_bloodtype: '',
    clinic_name: '',
    clinic_address: '',
    clinic_phone: '',
    device_code: '',
    document_counting: {
        allergies: 0,
        medicines: 0,
        medical_visit_preparations: 0,
        medical_visits: 0,
        diagnostic_tests: 0
    },
    current_main_color: '',
    currentValues: {}
}

const mutations = {
    [SET_USER_ID](state, userID) {
        state.user_id = userID;
    },
    [SET_USER_EMAIL](state, userEmail) {
        state.user_email = userEmail;
    },
    [SET_USER_NAME](state, userName) {
        state.user_name = userName;
    },
    [SET_USER_LASTNAME](state, userLastname) {
        state.user_lastname = userLastname;
    },
    [SET_USER_PROFILE_IMG] (state, userProfileImg) {
        state.user_profile_img = userProfileImg;
    },
    [SET_USER_BIRTHDATE] (state, userBirthdate) {
        state.user_birthdate = userBirthdate;
    },
    [SET_USER_SEX] (state, userSex) {
        state.user_sex = userSex;
    },
    [SET_USER_WEIGHT] (state, userWeight) {
        state.user_weight = userWeight;
    },
    [SET_USER_HEIGHT] (state, userHeight) {
        state.user_height = userHeight;
    },
    [SET_USER_COUNTRY] (state, userCountry) {
        state.user_country = userCountry;
    },
    [SET_USER_ADDRESS] (state, userAddress) {
        state.user_address = userAddress;
    },
    [SET_USER_PHONE] (state, userPhone) {
        state.user_phone = userPhone;
    },
    [SET_USER_PROFESSION] (state, userProfession) {
        state.user_profession = userProfession;
    },
    [SET_USER_COMPANY] (state, userCompany) {
        state.user_company = userCompany;
    },
    [SET_USER_BLOODTYPE] (state, userBloodType) {
        state.user_bloodtype = userBloodType;
    },
    [SET_CLINIC_NAME] (state, clinicName) {
        state.clinic_name = clinicName;
    },
    [SET_CLINIC_ADDRESS] (state, clinicAddress) {
        state.clinic_address = clinicAddress;
    },
    [SET_CLINIC_PHONE] (state, clinicPhone) {
        state.clinic_phone = clinicPhone;
    },
    [SET_DEVICE_CODE](state, deviceCode) {
        state.device_code = deviceCode;
    },
    [SET_DOCUMENT_COUNTING](state, object) {
        state.document_counting[object.category] = object.value;
    },
    [INCREMENT_DOCUMENT_COUNTING](state, category) {
        state.document_counting[category] += 1;
    },
    [DECREMENT_DOCUMENT_COUNTING](state, category) {
        state.document_counting[category] -= 1;
    },
    [SET_CURRENT_MAIN_COLOR] (state, color) {
        state.current_main_color = color;
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});
