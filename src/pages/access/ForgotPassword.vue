<template>
    <f7-page>

        <f7-navbar title="RECUPERAR CONTRASEÑA" back-link></f7-navbar>

        <f7-block inner>

            <p>Introduzca su dirección y le enviaremos un email para generar una nueva contraseña.</p>

            <f7-list form>

                <!-- EMAIL -->
                <f7-list-item>
                    <f7-label>Email</f7-label>
                    <f7-input type="text" :value="email"
                              @input="email = $event.target.value"></f7-input>
                </f7-list-item>

                <!-- FEEDBACK -->
                <f7-list-item v-show="msg">
                    {{ msg }}
                </f7-list-item>

                <!-- SUBMIT -->
                <f7-list-item>
                    <f7-list-button @click="retrievePassword">Enviar</f7-list-button>
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
    import F7ListItem from 'framework7-vue/src/components/list-item';

    export default {
        name: 'ForgotPassword',
        components: {F7ListItem},
        props: [],
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