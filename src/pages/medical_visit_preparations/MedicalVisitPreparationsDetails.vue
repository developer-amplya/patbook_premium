<template>

    <f7-page>

        <f7-navbar title="PREPARACIÓN VISITA MÉDICA" back-link="Volver"></f7-navbar>

        <f7-block inner>

            <f7-list media-list>

                <!-- NAME -->
                <f7-list-item header="Nombre"
                              v-if="!edit_name"
                              @click="openEdit($event, details.name, 'edit_name')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.name }}</span>
                </f7-list-item>

                <!-- SYMPTOMS DESCRIPTION -->
                <f7-list-item header="Descripción de los síntomas"
                              v-if="!edit_symptoms_description"
                              @click="openEdit($event, details.symptoms_description, 'edit_symptoms_description')"
                              resizable>
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.symptoms_description }}</span>
                </f7-list-item>

                <!-- INTENSITY -->
                <f7-list-item header="Intensidad"
                              v-if="!edit_intensity"
                              @click="openEdit($event, details.intensity, 'edit_intensity')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.intensity }}</span>
                </f7-list-item>

                <!-- FREQUENCY -->
                <f7-list-item header="Frecuencia"
                              v-if="!edit_frequency"
                              @click="openEdit($event, details.frequency, 'edit_frequency')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.frequency }}</span>
                </f7-list-item>

                <!-- DATE -->
                <f7-list-item header="Fecha"
                              v-if="!edit_date"
                              @click="openEdit($event, details.date, 'edit_date')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.date }}</span>
                </f7-list-item>

                <!-- ACTIONS -->
                <f7-list-item header="Acciones preventivas"
                              v-if="!edit_actions"
                              @click="openEdit($event, details.actions, 'edit_actions')"
                              resizable>
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.actions }}</span>
                </f7-list-item>

                <!-- NOTES -->
                <f7-list-item header="Notas"
                              v-if="!edit_notes"
                              @click="openEdit($event, details.notes, 'edit_notes')"
                              resizable>
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.notes }}</span>
                </f7-list-item>

                <!-- DOCTOR -->

                <!-- QUESTIONS -->
                <f7-list-item header="Preguntas"
                              v-if="!edit_questions"
                              @click="openEdit($event, details.questions, 'edit_questions')"
                              resizable>
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.questions }}</span>
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
        name: 'MedicalVisitPreparationsDetails',
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
                intensityList: ['Leve', 'Moderada', 'Severa'],
                schema: [],
                edit_name: false,
                edit_symptoms_description: false,
                edit_intensity: false,
                edit_frequency: false,
                edit_date: false,
                edit_actions: false,
                edit_notes: false,
                edit_doctor: false,
                edit_questions: false,
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
                    url: API_PATH + 'medical-visit-preparations/' + this.id,
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
                axios.put(API_PATH + 'medical-visit-preparations/' + this.id, {
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
                .get(API_PATH + 'medical-visit-preparations/' + this.id, {
                    params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                    }
                })
                .then(response => {
                    this.details = response.data;
                    this.selectedType = this.details.type;
                    this.selectedDegree = this.details.degree;
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
        background-color: #6F715E;
    }
</style>
