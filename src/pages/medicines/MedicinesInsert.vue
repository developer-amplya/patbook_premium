<template>
    <f7-page>
        <f7-navbar title="MEDICACIÓN" back-link="Volver"></f7-navbar>
        <f7-block inner>


            <f7-card title="REGISTRO DE MEDICACIÓN">
                <f7-list no-hairlines no-hairlines-between>
                    <!-- Name -->
                    <f7-list-item>
                        <f7-label>Nombre</f7-label>
                        <f7-input
                                type="text"
                                :value="name"
                                @input="name = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

                    <!-- Image -->
                    <f7-list-item>
                        <f7-label>Imagen</f7-label>
                    </f7-list-item>
                    <f7-list-item>
                        <image-selector @image_selected="setImageURI"></image-selector>
                    </f7-list-item>

                    <!-- Laboratory -->
                    <f7-list-item>
                        <f7-label>Laboratorio</f7-label>
                        <f7-input
                                type="text"
                                :value="lab"
                                @input="lab = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

                    <!-- Content -->
                    <f7-list-item>
                        <f7-label>Miligramos/Mililitros</f7-label>
                        <f7-input
                                type="text"
                                :value="content"
                                @input="content = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

                    <!-- Dose -->
                    <f7-list-item>
                        <f7-label>Dosis</f7-label>
                        <f7-input
                                type="text"
                                :value="dose"
                                @input="dose = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

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
                    <f7-list-item>
                        <f7-label>Hora/Pauta</f7-label>
                        <f7-input
                                type="text"
                                :value="time"
                                @input="time = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

                    <!-- Day time -->
                    <f7-list-item smart-select title="Momento del día" :smart-select-params="{ closeOnSelect: true }">
                        <select :name="day_time" v-model="day_time">
                            <option v-for="(item, index) in dayTimeList"
                                    :key="index"
                                    :value="item"
                            >{{ item }}
                            </option>
                        </select>
                    </f7-list-item>

                    <!-- Start date -->
                    <f7-list-item>
                        <f7-label>Fecha de inicio</f7-label>
                        <f7-input
                                type="date"
                                :value="start"
                                @input="start = $event.target.value"></f7-input>
                    </f7-list-item>

                    <!-- Ending date -->
                    <f7-list-item>
                        <f7-label>Fecha de fin</f7-label>
                        <f7-input
                                type="date"
                                :value="end"
                                @input="end = $event.target.value"></f7-input>
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

                    <!-- Effects -->
                    <f7-list-item>
                        <f7-label>Efectos</f7-label>
                        <f7-input
                                type="textarea"
                                :value="effects"
                                @input="effects = $event.target.value"
                        ></f7-input>
                    </f7-list-item>

                    <!-- Notes -->
                    <f7-list-item>
                        <f7-label>Notas</f7-label>
                        <f7-input
                                type="textarea"
                                :value="notes"
                                @input="notes = $event.target.value"
                        ></f7-input>
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
    import ImageSelector from '../../form_elements/ImageSelector';

    export default {
        name: 'MedicinesInsert',
        components: {
            'create-custom-field': CreateCustomField,
            'image-selector': ImageSelector
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
                day_time: '',
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
                    start: this.start,
                    end: this.end,
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
                        //this.$f7router.navigate('/medicines');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            cancel() {
                this.$f7Router.navigate('/medicines');
            },
            setImageURI(e) {
                console.log('@setImageURI');
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
            success(response){
                console.log(response);
            },
            error(response){
                console.log(response);
            }
        }
    };
</script>

<style scoped>
    .navbar {
        background-color: #F2BE4C;
    }
</style>
