<template>
    <f7-page>
        <f7-navbar title="REGISTRO"></f7-navbar>
        <f7-block inner>
            <f7-list>
                <f7-list-item>
                    <f7-label>Usuario</f7-label>
                    <f7-input type="text" :value="register.name"
                              @input="register.name = $event.target.value"></f7-input>
                </f7-list-item>
                <f7-list-item>
                    <f7-label>Email</f7-label>
                    <f7-input type="text" :value="register.email"
                              @input="register.email = $event.target.value"></f7-input>
                </f7-list-item>
                <f7-list-item>
                    <f7-label>Contraseña</f7-label>
                    <f7-input type="password" :value="register.password"
                              @input="register.password = $event.target.value"></f7-input>
                </f7-list-item>
                <f7-list-item>
                    <f7-label>Confirmar contraseña</f7-label>
                    <f7-input type="password" :value="register.password_confirmation"
                              @input="register.password_confirmation = $event.target.value"></f7-input>
                </f7-list-item>
            </f7-list>
            <f7-list>
                <f7-list-button @click="signIn">Enviar</f7-list-button>
            </f7-list>
        </f7-block>
    </f7-page>
</template>

<script>
    import axios from 'axios';

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
        methods: {
            signIn() {
                console.log(this.register.name + '/' + this.register.email + '/' + this.register.password + '/' + this.register.password_confirmation);

                axios.post('http://patbookapi.local/api/register', {
                    name: this.register.name,
                    email: this.register.email,
                    password: this.register.password,
                    password_confirmation: this.register.password_confirmation
                })
                    .then( (response) => {
                        console.log(response);
                        if (response.statusText === 'OK') this.$f7router.navigate('/device-register');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    };
</script>