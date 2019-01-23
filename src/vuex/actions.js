// actions.js
import {
    SET_USER_NAME,
    SET_USER_ID,
    SET_DEVICE_CODE, SET_DOCUMENT_COUNTING
} from './mutations';

export default {
    setUserName({commit}, userName) {
        commit(SET_USER_NAME, userName);
    },
    setUserID({commit}, userID) {
        commit(SET_USER_ID, userID);
    },
    setDeviceCode({commit}, deviceCode) {
        commit(SET_DEVICE_CODE, deviceCode);
    },
    setDocumentCounting({commit}, documents) {
        Object.entries(documents).forEach((entry) => {
            commit(SET_DOCUMENT_COUNTING, {category: entry[0], value: entry[1]});
        });
    }
};
