<template>
    <f7-page>

        <!-- Navbar -->
        <f7-navbar>
            <f7-nav-left>
                <f7-link href="/reset-password">
                    <f7-icon material="arrow_back"></f7-icon>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title title="Nueva contraseña"></f7-nav-title>
        </f7-navbar>

        <f7-block inner>

            <p>Escribe a continuación el código que hemos enviado a tu dirección de correo electrónico* (respeta las
                mayúsculas y minúsculas). Después crea una contraseña nueva con un mínimo de 6 caracteres.</p>

            <f7-list form no-hairlines>

                <!-- Password reset code -->
                <f7-list-item>
                    <f7-label>Código</f7-label>
                    <f7-input type="text" :value="password_reset_code"
                              @input="password_reset_code = $event.target.value"></f7-input>
                </f7-list-item>

                <!-- New password -->
                <f7-list-item>
                    <f7-label>Contraseña</f7-label>
                    <f7-input type="password" :value="new_password"
                              @input="new_password = $event.target.value"></f7-input>
                </f7-list-item>

                <!-- Reset password -->
                <f7-list-item>
                    <f7-label>Confirmar contraseña</f7-label>
                    <f7-input type="password" :value="password_confirmation"
                              @input="password_confirmation = $event.target.value"></f7-input>
                </f7-list-item>

                <f7-list-item>
                    <f7-button big fill @click="ResetPassword" no-fast-click>CREAR NUEVA CONTRASEÑA</f7-button>
                </f7-list-item>

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
        name: 'ResetPassword',
        props: ['email'],
        data() {
            return {
                password_reset_code: '',
                new_password: '',
                password_confirmation: ''
            };
        },
        mounted() {
            //console.log('-> ResetPassword');
        },
        methods: {
            ResetPassword() {
                // Check matching password
                if (this.new_password !== this.password_confirmation) {
                    this.$f7.dialog.alert('La contraseña no coincide', "Error");
                    return;
                }

                // Preloader On
                this.$f7.dialog.preloader("Enviando...");

                axios.post(API_PATH + 'reset-password', {
                    email: this.email,
                    password_reset_code: this.password_reset_code,
                    new_password: this.new_password
                })
                    .then((response) => {
                        console.log(response);
                        // Preloader Off
                        this.$f7.dialog.close();

                        if (response.data.result === 'OK') {
                            let notification = this.$f7.toast.create({
                                position: 'top',
                                text: response.data.message,
                                cssClass: "success",
                                icon: '<i class="icon material-icons">done</i>',
                                closeTimeout: 2000
                            });
                            notification.open();

                            // Redirect
                            setTimeout(() => {
                                this.$f7router.navigate('/login');
                            }, 2000);
                        } else {
                            this.$f7.dialog.alert(response.data.message, "Error");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        // Preloader Off
                        this.$f7.dialog.close();
                        this.$f7.dialog.alert("Ha ocurrido un error", "Error");
                    });
            }
        }
    };
</script>

<style scoped>
    .big {
        width: 100%;
    }
</style>