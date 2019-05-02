// actions.js
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
        commit(SET_USER_LASTNAME, userLastname);
    },
    setUserProfileImg({commit}, userProfileImg) {
        commit(SET_USER_PROFILE_IMG, userProfileImg);
    },
    setUserBirthdate({commit}, userBirthdate) {
        commit(SET_USER_BIRTHDATE, userBirthdate);
    },
    setUserSex({commit}, userSex) {
        commit(SET_USER_SEX, userSex);
    },
    setUserWeight({commit}, userWeight) {
        commit(SET_USER_WEIGHT, userWeight);
    },
    setUserHeight({commit}, userHeight) {
        commit(SET_USER_HEIGHT, userHeight);
    },
    setUserCountry({commit}, userCountry) {
        commit(SET_USER_COUNTRY, userCountry);
    },
    setUserAddress({commit}, userAddress) {
        commit(SET_USER_ADDRESS, userAddress);
    },
    setUserPhone({commit}, userPhone) {
        commit(SET_USER_PHONE, userPhone);
    },
    setUserProfession({commit}, userProfession) {
        commit(SET_USER_PROFESSION, userProfession);
    },
    setUserCompany({commit}, userCompany) {
        commit(SET_USER_COMPANY, userCompany);
    },
    setUserBloodType({commit}, userBloodType) {
        commit(SET_USER_BLOODTYPE, userBloodType);
    },
    setClinicName({commit}, clinicName) {
        commit(SET_CLINIC_NAME, clinicName);
    },
    setClinicAddress({commit}, clinicAddress) {
        commit(SET_CLINIC_ADDRESS, clinicAddress);
    },
    setClinicPhone({commit}, clinicPhone) {
        commit(SET_CLINIC_PHONE, clinicPhone);
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
    decrementDocumentCounting({commit}, category) {
        commit(DECREMENT_DOCUMENT_COUNTING, category);
    },
    setMainColor({commit}, mainColor) {
        commit(SET_CURRENT_MAIN_COLOR, mainColor);
    }
};
