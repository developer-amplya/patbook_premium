<template>

    <f7-page>

        <f7-navbar title="MEDICAMENTO" back-link="Volver"></f7-navbar>

        <f7-block inner>

            <f7-card title="REGISTRO DE MEDICACIÓN">
                <f7-list media-list>

                    <!-- Name -->
                    <f7-list-item header="Nombre"
                                  @click="openInputPopover($event, 'text', 'Nombre', 'name', details.name)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.name }}</span>
                    </f7-list-item>

                    <!-- Image -->

                    <!-- Laboratory name -->
                    <f7-list-item header="Nombre del laboratorio"
                                  @click="openInputPopover($event, 'text', 'Nombre del laboratorio', 'lab', details.lab)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.lab }}</span>
                    </f7-list-item>

                    <!-- Content -->
                    <f7-list-item header="Miligramos/Mililitros"
                                  @click="openInputPopover($event, 'text', 'Miligramos/Mililitros', 'content', details.content)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.content }}</span>
                    </f7-list-item>

                    <!-- Dose -->
                    <f7-list-item header="Dosis"
                                  @click="openInputPopover($event, 'text', 'Dosis', 'dose', details.dose)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.dose }}</span>
                    </f7-list-item>

                    <!-- Frequency -->
                    <f7-list-item header="Frecuencia"
                                  @click="openSelectPopover($event, 'frequencyList', 'Frecuencia', 'frequency', details.frequency)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.frequency }}</span>
                    </f7-list-item>

                    <!-- Time -->
                    <f7-list-item header="Hora/Pauta"
                                  @click="openInputPopover($event, 'text', 'Hora/Pauta', 'time', details.time)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.time }}</span>
                    </f7-list-item>

                    <!-- Day time -->
                    <f7-list-item header="Momento del día"
                                  @click="openSelectPopover($event, 'dayTimeList', 'Momento del día', 'day_time', details.day_time)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.day_time }}</span>
                    </f7-list-item>

                    <!-- Start date -->
                    <f7-list-item header="Fecha de inicio"
                                  @click="openInputPopover($event, 'text', 'Fecha de inici', 'start', details.start)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.start }}</span>
                    </f7-list-item>

                    <!-- Ending date -->
                    <f7-list-item header="Fecha de fin"
                                  @click="openInputPopover($event, 'text', 'Fecha de fin', 'end', details.end)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.end }}</span>
                    </f7-list-item>

                    <!-- Cause -->
                    <f7-list-item header="Motivo"
                                  @click="openInputPopover($event, 'text', 'Motivo', 'cause', details.cause)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.cause }}</span>
                    </f7-list-item>

                    <!-- Effects -->
                    <f7-list-item header="Efectos"
                                  @click="openInputPopover($event, 'textarea', 'Efectos', 'effects', details.effects)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.effects }}</span>
                    </f7-list-item>

                    <!-- Notes -->
                    <f7-list-item header="Notas"
                                  @click="openInputPopover($event, 'textarea', 'Notas', 'notes', details.notes)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.notes }}</span>
                    </f7-list-item>

                    <!-- Doctor -->
                    <f7-list-item header="Médico"
                                  @click="openInputPopover($event, 'text', 'Médico', 'doctor', details.doctor)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.doctor }}</span>
                    </f7-list-item>
                </f7-list>
                </f7-card>

                <f7-card title="CAMPOS PERSONALIZADOS">
                    <f7-list media-list>
                        <!-- Schema -->
                        <f7-list-item v-for="(field, index) in schema"
                                      :key="index"
                                      :header="field.label"
                                      @click="openEditSchema($event, index, field)">
                            <f7-icon material="edit"></f7-icon>
                            <span>{{ field.value }}</span>
                        </f7-list-item>

                    </f7-list>
                </f7-card>

        </f7-block>

    </f7-page>

</template>

<script>
    import axios from 'axios';
    import {
        API_PATH
    } from '../../config.js';
    import SelectList from '../../form_elements/SelectList';
    import TextInput from '../../form_elements/TextInput';

    export default {
        name: 'MedicinesDetails',
        components: {
            SelectList,
            TextInput
        },
        props: [
            'id'
        ],
        data() {
            return {
                field: {
                    type: '',
                    label: '',
                    name: '',
                    value: '',
                    isSchema: false
                },
                details: [],
                frequencyList: ['Diaria', 'Semanal', 'Mensual', 'Bimensual', 'Trimestral', 'Otros'],
                dayTimeList: ['Mañana', 'Tarde', 'Noche'],
                schema: []
            };
        },
        methods: {
            openEdit(event, param, param2) {
                this.before_editing = param;
                this[param2] = true;
            },
            cancelEdit(event, param, param2) {
                this.details[param] = this.before_editing
                this.before_editing = '';
                this[param2] = false;
            },
            openEditSchema(event, index) {
                console.log(index);
                this.before_editing = this.schema[index].value;
                this.schema[index].is_editing = true;
            },
            cancelEditSchema(event, index) {
                this.schema[index].value = this.before_editing
                this.before_editing = '';
                this.schema[index].is_editing = false;
            },
            updateInfo(event, param, param2) {

                /* We need to create first an object an then to assign the key name as an array key, because assigning
                 dynamic key names in an object does not work */
                let data = {};
                data[param] = this.details[param];

                /* axios.put('http://patbookapi.local/api/allergies/' + this.id, {
                    params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                    },
                    data: data
                }) */

                axios({
                    method: 'PUT',
                    url: API_PATH + 'medicines/' + this.id,
                    params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                    },
                    data: data
                })
                    .then((response) => {
                        console.log(response);
                        // TODO: confirm the update is OK
                        this[param2] = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            updateInfoSchema(index) {
                this.schema[index].is_editing = false;
                axios.put(API_PATH + 'medicines/' + this.id, {
                    params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                    },
                    schema: JSON.stringify(this.schema)
                })
                    .then((response) => {
                        console.log(response);
                        // TODO: confirm the update is OK
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted() {
            axios
                .get(API_PATH + 'medicines/' + this.id, {
                    params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                    }
                })
                .then(response => {
                    this.details = response.data;
                    this.schema = JSON.parse(response.data.schema);
                });
        }
    }
    ;
</script>

<style scoped>

    .invisible {
        display: none;
    }

    .md .list .item-header {
        padding-left: 39px !important;
    }

    li i.icon {
        /*position: absolute;
        left: 15px;
        top: 20px;*/
        color: #9a9a9a !important;
        background: #eeeeee;
        padding: 5px;
        border-radius: 50%;
        opacity: .65;
    }

    li span {
        position: relative;
        z-index: 10;
    }

    .navbar {
        background-color: #F2BE4C;
    }
</style>
