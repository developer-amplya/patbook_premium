<template>
    <f7-page>

        <!-- Navbar -->
        <f7-navbar :class="getMainColor">
            <f7-nav-left>
                <f7-link href="/home">
                    <f7-icon material="arrow_back"></f7-icon>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title title="MEDICACIONES"></f7-nav-title>
        </f7-navbar>

        <f7-block inner>
            <f7-list>
                <f7-list-item
                        v-for="listItem in list"
                        :key="listItem._id"
                        :link="/medicines/ + listItem._id"
                        :header="listItem.type"
                        :title="listItem.name"
                        :footer="listItem.degree"></f7-list-item>
            </f7-list>
        </f7-block>
        <f7-toolbar bottom-md :class="getMainColor">
            <f7-link>&nbsp;</f7-link>
            <f7-link href="/medicines/insert">+</f7-link>
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
                .get('http://patbookapi.local/api/medicines', {
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
