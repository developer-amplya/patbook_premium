<template>
    <f7-page>
        <f7-navbar title="CREAR VISITA MÉDICA" back-link="Volver"></f7-navbar>
        <f7-block inner>
            <f7-list>

                <!-- NAME -->
                <f7-list-item>
                    <f7-label>Nombre</f7-label>
                    <f7-input
                            type="text"
                            :value="name"
                            @input="name = $event.target.value"
                            clear-button></f7-input>
                </f7-list-item>

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

                <!-- DATE -->

                <!-- TIME -->

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

                <!-- NEXT VISIT DATE -->

                <!-- NEXT VISIT TIME -->

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
        name: 'MedicalVisitsInsert',
        props: [],
        data() {
            return {
                specialityList: ['Alergología', 'Anestesiología y reanimación', 'Cardiología', 'Endocrinología', 'Gastroenterología', 'Geriatría', 'Ginecología', '...'],
                name: '',
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
                axios.post('http://patbookapi.local/api/medical-visits', {
                    /*params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                        // TODO: encriptar las credenciales?
                    },*/
                    user_id: this.getUserID,
                    name: this.name,
                    description: this.name,
                    doctor: this.name,
                    location: this.name,
                    address: this.name,
                    phone: this.name,
                    speciality: this.name,
                    date: this.name,
                    time: this.name,
                    cause: this.name,
                    contributed: this.name,
                    prescription: this.name,
                    treatment: this.name,
                    diagnostic_tests: this.name,
                    recomendations: this.name,
                    diagnostic: this.name,
                    disease: this.name,
                    comments: this.name,
                    nex_visit_date: this.name,
                    next_visit_time: this.name,
                    schema: this.schema
                })
                    .then((response) => {
                        console.log(response);
                        this.$f7router.navigate('/medical-visits');
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
        background-color: #FF7E3A;
    }
</style>
