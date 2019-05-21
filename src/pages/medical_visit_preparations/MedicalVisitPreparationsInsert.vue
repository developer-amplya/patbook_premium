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
        API_PATH
    } from '../../config.js';
    import {mapGetters} from 'vuex';
    import CreateCustomField from '../../form_elements/CreateCustomField';
    import Calendar from '../../form_elements/Calendar';
    import ImageSelector from '../../form_elements/ImageSelector';

    export default {
        name: 'MedicalVisitsPreparationInsert',
        components: {
            'create-custom-field': CreateCustomField,
            'image-selector': ImageSelector,
            'calendar': Calendar
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
                image: '',
                doctor: '',
                questions: '',
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
                    date: this.reverseDate(this.date),
                    time: this.time,
                    actions: this.actions,
                    notes: this.notes,
                    image: this.image,
                    doctor: this.doctor,
                    questions: this.questions,
                    schema: JSON.stringify(this.schema)
                })
                    .then((response) => {
                        // Incrementing counting state
                        this.$store.dispatch('incrementDocumentCounting', 'medical_visit_preparations');

                        // After insert check the existence of an image
                        if (this.image !== '') {
                            this.uploadImage(response.data.recordID.$oid);
                        }

                        // Returning to list
                        this.$f7router.navigate('/medical-visit-preparations');
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
        background-color: #6F715E;
    }
</style>
