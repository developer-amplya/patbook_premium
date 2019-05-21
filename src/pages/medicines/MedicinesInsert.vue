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
                            :value="name"
                            @input="name = $event.target.value">
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
                            :value="lab"
                            @input="lab = $event.target.value">
                    </f7-list-input>

                    <!-- Content -->
                    <f7-list-input
                            type="text"
                            label="Miligramos/Mililitros"
                            :value="content"
                            @input="content = $event.target.value">
                    </f7-list-input>

                    <!-- Dose -->
                    <f7-list-input
                            type="text"
                            label="Dosis"
                            :value="dose"
                            @input="dose = $event.target.value">
                    </f7-list-input>

                    <!-- Frequency -->
                    <f7-list-item smart-select title="Frecuencia" :smart-select-params="{ closeOnSelect: true }">
                        <select :name="frequency" v-model="frequency">
                            <option v-for="(item, index) in frequencyList"
                                    :key="index"
                                    :value="item"
                            >{{ item }}
                            </option>
                        </select>
                    </f7-list-item>

                    <!-- Time -->
                    <f7-list-input
                            type="text"
                            label="Hora/Pauta"
                            :value="time"
                            @input="time = $event.target.value">
                    </f7-list-input>

                    <!-- Day time -->
                    <f7-list-item smart-select title="Momento del día" :smart-select-params="{}">
                        <select :name="day_time" v-model="day_time" multiple>
                            <option v-for="(item, index) in dayTimeList"
                                    :key="index"
                                    :value="item"
                            >{{ item }}
                            </option>
                        </select>
                    </f7-list-item>

                    <!-- Start date -->
                    <f7-list-item title="Fecha de inicio"></f7-list-item>
                    <f7-list-item class="date-picker">
                        <calendar
                                id="medicines_start"
                                @change="start = setDate($event)">
                        </calendar>
                    </f7-list-item>

                    <!-- Ending date -->
                    <f7-list-item title="Fecha de fin"></f7-list-item>
                    <f7-list-item class="date-picker">
                        <calendar
                                id="medicines_end"
                                @change="end = setDate($event)">
                        </calendar>
                    </f7-list-item>

                    <!-- Cause -->
                    <f7-list-input
                            type="text"
                            label="Motivo"
                            :value="cause"
                            @input="cause = $event.target.value">
                    </f7-list-input>

                    <!-- Effects -->
                    <f7-list-input
                            type="textarea"
                            label="Efectos"
                            :value="effects"
                            @input="effects = $event.target.value">
                    </f7-list-input>

                    <!-- Notes -->
                    <f7-list-input
                            type="textarea"
                            label="Notas"
                            :value="notes"
                            @input="notes = $event.target.value"
                    >
                    </f7-list-input>

                    <!-- Doctor -->
                    <f7-list-input
                            type="text"
                            label="Médico"
                            :value="doctor"
                            @input="doctor = $event.target.value">
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
            <f7-button large raised fill class="yellow" @click="insert()">Guardar</f7-button>

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
    import ImageSelector from '../../form_elements/ImageSelector';
    import Calendar from '../../form_elements/Calendar';

    export default {
        name: 'MedicinesInsert',
        components: {
            'create-custom-field': CreateCustomField,
            'image-selector': ImageSelector,
            'calendar': Calendar
        },
        data() {
            return {
                frequencyList: ['Diaria', 'Semanal', 'Mensual', 'Bimensual', 'Trimestral', 'Otros'],
                dayTimeList: ['Mañana', 'Tarde', 'Noche'],
                name: '',
                image: '',
                lab: '',
                content: '',
                dose: '',
                frequency: '',
                time: '',
                day_time: [],
                start: '',
                end: '',
                cause: '',
                effects: '',
                notes: '',
                doctor: '',
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
                axios.post(API_PATH + 'medicines', {
                    /*params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                        // TODO: encriptar las credenciales?
                    },*/
                    user_id: this.getUserID,
                    name: this.name,
                    image: this.image,
                    lab: this.lab,
                    content: this.content,
                    dose: this.dose,
                    frequency: this.frequency,
                    time: this.time,
                    day_time: this.day_time,
                    start: this.reverseDate(this.start),
                    end: this.reverseDate(this.end),
                    cause: this.cause,
                    effects: this.effects,
                    notes: this.notes,
                    doctor: this.doctor,
                    schema: JSON.stringify(this.schema)
                })
                    .then((response) => {
                        // Incrementing counting state
                        this.$store.dispatch('incrementDocumentCounting', 'medicines');

                        // After insert check the existence of an image
                        if (this.image !== '') {
                            this.uploadImage(response.data.recordID.$oid);
                        }

                        // Returning to list
                        this.$f7router.navigate('/medicines');
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
        background-color: #F2BE4C;
    }

    .date-picker {
        margin-top: -24px;
    }
</style>
