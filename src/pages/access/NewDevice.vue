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

            <p>Es la primera vez que accedes a tu cuenta desde este dispositivo.</p>
            <p>Si ya eres usuario de Patbook introduce tu email a continuación y te enviaremos un código para registrar
                este dispositivo y autorizar el acceso a tu cuenta desde el mismo.</p>

            <f7-list form no-hairlines>

                <f7-list-item v-show="msg" class="alert alert-warning">
                    {{ msg }}
                </f7-list-item>

                <f7-list-item>
                    <f7-label>Email</f7-label>
                    <f7-input type="email" :value="email"
                              @input="email = $event.target.value"></f7-input>
                </f7-list-item>

                <f7-list-item>
                    <f7-list-button @click="registerDevice">Enviar</f7-list-button>
                </f7-list-item>

            </f7-list>

            <p>Si aún no eres usuario de Patbook:</p>
            <f7-list>
                <f7-button href="/user-register" fill round no-fast-click>Nuevo usuario</f7-button>
            </f7-list>

        </f7-block>
    </f7-page>
</template>

<script>
    import axios from 'axios';
    import {
        API_PATH
    } from '../../config.js';

    export default {
        name: 'NewDevice',
        data() {
            return {
                email: '',
                msg: ''
            };
        },
        mounted() {
            console.log('-> NewDevice');
        },
        methods: {
            registerDevice() {
                console.log(this.email);

                axios.post(API_PATH + 'register-device', {
                    email: this.email
                })
                    .then((response) => {
                        console.log(response);
                        if (response.data.result === 'KO') {
                            this.msg = response.data.message;
                        } else {
                            this.$f7router.navigate('/device-register/' + this.email);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    };
</script>