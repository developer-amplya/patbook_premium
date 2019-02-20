<template>
    <f7-page>

        <f7-navbar title="Acceso"></f7-navbar>

        <f7-block inner>

            <f7-list form no-hairlines>

                <!-- EMAIL  -->
                <f7-list-item>
                    <f7-label>Email</f7-label>
                    <f7-input type="email" :value="log_in.email"
                              @input="log_in.email = $event.target.value"></f7-input>
                </f7-list-item>

                <!-- PASSWORD -->
                <f7-list-item>
                    <f7-label>Contraseña</f7-label>
                    <f7-input type="password" :value="log_in.password"
                              @input="log_in.password = $event.target.value"></f7-input>
                </f7-list-item>

                <!-- SUBMIT -->
                <f7-list-item>
                    <f7-list-button @click="do_login">Enviar</f7-list-button>
                </f7-list-item>

            </f7-list>

            <f7-list>
                <f7-button href="/forgot-password" fill round>He olvidado mi contraseña</f7-button>
            </f7-list>

            <f7-list>
                <f7-button href="/user-register" fill round>Nuevo usuario</f7-button>
            </f7-list>

            <f7-list>
                <f7-button href="/new-device" fill round>Registrar este dispositivo</f7-button>
            </f7-list>

        </f7-block>

    </f7-page>
</template>

<script>
    import axios from 'axios';
    import {
        API_PATH
    } from '../../config.js';
    // import {mapActions} from "vuex";

    export default {
        name: 'LogIn',
        props: [],
        data() {
            return {
                log_in: {
                    email: '',
                    password: '',
                    token: ''
                }
            };
        },
        mounted() {
            console.log('-> LogIn');

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
                        this.$f7router.navigate('/new-device');
                        return;
                    }
                } else {
                    this.$f7router.navigate('/new-device');
                }

                axios.post(API_PATH + 'login', {
                    email: this.log_in.email,
                    password: this.log_in.password,
                    device_code: this.log_in.token
                })
                    .then((response) => {
                        console.log(response);
                        if (response.data.result === 'OK') {
                            this.$store.dispatch('setUserName', response.data.user.name);
                            this.$store.dispatch('setUserID', response.data.user._id);
                            this.$store.dispatch('setUserPic', response.data.pic);
                            this.$store.dispatch('setDeviceCode', this.log_in.token);
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
    }
    ;
</script>