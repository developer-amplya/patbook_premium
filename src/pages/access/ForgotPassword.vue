<template>
    <f7-page>

        <!-- Navbar -->
        <f7-navbar>
            <f7-nav-left>
                <f7-link href="/login">
                    <f7-icon material="arrow_back"></f7-icon>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title title="Nueva contraseña"></f7-nav-title>
        </f7-navbar>

        <f7-block inner>

            <!-- Info -->
            <div class="alert alert-info">
                <p class="center">
                    <f7-icon material="info"></f7-icon>
                </p>
                <p>Por razones de seguridad tu contraseña se guarda encriptada en la base de datos, por lo que no
                    es posible recuperarla. Deberás crear una nueva.</p>
            </div>

            <p>Introduce tu dirección de correo electrónico a continuación y te enviaremos un email para generar una
                nueva contraseña.</p>

            <f7-list form no-hairlines>

                <!-- EMAIL -->
                <f7-list-item>
                    <f7-label>Email</f7-label>
                    <f7-input type="email" :value="email"
                              @input="email = $event.target.value"></f7-input>
                </f7-list-item>

                <!-- FEEDBACK -->
                <f7-list-item v-show="msg">
                    {{ msg }}
                </f7-list-item>

                <!-- SUBMIT -->
                <f7-list-item>
                    <f7-button big fill  @click="retrievePassword">Enviar</f7-button>
                </f7-list-item>

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
        name: 'ForgotPassword',
        data() {
            return {
                email: '',
                msg: ''
            };
        },
        methods: {
            retrievePassword() {
                console.log(this.email);

                axios.post(API_PATH + 'forgot-password', {
                    email: this.email
                })
                    .then((response) => {
                        console.log(response);
                        if (response.data.result === 'KO') this.msg = response.data.message;
                        if (response.statusText === 'OK') this.$f7router.navigate('/login');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    };
</script>