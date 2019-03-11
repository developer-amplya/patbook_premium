<template>
    <f7-page>
        <f7-navbar title="PRUEBAS DIAGNÓSTICAS" back-link="Volver"></f7-navbar>
        <f7-block inner>


            <f7-card title="REGISTRO DE PRUEBA DIAGNÓSTICA">
                <f7-list>
                    <!-- Name -->
                    <f7-list-item>
                        <f7-label>Nombre de la prueba</f7-label>
                        <f7-input
                                type="text"
                                :value="name"
                                @input="name = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

                    <!-- Test -->
                    <f7-list-item smart-select title="Prueba" :smart-select-params="{ closeOnSelect: true }">
                        <select :name="test" v-model="test">
                            <option v-for="(item, index) in testsList"
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

                    <!-- Cause -->
                    <f7-list-item>
                        <f7-label>Motivo</f7-label>
                        <f7-input
                                type="text"
                                :value="cause"
                                @input="cause = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

                    <!-- Requirements -->
                    <f7-list-item>
                        <f7-label>Requisitos previos</f7-label>
                        <f7-input
                                type="text"
                                :value="requirements"
                                @input="requirements = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

                    <!-- Location -->
                    <f7-list-item>
                        <f7-label>Lugar</f7-label>
                        <f7-input
                                type="text"
                                :value="location"
                                @input="location = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

                    <!-- Address -->
                    <f7-list-item>
                        <f7-label>Dirección</f7-label>
                        <f7-input
                                type="text"
                                :value="address"
                                @input="address = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

                    <!-- Phone -->
                    <f7-list-item>
                        <f7-label>Teléfono</f7-label>
                        <f7-input
                                type="text"
                                :value="phone"
                                @input="phone = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

                    <!-- Doctor -->
                    <f7-list-item>
                        <f7-label>Médico</f7-label>
                        <f7-input
                                type="text"
                                :value="doctor"
                                @input="doctor = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>
                </f7-list>
            </f7-card>

            <f7-card title="RESULTADOS">
                <f7-list>
                    <!-- Results -->
                    <f7-list-item>
                        <f7-label>Resultados</f7-label>
                        <f7-input
                                type="textarea"
                                :value="results"
                                @input="results = $event.target.value"
                        ></f7-input>
                    </f7-list-item>

                    <!-- Image -->
                </f7-list>
            </f7-card>

            <f7-card title="CAMPOS PERSONALIZADOS">
                <f7-list>
                    <!-- SCHEMA -->
                    <f7-list-item v-for="(field, index) in schema"
                                  :key="index">
                        <f7-label>{{ field.label }}</f7-label>
                        <f7-input
                                :type="field.fieldType"
                                :title="field.name"
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
        name: 'DiagnosticTestsInsert',
        components: {
            'create-custom-field': CreateCustomField
        },
        data() {
            return {
                testsList: ['Análisis de sangre', 'Análisis de orina', 'Endoscopia', 'Mamografía', 'Rayos X', 'TAC', 'PET', 'Colonoscopia', 'Densiometría ósea', 'IRM', 'ECG', 'EEF', 'Ultrasonido', 'Espirometría', 'Otros'],
                name: '',
                test: '',
                date: '',
                time: '',
                cause: '',
                requirements: '',
                location: '',
                address: '',
                phone: '',
                doctor: '',
                results: '',
                schema: []
            };
        },
        computed: mapGetters(['getUserID']),
        methods: {
            insert() {
                axios.post(API_PATH + 'diagnostic-tests', {
                    /*params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                        // TODO: encriptar las credenciales?
                    },*/
                    user_id: this.getUserID,
                    name: this.name,
                    test: this.test,
                    date: this.date,
                    time: this.time,
                    cause: this.cause,
                    requirements: this.requirements,
                    location: this.location,
                    address: this.address,
                    phone: this.phone,
                    doctor: this.doctor,
                    results: this.results,
                    schema: JSON.stringify(this.schema)
                })
                    .then((response) => {
                        // Incrementing counting state
                        this.$store.dispatch('incrementDocumentCounting', 'diagnostic_tests');
                        // Returning to list
                        this.$f7router.navigate('/diagnostic-tests');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            cancel() {
                this.$f7Router.navigate('/diagnostic-tests');
            }
        }
    };
</script>

<style scoped>
    .navbar {
        background-color: #FF3183;
    }
</style>
