<template>
    <f7-page>
        <f7-navbar title="PRUEBAS DIAGNÓSTICAS" back-link="Volver" :class="getMainColor"></f7-navbar>
        <f7-block inner>
            <f7-list>
                <f7-list-item
                        v-for="listItem in list"
                        :key="listItem._id"
                        :link="/diagnostic-tests/ + listItem._id"
                        :header="listItem.type"
                        :title="listItem.name"
                        :footer="listItem.degree"></f7-list-item>
            </f7-list>
        </f7-block>
        <f7-toolbar bottom-md :class="getMainColor">
            <f7-link>&nbsp;</f7-link>
            <f7-link href="/diagnostic-tests/insert">+</f7-link>
            <f7-link>&nbsp;</f7-link>
        </f7-toolbar>
    </f7-page>
</template>
<script>
    import axios from 'axios';
    import {
        mapGetters,
        mapActions
    } from 'vuex';

    export default {
        name: 'DiagnosticTests',
        props: [],
        data() {
            return {
                list: []
            };
        },
        methods: {
            //
            ...mapActions(['setMainColor'])
        },
        computed: mapGetters(['getUserID', 'getDeviceCode', 'getMainColor']),
        mounted() {
            this.setMainColor('pink');
            axios
                .get('http://patbookapi.local/api/diagnostic-tests', {
                    params: {
                        device_code: this.getDeviceCode,
                        user_id: this.getUserID
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
    .toolbar a {
        font-size: 48px !important;
    }
</style>
