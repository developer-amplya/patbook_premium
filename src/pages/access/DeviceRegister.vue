<template>
    <f7-page>

        <!-- Navbar -->
        <f7-navbar>
            <f7-nav-left>
                <f7-link href="/login">
                    <f7-icon material="arrow_back"></f7-icon>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title title="Registro de dispositivo"></f7-nav-title>
        </f7-navbar>

        <f7-block inner>

            <p>Escribe a continuación el código que hemos enviado a tu dirección de correo electrónico* (respeta las
                mayúsculas y minúsculas).</p>

            <f7-list form no-hairlines>

                <f7-list-item>
                    <f7-label>Código</f7-label>
                    <f7-input type="text" :value="device_code"
                              @input="device_code = $event.target.value"></f7-input>
                </f7-list-item>

                <f7-list-item>
                    <f7-list-button big fill  @click="checkDeviceCode" no-fast-click>Enviar</f7-list-button>
                </f7-list-item>

            </f7-list>

            <p>
                <small>* El email puede tardar unos minutos en alcanzar tu bandeja de entrada. Si, pasado un tiempo, no
                    lo ves revisa en
                    <em>spam</em>, puede que haya llegado ahí por error.
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
        name: 'DeviceRegister',
        props: ['email', 'password'],
        data() {
            return {
                device_code: ''
            };
        },
        mounted() {
            console.log('-> DeviceRegister');
        },
        methods: {

            // Comprobar que el código se ha escrito correctamente llamando a la API
            checkDeviceCode() {
                axios.post(API_PATH + 'check-device-code', {
                    email: this.email,
                    device_code: this.device_code
                })
                    .then((response) => {
                        console.log(response);
                        if (response.data.result === 'OK') {
                            this.pushAllowedUser();
                            this.do_login();
                        } else {
                            alert(response.data.message);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
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
                        console.log(response);
                        if (response.data.result === 'OK') {
                            this.$store.dispatch('setUserName', response.data.user.name);
                            this.$store.dispatch('setUserID', response.data.user._id);
                            this.$store.dispatch('setUserEmail', response.data.user.email);
                            this.$store.dispatch('setDeviceCode', this.device_code);
                            this.$store.dispatch('setDocumentCounting', response.data.documents);
                            this.$f7router.navigate('/home');
                        } else {
                            alert(response.data.message);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    };
</script>