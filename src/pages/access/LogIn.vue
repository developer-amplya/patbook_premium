<template>
    <f7-page>

        <f7-navbar title="Acceso"></f7-navbar>

        <f7-block inner>

            <f7-list form no-hairlines>

                <!-- EMAIL  -->
                <f7-list-input
                        type="email"
                        label="Email"
                        :value="log_in.email"
                        @input="log_in.email = $event.target.value"
                ></f7-list-input>

                <!-- PASSWORD -->
                <f7-list-input
                        type="password"
                        label="Contraseña"
                        :value="log_in.password"
                        @input="log_in.password = $event.target.value"
                ></f7-list-input>
            </f7-list>

            <!-- Submit -->
            <f7-list>
                <f7-button large raised fill @click="do_login">ACCEDER</f7-button>
            </f7-list>

            <!-- Forgot password -->
            <f7-list>
                <f7-button href="/forgot-password" fill round>HE OLVIDADO MI CONTRASEÑA</f7-button>
            </f7-list>

            <!-- New user -->
            <f7-list>
                <f7-button href="/user-register" fill round>NUEVO USUARIO</f7-button>
            </f7-list>

            <!-- Device register later -->
            <f7-list>
                <f7-button href="/device-register-later" fill round>REGISTRAR DISPOSITIVO</f7-button>
            </f7-list>

        </f7-block>

        <div style="position: absolute; bottom: 10px; right: 10px">
            <small>1.0.121</small>
        </div>

    </f7-page>
</template>

<script>
    import axios from 'axios';
    import {
        API_PATH
    } from '../../config.js';
    // import {mapActions} from 'vuex';

    export default {
        name: 'LogIn',
        props: [],
        data() {
            return {
                log_in: {
                    email: '',
                    password: '',
                    //email: 'reezooh@gmail.com',
                    //password: '123456',
                    token: ''
                }
            };
        },
        mounted() {
            //console.log('-> LogIn');

            if (!localStorage.allowed_users) {
                localStorage.allowed_users = JSON.stringify([]);
            }
        },
        methods: {
            do_login() {
                /* Cheking if the user is registered in the device and so he or she is allowed to connect with the
                device */
                if (localStorage.allowed_users !== '') {
                    var isAllowed = false;
                    var allowedUsers = JSON.parse(localStorage.allowed_users);
                    allowedUsers.forEach((item) => {
                        if (item.email === this.log_in.email) {
                            isAllowed = true;
                            this.log_in.token = item.token;
                        }
                    });

                    if (isAllowed === false) {
                        this.$f7router.navigate('/new-device/' + this.log_in.email + '/' + this.log_in.password);
                        return;
                    }
                }

                axios.post(API_PATH + 'login', {
                    email: this.log_in.email,
                    password: this.log_in.password,
                    device_code: this.log_in.token
                })
                    .then((response) => {
                        //console.log(response);
                        // TODO: group all this in one object ?
                        if (response.data.result === 'OK') {

                            this.$store.dispatch('setUserID', response.data.user._id);
                            this.$store.dispatch('setUserEmail', response.data.user.email);
                            this.$store.dispatch('setUserName', response.data.user.name);
                            this.$store.dispatch('setUserLastname', response.data.user.lastname);
                            this.$store.dispatch('setUserProfileImg', response.data.user.pic);
                            this.$store.dispatch('setUserBirthdate', response.data.user.birthdate);
                            this.$store.dispatch('setUserSex', response.data.user.sex);
                            this.$store.dispatch('setUserWeight', response.data.user.weight);
                            this.$store.dispatch('setUserHeight', response.data.user.height);
                            this.$store.dispatch('setUserCountry', response.data.user.country);
                            this.$store.dispatch('setUserAddress', response.data.user.address);
                            this.$store.dispatch('setUserPhone', response.data.user.phone);
                            this.$store.dispatch('setUserProfession', response.data.user.profession);
                            this.$store.dispatch('setUserCompany', response.data.user.company);
                            this.$store.dispatch('setUserBloodType', response.data.user.blood_type);
                            this.$store.dispatch('setClinicName', response.data.user.clinic);
                            this.$store.dispatch('setClinicAddress', response.data.user.clinic_address);
                            this.$store.dispatch('setClinicPhone', response.data.user.clinic_phone);
                            this.$store.dispatch('setSocialSecurityNumber', response.data.user.social_security_number);
                            this.$store.dispatch('setDeviceCode', this.log_in.token);
                            this.$store.dispatch('setDocumentCounting', response.data.documents);

                            Object.entries(response.data.user.emergencies_contact).forEach(item => {
                                this.$store.dispatch('setEmergenciesContact', item);
                            });

                            Object.entries(response.data.user.insurance_company).forEach(item => {
                                this.$store.dispatch('setInsuranceCompany', item);
                            });

                            this.$f7router.navigate('/home');
                        } else if (
                            response.data.result === 'KO' &&
                            response.data.message_code === 'nomatchinguserdevice'
                        ) {
                            this.$f7router.navigate('/new-device/' + this.log_in.email + '/' + this.log_in.password);
                        } else {
                            //
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$f7.dialog.alert('Email o contraseña incorrectos', "Error");
                    });
            }
        }
    }
    ;
</script>

<style scoped>
    .md .navbar {
        background-color: #1ABAD4 !important;
    }
</style>