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

            <!-- Protección de datos -->
            <f7-block>
                <h3>Protección de datos</h3>
                <p><strong>Responsable del tratamiento:</strong> EL ARTESANO DE IDEAS S.L.</p>
                <p><strong>Finalidad:</strong> sus datos serán tratados para posibilitar el registro de usuario y la
                    aplicación de los términos y condiciones del servicio, para que como tal pueda interactuar con la
                    Plataforma de acuerdo a la naturaleza y finalidad de la misma. También serán tratados para
                    proporcionar el servicio de atención al usuario, y para proceder al envío de marketing por medios
                    electrónicos si el interesado lo consiente. Sus datos también serán tratados con finalidades
                    analíticas y estadísticas.</p>
                <p>Se elaborarán perfiles de forma automatizada para la remisión de publicidad de productos y servicios
                    de terceros, según lo que se señalará más adelante.</p>
                <p>Siempre que se solicite el consentimiento, éste puede ser retirado en cualquier momento. La retirada
                    del consentimiento en relación a los términos y condiciones del servicio, implican la baja de los
                    mismos.</p>
                <p><strong>Legitimación:</strong> El consentimiento del usuario para el registro de usuarios y la
                    aplicación de los términos y condiciones, para la gestión de solicitudes de atención y
                    reclamaciones, y para la remisión de publicidad. Interés legítimo del Responsable para el
                    cumplimiento de finalidades analíticas y estadísticas.</p>
                <p><strong>Destinatarios:</strong> No se cederán datos a terceros, salvo obligación legal. No se
                    realizarán transferencias internacionales de datos.</p>
                <p><strong>Derechos:</strong> acceder, rectificar y suprimir los datos, así como otros derechos, como
                    se explica en la información adicional.</p>
                <p><strong>Información adicional:</strong> puede consultar la información adicional y detallada sobre
                    Protección de Datos <f7-link href="/privacy-policy">aquí</f7-link></p>

                <!-- Aceptación -->
                <p><f7-checkbox name="acceptance" @change="onAcceptanceChange"></f7-checkbox> Acepto que mis datos sean tratados para la aplicación de los <f7-link href="/terms-and-conditions">términos y condiciones</f7-link> de registro y contratación.</p>

                <!-- Consentimiento -->
                <p><f7-checkbox name="consent" @change="onConsentChange"></f7-checkbox> Consiento en que se cree un perfil con mis datos con el propósito de poder recibir información de terceros acerca de productos y servicios que se adecuen mejor a mis intereses. Sin perjuicio de los anterior, los datos personales en ningún caso se cederán a terceros anunciantes <em>(opcional)</em>.</p>

            </f7-block>

            <!-- SUBMIT -->
            <f7-list>
                <f7-button fill large raised @click="signIn" :disabled="isDisabled">REGISTRAR</f7-button>
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
                    password_confirmation: '',
                    consent: 'no',
                },
                acceptance: false,
                isDisabled: true,
            };
        },
        mounted() {
            // TODO: deshabilitar el submit si faltan campos del formulario
        },
        methods: {
            onAcceptanceChange(e) {
                if (e.target.checked) {
                    this.isDisabled = false;
                } else {
                    this.isDisabled = true;
                }
            },
            onConsentChange(e) {
                if (e.target.checked) {
                    this.register.consent = 'yes';
                } else {
                    this.register.consent = 'no';
                }
            },
            signIn() {
                //console.log(this.register.name + '/' + this.register.email + '/' + this.register.password + '/' + this.register.password_confirmation);

                axios.post(API_PATH + 'register', {
                    name: this.register.name,
                    email: this.register.email,
                    password: this.register.password,
                    password_confirmation: this.register.password_confirmation,
                    consent: this.register.consent
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