<template>
    <f7-page>
        <f7-navbar title="CREAR PRUEBA DIAGNÓSTICA" back-link="Volver"></f7-navbar>
        <f7-block inner>
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

                <!-- Date -->

                <!-- Time -->

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

            <f7-button>NUEVO CAMPO PERSONALIZADO</f7-button>

            <br>
            <br>

            <!-- Cancel & Submit -->
            <f7-segmented round raised>
                <f7-button round @click="cancel()">Cancelar</f7-button>
                <f7-button round @click="insert()">Guardar</f7-button>
            </f7-segmented>

        </f7-block>
    </f7-page>
</template>
<script>
    import axios from 'axios';
    import {mapGetters} from 'vuex';

    export default {
        name: 'DiagnosticTestsInsert',
        props: [],
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
                axios.post('http://patbookapi.local/api/diagnostic-tests', {
                    /*params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                        // TODO: encriptar las credenciales?
                    },*/
                    user_id: this.getUserID,
                    name: this.name,
                    test: this.name,
                    date: this.name,
                    time: this.name,
                    cause: this.name,
                    requirements: this.name,
                    location: this.name,
                    address: this.name,
                    phone: this.name,
                    doctor: this.name,
                    results: this.name,
                    schema: this.schema
                })
                    .then((response) => {
                        console.log(response);
                        this.$f7router.navigate('/diagnostic-tests');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted() {
            //
        }
    };
</script>

<style scoped>
    .navbar {
        background-color: #FF3183;
    }
</style>
