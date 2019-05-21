<template>

    <f7-page>
        <f7-navbar title="PREPARACIÓN VISITA MÉDICA" back-link="Volver"></f7-navbar>
        <f7-block inner>

            <f7-card title="REGISTRO DE SÍNTOMAS">
                <f7-list>
                    <!-- Symptoms description -->
                    <f7-list-input
                            type="textarea"
                            label="Descripción de los síntomas"
                            :value="symptoms_description"
                            @input="symptoms_description = $event.target.value"
                    >
                    </f7-list-input>

                    <!-- Intensity -->
                    <f7-list-item smart-select title="Intensidad" :smart-select-params="{ closeOnSelect: true }">
                        <select :name="intensity" v-model="intensity">
                            <option v-for="(item, index) in intensityList"
                                    :key="index"
                                    :value="item"
                            >{{ item }}
                            </option>
                        </select>
                    </f7-list-item>

                    <!-- Frequency -->
                    <f7-list-input
                            type="text"
                            label="Frecuencia"
                            :value="frequency"
                            @input="frequency = $event.target.value">
                    </f7-list-input>

                    <!-- Date & Time -->
                    <f7-list-item>
                        <f7-row>
                            <f7-col>
                                <calendar
                                        id="medical_visit_preparation_date"
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

                    <!-- Actions -->
                    <f7-list-input
                            type="textarea"
                            label="Acciones preventivas"
                            :value="actions"
                            @input="actions = $event.target.value"
                    >
                    </f7-list-input>

                    <!-- Notes -->
                    <f7-list-input
                            type="textarea"
                            label="Notas"
                            :value="notes"
                            @input="notes = $event.target.value"
                    >
                    </f7-list-input>

                    <!-- Image -->
                    <f7-list-item title="Imagen"></f7-list-item>
                    <f7-list-item>
                        <image-selector @image_selected="setImageURI"></image-selector>
                    </f7-list-item>
                </f7-list>
            </f7-card>

            <br>

            <f7-card title="PREGUNTAS AL MÉDICO">
                <f7-list>
                    <!-- Doctor -->
                    <f7-list-input
                            type="text"
                            label="Médico"
                            :value="doctor"
                            @input="doctor = $event.target.value">
                    </f7-list-input>

                    <!-- Questions -->
                    <f7-list-input
                            type="textarea"
                            label="Preguntas"
                            :value="questions"
                            @input="questions = $event.target.value">
                    </f7-list-input>
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
            <f7-button large raised fill class="stone" @click="insert()">Guardar</f7-button>

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
        name: 'MedicalVisitPreparationsEdit',
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
                .get(API_PATH + 'medical-visit-preparations/' + this.id, {
                    params: {
                        // device_code: sessionStorage.device_code,
                        // user_id: sessionStorage.user_id
                    }
                })
                .then(response => {
                    this.details = response.data;
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
        background-color: #6F715E;
    }
</style>
