// actions.js
import {
    SET_USER_ID,
    SET_USER_EMAIL,
    SET_USER_NAME,
    SET_USER_LASTNAME,
    SET_USER_PIC,
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
    SET_CURRENT_MAIN_COLOR
} from './mutations';

export default {
    setUserID({commit}, userID) {
        commit(SET_USER_ID, userID);
    },
    setUserEmail({commit}, userEmail) {
        commit(SET_USER_EMAIL, userEmail);
    },
    setUserName({commit}, userName) {
        commit(SET_USER_NAME, userName);
    },
    setUserLastname({commit}, userLastname) {
        commit(SET_USER_EMAIL, userLastname);
    },
    setUserPic({commit}, userPic) {
        commit(SET_USER_PIC, userPic);
    },
    setUserEmail({commit}, userBirthdate) {
        commit(SET_USER_EMAIL, userBirthdate);
    },
    setUserEmail({commit}, userSex) {
        commit(SET_USER_EMAIL, userSex);
    },
    setUserEmail({commit}, userWeight) {
        commit(SET_USER_EMAIL, userWeight);
    },
    setUserEmail({commit}, userHeight) {
        commit(SET_USER_EMAIL, userHeight);
    },
    setUserEmail({commit}, userCountry) {
        commit(SET_USER_EMAIL, userCountry);
    },
    setUserEmail({commit}, userAddress) {
        commit(SET_USER_EMAIL, userAddress);
    },
    setUserEmail({commit}, userPhone) {
        commit(SET_USER_EMAIL, userPhone);
    },
    setUserEmail({commit}, userProfession) {
        commit(SET_USER_EMAIL, userEmail);
    },
    setUserEmail({commit}, userEmail) {
        commit(SET_USER_EMAIL, userEmail);
    },
    setUserEmail({commit}, userEmail) {
        commit(SET_USER_EMAIL, userEmail);
    },
    setUserEmail({commit}, userEmail) {
        commit(SET_USER_EMAIL, userEmail);
    },
    setUserEmail({commit}, userEmail) {
        commit(SET_USER_EMAIL, userEmail);
    },
    setUserEmail({commit}, userEmail) {
        commit(SET_USER_EMAIL, userEmail);
    },
    setDeviceCode({commit}, deviceCode) {
        commit(SET_DEVICE_CODE, deviceCode);
    },
    setDocumentCounting({commit}, documents) {
        Object.entries(documents).forEach((entry) => {
            commit(SET_DOCUMENT_COUNTING, {category: entry[0], value: entry[1]});
        });
    },
    incrementDocumentCounting({commit}, category) {
        commit(INCREMENT_DOCUMENT_COUNTING, category);
    },
    setMainColor({commit}, mainColor) {
        commit(SET_CURRENT_MAIN_COLOR, mainColor);
    }
};
