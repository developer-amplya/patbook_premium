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
        API_PATH
    } from '../../config.js';
    import {mapGetters} from 'vuex';
    import CreateCustomField from '../../form_elements/CreateCustomField';
    import Calendar from '../../form_elements/Calendar';
    import ImageSelector from '../../form_elements/ImageSelector';

    export default {
        name: 'MedicalVisitsInsert',
        components: {
            'create-custom-field': CreateCustomField,
            'image-selector': ImageSelector,
            'calendar': Calendar
        },
        data() {
            return {
                specialityList: ['Alergología', 'Anestesiología y reanimación', 'Cardiología', 'Endocrinología', 'Gastroenterología', 'Ginecología', 'Hematología y hemoterapia', 'Hidrología médica', 'Infectología', 'Medicina aeroespacial', 'Medicina del deporte', 'Medicina del trabajo', 'Medicina de urgencias', 'Medicina familiar y comunitaria', 'Medicina intensiva', 'Medicina interna', 'Medicina legal y forense', 'Medicina preventiva y salud pública', 'Nefrología', 'Neumología', 'Neurología', 'Nutriología', 'Odontología', 'Oftalmología', 'Oncología médica', 'Oncología radioterápica', 'Otorrinolaringología', 'Pediatría', 'Proctología', 'Psiquiatría', 'Rehabilitación', 'Reumatología', 'Traumatología', 'Toxicología', 'Urología'],
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
                image: '',
                nex_visit_date: '',
                next_visit_time: '',
                schema: []
            };
        },
        computed: mapGetters(['getUserID']),
        methods: {
            setDate: (payload) => {
                let rawDate = payload[0];
                let dd = String(rawDate.getDate()).padStart(2, '0');
                let mm = String(rawDate.getMonth() + 1).padStart(2, '0'); // January is 0!
                let yyyy = rawDate.getFullYear();
                return dd + '-' + mm + '-' + yyyy;
            },
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
                    date: this.reverseDate(this.date),
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
                    image: this.image,
                    nex_visit_date: this.reverseDate(this.nex_visit_date),
                    next_visit_time: this.reverseDate(this.next_visit_time),
                    schema: JSON.stringify(this.schema)
                })
                    .then((response) => {
                        // Incrementing counting state
                        this.$store.dispatch('incrementDocumentCounting', 'medical_visits');

                        // After insert check the existence of an image
                        if (this.image !== '') {
                            this.uploadImage(response.data.recordID.$oid);
                        }

                        // Returning to list
                        this.$f7router.navigate('/medical-visits');
                    })
                    .catch(function (error) {
                        //console.log(error);
                    });
            },
            reverseDate(payload) {
                if(payload === undefined || payload === null) {
                    return;
                }
                let date = payload.split("-");
                return date.reverse().join("-");
            },
            setImageURI(e) {
                //console.log('@setImageURI');
                this.image = e;
            },
            uploadImage(record_id) {
                let uri = encodeURI(API_PATH + 'medicines/update-image');
                let options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = this.image.substr(this.image.lastIndexOf('/') + 1);
                options.mimeType = "image/jpeg";
                options.httpMethod = "POST";
                options.chunkedMode = true;
                options.params = {
                    id: record_id
                };

                var ft = new FileTransfer();
                ft.upload(this.image, uri, this.success, this.error, options);
            },
            success(response) {
                //console.log(response);
            },
            error(response) {
                //console.log(response);
            }
        }
    };
</script>

<style scoped>
    .navbar {
        background-color: #FF7E3A;
    }
</style>
