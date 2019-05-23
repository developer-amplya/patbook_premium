<template>

    <f7-page class="medical-visits-page">
        <f7-navbar title="VISITA MÉDICA" back-link="Volver"></f7-navbar>
        <f7-block inner>

            <f7-card title="REGISTRO DE VISITA MÉDICA">
                <f7-list>

                    <!-- DESCRIPTION -->
                    <f7-list-input
                            type="textarea"
                            label="Descripción"
                            :value="details.description"
                            @input="details.description = $event.target.value">
                    </f7-list-input>

                    <!-- DOCTOR -->
                    <f7-list-input
                            type="text"
                            label="Médico"
                            :value="details.doctor"
                            @input="details.doctor = $event.target.value">
                    </f7-list-input>

                    <!-- LOCATION -->
                    <f7-list-input
                            type="text"
                            label="Centro"
                            :value="details.location"
                            @input="details.location = $event.target.value"
                            clear-button>
                    </f7-list-input>

                    <!-- ADDRESS -->
                    <f7-list-input
                            type="text"
                            label="Dirección"
                            :value="details.address"
                            @input="details.address = $event.target.value"
                            clear-button>
                    </f7-list-input>

                    <!-- PHONE -->
                    <f7-list-input
                            type="text"
                            label="Teléfono"
                            :value="details.phone"
                            @input="details.phone = $event.target.value"
                            clear-button>
                    </f7-list-input>

                    <!-- SPECIALITY -->
                    <f7-list-item smart-select title="Especialidad" :smart-select-params="{ closeOnSelect: true }">
                        <select :name="details.speciality" v-model="details.speciality">
                            <option v-for="(item, index) in specialityList"
                                    :key="index"
                                    :value="item"
                            >{{ item }}
                            </option>
                        </select>
                        <div class="speciality item-after"></div>
                    </f7-list-item>

                    <!-- Date & Time -->
                    <f7-list-item>
                        <f7-row>
                            <f7-col>
                                <calendar
                                        id="medical_visit_date"
                                        label="Fecha"
                                        @change="details.date = setDate($event)">
                                </calendar>
                            </f7-col>
                            <f7-col>
                                <f7-list-input
                                        type="time"
                                        label="Hora"
                                        :value="details.time"
                                        @input="details.time = $event.target.value"
                                ></f7-list-input>
                            </f7-col>
                        </f7-row>
                    </f7-list-item>

                    <!-- Cause -->
                    <f7-list-input
                            type="text"
                            label="Motivo"
                            :value="details.cause"
                            @input="details.cause = $event.target.value">
                    </f7-list-input>

                    <!-- CONTRIBUTED -->
                    <f7-list-input
                            type="textarea"
                            label="Pruebas e informes aportados"
                            :value="details.contributed"
                            @input="details.contributed = $event.target.value"
                    >
                    </f7-list-input>

                    <!-- PRESCRIPTION -->
                    <f7-list-input
                            type="text"
                            label="Prescripción - Medicación"
                            :value="details.prescription"
                            @input="details.prescription = $event.target.value">
                    </f7-list-input>

                    <!-- TREATMENT -->
                    <f7-list-input
                            type="textarea"
                            label="Prescripción - Tratamiento"
                            :value="details.treatment"
                            @input="details.treatment = $event.target.value"
                    >
                    </f7-list-input>

                    <!-- DIAGNOSTIC TESTS -->
                    <f7-list-input
                            type="text"
                            label="Prescripción - Pruebas diagnósticas"
                            :value="details.diagnostic_tests"
                            @input="details.diagnostic_tests = $event.target.value">
                    </f7-list-input>

                    <!-- RECOMENDATIONS -->
                    <f7-list-input
                            type="textarea"
                            label="Recomendaciones"
                            :value="details.recomendations"
                            @input="details.recomendations = $event.target.value"
                    >
                    </f7-list-input>

                    <!-- DIAGNOSTIC -->
                    <f7-list-input
                            type="text"
                            label="Diagnóstico"
                            :value="details.diagnostic"
                            @input="details.diagnostic = $event.target.value">
                    </f7-list-input>

                    <!-- DISEASE -->
                    <f7-list-input
                            type="text"
                            label="Enfermedad"
                            :value="details.disease"
                            @input="details.disease = $event.target.value">
                    </f7-list-input>

                    <!-- COMMENTS -->
                    <f7-list-input
                            type="textarea"
                            label="Comentarios"
                            :value="details.comments"
                            @input="details.comments = $event.target.value"
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
                                        @change="details.nex_visit_date = setDate($event)">
                                </calendar>
                            </f7-col>
                            <f7-col>
                                <f7-list-input
                                        type="time"
                                        label="Hora"
                                        :value="details.next_visit_time"
                                        @input="details.next_visit_time = $event.target.value"
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
            <f7-button large raised fill class="orange" @click="update">Guardar</f7-button>

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
            'create-custom-field': CreateCustomField,
            'calendar': Calendar,
        },
        props: [
            'record_id'
        ],
        data() {
            return {
                specialityList: ['Alergología', 'Anestesiología y reanimación', 'Cardiología', 'Dermatología', 'Endocrinología', 'Gastroenterología', 'Ginecología', 'Hematología y hemoterapia', 'Hidrología médica', 'Infectología', 'Medicina aeroespacial', 'Medicina del deporte', 'Medicina del trabajo', 'Medicina de urgencias', 'Medicina familiar y comunitaria', 'Medicina intensiva', 'Medicina interna', 'Medicina legal y forense', 'Medicina preventiva y salud pública', 'Nefrología', 'Neumología', 'Neurología', 'Nutriología', 'Odontología', 'Oftalmología', 'Oncología médica', 'Oncología radioterápica', 'Otorrinolaringología', 'Pediatría', 'Proctología', 'Psiquiatría', 'Rehabilitación', 'Reumatología', 'Traumatología', 'Toxicología', 'Urología'],
                id: this.record_id,
                field: {
                    type: '',
                    label: '',
                    name: '',
                    value: ''
                },
                details: [],
                schema: [],
                initial_image: null
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
                    this.schema = JSON.parse(response.data.schema);

                    this.$$('.speciality').html(this.details.speciality);

                    //
                    this.details.date = this.reverseDate(this.details.date);
                    this.$$('#medical_visit_date').attr('value', this.details.date);
                    //
                    this.details.nex_visit_date = this.reverseDate(this.details.nex_visit_date);
                    this.$$('#next_medical_visit_date').attr('value', this.details.nex_visit_date);

                    // Setting the initial image value so we can know later if the image was updated
                    this.initial_image = this.details.image;

                    //
                    if(this.details.image !== '' && this.details.image !== null) {
                        this.$$('.image img').attr('src', USER_IMAGES_PATH + this.details.image)
                    }
                });
        },
        methods: {
            setDate: (payload) => {
                let rawDate = payload[0];
                let dd = String(rawDate.getDate()).padStart(2, '0');
                let mm = String(rawDate.getMonth() + 1).padStart(2, '0'); // January is 0!
                let yyyy = rawDate.getFullYear();
                return dd + '-' + mm + '-' + yyyy;
            },
            update() {
                axios.put(API_PATH + 'medical-visits/' + this.id, {
                    /*params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                        // TODO: encriptar las credenciales?
                    },*/
                    description: this.details.description,
                    doctor: this.details.doctor,
                    location: this.details.location,
                    address: this.details.address,
                    phone: this.details.phone,
                    speciality: this.details.speciality,
                    date: this.reverseDate(this.details.date),
                    time: this.details.time,
                    cause: this.details.cause,
                    contributed: this.details.contributed,
                    prescription: this.details.prescription,
                    treatment: this.details.treatment,
                    diagnostic_tests: this.details.diagnostic_tests,
                    recomendations: this.details.recomendations,
                    diagnostic: this.details.diagnostic,
                    disease: this.details.disease,
                    comments: this.details.comments,
                    image: this.details.image,
                    nex_visit_date: this.reverseDate(this.details.nex_visit_date),
                    next_visit_time: this.reverseDate(this.details.next_visit_time),
                    schema: JSON.stringify(this.schema)
                })
                    .then((response) => {

                        // After insert check the existence of an image and different from the initial one
                        if (this.details.image !== '' && this.details.image !== this.initial_image) {
                            this.updateImage();
                        }

                        let notification = this.$f7.toast.create({
                            position: 'top',
                            text: '¡Registro replicado! Ya puedes editarlo',
                            cssClass: "success",
                            icon: '<i class="icon material-icons">done</i>',
                            closeTimeout: 2000
                        });
                        notification.open();

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
                this.details.image = e;
            },
            updateImage(record_id) {
                let uri = encodeURI(API_PATH + 'medical-visits/update-image');
                let options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = this.details.image.substr(this.details.image.lastIndexOf('/') + 1);
                options.mimeType = "image/jpeg";
                options.httpMethod = "POST";
                options.chunkedMode = true;
                options.params = {
                    id: this.id
                };

                let ft = new FileTransfer();
                ft.upload(this.details.image, uri, this.success, this.error, options);
            },
            success(response) {
                //console.log(response);
            },
            error(response) {
                //console.log(response);
            },
        }
    }
    ;
</script>

<style>
    .orange-page .navbar, .orange-page .toolbar {
        background-color: #FF7E3A;
    }
</style>
