<template>

    <f7-page>

        <f7-navbar>
            <f7-nav-left>
                <f7-link href="/medical-visit">
                    <f7-icon material="arrow_back"></f7-icon>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title title="VISITA MÉDICA"></f7-nav-title>
            <f7-nav-right>
                <span
                        class="navbar-icon-right"
                        @click="replicateRecord"
                ><img src="../../assets/ic_content_copy_white_24dp.png"></span>
                <span
                        class="navbar-icon-right"
                        @click=""
                ><img src="../../assets/ic_share_white_24dp.png"></span>
            </f7-nav-right>
        </f7-navbar>

        <f7-block inner>

            <f7-card title="REGISTRO DE VISITA MÉDICA">
                <f7-list media-list>

                    <!-- Description -->
                    <f7-list-item header="Descripción"
                                  @click="openInputPopover($event, 'textarea', 'Descripción', 'description', details.description)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.description }}</span>
                    </f7-list-item>

                    <!-- Doctor -->
                    <f7-list-item header="Médico"
                                  @click="openInputPopover($event, 'text', 'Médico', 'doctor', details.doctor)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.doctor }}</span>
                    </f7-list-item>

                    <!-- LOCATION -->
                    <f7-list-item header="Lugar"
                                  @click="openInputPopover($event, 'text', 'Lugar', 'location', details.location)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.location }}</span>
                    </f7-list-item>

                    <!-- ADDRESS -->
                    <f7-list-item header="Dirección"
                                  @click="openInputPopover($event, 'text', 'Dirección', 'address', details.address)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.address }}</span>
                    </f7-list-item>

                    <!-- PHONE -->
                    <f7-list-item header="Teléfono"
                                  @click="openInputPopover($event, 'text', 'Teléfono', 'phone', details.phone)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.phone }}</span>
                    </f7-list-item>

                    <!-- SPECIALITY -->
                    <f7-list-item header="Especialidad"
                                  @click="openSelectPopover($event, 'specialityList', 'Especialidad', 'speciality', details.speciality)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.speciality }}</span>
                    </f7-list-item>

                    <!-- Date -->
                    <f7-list-item header="Fecha"
                                  @click="openInputPopover($event, 'date', 'Fecha', 'date', details.date)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.date }}</span>
                    </f7-list-item>

                    <!-- Time -->
                    <f7-list-item header="Hora"
                                  @click="openInputPopover($event, 'time', 'Hora', 'time', details.time)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.time }}</span>
                    </f7-list-item>

                    <!-- CAUSE -->
                    <f7-list-item header="Motivo"
                                  @click="openInputPopover($event, 'text', 'Motivo', 'cause', details.cause)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.cause }}</span>
                    </f7-list-item>

                    <!-- CONTRIBUTED -->
                    <f7-list-item header="Pruebas e informes aportados"
                                  @click="openInputPopover($event, 'textarea', 'Pruebas e informes aportados', 'contributed', details.contributed)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.contributed }}</span>
                    </f7-list-item>

                    <!-- PRESCRIPTION -->
                    <f7-list-item header="Prescripción - Medicación"
                                  @click="openInputPopover($event, 'text', 'Prescripción - Medicación', 'prescription', details.prescription)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.prescription }}</span>
                    </f7-list-item>

                    <!-- TREATMENT -->
                    <f7-list-item header="Prescripción - Tratamiento"
                                  @click="openInputPopover($event, 'textarea', 'Prescripción - Tratamiento', 'treatment', details.treatment)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.treatment }}</span>
                    </f7-list-item>

                    <!-- DIAGNOSTIC TESTS -->
                    <f7-list-item header="Prescripción - Pruebas diagnósticas"
                                  @click="openInputPopover($event, 'text', 'Prescripción - Pruebas diagnósticas', 'diagnostic_tests', details.diagnostic_tests)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.diagnostic_tests }}</span>
                    </f7-list-item>

                    <!-- RECOMENDATIONS -->
                    <f7-list-item header="Recomendaciones"
                                  @click="openInputPopover($event, 'textarea', 'Recomendaciones', 'recomendations', details.recomendations)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.recomendations }}</span>
                    </f7-list-item>


                    <!-- DIAGNOSTIC -->
                    <f7-list-item header="Diagnóstico"
                                  @click="openInputPopover($event, 'text', 'Diagnóstico', 'diagnostic', details.diagnostic)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.diagnostic }}</span>
                    </f7-list-item>

                    <!-- DISEASE -->
                    <f7-list-item header="Enfermedad"
                                  @click="openInputPopover($event, 'text', 'Enfermedad', 'disease', details.disease)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.disease }}</span>
                    </f7-list-item>

                    <!-- COMMENTS -->
                    <f7-list-item header="Comentarios"
                                  @click="openInputPopover($event, 'textarea', 'Comentarios', 'comments', details.comments)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.comments }}</span>
                    </f7-list-item>

                    <!-- Date -->
                    <f7-list-item header="Fecha"
                                  @click="openInputPopover($event, 'date', 'Fecha', 'nex_visit_date', details.nex_visit_date)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.nex_visit_date }}</span>
                    </f7-list-item>

                    <!-- Time -->
                    <f7-list-item header="Hora"
                                  @click="openInputPopover($event, 'time', 'Hora', 'next_visit_time', details.next_visit_time)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.next_visit_time }}</span>
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

                <f7-button popup-open=".custom-field">NUEVO CAMPO PERSONALIZADO</f7-button>
            </f7-card>

        </f7-block>

        <!-- Input popover -->
        <f7-popover ref="EditInputField" :close="isSchema = false">
            <text-input :type="field.type"
                        :label="field.label"
                        :name="field.name"
                        :value="field.value"
                        @input="setInputValue"></text-input>
            <f7-block>
                <f7-segmented round raised>
                    <f7-button round @click="$refs.EditInputField.close()">Cancelar</f7-button>
                    <f7-button round @click="update">Guardar</f7-button>
                </f7-segmented>
            </f7-block>
        </f7-popover>

        <!-- Select popup -->
        <f7-popup ref="EditSelectField" :close="isSchema = false">
            <select-list :type="field.type"
                         :label="field.label"
                         :name="field.name"
                         :value="field.value"
                         @select="setSelectValue"></select-list>
        </f7-popup>

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
    import SelectList from '../../form_elements/SelectList';
    import TextInput from '../../form_elements/TextInput';
    import CreateCustomField from '../../form_elements/CreateCustomField';

    export default {
        name: 'MedicalVisitsDetails',
        components: {
            SelectList,
            TextInput,
            'create-custom-field': CreateCustomField
        },
        props: [
            'record_id'
        ],
        data() {
            return {
                id: this.record_id,
                field: {
                    type: '',
                    label: '',
                    name: '',
                    value: ''
                },
                details: [],
                schema: [],
                schema_active_index: null
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
                    this.selectedType = this.details.type;
                    this.selectedDegree = this.details.degree;
                    this.schema = JSON.parse(response.data.schema);
                });
        },
        methods: {
            openInputPopover($event, type, label, name, value) {
                //console.log('@openInputPopover');
                this.field.type = type;
                this.field.label = label;
                this.field.name = name;
                this.field.value = value;
                this.$refs.EditInputField.open();
            },
            openSelectPopover($event, type, label, name, value) {
                //console.log('@openSelectPopover');
                this.field.type = type;
                this.field.label = label;
                this.field.name = name;
                this.field.value = value;
                this.$refs.EditSelectField.open();
            },
            openEditSchema($event, index, field) {

                this.schema_active_index = index;

                if (field.type === 'select') {
                    //this.openSelectPopover($event, 'allergiesDegreeList', 'Grado', 'degree', details.degree);
                } else {
                    // Using 'schema" word as 'name' to identify schema fields
                    this.openInputPopover($event, field.type, field.label, 'schema', field.value);
                }
            },
            setInputValue(e) {
                //console.log('@setInputValue');
                this.field.value = e;
            },
            setSelectValue(e) {
                //console.log('@setSelectValue');
                this.field.value = e;
                this.updateInfo(event, this.field.name);
                this.$refs.EditSelectField.close();
            },
            update() {
                //console.log('@update');
                if (this.field.name === 'schema') {
                    this.updateInfoSchema(this.schema_active_index);
                } else {
                    this.updateInfo();
                }
            },
            updateInfo() {
                //console.log('@updateInfo');

                /* We need to create first an object an then to assign the key name as an array key, because assigning
                 dynamic key names in an object does not work */
                let data = {};
                data[this.field.name] = this.field.value;

                axios({
                    method: 'PUT',
                    url: API_PATH + 'medical-visits/' + this.id,
                    params: {
                        // device_code: sessionStorage.device_code,
                        // user_id: sessionStorage.user_id
                    },
                    data: data
                })
                    .then((response) => {
                        if (response.data.result === 'OK') {
                            // Update details
                            this.details[this.field.name] = this.field.value;
                            // Close popover
                            this.$refs.EditInputField.close();
                        } else {
                            // TODO ??
                        }
                    })
                    .catch(function (error) {
                        //console.log(error);
                    });
            },
            updateInfoSchema(index) {

                this.schema_active_index = null;

                this.schema[index] = {
                    "label": this.field.label,
                    "type": this.field.type,
                    "value": this.field.value
                };

                axios.put(API_PATH + 'medical-visits/' + this.id, {
                    params: {
                        // device_code: sessionStorage.device_code,
                        // user_id: sessionStorage.user_id
                    },
                    schema: JSON.stringify(this.schema)
                })
                    .then((response) => {
                        if (response.data.result === 'OK') {
                            // Update schema
                            this.$forceUpdate();
                            // Close popover
                            this.$refs.EditInputField.close();
                        } else {
                            // TODO ??
                        }
                    })
                    .catch(function (error) {
                        //console.log(error);
                    });
            },
            replicateRecord() {
                this.$f7.dialog.confirm('Se creará un nuevo registro a partir del que estás viendo y podrás editarlo inmediatamente', '¿Replicar este registro?', () => {
                    axios
                        .get(API_PATH + 'medical-visits/replicate/' + this.id, {
                            params: {
                                // device_code: sessionStorage.device_code,
                                // user_id: sessionStorage.user_id
                            }
                        })
                        .then(response => {
                            this.id = response.data._id; // The ID of the new record
                            this.details = response.data;
                            this.schema = JSON.parse(response.data.schema);

                            // Incrementing counting state
                            this.$store.dispatch('incrementDocumentCounting', 'medical_visits');
                        });
                });
            }
        }
    }
    ;
</script>

<style scoped>

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
        background-color: #FF7E3A;
    }
</style>
