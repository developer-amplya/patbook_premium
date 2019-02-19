<template>

    <f7-page>

        <f7-navbar title="MEDICAMENTO" back-link="Volver"></f7-navbar>

        <f7-block inner>

            <f7-list media-list>

                <!-- NAME -->
                <f7-list-item header="Nombre"
                              v-if="!edit_name"
                              @click="openEdit($event, details.name, 'edit_name')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.name }}</span>
                </f7-list-item>

                <f7-list-item header="Nombre"
                              v-if="edit_name">
                    <f7-block>
                        <f7-input
                                type="text"
                                :title="details.name"
                                :value="details.name"
                                @input="details.name = $event.target.value"
                        ></f7-input>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEdit($event, 'name', 'edit_name')">Cancelar</f7-button>
                            <f7-button round @click="updateInfo($event, 'name', 'edit_name')">Guardar</f7-button>
                        </f7-segmented>
                    </f7-block>
                </f7-list-item>

                <!-- IMAGE -->

                <!-- LABORATORY NAME -->
                <f7-list-item header="Nombre del laboratorio"
                              v-if="!edit_lab"
                              @click="openEdit($event, details.lab, 'edit_lab')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.lab }}</span>
                </f7-list-item>

                <f7-list-item header="Nombre del laboratorio"
                              v-if="edit_lab">
                    <f7-block>
                        <f7-input
                                type="text"
                                :title="details.lab"
                                :value="details.lab"
                                @input="details.lab = $event.target.value"
                        ></f7-input>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEdit($event, 'lab', 'edit_lab')">Cancelar</f7-button>
                            <f7-button round @click="updateInfo($event, 'lab', 'edit_lab')">Guardar</f7-button>
                        </f7-segmented>
                    </f7-block>
                </f7-list-item>

                <!-- CONTENT -->
                <f7-list-item header="Miligramos/Mililitros"
                              v-if="!edit_content"
                              @click="openEdit($event, details.content, 'edit_content')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.content }}</span>
                </f7-list-item>

                <f7-list-item header="Miligramos/Mililitros"
                              v-if="edit_content">
                    <f7-block>
                        <f7-input
                                type="text"
                                :title="details.content"
                                :value="details.content"
                                @input="details.content = $event.target.value"
                        ></f7-input>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEdit($event, 'content', 'edit_content')">Cancelar</f7-button>
                            <f7-button round @click="updateInfo($event, 'content', 'edit_content')">Guardar</f7-button>
                        </f7-segmented>
                    </f7-block>
                </f7-list-item>

                <!-- DOSE -->
                <f7-list-item header="Dosis"
                              v-if="!edit_dose"
                              @click="openEdit($event, details.dose, 'edit_dose')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.dose }}</span>
                </f7-list-item>

                <f7-list-item header="Dosis"
                              v-if="edit_dose">
                    <f7-block>
                        <f7-input
                                type="text"
                                :title="details.dose"
                                :value="details.dose"
                                @input="details.dose = $event.target.value"
                        ></f7-input>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEdit($event, 'dose', 'edit_dose')">Cancelar</f7-button>
                            <f7-button round @click="updateInfo($event, 'dose', 'edit_dose')">Guardar</f7-button>
                        </f7-segmented>
                    </f7-block>
                </f7-list-item>

                <!-- FREQUENCY -->
                <f7-list-item header="Frecuencia"
                              v-if="!edit_frequency"
                              @click="openEdit($event, details.frequency, 'edit_frequency')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.frequency }}</span>
                </f7-list-item>

                <f7-list-item header="Frecuencia"
                              v-if="edit_frequency">
                    <f7-block>
                        <f7-list>
                            <f7-list-item radio
                                          v-for="(item, index) in frequencyList"
                                          :key="index"
                                          name="frequency"
                                          :title="item"
                                          :value="item"
                                          :checked="item === details.frequency"
                                          @change="details.frequency = $event.target.value"
                            ></f7-list-item>
                        </f7-list>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEdit($event, 'frequency', 'edit_frequency')">Cancelar</f7-button>
                            <f7-button round @click="updateInfo($event, 'frequency', 'edit_frequency')">Guardar</f7-button>
                        </f7-segmented>
                    </f7-block>
                </f7-list-item>

                <!-- TIME -->
                <f7-list-item header="Hora/Pauta"
                              v-if="!edit_time"
                              @click="openEdit($event, details.time, 'edit_time')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.time }}</span>
                </f7-list-item>

                <f7-list-item header="Hora/Pauta"
                              v-if="edit_time">
                    <f7-block>
                        <f7-input
                                type="text"
                                :title="details.time"
                                :value="details.time"
                                @input="details.time = $event.target.value"
                        ></f7-input>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEdit($event, 'time', 'edit_time')">Cancelar</f7-button>
                            <f7-button round @click="updateInfo($event, 'time', 'edit_time')">Guardar</f7-button>
                        </f7-segmented>
                    </f7-block>
                </f7-list-item>

                <!-- DAY TIME -->
                <f7-list-item header="Momento del día"
                              v-if="!edit_day_time"
                              @click="openEdit($event, details.day_time, 'edit_day_time')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.day_time }}</span>
                </f7-list-item>

                <f7-list-item header="Momento del día"
                              v-if="edit_day_time">
                    <f7-block>
                        <f7-list>
                            <f7-list-item radio
                                          v-for="(item, index) in dayTimeList"
                                          :key="index"
                                          name="day_time"
                                          :title="item"
                                          :value="item"
                                          :checked="item === details.day_time"
                                          @change="details.day_time = $event.target.value"
                            ></f7-list-item>
                        </f7-list>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEdit($event, 'day_time', 'edit_day_time')">Cancelar</f7-button>
                            <f7-button round @click="updateInfo($event, 'day_time', 'edit_day_time')">Guardar</f7-button>
                        </f7-segmented>
                    </f7-block>
                </f7-list-item>

                <!-- START DATE -->
                <f7-list-item header="Fecha de inicio"
                              v-if="!edit_start"
                              @click="openEdit($event, details.start, 'edit_start')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.start }}</span>
                </f7-list-item>

                <!-- ENDING DATE -->
                <f7-list-item header="Fecha de fin"
                              v-if="!edit_end"
                              @click="openEdit($event, details.day_time, 'edit_end')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.end }}</span>
                </f7-list-item>

                <!-- CAUSE -->
                <f7-list-item header="Motivo"
                              v-if="!edit_cause"
                              @click="openEdit($event, details.cause, 'edit_cause')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.cause }}</span>
                </f7-list-item>

                <f7-list-item header="Motivo"
                              v-if="edit_cause">
                    <f7-block>
                        <f7-input
                                type="text"
                                :title="details.cause"
                                :value="details.cause"
                                @input="details.cause = $event.target.value"
                        ></f7-input>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEdit($event, 'cause', 'edit_cause')">Cancelar</f7-button>
                            <f7-button round @click="updateInfo($event, 'cause', 'edit_cause')">Guardar</f7-button>
                        </f7-segmented>
                    </f7-block>
                </f7-list-item>

                <!-- EFFECTS -->
                <f7-list-item header="Efectos"
                              v-if="!edit_effects"
                              @click="openEdit($event, details.effects, 'edit_effects')"
                              resizable>
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.effects }}</span>
                </f7-list-item>

                <f7-list-item header="Efectos"
                              v-if="edit_effects">
                    <f7-block>
                        <f7-input
                                type="textarea"
                                :value="details.effects"
                                @input="details.effects = $event.target.value"
                        ></f7-input>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEdit($event, 'effects', 'edit_effects')">Cancelar
                            </f7-button>
                            <f7-button round @click="updateInfo($event, 'effects', 'edit_effects')">Guardar
                            </f7-button>
                        </f7-segmented>
                    </f7-block>
                </f7-list-item>

                <!-- NOTES -->
                <f7-list-item header="Notas"
                              v-if="!edit_notes"
                              @click="openEdit($event, details.notes, 'edit_notes')"
                              resizable>
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.notes }}</span>
                </f7-list-item>

                <f7-list-item header="Notas"
                              v-if="edit_notes">
                    <f7-block>
                        <f7-input
                                type="textarea"
                                :value="details.notes"
                                @input="details.notes = $event.target.value"
                        ></f7-input>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEdit($event, 'notes', 'edit_notes')">Cancelar
                            </f7-button>
                            <f7-button round @click="updateInfo($event, 'notes', 'edit_notes')">Guardar
                            </f7-button>
                        </f7-segmented>
                    </f7-block>
                </f7-list-item>

                <!-- DOCTOR -->
                <f7-list-item header="Médico"
                              v-if="!edit_doctor"
                              @click="openEdit($event, details.doctor, 'edit_doctor')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.doctor }}</span>
                </f7-list-item>

                <f7-list-item header="Médico"
                              v-if="edit_doctor">
                    <f7-block>
                        <f7-input
                                type="text"
                                :title="details.doctor"
                                :value="details.doctor"
                                @input="details.doctor = $event.target.value"
                        ></f7-input>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEdit($event, 'doctor', 'edit_doctor')">Cancelar</f7-button>
                            <f7-button round @click="updateInfo($event, 'doctor', 'edit_doctor')">Guardar</f7-button>
                        </f7-segmented>
                    </f7-block>
                </f7-list-item>

                <!-- SQUEMA -->
                <f7-list-item v-for="(field, index) in schema"
                              :key="index"
                              :header="field.label"
                              v-if="field.is_editing == false"
                              @click="openEditSchema($event, index)">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ field.value }}</span>
                </f7-list-item>

                <f7-list-item v-for="(field, index) in schema"
                              :key="index"
                              :header="field.label"
                              v-if="field.is_editing == true">
                    <f7-block>
                        <f7-input
                                :type="field.fieldType"
                                :title="field.name"
                                :value="field.value"
                                @input="field.value = $event.target.value"
                        ></f7-input>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEditSchema($event, index)">Cancelar</f7-button>
                            <f7-button round @click="updateInfoSchema(index)">Guardar</f7-button>
                        </f7-segmented>
                    </f7-block>
                </f7-list-item>

            </f7-list>

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

    // TODO: refactor the hole code as much as possible
    // TODO: try to add an remove the property is_editing in schema objects dynamically
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
                details: [],
                frequencyList: ['Diaria', 'Semanal', 'Mensual', 'Bimensual', 'Trimestral', 'Otros'],
                dayTimeList: ['Mañana', 'Tarde', 'Noche'],
                schema: [],
                edit_name: false,
                edit_image: false,
                edit_lab: false,
                edit_content: false,
                edit_dose: false,
                edit_frequency: false,
                edit_time: false,
                edit_day_time: false,
                edit_start: false,
                edit_end: false,
                edit_cause: false,
                edit_effects: false,
                edit_notes: false,
                edit_doctor: false,
                before_editing: ''
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
