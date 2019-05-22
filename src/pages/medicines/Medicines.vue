<template>
    <f7-page @page:afterin="retrieveData" class="medicines-page">

        <!-- Navbar -->
        <f7-navbar
                :class="getMainColor"
                back-link
                back-link-force
                back-link-url="/home"
                title="MEDICACIÓN">
        </f7-navbar>

        <f7-block inner>
            <f7-list>
                <f7-list-item
                        v-for="listItem in list"
                        :key="listItem._id"
                        :link="/medicines/ + listItem._id"
                        :title="listItem.name"
                        :footer="transformDate(listItem.start)"></f7-list-item>
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
                    .get(API_PATH + 'medicines', {
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
            this.setMainColor('yellow');
            this.$$('#main-view').removeClass('purple-page yellow-page stone-page orange-page pink-page blue-page');
            this.$$('#main-view').addClass('yellow-page')
        }
    }
    ;
</script>

<style>
    .yellow-page .navbar, .yellow-page .toolbar {
        background-color: #F2BE4C;
    }

    .medicines-page .toolbar a {
        font-size: 48px !important;
    }
</style>
