<template>

    <f7-page class="medical-visit-preparations-page">
        <f7-navbar title="PREPARACIÓN VISITA MÉDICA" back-link="Volver"></f7-navbar>
        <f7-block inner>

            <f7-card title="REGISTRO DE SÍNTOMAS">
                <f7-list>
                    <!-- Symptoms description -->
                    <f7-list-input
                            type="textarea"
                            label="Descripción de los síntomas"
                            :value="details.symptoms_description"
                            @input="details.symptoms_description = $event.target.value"
                    >
                    </f7-list-input>

                    <!-- Intensity -->
                    <f7-list-item smart-select title="Intensidad" :smart-select-params="{ closeOnSelect: true }">
                        <select :name="details.intensity" v-model="details.intensity">
                            <option v-for="(item, index) in intensityList"
                                    :key="index"
                                    :value="item"
                            >{{ item }}
                            </option>
                        </select>
                        <div class="intensity item-after"></div>
                    </f7-list-item>

                    <!-- Frequency -->
                    <f7-list-input
                            type="text"
                            label="Frecuencia"
                            :value="details.frequency"
                            @input="details.frequency = $event.target.value">
                    </f7-list-input>

                    <!-- Date & Time -->
                    <f7-list-item>
                        <f7-row>
                            <f7-col>
                                <calendar
                                        id="medical_visit_preparation_date"
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

                    <!-- Actions -->
                    <f7-list-input
                            type="textarea"
                            label="Acciones preventivas"
                            :value="details.actions"
                            @input="details.actions = $event.target.value"
                    >
                    </f7-list-input>

                    <!-- Notes -->
                    <f7-list-input
                            type="textarea"
                            label="Notas"
                            :value="details.notes"
                            @input="details.notes = $event.target.value"
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
                            :value="details.doctor"
                            @input="details.doctor = $event.target.value">
                    </f7-list-input>

                    <!-- Questions -->
                    <f7-list-input
                            type="textarea"
                            label="Preguntas"
                            :value="details.questions"
                            @input="details.questions = $event.target.value">
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
            <f7-button large raised fill class="stone" @click="update">Guardar</f7-button>

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
            'create-custom-field': CreateCustomField,
            'calendar': Calendar,
        },
        props: [
            'record_id'
        ],
        data() {
            return {
                intensityList: ['Leve', 'Moderada', 'Severa'],
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
                .get(API_PATH + 'medical-visit-preparations/' + this.id, {
                    params: {
                        // device_code: sessionStorage.device_code,
                        // user_id: sessionStorage.user_id
                    }
                })
                .then(response => {
                    this.details = response.data;
                    this.schema = JSON.parse(response.data.schema);

                    this.$$('.intensity').html(this.details.intensity);

                    //
                    this.details.date = this.reverseDate(this.details.date);
                    this.$$('#medical_visit_preparation_date').attr('value', this.details.date);

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
                axios.put(API_PATH + 'medical-visit-preparations/' + this.id, {
                    /*params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                        // TODO: encriptar las credenciales?
                    },*/
                    symptoms_description: this.details.symptoms_description,
                    intensity: this.details.intensity,
                    frequency: this.details.frequency,
                    date: this.reverseDate(this.details.date),
                    time: this.details.time,
                    actions: this.details.actions,
                    notes: this.details.notes,
                    image: this.details.image,
                    doctor: this.details.doctor,
                    questions: this.details.questions,
                    schema: JSON.stringify(this.schema)
                })
                    .then((response) => {

                        // After insert check the existence of an image and different from the initial one
                        if (this.details.image !== '' && this.details.image !== this.initial_image) {
                            this.updateImage();
                        }

                        let notification = this.$f7.toast.create({
                            position: 'top',
                            text: 'Registro guardado',
                            cssClass: "success",
                            icon: '<i class="icon material-icons">done</i>',
                            closeTimeout: 2000
                        });
                        notification.open();

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
                this.details.image = e;
            },
            updateImage(record_id) {
                let uri = encodeURI(API_PATH + 'medical-visit-preparations/update-image');
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
    .stone-page .navbar, .stone-page .toolbar {
        background-color: #6F715E;
    }
</style>
