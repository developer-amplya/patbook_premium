<template>

    <f7-page>

        <f7-navbar title="PRUEBA DIAGNÓSTICA" back-link="Volver"></f7-navbar>

        <f7-block inner>

            <f7-list media-list>

                <!-- NAME -->
                <f7-list-item header="Nombre de la prueba"
                              v-if="!edit_name"
                              @click="openEdit($event, details.name, 'edit_name')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.name }}</span>
                </f7-list-item>

                <f7-list-item header="Nombre de la prueba"
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

                <!-- TEST -->
                <f7-list-item header="Prueba"
                              v-if="!edit_test"
                              @click="openEdit($event, details.test, 'edit_test')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.test }}</span>
                </f7-list-item>

                <f7-list-item header="Prueba"
                              v-if="edit_test">
                    <f7-block>
                        <f7-list>
                            <f7-list-item radio
                                          v-for="(item, index) in testsList"
                                          :key="index"
                                          name="test"
                                          :title="item"
                                          :value="item"
                                          :checked="item === details.test"
                                          @change="details.test = $event.target.value"
                            ></f7-list-item>
                        </f7-list>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEdit($event, 'test', 'edit_test')">Cancelar</f7-button>
                            <f7-button round @click="updateInfo($event, 'test', 'edit_test')">Guardar</f7-button>
                        </f7-segmented>
                    </f7-block>
                </f7-list-item>

                <!-- DATE -->
                <f7-list-item header="Fecha"
                              v-if="!edit_date"
                              @click="openEdit($event, details.date, 'edit_date')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.date }}</span>
                </f7-list-item>

                <!-- TIME -->
                <f7-list-item header="Hora"
                              v-if="!edit_time"
                              @click="openEdit($event, details.time, 'edit_time')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.time }}</span>
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

                <!-- REQUIREMENTS -->
                <f7-list-item header="Requisitos previos"
                              v-if="!edit_requirements"
                              @click="openEdit($event, details.requirements, 'edit_requirements')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.requirements }}</span>
                </f7-list-item>

                <f7-list-item header="Requisitos previos"
                              v-if="edit_requirements">
                    <f7-block>
                        <f7-input
                                type="text"
                                :title="details.requirements"
                                :value="details.requirements"
                                @input="details.requirements = $event.target.value"
                        ></f7-input>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEdit($event, 'requirements', 'edit_requirements')">Cancelar</f7-button>
                            <f7-button round @click="updateInfo($event, 'requirements', 'edit_requirements')">Guardar</f7-button>
                        </f7-segmented>
                    </f7-block>
                </f7-list-item>

                <!-- LOCATION -->
                <f7-list-item header="Lugar"
                              v-if="!edit_location"
                              @click="openEdit($event, details.location, 'edit_location')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.location }}</span>
                </f7-list-item>

                <f7-list-item header="Lugar"
                              v-if="edit_location">
                    <f7-block>
                        <f7-input
                                type="text"
                                :title="details.location"
                                :value="details.location"
                                @input="details.location = $event.target.value"
                        ></f7-input>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEdit($event, 'location', 'edit_location')">Cancelar</f7-button>
                            <f7-button round @click="updateInfo($event, 'location', 'edit_location')">Guardar</f7-button>
                        </f7-segmented>
                    </f7-block>
                </f7-list-item>

                <!-- ADDRESS -->
                <f7-list-item header="Dirección"
                              v-if="!edit_address"
                              @click="openEdit($event, details.address, 'edit_address')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.address }}</span>
                </f7-list-item>

                <f7-list-item header="Dirección"
                              v-if="edit_address">
                    <f7-block>
                        <f7-input
                                type="text"
                                :title="details.address"
                                :value="details.address"
                                @input="details.address = $event.target.value"
                        ></f7-input>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEdit($event, 'address', 'edit_address')">Cancelar</f7-button>
                            <f7-button round @click="updateInfo($event, 'address', 'edit_address')">Guardar</f7-button>
                        </f7-segmented>
                    </f7-block>
                </f7-list-item>

                <!-- PHONE -->
                <f7-list-item header="Teléfono"
                              v-if="!edit_phone"
                              @click="openEdit($event, details.phone, 'edit_phone')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.phone }}</span>
                </f7-list-item>

                <f7-list-item header="Teléfono"
                              v-if="edit_phone">
                    <f7-block>
                        <f7-input
                                type="text"
                                :title="details.phone"
                                :value="details.phone"
                                @input="details.phone = $event.target.value"
                        ></f7-input>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEdit($event, 'phone', 'edit_phone')">Cancelar</f7-button>
                            <f7-button round @click="updateInfo($event, 'phone', 'edit_phone')">Guardar</f7-button>
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

                <!-- RESULTS -->
                <f7-list-item header="Resultado"
                              v-if="!edit_results"
                              @click="openEdit($event, details.results, 'edit_results')"
                              resizable>
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.results }}</span>
                </f7-list-item>

                <f7-list-item header="Resultado"
                              v-if="edit_results">
                    <f7-block>
                        <f7-input
                                type="textarea"
                                :value="details.results"
                                @input="details.results = $event.target.value"
                        ></f7-input>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEdit($event, 'results', 'edit_results')">Cancelar
                            </f7-button>
                            <f7-button round @click="updateInfo($event, 'results', 'edit_results')">Guardar
                            </f7-button>
                        </f7-segmented>
                    </f7-block>
                </f7-list-item>

                <!-- IMAGE -->

                <!-- SCHEMA -->
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
    import SelectList from '../form_elements/SelectList';
    import TextInput from '../form_elements/TextInput';
    import F7ListItem from 'framework7-vue/src/components/list-item';

    // TODO: refactor the hole code as much as possible
    // TODO: try to add an remove the property is_editing in schema objects dynamically
    export default {
        name: 'DiagnosticTestsDetails',
        components: {
            F7ListItem,
            SelectList,
            TextInput
        },
        props: [
            'id'
        ],
        data() {
            return {
                details: [],
                testsList: ['Análisis de sangre', 'Análisis de orina', 'Endoscopia', 'Mamografía', 'Rayos X', 'TAC', 'PET', 'Colonoscopia', 'Densiometría ósea', 'IRM', 'ECG', 'EEF', 'Ultrasonido', 'Espirometría', 'Otros'],
                schema: [],
                formData: {},
                edit_name: false,
                edit_test: false,
                edit_date: false,
                edit_time: false,
                edit_cause: false,
                edit_requirements: false,
                edit_location: false,
                edit_address: false,
                edit_phone: false,
                edit_doctor: false,
                edit_results: false,
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
                    url: 'http://patbookapi.local/api/diagnostic-tests/' + this.id,
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
                axios.put('http://patbookapi.local/api/diagnostic-tests/' + this.id, {
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
                .get('http://patbookapi.local/api/diagnostic-tests/' + this.id, {
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
        background-color: #FF3183;
    }
</style>
