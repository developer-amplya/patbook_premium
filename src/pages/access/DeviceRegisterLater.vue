<template>
    <f7-page>

        <!-- Navbar -->
        <f7-navbar back-link title="Registro de dispositivo"></f7-navbar>

        <f7-block inner>

            <p>Escribe a continuación la dirección de correo electrónico y la contraseña con que te registraste junto
                al código que hemos enviado a dicha dirección de correo electrónico* (respeta las mayúsculas y
                minúsculas).</p>

            <f7-list form no-hairlines>

                <!-- EMAIL  -->
                <f7-list-input
                        type="email"
                        label="Email"
                        :value="email"
                        @input="email = $event.target.value"
                ></f7-list-input>

                <!-- PASSWORD -->
                <f7-list-input
                        type="password"
                        label="Contraseña"
                        :value="password"
                        @input="password = $event.target.value"
                ></f7-list-input>

                <!-- Device code -->
                <f7-list-input
                        type="text"
                        label="Código"
                        :value="device_code"
                        @input="device_code = $event.target.value"
                ></f7-list-input>

            </f7-list>

            <!-- Submit -->
            <f7-list>
                <f7-button large raised fill @click="checkDeviceCode" no-fast-click>REGISTRAR ESTE DISPOSITIVO
                </f7-button>
            </f7-list>

            <p>
                <small>* El email puede tardar unos minutos en alcanzar tu bandeja de entrada. Si, pasado un tiempo, no
                    lo ves revisa en <em>spam</em>, puede que haya llegado ahí por error.
                </small>
            </p>

        </f7-block>
    </f7-page>
</template>

<script>
    import axios from 'axios';
    import {
        API_PATH
    } from '../../config.js';

    export default {
        name: 'DeviceRegisterLater',
        data() {
            return {
                email: '',
                password: '',
                device_code: ''
            };
        },
        mounted() {
            //console.log('-> DeviceRegister');
        },
        methods: {

            // Comprobar que el código se ha escrito correctamente llamando a la API
            checkDeviceCode() {
                axios.post(API_PATH + 'check-device-code', {
                    email: this.email,
                    device_code: this.device_code
                })
                    .then((response) => {
                        //console.log(response);
                        if (response.data.result === 'OK') {
                            this.pushAllowedUser();
                            this.do_login();
                        } else {
                            this.$f7.dialog.alert(response.data.message, "Error");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$f7.dialog.alert('Ha ocurrido un error', "Error");
                    });
            },

            // Push user email and device code into localStorage
            pushAllowedUser() {
                var allowedUsers = JSON.parse(localStorage.allowed_users);
                allowedUsers.push({email: this.email, token: this.device_code})
                allowedUsers = JSON.stringify(allowedUsers);
                localStorage.allowed_users = allowedUsers;
                this.$f7router.navigate('/home');
            },

            do_login() {
                axios.post(API_PATH + 'login', {
                    email: this.email,
                    password: this.password,
                    device_code: this.device_code
                })
                    .then((response) => {
                        //console.log(response);
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
                            this.$store.dispatch('setDeviceCode', this.device_code);
                            this.$store.dispatch('setDocumentCounting', response.data.documents);

                            Object.entries(response.data.user.emergencies_contact).forEach(item => {
                                this.$store.dispatch('setEmergenciesContact', item);
                            });

                            Object.entries(response.data.user.insurance_company).forEach(item => {
                                this.$store.dispatch('setInsuranceCompany', item);
                            });

                            this.$f7router.navigate('/home');
                        } else {
                            this.$f7.dialog.alert(response.data.message, "Error");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$f7.dialog.alert('Ha ocurrido un error', "Error");
                    });
            }
        }
    };
</script>

<style scoped>
    .md .navbar {
        background-color: #1ABAD4 !important;
    }
</style>