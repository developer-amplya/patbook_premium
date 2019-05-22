<template>
    <f7-page @page:afterin="retrieveData" class="diagnostic-test-page">

        <!-- Navbar -->
        <f7-navbar
                :class="getMainColor"
                back-link
                back-link-force
                back-link-url="/home"
                title="PRUEBAS DIAGNÓSTICAS">
        </f7-navbar>

        <f7-block inner>
            <f7-list>
                <f7-list-item
                        v-for="listItem in list"
                        :key="listItem._id"
                        :link="/diagnostic-tests/ + listItem._id"
                        :title="listItem.name"
                        :footer="transformDate(listItem.date)"></f7-list-item>
            </f7-list>
        </f7-block>

        <!-- Add new record -->
        <div class="fab fab-right-bottom">
            <a href="/diagnostic-tests/insert" class="pink">
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
        name: 'DiagnosticTests',
        props: [],
        data() {
            return {
                list: [],
                months: [
                    "ENERO",
                    "FEBRERO",
                    "MARZO",
                    "ABRIL",
                    "MAYO",
                    "JUNIO",
                    "JULIO",
                    "AGOSTO",
                    "SEPTIEMBRE",
                    "OCTUBRE",
                    "NOVIEMBRE",
                    "DICIEMBRE"
                ]
            };
        },
        methods: {
            retrieveData() {
                // Preloader On
                this.$f7.dialog.preloader("Cargando...");
                // Fetch data
                axios
                    .get(API_PATH + 'diagnostic-tests', {
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
            transformDate: function(payload) {
                if(payload === undefined || payload === null) {
                    return;
                }
                let rawDate = new Date(payload);
                let dd = String(rawDate.getDate()).padStart(2, "0");
                let mm = this.months[String(rawDate.getMonth())]; // January is 0!
                //const mm = rawDate.toLocaleString('es-es', { month: 'long' }).toUpperCase();
                let yyyy = rawDate.getFullYear();
                return dd + " " + mm + " " + yyyy;
            },
            ...mapActions(['setMainColor']),
        },
        computed: mapGetters(['getUserID', 'getDeviceCode', 'getMainColor']),
        mounted() {
            this.setMainColor('pink');
            this.$$('#main-view').removeClass('purple-page yellow-page stone-page orange-page pink-page blue-page');
            this.$$('#main-view').addClass('pink-page')
        }
    }
    ;
</script>

<style>
    .pink-page .navbar, .pink-page .toolbar {
        background-color: #FF3183;
    }

    .diagnostic-test-page .toolbar a {
        font-size: 48px !important;
    }
</style>
