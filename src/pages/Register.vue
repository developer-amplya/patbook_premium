<template>
    <f7-page>
        <f7-navbar title="REGISTRO"></f7-navbar>
        <f7-block inner>
            <p>Es la primera vez que accede con este dispositivo.</p>
            <p>Si aún no es usuario:</p>
            <f7-button href="/user-register">Registrar usuario</f7-button>
            <p>Si ya es usuario introduzca su email a continuación y le enviaremos un código para registrar este
                dispositivo</p>
            <f7-list>
                <f7-list-item>
                    <f7-label>Email</f7-label>
                    <f7-input type="text" :value="email"
                              @input="email = $event.target.value"></f7-input>
                </f7-list-item>
                <f7-list-item v-show="msg">
                    {{ msg }}
                </f7-list-item>
                <f7-list>
                    <f7-list-button @click="registerDevice">Enviar</f7-list-button>
                </f7-list>
            </f7-list>
        </f7-block>
    </f7-page>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Register',
        props: [],
        data() {
            return {
                email: '',
                msg: ''
            };
        },
        methods: {
            registerDevice() {
                console.log(this.email);

                axios.post('http://patbookapi.local/api/register-device', {
                    email: this.email
                })
                    .then((response) => {
                        console.log(response);
                        if (response.data.result === 'KO') this.msg = response.data.message;
                        if (response.statusText === 'OK') this.$f7router.navigate('/device-register');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    };
</script>