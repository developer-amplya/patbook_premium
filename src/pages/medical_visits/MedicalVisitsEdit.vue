<template>

    <f7-page>
        <f7-navbar title="VISITA MÉDICA" back-link="Volver"></f7-navbar>
        <f7-block inner>

            <f7-card title="REGISTRO DE VISITA MÉDICA">
                <f7-list>

                    <!-- DESCRIPTION -->
                    <f7-list-input
                            type="textarea"
                            label="Descripción"
                            :value="description"
                            @input="description = $event.target.value">
                    </f7-list-input>

                    <!-- DOCTOR -->
                    <f7-list-input
                            type="text"
                            label="Médico"
                            :value="doctor"
                            @input="doctor = $event.target.value">
                    </f7-list-input>

                    <!-- LOCATION -->
                    <f7-list-input
                            type="text"
                            label="Centro"
                            :value="location"
                            @input="location = $event.target.value"
                            clear-button>
                    </f7-list-input>

                    <!-- ADDRESS -->
                    <f7-list-input
                            type="text"
                            label="Dirección"
                            :value="address"
                            @input="address = $event.target.value"
                            clear-button>
                    </f7-list-input>

                    <!-- PHONE -->
                    <f7-list-input
                            type="text"
                            label="Teléfono"
                            :value="phone"
                            @input="phone = $event.target.value"
                            clear-button>
                    </f7-list-input>

                    <!-- SPECIALITY -->
                    <f7-list-item smart-select title="Especialidad" :smart-select-params="{ closeOnSelect: true }">
                        <select :name="speciality" v-model="speciality">
                            <option v-for="(item, index) in specialityList"
                                    :key="index"
                                    :value="item"
                            >{{ item }}
                            </option>
                        </select>
                    </f7-list-item>

                    <!-- Date & Time -->
                    <f7-list-item>
                        <f7-row>
                            <f7-col>
                                <calendar
                                        id="medical_visit_date"
                                        label="Fecha"
                                        @change="date = setDate($event)">
                                </calendar>
                            </f7-col>
                            <f7-col>
                                <f7-list-input
                                        type="time"
                                        label="Hora"
                                        :value="time"
                                        @input="time = $event.target.value"
                                ></f7-list-input>
                            </f7-col>
                        </f7-row>
                    </f7-list-item>

                    <!-- Cause -->
                    <f7-list-input
                            type="text"
                            label="Motivo"
                            :value="cause"
                            @input="cause = $event.target.value">
                    </f7-list-input>

                    <!-- CONTRIBUTED -->
                    <f7-list-input
                            type="textarea"
                            label="Pruebas e informes aportados"
                            :value="contributed"
                            @input="contributed = $event.target.value"
                    >
                    </f7-list-input>

                    <!-- PRESCRIPTION -->
                    <f7-list-input
                            type="text"
                            label="Prescripción - Medicación"
                            :value="prescription"
                            @input="prescription = $event.target.value">
                    </f7-list-input>

                    <!-- TREATMENT -->
                    <f7-list-input
                            type="textarea"
                            label="Prescripción - Tratamiento"
                            :value="treatment"
                            @input="treatment = $event.target.value"
                    >
                    </f7-list-input>

                    <!-- DIAGNOSTIC TESTS -->
                    <f7-list-input
                            type="text"
                            label="Prescripción - Pruebas diagnósticas"
                            :value="diagnostic_tests"
                            @input="diagnostic_tests = $event.target.value">
                    </f7-list-input>

                    <!-- RECOMENDATIONS -->
                    <f7-list-input
                            type="textarea"
                            label="Recomendaciones"
                            :value="recomendations"
                            @input="recomendations = $event.target.value"
                    >
                    </f7-list-input>

                    <!-- DIAGNOSTIC -->
                    <f7-list-input
                            type="text"
                            label="Diagnóstico"
                            :value="diagnostic"
                            @input="diagnostic = $event.target.value">
                    </f7-list-input>

                    <!-- DISEASE -->
                    <f7-list-input
                            type="text"
                            label="Enfermedad"
                            :value="disease"
                            @input="disease = $event.target.value">
                    </f7-list-input>

                    <!-- COMMENTS -->
                    <f7-list-input
                            type="textarea"
                            label="Comentarios"
                            :value="comments"
                            @input="comments = $event.target.value"
                    >
                    </f7-list-input>

                    <!-- Image -->
                    <f7-list-item title="Imagen"></f7-list-item>
                    <f7-list-item>
                        <image-selector @image_selected="setImageURI"></image-selector>
                    </f7-list-item>

                    <!-- Date & Time -->
                    <f7-list-item>
                        <f7-row>
                            <f7-col>
                                <calendar
                                        id="next_medical_visit_date"
                                        label="Fecha próx. visita"
                                        @change="nex_visit_date = setDate($event)">
                                </calendar>
                            </f7-col>
                            <f7-col>
                                <f7-list-input
                                        type="time"
                                        label="Hora"
                                        :value="next_visit_time"
                                        @input="next_visit_time = $event.target.value"
                                ></f7-list-input>
                            </f7-col>
                        </f7-row>
                    </f7-list-item>
                </f7-list>
            </f7-card>

            <br>

            <f7-card title="CAMPOS PERSONALIZADOS">
                <f7-list>
                    <!-- SCHEMA -->
                    <f7-list-input
                            v-for="(field, index) in schema"
                            :key="index"
                            :label="field.label"
                            :type="field.type"
                            :value="field.value"
                            @input="field.value = $event.target.value"
                    >
                    </f7-list-input>
                </f7-list>

                <f7-button popup-open=".custom-field">NUEVO CAMPO PERSONALIZADO</f7-button>
            </f7-card>

            <br>

            <!-- Submit -->
            <f7-button large raised fill class="orange" @click="insert()">Guardar</f7-button>

        </f7-block>

        <!-- Custom field popup -->
        <f7-popup class="custom-field">
            <create-custom-field :schema="schema"></create-custom-field>
        </f7-popup>

    </f7-page>

</template>

<script>
    import axios from 'axios';
    import {
        API_PATH, USER_IMAGES_PATH
    } from '../../config.js';
    import CreateCustomField from '../../form_elements/CreateCustomField';
    import ImageSelector from '../../form_elements/ImageSelector';
    import Calendar from '../../form_elements/Calendar';

    export default {
        name: 'MedicalVisitsEdit',
        components: {
            'image-selector': ImageSelector,
            'create-custom-field': CreateCustomField
        },
        props: [
            'record_id'
        ],
        data() {
            return {
                id: this.record_id,
                field: {
                    type: '',
                    label: '',
                    name: '',
                    value: ''
                },
                details: [],
                schema: [],
                schema_active_index: null
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
                    this.selectedType = this.details.type;
                    this.selectedDegree = this.details.degree;
                    this.schema = JSON.parse(response.data.schema);
                });
        },
        methods: {
            update() {
                //console.log('@update');
                if (this.field.name === 'schema') {
                    this.updateInfoSchema(this.schema_active_index);
                } else {
                    this.updateInfo();
                }
            },
        }
    }
    ;
</script>

<style scoped>
    .navbar, .toolbar {
        background-color: #FF7E3A;
    }
</style>
