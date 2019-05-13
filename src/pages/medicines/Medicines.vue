<template>
    <f7-page>

        <!-- Navbar -->
        <f7-navbar :class="getMainColor">
            <f7-nav-left>
                <f7-link href="/home">
                    <f7-icon material="arrow_back"></f7-icon>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title title="MEDICACIÓN"></f7-nav-title>
        </f7-navbar>

        <f7-block inner>
            <f7-list>
                <f7-list-item
                        v-for="listItem in list"
                        :key="listItem._id"
                        :link="/medicines/ + listItem._id"
                        :title="listItem.name"
                        :footer="listItem.start"></f7-list-item>
            </f7-list>
        </f7-block>

        <!-- Add new record -->
        <div class="fab fab-right-bottom">
            <a href="/medicines/insert" class="yellow">
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
        name: 'Medicines',
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
            this.setMainColor('yellow');
            axios
                .get(API_PATH + 'medicines', {
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
