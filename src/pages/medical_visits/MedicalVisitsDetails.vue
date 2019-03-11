<template>

    <f7-page>

        <f7-navbar title="VISITA MÉDICA" back-link="Volver"></f7-navbar>

        <f7-block inner>

            <f7-list media-list>

                <!-- NAME -->
                <f7-list-item header="Nombre"
                              v-if="!edit_name"
                              @click="openEdit($event, details.name, 'edit_name')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.name }}</span>
                </f7-list-item>

                <!-- DESCRIPTION -->
                <f7-list-item header="Descripción"
                              v-if="!edit_description"
                              @click="openEdit($event, details.description, 'edit_description')"
                              resizable>
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.description }}</span>
                </f7-list-item>

                <!-- DOCTOR -->

                <!-- LOCATION -->
                <f7-list-item header="Lugar"
                              v-if="!edit_location"
                              @click="openEdit($event, details.location, 'edit_location')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.location }}</span>
                </f7-list-item>

                <!-- ADDRESS -->
                <f7-list-item header="Dirección"
                              v-if="!edit_address"
                              @click="openEdit($event, details.address, 'edit_address')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.address }}</span>
                </f7-list-item>

                <!-- PHONE -->
                <f7-list-item header="Teléfono"
                              v-if="!edit_phone"
                              @click="openEdit($event, details.phone, 'edit_phone')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.phone }}</span>
                </f7-list-item>

                <!-- SPECIALITY -->
                <f7-list-item header="Especialidad"
                              v-if="!edit_speciality"
                              @click="openEdit($event, details.speciality, 'edit_speciality')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.speciality }}</span>
                </f7-list-item>

                <!-- DATE -->
                <f7-list-item header="Fecha"
                              v-if="!edit_date"
                              @click="openEdit($event, details.date, 'edit_date')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.date }}</span>
                </f7-list-item>

                <!-- TIME -->
                <f7-list-item header="Hora"
                              v-if="!edit_time"
                              @click="openEdit($event, details.time, 'edit_time')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.time }}</span>
                </f7-list-item>

                <!-- CAUSE -->
                <f7-list-item header="Motivo"
                              v-if="!edit_cause"
                              @click="openEdit($event, details.cause, 'edit_cause')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.cause }}</span>
                </f7-list-item>

                <!-- CONTRIBUTED -->
                <f7-list-item header="Pruebas e informes aportados"
                              v-if="!edit_contributed"
                              @click="openEdit($event, details.contributed, 'edit_contributed')"
                              resizable>
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.contributed }}</span>
                </f7-list-item>

                <!-- PRESCRIPTION -->
                <f7-list-item header="Prescripción - Medicación"
                              v-if="!edit_prescription"
                              @click="openEdit($event, details.prescription, 'edit_prescription')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.prescription }}</span>
                </f7-list-item>

                <!-- TREATMENT -->
                <f7-list-item header="Prescripción - Tratamiento"
                              v-if="!edit_treatment"
                              @click="openEdit($event, details.treatment, 'edit_treatment')"
                              resizable>
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.treatment }}</span>
                </f7-list-item>

                <!-- DIAGNOSTIC TESTS -->
                <f7-list-item header="Prescripción - Pruebas diagnósticas"
                              v-if="!edit_diagnostic_tests"
                              @click="openEdit($event, details.diagnostic_tests, 'edit_diagnostic_tests')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.diagnostic_tests }}</span>
                </f7-list-item>

                <!-- RECOMENDATIONS -->
                <f7-list-item header="Recomendaciones"
                              v-if="!edit_recomendations"
                              @click="openEdit($event, details.recomendations, 'edit_recomendations')"
                              resizable>
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.recomendations }}</span>
                </f7-list-item>


                <!-- DIAGNOSTIC -->
                <f7-list-item header="Diagnóstico"
                              v-if="!edit_diagnostic"
                              @click="openEdit($event, details.diagnostic, 'edit_diagnostic')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.diagnostic }}</span>
                </f7-list-item>

                <!-- DISEASE -->
                <f7-list-item header="Enfermedad"
                              v-if="!edit_disease"
                              @click="openEdit($event, details.disease, 'edit_disease')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.disease }}</span>
                </f7-list-item>

                <!-- COMMENTS -->
                <f7-list-item header="Comentarios"
                              v-if="!edit_comments"
                              @click="openEdit($event, details.comments, 'edit_comments')"
                              resizable>
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.comments }}</span>
                </f7-list-item>

                <!-- NEXT VISIT DATE -->
                <f7-list-item header="Fecha de la próxima visita"
                              v-if="!edit_date"
                              @click="openEdit($event, details.date, 'edit_date')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.date }}</span>
                </f7-list-item>

                <!-- NEXT VISIT TIME -->
                <f7-list-item header="Hora de la próxima visita"
                              v-if="!edit_time"
                              @click="openEdit($event, details.time, 'edit_time')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.time }}</span>
                </f7-list-item>
            </f7-list>
            </f7-card>

            <f7-card title="CAMPOS PERSONALIZADOS">
                <f7-list media-list>
                    <!-- Schema -->
                    <f7-list-item v-for="(field, index) in schema"
                                  :key="index"
                                  :header="field.label"
                                  @click="openEditSchema($event, index, field)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ field.value }}</span>
                    </f7-list-item>

                </f7-list>
            </f7-card>

        </f7-block>

    </f7-page>

