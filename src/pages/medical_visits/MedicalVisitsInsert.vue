<template>
    <f7-page>
        <f7-navbar title="VISITA MÉDICA" back-link="Volver"></f7-navbar>
        <f7-block inner>

            <f7-card title="REGISTRO DE VISITA MÉDICA">
                <f7-list>

                    <!-- DESCRIPTION -->
                    <f7-list-item>
                        <f7-label>Descripción</f7-label>
                        <f7-input
                                type="textarea"
                                :value="description"
                                @input="description = $event.target.value"
                        ></f7-input>
                    </f7-list-item>

                    <!-- DOCTOR -->
                    <f7-list-item>
                        <f7-label>Médico</f7-label>
                        <f7-input
                                type="text"
                                :value="doctor"
                                @input="doctor = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

                    <!-- LOCATION -->
                    <f7-list-item>
                        <f7-label>Centro</f7-label>
                        <f7-input
                                type="text"
                                :value="location"
                                @input="location = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

                    <!-- ADDRESS -->
                    <f7-list-item>
                        <f7-label>Dirección</f7-label>
                        <f7-input
                                type="text"
                                :value="address"
                                @input="address = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

                    <!-- PHONE -->
                    <f7-list-item>
                        <f7-label>Teléfono</f7-label>
                        <f7-input
                                type="text"
                                :value="phone"
                                @input="phone = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

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

                    <!-- CAUSE -->
                    <f7-list-item>
                        <f7-label>Motivo</f7-label>
                        <f7-input
                                type="text"
                                :value="cause"
                                @input="cause = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

                    <!-- CONTRIBUTED -->
                    <f7-list-item>
                        <f7-label>Pruebas e informes aportados</f7-label>
                        <f7-input
                                type="textarea"
                                :value="contributed"
                                @input="contributed = $event.target.value"
                        ></f7-input>
                    </f7-list-item>

                    <!-- PRESCRIPTION -->
                    <f7-list-item>
                        <f7-label>Prescripción - Medicación</f7-label>
                        <f7-input
                                type="text"
                                :value="prescription"
                                @input="prescription = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

                    <!-- TREATMENT -->
                    <f7-list-item>
                        <f7-label>Prescripción - Tratamiento</f7-label>
                        <f7-input
                                type="textarea"
                                :value="treatment"
                                @input="treatment = $event.target.value"
                        ></f7-input>
                    </f7-list-item>

                    <!-- DIAGNOSTIC TESTS -->
                    <f7-list-item>
                        <f7-label>Prescripción - Pruebas diagnósticas</f7-label>
                        <f7-input
                                type="text"
                                :value="diagnostic_tests"
                                @input="diagnostic_tests = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

                    <!-- RECOMENDATIONS -->
                    <f7-list-item>
                        <f7-label>Recomendaciones</f7-label>
                        <f7-input
                                type="textarea"
                                :value="recomendations"
                                @input="recomendations = $event.target.value"
                        ></f7-input>
                    </f7-list-item>

                    <!-- DIAGNOSTIC -->
                    <f7-list-item>
                        <f7-label>Diagnóstico</f7-label>
                        <f7-input
                                type="text"
                                :value="diagnostic"
                                @input="diagnostic = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

                    <!-- DISEASE -->
                    <f7-list-item>
                        <f7-label>Enfermedad</f7-label>
                        <f7-input
                                type="text"
                                :value="disease"
                                @input="disease = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

                    <!-- COMMENTS -->
                    <f7-list-item>
                        <f7-label>Comentarios</f7-label>
                        <f7-input
                                type="textarea"
                                :value="comments"
                                @input="comments = $event.target.value"
                        ></f7-input>
                    </f7-list-item>

                    <!-- Next visit Date & Time -->
                    <f7-list-item>
                        <f7-label>Próxima visita</f7-label>
                        <f7-row>
                            <f7-col>
                                <f7-input
                                        type="date"
                                        :value="nex_visit_date"
                                        @input="nex_visit_date = $event.target.value"
                                        clear-button></f7-input>
                            </f7-col>
                            <f7-col>
                                <f7-input
                                        type="time"
                                        :value="next_visit_time"
                                        @input="next_visit_time = $event.target.value"
                                        clear-button></f7-input>
                            </f7-col>
                        </f7-row>
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
                <f7-button round @click="cancel()">Cancelar</f7-button>
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
        name: 'MedicalVisitsInsert',
        components: {
            'create-custom-field': CreateCustomField
        },
        data() {
            return {
                specialityList: ['Alergología', 'Anestesiología y reanimación', 'Cardiología', 'Endocrinología', 'Gastroenterología', 'Geriatría', 'Ginecología', '...'],
                description: '',
                doctor: '',
                location: '',
                address: '',
                phone: '',
                speciality: '',
                date: '',
                time: '',
                cause: '',
                contributed: '',
                prescription: '',
                treatment: '',
                diagnostic_tests: '',
                recomendations: '',
                diagnostic: '',
                disease: '',
                comments: '',
                nex_visit_date: '',
                next_visit_time: '',
                schema: []
            };
        },
        computed: mapGetters(['getUserID']),
        methods: {
            insert() {
                axios.post(API_PATH + 'medical-visits', {
                    /*params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                        // TODO: encriptar las credenciales?
                    },*/
                    user_id: this.getUserID,
                    description: this.description,
                    doctor: this.doctor,
                    location: this.location,
                    address: this.address,
                    phone: this.phone,
                    speciality: this.speciality,
                    date: this.date,
                    time: this.time,
                    cause: this.cause,
                    contributed: this.contributed,
                    prescription: this.prescription,
                    treatment: this.treatment,
                    diagnostic_tests: this.diagnostic_tests,
                    recomendations: this.recomendations,
                    diagnostic: this.diagnostic,
                    disease: this.disease,
                    comments: this.comments,
                    nex_visit_date: this.nex_visit_date,
                    next_visit_time: this.next_visit_time,
                    schema: JSON.stringify(this.schema)
                })
                    .then((response) => {
                        // Incrementing counting state
                        this.$store.dispatch('incrementDocumentCounting', 'medical_visits');
                        // Returning to list
                        this.$f7router.navigate('/medical-visits');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            cancel() {
                this.$f7Router.navigate('/medical-visits');
            }
        }
    };
</script>

<style scoped>
    .navbar {
        background-color: #FF7E3A;
    }
</style>
