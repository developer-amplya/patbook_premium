<template>

    <f7-page>

        <f7-navbar title="PRUEBAS DIAGNÓSTICAS" back-link="Volver"></f7-navbar>

        <f7-block inner>

            <f7-card title="REGISTRO DE PRUEBA DIAGNÓSTICA">
                <f7-list media-list>

                    <!-- Name -->
                    <f7-list-item header="Nombre"
                                  @click="openInputPopover($event, 'text', 'Nombre', 'name', details.name)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.name }}</span>
                    </f7-list-item>

                    <!-- TEST -->
                    <f7-list-item header="Prueba"
                                  @click="openSelectPopover($event, 'testsList', 'Prueba', 'test', details.test)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.test }}</span>
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

                    <!-- REQUIREMENTS -->
                    <f7-list-item header="Requisitos previos"
                                  @click="openInputPopover($event, 'text', 'Requisitos previos', 'requirements', details.requirements)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.requirements }}</span>
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

                    <!-- Doctor -->
                    <f7-list-item header="Médico"
                                  @click="openInputPopover($event, 'text', 'Médico', 'doctor', details.doctor)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.doctor }}</span>
                    </f7-list-item>

                </f7-list>
            </f7-card>

            <f7-card title="RESULTADOS">
                <f7-list media-list>
                    <!-- RESULTS -->
                    <f7-list-item header="Resultado"
                                  @click="openInputPopover($event, 'textarea', 'Resultado', 'results', details.results)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.results }}</span>
                    </f7-list-item>

                    <!-- IMAGE -->
                </f7-list>
            </f7-card>

            <f7-card title="CAMPOS PERSONALIZADOS">
                <f7-list media-list>
                    <!-- SCHEMA -->
                    <f7-list-item v-for="(field, index) in schema"
                                  :key="index"
                                  :header="field.label"
                                  v-if="field.is_editing == false"
                                  @click="openEditSchema($event, index)">
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
                    <f7-button round @click="updateInfo">Guardar</f7-button>
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
        name: 'DiagnosticTestsDetails',
        components: {
            SelectList,
            TextInput,
            'create-custom-field': CreateCustomField
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
                    value: ''
                },
                details: [],
                schema: [],
                isSchema: false
            };
        },
        mounted() {
            axios
                .get(API_PATH + 'diagnostic-tests/' + this.id, {
                    params: {
                        // device_code: sessionStorage.device_code,
                        // user_id: sessionStorage.user_id
                    }
                })
                .then(response => {
                    this.details = response.data;
                    this.schema = JSON.parse(response.data.schema);
                });
        },
        methods: {
            openInputPopover($event, type, label, name, value) {
                console.log('@openInputPopover');
                this.field.type = type;
                this.field.label = label;
                this.field.name = name;
                this.field.value = value;
                this.$refs.EditInputField.open();
            },
            openSelectPopover($event, type, label, name, value) {
                console.log('@openSelectPopover');
                this.field.type = type;
                this.field.label = label;
                this.field.name = name;
                this.field.value = value;
                this.$refs.EditSelectField.open();
            },
            openEditSchema($event, index, field) {
                console.log('@openEditSchema');
                console.log(this.isSchema);
                this.isSchema = true;
                console.log(this.isSchema);
                if (field.type === 'select') {
                    //this.openSelectPopover($event, 'allergiesDegreeList', 'Grado', 'degree', details.degree);
                } else {
                    this.openInputPopover($event, field.type, field.label, field.label, field.value);
                }
            },
            setInputValue(e) {
                console.log('@setInputValue');
                this.field.value = e;
            },
            setSelectValue(e) {
                console.log('@setSelectValue');
                this.field.value = e;
                this.updateInfo(event, this.field.name);
                this.$refs.EditSelectField.close();
            },
            updateInfo() {
                console.log('@updateInfo');

                console.log(this.isSchema);
                if (this.isSchema === true) {
                    this.updateInfoSchema(0);
                }

                /* We need to create first an object an then to assign the key name as an array key, because assigning
                 dynamic key names in an object does not work */
                let data = {};
                data[this.field.name] = this.field.value;

                axios({
                    method: 'PUT',
                    url: API_PATH + 'diagnostic-tests/' + this.id,
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
                        console.log(error);
                    });
            },
            updateInfoSchema(index) {
                this.schema[index].is_editing = false;
                axios.put(API_PATH + 'diagnostic-tests/' + this.id, {
                    params: {
                        // device_code: sessionStorage.device_code,
                        // user_id: sessionStorage.user_id
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
        background-color: #FF3183;
    }
</style>
