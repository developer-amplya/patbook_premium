<template>

    <f7-page class="feedback-page">

        <!-- Navbar -->
        <f7-navbar back-link back-link-force back-link-url="/home" title="ENVIAR COMENTARIOS"></f7-navbar>

        <f7-block inner>

            <p>Informar de errores, hacer sugerencias o, simplemente, contarnos qué piensas de la aplicación...</p>
            <p>Estaremos encantados de mejorar con tu ayuda.</p>

            <f7-input
                    type="textarea"
                    resizable
                    :value="feedback"
                    @input="feedback = $event.target.value">
            </f7-input>
            <br>
            <f7-button
                    large
                    raised
                    fill
                    text="ENVIAR"
                    @click="sendFeedback">
            </f7-button>

            <br>
            <hr>

            <h4>Información técnica que se enviará junto con tus comentarios.</h4>
            <p><strong>Nombre del dispositivo</strong>: {{ device.name }}</p>

        </f7-block>

    </f7-page>

</template>

<script>
    import axios from 'axios';
    import {
        API_PATH
    } from '../config.js';

    export default {
        name: "SendFeedback",
        data() {
            return {
                feedback: ''
            }
        },
        methods: {
            sendFeedback() {
                axios.post(API_PATH + 'get-feedback', {
                    /*params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                        // TODO: encriptar las credenciales?
                    },*/
                    comments: this.feedback
                })
                    .then((response) => {
                        let notification = this.$f7.toast.create({
                            position: 'top',
                            text: '¡Comentarios enviados! Gracias por tu colaboración',
                            cssClass: "success",
                            icon: '<i class="icon material-icons">done</i>',
                            closeTimeout: 2000
                        });
                        notification.open();
                    })
                    .catch(function (error) {
                        //console.log(error);
                    });
            }
        }
    }
</script>

<style scoped>

</style>