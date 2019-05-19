<template>
    <f7-page @page:afterin="retrieveData">

        <!-- Navbar -->
        <f7-navbar
                :class="getMainColor"
                back-link
                back-link-force
                back-link-url="/home"
                title="ALERGIAS">
        </f7-navbar>

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

        <!-- Add new record -->
        <div class="fab fab-right-bottom">
            <a href="/allergies/insert" class="purple">
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
        name: 'Allergies',
        props: [],
        data() {
            return {
                list: []
            };
        },
        methods: {
            retrieveData() {
                // Preloader On
                this.$f7.dialog.preloader("Cargando...");
                // Fetch data
                axios
                    .get(API_PATH + 'allergies', {
                        params: {
                            device_code: this.getDeviceCode,
                            user_id: this.getUserID
                            // TODO: encriptar las credenciales?
                        }
                    })
                    .then(response => {
                        // Preloader Off
                        this.$f7.dialog.close();
                        this.list = response.data
                    })
                    .catch(error => {
                        console.log(error)
                        // Preloader Off
                        this.$f7.dialog.close();
                        this.$f7.dialog.alert("No se ha podido recuperar la información", "Error");
                    });
            },
            ...mapActions(['setMainColor']),
        },
        computed: {
            ...mapGetters(['getUserID', 'getDeviceCode', 'getMainColor'])
        },
        mounted() {
            this.setMainColor('purple');
        }
    }
    ;
</script>

<style scoped>
    .toolbar a {
        font-size: 48px !important;
    }
</style>