</template>

<script>
    import axios from 'axios';
    import {
        API_PATH
    } from '../../config.js';
    import SelectList from '../../form_elements/SelectList';
    import TextInput from '../../form_elements/TextInput';

    export default {
        name: 'MedicalVisitsDetails',
        components: {
            SelectList,
            TextInput
        },
        props: [
            'id'
        ],
        data() {
            return {
                field: {
                    type: '',
                    label: '',
                    name: '',
                    value: '',
                    isSchema: false
                },
                details: [],
                specialityList: ['Alimentaria', 'Ambiental', 'Estacional', 'Medicamentos', 'Química', 'Otras'],
                schema: [],
                edit_name: false,
                edit_description: false,
                edit_doctor: false,
                edit_location: false,
                edit_address: false,
                edit_phone: false,
                edit_speciality: false,
                edit_date: false,
                edit_time: false,
                edit_cause: false,
                edit_contributed: false,
                edit_prescription: false,
                edit_treatment: false,
                edit_diagnostic_tests: false,
                edit_recomendations: false,
                edit_diagnostic: false,
                edit_disease: false,
                edit_comments: false,
                edit_nex_visit_date: false,
                edit_next_visit_time: false,
                before_editing: ''
            };
        },
        methods: {
            openEdit(event, param, param2) {
                this.before_editing = param;
                this[param2] = true;
            },
            cancelEdit(event, param, param2) {
                this.details[param] = this.before_editing
                this.before_editing = '';
                this[param2] = false;
            },
            openEditSchema(event, index) {
                console.log(index);
                this.before_editing = this.schema[index].value;
                this.schema[index].is_editing = true;
            },
            cancelEditSchema(event, index) {
                this.schema[index].value = this.before_editing
                this.before_editing = '';
                this.schema[index].is_editing = false;
            },
            updateInfo(event, param, param2) {

                /* We need to create first an object an then to assign the key name as an array key, because assigning
                 dynamic key names in an object does not work */
                let data = {};
                data[param] = this.details[param];

                /* axios.put('http://patbookapi.local/api/allergies/' + this.id, {
                    params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                    },
                    data: data
                }) */

                axios({
                    method: 'PUT',
                    url: API_PATH + 'medical-visits/' + this.id,
                    params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                    },
                    data: data
                })
                    .then((response) => {
                        console.log(response);
                        // TODO: confirm the update is OK
                        this[param2] = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            updateInfoSchema(index) {
                this.schema[index].is_editing = false;
                axios.put(API_PATH + 'medical-visits/' + this.id, {
                    params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                    },
                    schema: JSON.stringify(this.schema)
                })
                    .then((response) => {
                        console.log(response);
                        // TODO: confirm the update is OK
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
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
                    this.selectedType = this.details.type;
                    this.selectedDegree = this.details.degree;
                    this.schema = JSON.parse(response.data.schema);
                });
        }
    }
    ;
</script>

<style scoped>

    .invisible {
        display: none;
    }

    .md .list .item-header {
        padding-left: 39px !important;
    }

    li i.icon {
        /*position: absolute;
        left: 15px;
        top: 20px;*/
        color: #9a9a9a !important;
        background: #eeeeee;
        padding: 5px;
        border-radius: 50%;
        opacity: .65;
    }

    li span {
        position: relative;
        z-index: 10;
    }

    .navbar {
        background-color: #FF7E3A;
    }
</style>
