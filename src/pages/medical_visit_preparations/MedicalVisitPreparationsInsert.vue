<template>
    <f7-page>
        <f7-navbar title="PREPARACIÓN VISITA MÉDICA" back-link="Volver"></f7-navbar>
        <f7-block inner>

            <f7-card title="REGISTRO DE SÍNTOMAS">
                <f7-list><!-- Symptoms description -->
                    <f7-list-item>
                        <f7-label>Descripción de los síntomas</f7-label>
                        <f7-input
                                type="textarea"
                                :value="symptoms_description"
                                @input="symptoms_description = $event.target.value"
                        ></f7-input>
                    </f7-list-item>

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
                    <f7-list-item>
                        <f7-label>Frecuencia</f7-label>
                        <f7-input
                                type="text"
                                :value="frequency"
                                @input="frequency = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

                    <!-- Date & Time -->
                    <f7-list-item>
                        <f7-label>Fecha / Hora</f7-label>
                        <f7-row>
                            <f7-col>
                                <f7-input
                                        type="date"
                                        :value="date"
                                        @input="date = $event.target.value"
                                        clear-button></f7-input>
                            </f7-col>
                            <f7-col>
                                <f7-input
                                        type="time"
                                        :value="time"
                                        @input="time = $event.target.value"
                                        clear-button></f7-input>
                            </f7-col>
                        </f7-row>
                    </f7-list-item>

                    <!-- Actions -->
                    <f7-list-item>
                        <f7-label>Acciones preventivas</f7-label>
                        <f7-input
                                type="textarea"
                                :value="actions"
                                @input="actions = $event.target.value"
                        ></f7-input>
                    </f7-list-item>

                    <!-- Notes -->
                    <f7-list-item>
                        <f7-label>Notas</f7-label>
                        <f7-input
                                type="textarea"
                                :value="notes"
                                @input="notes = $event.target.value"
                        ></f7-input>
                    </f7-list-item>
                </f7-list>
            </f7-card>

            <f7-card title="PREGUNTAS AL MÉDICO">
                <f7-list>
                    <!-- Doctor -->
                    <f7-list-item>
                        <f7-label>Médico</f7-label>
                        <f7-input
                                type="text"
                                :value="doctor"
                                @input="doctor = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

                    <!-- Questions -->
                    <f7-list-item>
                        <f7-label>Preguntas</f7-label>
                        <f7-input
                                type="textarea"
                                :value="questions"
                                @input="questions = $event.target.value"
                        ></f7-input>
                    </f7-list-item>
                </f7-list>
            </f7-card>

            <f7-card title="CAMPOS PERSONALIZADOS">
                <f7-list>
                    <!-- SCHEMA -->
                    <f7-list-item v-for="(field, index) in schema"
                                  :key="index">
                        <f7-label>{{ field.label }}</f7-label>
                        <f7-input
                                :type="field.type"
                                :value="field.value"
                                @input="field.value = $event.target.value"
                        ></f7-input>
                    </f7-list-item>
                </f7-list>

                <f7-button popup-open=".custom-field">NUEVO CAMPO PERSONALIZADO</f7-button>
            </f7-card>

            <br>
            <br>

            <!-- Cancel & Submit -->
            <f7-segmented round raised>
                <f7-button round @click="insert()">Guardar</f7-button>
            </f7-segmented>

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
        API_PATH
    } from '../../config.js';
    import {mapGetters} from 'vuex';
    import CreateCustomField from '../../form_elements/CreateCustomField';

    export default {
        name: 'MedicalVisitsPreparationInsert',
        components: {
            'create-custom-field': CreateCustomField
        },
        data() {
            return {
                intensityList: ['Leve', 'Moderada', 'Severa'],
                symptoms_description: '',
                intensity: '',
                frequency: '',
                date: '',
                time: '',
                actions: '',
                notes: '',
                doctor: '',
                questions: '',
                schema: []
            };
        },
        computed: mapGetters(['getUserID']),
        methods: {
            insert() {
                axios.post(API_PATH + 'medical-visit-preparations', {
                    /*params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                        // TODO: encriptar las credenciales?
                    },*/
                    user_id: this.getUserID,
                    symptoms_description: this.symptoms_description,
                    intensity: this.intensity,
                    frequency: this.frequency,
                    date: this.date,
                    time: this.time,
                    actions: this.actions,
                    notes: this.notes,
                    doctor: this.doctor,
                    questions: this.questions,
                    schema: JSON.stringify(this.schema)
                })
                    .then((response) => {
                        // Incrementing counting state
                        this.$store.dispatch('incrementDocumentCounting', 'medical_visit_preparations');
                        // Returning to list
                        this.$f7router.navigate('/medical-visit-preparations');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            cancel() {
                this.$f7Router.navigate('/medical-visit-preparations');
            }
        }
    };
</script>

<style scoped>
    .navbar {
        background-color: #6F715E;
    }
</style>
