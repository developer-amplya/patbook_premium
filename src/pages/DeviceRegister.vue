<template>
    <f7-page>
        <f7-navbar title="REGISTRO"></f7-navbar>
        <f7-block inner>
            <p>Pegue aquí el código que le hemos enviado a su email.</p>
            <f7-list form>
                <f7-list-item>
                    <f7-label>Código</f7-label>
                    <f7-input type="text" :value="device_code"
                              @input="device_code = $event.target.value"></f7-input>
                </f7-list-item>
            </f7-list>
            <f7-list>
                <f7-list-button @click="setDeviceCode">Enviar</f7-list-button>
            </f7-list>
        </f7-block>
    </f7-page>
</template>

<script>

    export default {
        name: 'DeviceRegister',
        props: [],
        data() {
            return {
                device_code: ''
            };
        },
        methods: {
            setDeviceCode () {
                localStorage.isRegisteredDevice = true;
                localStorage.deviceCode = this.device_code;
                this.$f7router.navigate('/home');
            }
        }
    };
</script>