<template>

    <f7-page hide-toolbar-on-scroll>

        <f7-navbar back-link title="VISITA MÉDICA">
            <f7-nav-right>
                <span class="navbar-icon-right">
                    <a :href="'/medical-visits/edit/' + id"><img src="../../assets/ic_mode_edit_white_24dp.png"></a>
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

            <f7-card title="REGISTRO DE VISITA MÉDICA">
                <f7-list media-list>

                    <!-- Description -->
                    <f7-list-item header="Descripción">
                        <span>{{ details.description }}</span>
                    </f7-list-item>

                    <!-- Doctor -->
                    <f7-list-item header="Médico">
                        <span>{{ details.doctor }}</span>
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

                    <!-- SPECIALITY -->
                    <f7-list-item header="Especialidad">
                        <span>{{ details.speciality }}</span>
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

                    <!-- CONTRIBUTED -->
                    <f7-list-item header="Pruebas e informes aportados">
                        <span>{{ details.contributed }}</span>
                    </f7-list-item>

                    <!-- PRESCRIPTION -->
                    <f7-list-item header="Prescripción - Medicación">
                        <span>{{ details.prescription }}</span>
                    </f7-list-item>

                    <!-- TREATMENT -->
                    <f7-list-item header="Prescripción - Tratamiento">
                        <span>{{ details.treatment }}</span>
                    </f7-list-item>

                    <!-- DIAGNOSTIC TESTS -->
                    <f7-list-item header="Prescripción - Pruebas diagnósticas">
                        <span>{{ details.diagnostic_tests }}</span>
                    </f7-list-item>

                    <!-- RECOMENDATIONS -->
                    <f7-list-item header="Recomendaciones">
                        <span>{{ details.recomendations }}</span>
                    </f7-list-item>


                    <!-- DIAGNOSTIC -->
                    <f7-list-item header="Diagnóstico">
                        <span>{{ details.diagnostic }}</span>
                    </f7-list-item>

                    <!-- DISEASE -->
                    <f7-list-item header="Enfermedad">
                        <span>{{ details.disease }}</span>
                    </f7-list-item>

                    <!-- COMMENTS -->
                    <f7-list-item header="Comentarios">
                        <span>{{ details.comments }}</span>
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

                    <!-- Date -->
                    <f7-list-item header="Fecha">
                        <span>{{ transformDate(details.nex_visit_date) }}</span>
                    </f7-list-item>

                    <!-- Time -->
                    <f7-list-item header="Hora">
                        <span>{{ transformDate(details.next_visit_time) }}</span>
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
            <f7-link @click="deleteRecord"><f7-icon material="delete"></f7-icon></f7-link>
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
        name: 'MedicalVisitsDetails',
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
            axios
                .get(API_PATH + 'medical-visits/' + this.id, {
                    params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                    }
                })
                .then(response => {
                    this.details = response.data;
                    if(response.data.schema !== "[]") {
                        this.there_is_schema = true;
                        this.schema = JSON.parse(response.data.schema);
                    }

                    // Check the image
                    if (this.details.image !== null) {
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
                        .get(API_PATH + 'medical-visits/replicate/' + this.id, {
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
                            this.$store.dispatch('incrementDocumentCounting', 'medical_visits');

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
                        .delete(API_PATH + 'medical-visits/' + this.id, {
                            params: {
                                // device_code: sessionStorage.device_code,
                                // user_id: sessionStorage.user_id
                            }
                        })
                        .then(response => {
                            if (response.data.result === 'OK') {
                                // Incrementing counting state
                                this.$store.dispatch('decrementDocumentCounting', 'medical_visits');

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
                                    this.$f7router.navigate('/medical-visits');
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
    }
    ;
</script>

<style scoped>
    .copy-msg {
        text-align: center;
    }

    .navbar, .toolbar {
        background-color: #FF7E3A;
    }

    .image-holder img {
        width: 100%;
    }

    .zoom-in {
        display: block;
        position: absolute;
        right: 10px;
        top: 5px
    }
</style>
