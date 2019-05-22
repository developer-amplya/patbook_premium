<template>
    <f7-page class="agenda-page">

        <!-- Navbar -->
        <f7-navbar back-link back-link-force back-link-url="/home">
            <f7-nav-title title="AGENDA"></f7-nav-title>
        </f7-navbar>

        <f7-block inner>
            <f7-list>
                <f7-list-item
                        v-for="listItem in list"
                        :key="listItem._id"
                        :link="/agenda/ + listItem._id"
                        :header="listItem.type"
                        :title="listItem.name"
                        :footer="transformDate(listItem.date) + ' - ' + listItem.time"></f7-list-item>
            </f7-list>
        </f7-block>

        <!-- Add new record -->
        <div class="fab fab-right-bottom">
            <a href="/agenda/insert">
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
        mapGetters
    } from 'vuex';

    export default {
        name: 'Agenda',
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
        computed: {
            ...mapGetters(['getUserID', 'getDeviceCode'])
        },
        mounted() {

            this.$$('#main-view').removeClass('purple-page yellow-page stone-page orange-page pink-page blue-page');
            this.$$('#main-view').addClass('blue-page')

            // Get agenda entries
            axios
                .get(API_PATH + 'agenda', {
                    params: {
                        device_code: this.getDeviceCode,
                        user_id: this.getUserID
                        // TODO: encriptar las credenciales?
                    }
                })
                .then(response => (this.list = response.data))
            //.catch(error => (console.log(error)));
        },
        methods: {
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
            }
        }
    }
    ;
</script>

<style>
    .blue-page .navbar, .blue-page .toolbar {
        background-color: #1ABAD4;
    }

    .agenda-page .toolbar a {
        font-size: 48px !important;
    }
</style>
