<template>

    <f7-page hide-toolbar-on-scroll class="diagnostic-test-page">

        <f7-navbar back-link back-link-force back-link-url="/diagnostic-tests" title="PRUEBAS DIAGNÓSTICAS">
            <f7-nav-right>
                <span class="navbar-icon-right">
                    <a :href="'/diagnostic-tests/edit/' + id"><img src="../../assets/ic_mode_edit_white_24dp.png"></a>
                </span>
                <span
                        class="navbar-icon-right"
                        @click="replicateRecord"
                ><img src="../../assets/ic_content_copy_white_24dp.png"></span>
                <span
                        class="navbar-icon-right"
                        @click="openShareSheet"
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

            <f7-card title="REGISTRO DE PRUEBA DIAGNÓSTICA">
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

                    <!-- CAUSE -->
                    <f7-list-item header="Motivo">
                        <span>{{ details.cause }}</span>
                    </f7-list-item>

                    <!-- REQUIREMENTS -->
                    <f7-list-item header="Requisitos previos">
                        <span>{{ details.requirements }}</span>
                    </f7-list-item>

                    <!-- LOCATION -->
                    <f7-list-item header="Lugar">
                        <span>{{ details.location }}</span>
                    </f7-list-item>

                    <!-- ADDRESS -->
                    <f7-list-item header="Dirección">
                        <span>{{ details.address }}</span>
                    </f7-list-item>

                    <!-- PHONE -->
                    <f7-list-item header="Teléfono">
                        <span>{{ details.phone }}</span>
                    </f7-list-item>

                    <!-- Doctor -->
                    <f7-list-item header="Médico">
                        <span>{{ details.doctor }}</span>
                    </f7-list-item>

                </f7-list>
            </f7-card>

            <br>

            <f7-card title="RESULTADOS">
                <f7-list media-list>

                    <!-- RESULTS -->
                    <f7-list-item header="Resultado">
                        <span>{{ details.results }}</span>
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

        <!-- Share Sheet -->
        <f7-sheet class="sheet" ref="share_sheet" @sheet:closed="sheetOpened = false">
            <f7-toolbar class="pink">
                <div class="left"></div>
                <div class="right">
                    <f7-link sheet-close>Cerrar</f7-link>
                </div>
            </f7-toolbar>
            <!-- Scrollable sheet content -->
            <f7-page-content>
                <f7-block>
                    <h3>Enviar a:</h3>
                    <f7-input
                            type="email"
                            placeholder="Email"
                            :value="sendToEmail"
                            @input="sendToEmail = $event.target.value">
                    </f7-input>
                    <br>
                    <f7-button large raised fill class="pink" @click="shareByEmail()"
                               sheet-close>ENVIAR
                    </f7-button>
                </f7-block>
            </f7-page-content>
        </f7-sheet>

    </f7-page>

</template>

<script>
    import axios from 'axios';
    import {
        API_PATH, USER_IMAGES_PATH
    } from '../../config.js';

    export default {
        name: 'DiagnosticTestsDetails',
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
                sendToEmail: null,
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
                .get(API_PATH + 'diagnostic-tests/' + this.id, {
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
                    if (this.details.image !== '' && this.details.image !== null) {
                        this.imagepath = USER_IMAGES_PATH + this.details.image;
                    }
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
                        .get(API_PATH + 'diagnostic-tests/replicate/' + this.id, {
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
                            this.$store.dispatch('incrementDocumentCounting', 'diagnostic_tests');

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
                        .delete(API_PATH + 'diagnostic-tests/' + this.id, {
                            params: {
                                // device_code: sessionStorage.device_code,
                                // user_id: sessionStorage.user_id
                            }
                        })
                        .then(response => {
                            if (response.data.result === 'OK') {
                                // Incrementing counting state
                                this.$store.dispatch('decrementDocumentCounting', 'diagnostic_tests');

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
                                    this.$f7router.navigate('/diagnostic-tests');
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
            openShareSheet() {
                this.$refs.share_sheet.open();
            },
            shareByEmail() {
                axios.post(API_PATH + 'diagnostic-tests/share-by-email', {
                    /*params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                        // TODO: encriptar las credenciales?
                    },*/
                    email: this.sendToEmail,
                    id: this.record_id,
                })
                    .then((response) => {
                        let notification = this.$f7.toast.create({
                            position: 'top',
                            text: '¡Registro enviado!',
                            cssClass: "success",
                            icon: '<i class="icon material-icons">done</i>',
                            closeTimeout: 2000
                        });
                        notification.open();
                    })
                    .catch(function (error) {
                        //console.log(error);
                    });
            }
        }
    };
</script>

<style>
    .pink-page .navbar, .pink-page .toolbar {
        background-color: #FF3183;
    }
</style>
