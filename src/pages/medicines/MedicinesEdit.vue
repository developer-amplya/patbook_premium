<template>

    <f7-page>
        <f7-navbar title="MEDICACIÓN" back-link="Volver"></f7-navbar>
        <f7-block inner>


            <f7-card title="REGISTRO DE MEDICACIÓN">
                <f7-list no-hairlines no-hairlines-between>

                    <!-- Name -->
                    <f7-list-input
                            type="text"
                            label="Nombre"
                            :value="details.name"
                            @input="details.name = $event.target.value">
                    </f7-list-input>

                    <!-- Image -->
                    <f7-list-item title="Imagen"></f7-list-item>
                    <f7-list-item>
                        <image-selector @image_selected="setImageURI"></image-selector>
                    </f7-list-item>

                    <!-- Laboratory -->
                    <f7-list-input
                            type="text"
                            label="Laboratorio"
                            :value="details.lab"
                            @input="details.lab = $event.target.value">
                    </f7-list-input>

                    <!-- Content -->
                    <f7-list-input
                            type="text"
                            label="Miligramos/Mililitros"
                            :value="details.content"
                            @input="details.content = $event.target.value">
                    </f7-list-input>

                    <!-- Dose -->
                    <f7-list-input
                            type="text"
                            label="Dosis"
                            :value="details.dose"
                            @input="details.dose = $event.target.value">
                    </f7-list-input>

                    <!-- Frequency -->
                    <f7-list-item smart-select title="Frecuencia" :smart-select-params="{ closeOnSelect: true }">
                        <select :name="details.frequency" v-model="details.frequency">
                            <option v-for="(item, index) in frequencyList"
                                    :key="index"
                                    :value="item"
                            >{{ item }}
                            </option>
                        </select>
                        <div class="frequency item-after"></div>
                    </f7-list-item>

                    <!-- Time -->
                    <f7-list-input
                            type="text"
                            label="Hora/Pauta"
                            :value="details.time"
                            @input="details.time = $event.target.value">
                    </f7-list-input>

                    <!-- Day time -->
                    <f7-list-item smart-select title="Momento del día" :smart-select-params="{}">
                        <select :name="details.day_time" v-model="details.day_time" multiple>
                            <option v-for="(item, index) in dayTimeList"
                                    :key="index"
                                    :value="item"
                            >{{ item }}
                            </option>
                        </select>
                        <div class="day_time item-after"></div>
                    </f7-list-item>

                    <!-- Start date -->
                    <f7-list-item title="Fecha de inicio"></f7-list-item>
                    <f7-list-item class="date-picker">
                        <calendar
                                id="medicines_start"
                                @change="details.start = setDate($event)">
                        </calendar>
                    </f7-list-item>

                    <!-- Ending date -->
                    <f7-list-item title="Fecha de fin"></f7-list-item>
                    <f7-list-item class="date-picker">
                        <calendar
                                id="medicines_end"
                                @change="details.end = setDate($event)">
                        </calendar>
                    </f7-list-item>

                    <!-- Cause -->
                    <f7-list-input
                            type="text"
                            label="Motivo"
                            :value="details.cause"
                            @input="details.cause = $event.target.value">
                    </f7-list-input>

                    <!-- Effects -->
                    <f7-list-input
                            type="textarea"
                            label="Efectos"
                            :value="details.effects"
                            @input="details.effects = $event.target.value">
                    </f7-list-input>

                    <!-- Notes -->
                    <f7-list-input
                            type="textarea"
                            label="Notas"
                            :value="details.notes"
                            @input="details.notes = $event.target.value"
                    >
                    </f7-list-input>

                    <!-- Doctor -->
                    <f7-list-input
                            type="text"
                            label="Médico"
                            :value="details.doctor"
                            @input="details.doctor = $event.target.value">
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
            <f7-button large raised fill class="yellow" @click="update">Guardar</f7-button>

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
        name: 'MedicinesEdit',
        components: {
            'create-custom-field': CreateCustomField,
            'image-selector': ImageSelector,
            'calendar': Calendar,
        },
        props: [
            'record_id'
        ],
        data() {
            return {
                frequencyList: ['Diaria', 'Semanal', 'Mensual', 'Bimensual', 'Trimestral', 'Otros'],
                dayTimeList: ['Mañana', 'Tarde', 'Noche'],
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
            // Get the record details
            axios
                .get(API_PATH + 'medicines/' + this.id, {
                    params: {
                        // device_code: sessionStorage.device_code,
                        // user_id: sessionStorage.user_id
                    }
                })
                .then(response => {
                    this.details = response.data;
                    this.schema = JSON.parse(response.data.schema);

                    this.$$('.frequency').html(this.details.frequency);
                    this.$$('.day_time').html(this.details.day_time);

                    //
                    this.details.start = this.reverseDate(this.details.start);
                    this.$$('#medicines_start').attr('value', this.details.start);
                    //
                    this.details.end = this.reverseDate(this.details.end);
                    this.$$('#medicines_end').attr('value', this.details.end);

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
                axios.put(API_PATH + 'medicines/' + this.id, {
                    /*params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                        // TODO: encriptar las credenciales?
                    },*/
                    name: this.details.name,
                    image: this.details.image,
                    lab: this.details.lab,
                    content: this.details.content,
                    dose: this.details.dose,
                    frequency: this.details.frequency,
                    time: this.details.time,
                    day_time: this.details.day_time,
                    start: this.reverseDate(this.details.start),
                    end: this.reverseDate(this.details.end),
                    cause: this.details.cause,
                    effects: this.details.effects,
                    notes: this.details.notes,
                    doctor: this.details.doctor,
                    schema: JSON.stringify(this.schema)
                })
                    .then((response) => {

                        // After insert check the existence of an image and different from the initial one
                        if (this.details.image !== '' && this.details.image !== this.initial_image) {
                            this.updateImage();
                        }

                        // Returning to details
                        this.$f7router.navigate('/router/medicines/' + this.id);
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
            updateImage(path) {
                let uri = encodeURI(API_PATH + 'medicines/update-image');
                let options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = path.substr(path.lastIndexOf('/') + 1);
                options.mimeType = "image/jpeg";
                options.httpMethod = "POST";
                options.chunkedMode = true;
                options.params = {
                    id: this.id
                };

                let ft = new FileTransfer();
                ft.upload(path, uri, this.success, this.error, options);
            },
            success(response) {
                //console.log(response);
            },
            error(response) {
                //console.log(response);
            },
        }
    };
</script>

<style scoped>
    .navbar, .toolbar {
        background-color: #F2BE4C;
    }
</style>
