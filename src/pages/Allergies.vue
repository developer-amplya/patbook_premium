<template>
    <f7-page>
        <f7-navbar title="ALERGIAS" back-link="Volver"></f7-navbar>
        <f7-block inner>
            <f7-list>
                <f7-list-item
                        v-for="listItem in list"
                        :key="listItem._id"
                        :link="/allergies/ + listItem._id"
                        :header="listItem.type"
                        :title="listItem.name"
                        :footer="listItem.degree"></f7-list-item>
            </f7-list>
        </f7-block>
        <f7-toolbar bottom-md>
            <f7-link>&nbsp;</f7-link>
            <f7-link href="/allergies/insert">+</f7-link>
            <f7-link>&nbsp;</f7-link>
        </f7-toolbar>
    </f7-page>
</template>
<script>
    import axios from 'axios';
    import { mapGetters } from 'vuex';

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
        computed: mapGetters(['getUserID', 'getDeviceCode']),
        mounted() {
            axios
                .get('http://patbookapi.local/api/allergies', {
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
    .navbar {
        background-color: #c36eb5;
    }

    .toolbar {
        background-color: #c36eb5;
    }
    
    .toolbar a {
        font-size: 48px !important;
    }
</style>
