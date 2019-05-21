<template>

    <f7-page hide-toolbar-on-scroll>

        <f7-navbar>
            <f7-nav-left>
                <f7-link href="/agenda">
                    <f7-icon material="arrow_back"></f7-icon>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title title="AGENDA"></f7-nav-title>
            <f7-nav-right>
                <span
                        class="navbar-icon-right"
                        @click="replicateRecord"
                ><img src="../../assets/ic_content_copy_white_24dp.png"></span>
                <span class="navbar-icon-right">
                    <a :href="'/agenda/edit/' + id"><img src="../../assets/ic_mode_edit_white_24dp.png"></a>
                </span>
            </f7-nav-right>
        </f7-navbar>

        <f7-block inner>

            <!-- Info -->
            <div class="alert alert-info" v-if="copyMsg">
                <p class="center">
                    <f7-icon material="info"></f7-icon>
                </p>
                <p class="center">Copia de "{{ details.name }}"</p>
            </div>

            <f7-card>
                <f7-list media-list>

                    <!-- Name -->
                    <f7-list-item header="Nombre">
                        <span>{{ details.name }}</span>
                    </f7-list-item>

                    <!-- Date -->
                    <f7-list-item header="Fecha">
                        <span>{{ transformDate(details.date) }}</span>
                    </f7-list-item>

                    <!-- Time -->
                    <f7-list-item header="Hora">
                        <span>{{ details.time }}</span>
                    </f7-list-item>

                    <!-- Type -->
                    <f7-list-item header="Tipo">
                        <span>{{ details.type }}</span>
                    </f7-list-item>

                    <!-- Description -->
                    <f7-list-item header="Descripción">
                        <span>{{ details.description }}</span>
                    </f7-list-item>
                </f7-list>
            </f7-card>

        </f7-block>

        <!-- Delete -->
        <f7-toolbar bottom-md>
            <f7-link></f7-link>
            <f7-link @click="deleteRecord">
                <f7-icon material="delete"></f7-icon>
            </f7-link>
            <f7-link></f7-link>
        </f7-toolbar>

    </f7-page>

</template>

<script>
    import axios from 'axios';
    import {
        API_PATH
    } from '../../config.js';

    export default {
        name: 'AgendaEntryDetails',
        props: [
            'record_id'
        ],
        data() {
            return {
                id: this.record_id,
                details: [],
                copyMsg: false,
                months: [
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre"
                ],
            };
        },
        mounted() {
            axios
                .get(API_PATH + 'agenda/' + this.id, {
                    params: {
                        // device_code: sessionStorage.device_code,
                        // user_id: sessionStorage.user_id
                    }
                })
                .then(response => {
                    this.details = response.data;
                });
        },
        methods: {
            replicateRecord() {
                this.$f7.dialog.confirm('Se creará un nuevo registro a partir del que estás viendo y podrás editarlo inmediatamente', '¿Replicar este registro?', () => {
                    axios
                        .get(API_PATH + 'agenda/replicate/' + this.id, {
                            params: {
                                // device_code: sessionStorage.device_code,
                                // user_id: sessionStorage.user_id
                            }
                        })
                        .then(response => {
                            this.id = response.data._id; // The ID of the new record
                            this.details = response.data;
                            this.copyMsg = true;

                            let notification = this.$f7.toast.create({
                                position: 'top',
                                text: '¡Registro replicado!',
                                cssClass: 'success',
                                icon: '<i class="icon material-icons">done</i>',
                                closeTimeout: 2000
                            });
                            notification.open();
                        });
                });
            },
            deleteRecord() {
                this.$f7.dialog.confirm('Esta acción no puede deshacerse', '¿Borrar este registro?', () => {
                    axios
                        .delete(API_PATH + 'agenda/' + this.id, {
                            params: {
                                // device_code: sessionStorage.device_code,
                                // user_id: sessionStorage.user_id
                            }
                        })
                        .then(response => {
                            if (response.data.result === 'OK') {

                                let notification = this.$f7.toast.create({
                                    position: 'top',
                                    text: '¡Registro borrado!',
                                    cssClass: "success",
                                    icon: '<i class="icon material-icons">done</i>',
                                    closeTimeout: 2000
                                });
                                notification.open();

                                // Returning to list
                                setTimeout(() => {
                                    this.$f7router.navigate('/agenda');
                                }, 2000);
                            } else {
                                this.$f7.dialog.alert('No se ha podido borrar el registro', "Error");
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            this.$f7.dialog.alert('Ha ocurrido un error', "Error");
                        });
                });
            },
            transformDate: function(payload) {
                let rawDate = new Date(payload);
                let dd = String(rawDate.getDate());
                let mm = this.months[String(rawDate.getMonth())]; // January is 0!
                //const mm = rawDate.toLocaleString('es-es', { month: 'long' }).toUpperCase();
                let yyyy = rawDate.getFullYear();
                return dd + " " + mm + " " + yyyy;
            },
        }
    };
</script>

<style scoped>
    .copy-msg {
        text-align: center;
    }
</style>
