<template>

    <f7-page hide-toolbar-on-scroll class="medicines-page">

        <f7-navbar back-link back-link-force back-link-url="/medicines" title="MEDICAMENTO">
            <f7-nav-right>
                <span class="navbar-icon-right">
                    <a :href="'/medicines/edit/' + id"><img src="../../assets/ic_mode_edit_white_24dp.png"></a>
                </span>
                <span
                        class="navbar-icon-right"
                        @click="replicateRecord"
                ><img src="../../assets/ic_content_copy_white_24dp.png"></span>
                <span
                        class="navbar-icon-right"
                        @click=""
                ><img src="../../assets/ic_share_white_24dp.png"></span>
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

            <f7-card title="REGISTRO DE MEDICACIÓN">
                <f7-list media-list>

                    <!-- Name -->
                    <f7-list-item header="Nombre">
                        <span>{{ details.name }}</span>
                    </f7-list-item>

                    <!-- Image -->
                    <f7-list-item title="Imagen">
                        <span class="zoom-in"
                              @click="zoomImage">
                            <f7-icon material="zoom_in"></f7-icon>
                        </span>
                    </f7-list-item>
                    <f7-list-item>
                        <div class="image-holder">
                            <img :src="imagepath"/>
                        </div>
                    </f7-list-item>

                    <!-- Laboratory name -->
                    <f7-list-item header="Nombre del laboratorio">
                        <span>{{ details.lab }}</span>
                    </f7-list-item>

                    <!-- Content -->
                    <f7-list-item header="Miligramos/Mililitros">
                        <span>{{ details.content }}</span>
                    </f7-list-item>

                    <!-- Dose -->
                    <f7-list-item header="Dosis">
                        <span>{{ details.dose }}</span>
                    </f7-list-item>

                    <!-- Frequency -->
                    <f7-list-item header="Frecuencia">
                        <span>{{ details.frequency }}</span>
                    </f7-list-item>

                    <!-- Time -->
                    <f7-list-item header="Hora/Pauta">
                        <span>{{ details.time }}</span>
                    </f7-list-item>

                    <!-- Day time -->
                    <f7-list-item header="Momento del día">
                        <span id="day-time"></span>
                    </f7-list-item>

                    <!-- Start date -->
                    <f7-list-item header="Fecha de inicio">
                        <span>{{ transformDate(details.start) }}</span>
                    </f7-list-item>

                    <!-- Ending date -->
                    <f7-list-item header="Fecha de fin">
                        <span>{{ transformDate(details.end) }}</span>
                    </f7-list-item>

                    <!-- Cause -->
                    <f7-list-item header="Motivo">
                        <span>{{ details.cause }}</span>
                    </f7-list-item>

                    <!-- Effects -->
                    <f7-list-item header="Efectos">
                        <span>{{ details.effects }}</span>
                    </f7-list-item>

                    <!-- Notes -->
                    <f7-list-item header="Notas">
                        <span>{{ details.notes }}</span>
                    </f7-list-item>

                    <!-- Doctor -->
                    <f7-list-item header="Médico">
                        <span>{{ details.doctor }}</span>
                    </f7-list-item>
                </f7-list>
            </f7-card>

            <br>

            <f7-card title="CAMPOS PERSONALIZADOS" v-if="there_is_schema">
                <f7-list media-list>
                    <!-- SCHEMA -->
                    <f7-list-item v-for="(field, index) in schema"
                                  :key="index"
                                  :header="field.label">
                        <span>{{ field.value }}</span>
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
        API_PATH, USER_IMAGES_PATH
    } from '../../config.js';

    export default {
        name: 'MedicinesDetails',
        props: [
            'record_id'
        ],
        data() {
            return {
                id: this.record_id,
                details: [],
                schema: [],
                schema_active_index: null,
                there_is_schema: false,
                copyMsg: false,
                imagepath: undefined,
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
            // Get the record details
            axios
                .get(API_PATH + 'medicines/' + this.id, {
                    params: {
                        // device_code: sessionStorage.device_code,
                        // user_id: sessionStorage.user_id
                    }
                })
                .then(response => {
                    this.details = response.data;
                    if (response.data.schema !== "[]") {
                        this.there_is_schema = true;
                        this.schema = JSON.parse(response.data.schema);
                    }

                    // Check the image
                    if (this.details.image !== null) {
                        this.imagepath = USER_IMAGES_PATH + this.details.image;
                    }

                    //
                    var dayTimeStr = '';
                    (this.details.day_time).forEach((item) => {
                        dayTimeStr += item + ' ';
                    });
                    this.$$('#day-time').html(dayTimeStr);
                });
        },
        methods: {
            zoomImage() {
                if (this.details.image !== null) {
                    PhotoViewer.show(USER_IMAGES_PATH + this.details.image);
                }
            },
            transformDate: function(payload) {
                if(payload === undefined || payload === null) {
                    return;
                }
                let rawDate = new Date(payload);
                let dd = String(rawDate.getDate());
                let mm = this.months[String(rawDate.getMonth())]; // January is 0!
                //const mm = rawDate.toLocaleString('es-es', { month: 'long' }).toUpperCase();
                let yyyy = rawDate.getFullYear();
                return dd + " " + mm + " " + yyyy;
            },
            replicateRecord() {
                this.$f7.dialog.confirm('Se creará un nuevo registro a partir del que estás viendo y podrás editarlo inmediatamente', '¿Replicar este registro?', () => {
                    axios
                        .get(API_PATH + 'medicines/replicate/' + this.id, {
                            params: {
                                // device_code: sessionStorage.device_code,
                                // user_id: sessionStorage.user_id
                            }
                        })
                        .then(response => {
                            this.id = response.data._id; // The ID of the new record
                            this.details = response.data;
                            this.schema = JSON.parse(response.data.schema);
                            this.copyMsg = true;

                            // Incrementing counting state
                            this.$store.dispatch('incrementDocumentCounting', 'medicines');

                            let notification = this.$f7.toast.create({
                                position: 'top',
                                text: '¡Registro replicado! Ya puedes editarlo',
                                cssClass: "success",
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
                        .delete(API_PATH + 'medicines/' + this.id, {
                            params: {
                                // device_code: sessionStorage.device_code,
                                // user_id: sessionStorage.user_id
                            }
                        })
                        .then(response => {
                            if (response.data.result === 'OK') {
                                // Incrementing counting state
                                this.$store.dispatch('decrementDocumentCounting', 'medicines');

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
                                    this.$f7router.navigate('/medicines');
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
            }
        }
    };
</script>

<style>
    .yellow-page .navbar, .yellow-page .toolbar {
        background-color: #F2BE4C;
    }
</style>
