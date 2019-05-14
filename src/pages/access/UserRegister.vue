<template>
    <f7-page>

        <!-- Navbar -->
        <f7-navbar back-link title="Nuevo usuario"></f7-navbar>

        <f7-block inner>

            <!-- Info -->
            <div class="alert alert-info">
                <p class="center">
                    <f7-icon material="info"></f7-icon>
                </p>
                <p>Por razones de seguridad y privacidad una vez registrado como usuario también se te pedirá
                    que registres cada dispositivo desde el que vayas a acceder a tu cuenta. Para ello te
                    enviaremos un email con un código. Escribe dicho código en la pantalla siguiente.</p>
            </div>

            <f7-list form no-hairlines>

                <!-- USER NAME -->
                <f7-list-input
                        type="text"
                        label="Nombre"
                        :value="register.name"
                        @input="register.name = $event.target.value"
                ></f7-list-input>

                <!-- EMAIL -->
                <f7-list-input
                        type="email"
                        label="Email"
                        :value="register.email"
                        @input="register.email = $event.target.value"
                ></f7-list-input>

                <!-- PASSWORD -->
                <f7-list-input
                        type="password"
                        label="Contraseña (mínimo 6 caracteres)"
                        :value="register.password"
                        @input="register.password = $event.target.value"
                ></f7-list-input>

                <!-- CONFIRM PASSWORD -->
                <f7-list-input
                        type="password"
                        label="Confirmar contraseña"
                        :value="register.password_confirmation"
                        @input="register.password_confirmation = $event.target.value"
                ></f7-list-input>
            </f7-list>

            <!-- SUBMIT -->
            <f7-list>
                <f7-button fill large raised @click="signIn">REGISTRAR</f7-button>
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
        name: 'UserRegister',
        props: [],
        data() {
            return {
                register: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                }
            };
        },
        mounted() {
            //console.log('-> UserRegister');
        },
        methods: {
            signIn() {
                //console.log(this.register.name + '/' + this.register.email + '/' + this.register.password + '/' + this.register.password_confirmation);

                axios.post(API_PATH + 'register', {
                    name: this.register.name,
                    email: this.register.email,
                    password: this.register.password,
                    password_confirmation: this.register.password_confirmation
                })
                    .then((response) => {
                        console.log(response);
                        // Proceeding to the device registration by passing the user's email.
                        if (response.data.result === 'OK') this.$f7router.navigate('/device-register/' + this.register.email + '/' + this.register.password);
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