<template>
    <f7-page>
        <f7-navbar title="MEDICACIÓN" back-link="Volver"></f7-navbar>
        <f7-block inner>
            <f7-list>
            </f7-list>
        </f7-block>
    </f7-page>
</template>
<script>
    import axios from 'axios';

    export default {
        name: 'Allergies',
        props: [],
        data() {
            return {
                list: []
            };
        },
        methods: {
            //
        },
        mounted() {
            axios
                .get('http://patbookapi.local/api/allergies', {
                    params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                        // TODO: encriptar las credenciales?
                    }
                })
                .then(response => (this.list = response.data))
                .catch(error => (console.log(error)));
        }
    }
    ;
</script>

<style scoped>
    .navbar {
        background-color: #D3698E;
    }
</style>
