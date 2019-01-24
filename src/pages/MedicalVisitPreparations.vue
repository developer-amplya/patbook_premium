<template>
    <f7-page>
        <f7-navbar title="PREPARACIÓN VISITA MÉDICA" back-link="Volver" :class="getMainColor"></f7-navbar>
        <f7-block inner>
            <f7-list>
                <f7-list-item
                        v-for="listItem in list"
                        :key="listItem._id"
                        :link="/medical-visit-preparations/ + listItem._id"
                        :header="listItem.type"
                        :title="listItem.name"
                        :footer="listItem.degree"></f7-list-item>
            </f7-list>
        </f7-block>
        <f7-toolbar bottom-md :class="getMainColor">
            <f7-link>&nbsp;</f7-link>
            <f7-link href="/medical-visit-preparations/insert">+</f7-link>
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
        name: 'MedicalVisitsPreparation',
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
            this.setMainColor('stone');
            axios
                .get('http://patbookapi.local/api/medical-visit-preparations', {
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
