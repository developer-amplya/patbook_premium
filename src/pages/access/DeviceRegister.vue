<template>
    <f7-page>

        <f7-navbar title="REGISTRO"></f7-navbar>

        <f7-block inner>

            <p>Escriba aquí el código que le hemos enviado a su email.</p>

            <f7-list form>

                <f7-list-item>
                    <f7-label>Código</f7-label>
                    <f7-input type="text" :value="device_code"
                              @input="device_code = $event.target.value"></f7-input>
                </f7-list-item>

                <f7-list-item>
                    <f7-list-button @click="setDeviceCode">Enviar</f7-list-button>
                </f7-list-item>

            </f7-list>

        </f7-block>
    </f7-page>
</template>

<script>
    export default {
        name: 'DeviceRegister',
        props: ['email'],
        data() {
            return {
                device_code: ''
            };
        },
        mounted() {
            console.log('-> DeviceRegister');
        },
        methods: {
            setDeviceCode() {
                var allowedUsers = JSON.parse(localStorage.allowed_users);
                allowedUsers.push({email: this.email, token: this.device_code})
                allowedUsers = JSON.stringify(allowedUsers);
                localStorage.allowed_users = allowedUsers;
                this.$f7router.navigate('/home');
            }
        }
    };
</script>