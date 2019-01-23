import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import actions from './actions';
import {
    SET_USER_NAME,
    SET_USER_ID,
    SET_DEVICE_CODE,
    SET_DOCUMENT_COUNTING
} from './mutations';

Vue.use(Vuex)

const state = {
    user_name: '',
    user_id: '',
    device_code: '',
    document_counting: {
        allergies: 0,
        medicines: 0,
        medical_visit_preparations: 0,
        medical_visits: 0,
        diagnostic_tests: 0
    },
    currentValues: {}
}

const mutations = {
    [SET_USER_NAME](state, userName) {
        state.user_name = userName;
    },
    [SET_USER_ID](state, userID) {
        state.user_id = userID;
    },
    [SET_DEVICE_CODE](state, deviceCode) {
        state.device_code = deviceCode;
    },
    [SET_DOCUMENT_COUNTING](state, object) {
        state.document_counting[object.category] = object.value;
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});