import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

Vue.use(Vuex)

const state = {
    msg: 'Hola Vuex!'
}

const mutations = {
    //
}

export default new Vuex.Store({
    state, mutations, getters
});
