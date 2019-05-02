<template>
    <f7-page>

        <!-- Navbar -->
        <f7-navbar :class="getMainColor">
            <f7-nav-left>
                <f7-link href="/home">
                    <f7-icon material="arrow_back"></f7-icon>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title title="PREPARACIÓN VISITA MÉDICA"></f7-nav-title>
        </f7-navbar>

        <f7-block inner>
            <f7-list>
                <f7-list-item
                        v-for="listItem in list"
                        :key="listItem._id"
                        :link="/medical-visit-preparations/ + listItem._id"
                        :title="listItem.symptoms_description"></f7-list-item>
            </f7-list>
        </f7-block>

        <!-- Add new record -->
        <div class="fab fab-right-bottom">
            <a href="/medical-visit-preparations/insert" class="stone">
                <i class="icon f7-icons">add</i>
            </a>
        </div>
    </f7-page>
</template>
<script>
    import axios from 'axios';
    import {
        API_PATH
    } from '../../config.js';
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
                .get(API_PATH + 'medical-visit-preparations', {
                    params: {
                        device_code: this.getDeviceCode,
                        user_id: this.getUserID
                        // TODO: encriptar las credenciales?
                    }
                })
                .then(response => (this.list = response.data))
                //.catch(error => (console.log(error)));
        }
    }
    ;
</script>

<style scoped>
    .toolbar a {
        font-size: 48px !important;
    }
</style>
