<template>
    <f7-page>
        <f7-navbar title="ACCESO"></f7-navbar>
        <f7-block inner>
            <f7-list form>
                <f7-list-item>
                    <f7-label>Email</f7-label>
                    <f7-input type="text" :value="log_in.email"
                              @input="log_in.email = $event.target.value"></f7-input>
                </f7-list-item>
                <f7-list-item>
                    <f7-label>Contraseña</f7-label>
                    <f7-input type="password" :value="log_in.password"
                              @input="log_in.password = $event.target.value"></f7-input>
                </f7-list-item>
            </f7-list>
            <f7-list>
                <f7-list-button @click="do_login">Enviar</f7-list-button>
            </f7-list>
        </f7-block>
    </f7-page>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'LogIn',
        props: [],
        data() {
            return {
                log_in: {
                    email: '',
                    password: ''
                }
            };
        },
        methods: {
            do_login() {
                console.log(this.log_in.email + '/' + this.log_in.password);

                axios.post('http://patbookapi.local/api/login', {
                    email: this.log_in.email,
                    password: this.log_in.password
                })
                    .then( (response) => {
                        console.log(response);
                        if (response.statusText === 'OK') this.$f7router.navigate('home');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    };
</script>