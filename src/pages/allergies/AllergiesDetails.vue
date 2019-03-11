<template>

    <f7-page>

        <f7-navbar title="ALERGIAS" back-link="Volver"></f7-navbar>

        <f7-block inner>

            <f7-card title="REGISTRO DE ALERGIA">
                <f7-list media-list>

                    <!-- NAME -->
                    <f7-list-item header="Nombre"
                                  @click="openInputPopover($event, 'text', 'Nombre', 'name', details.name)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.name }}</span>
                    </f7-list-item>

                    <!-- TYPE -->
                    <f7-list-item header="Tipo"
                                  @click="openSelectPopover($event, 'allergiesTypeList', 'Tipo', 'type', details.type)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.type }}</span>
                    </f7-list-item>

                    <!-- DEGREE -->
                    <f7-list-item header="Grado"
                                  @click="openSelectPopover($event, 'allergiesDegreeList', 'Grado', 'degree', details.degree)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.degree }}</span>
                    </f7-list-item>

                    <!-- REACTION -->
                    <f7-list-item header="Reacción"
                                  @click="openInputPopover($event, 'textarea', 'Reacción', 'reaction', details.reaction)"
                                  resizable>
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.reaction }}</span>
                    </f7-list-item>
                </f7-list>
            </f7-card>

            <f7-card title="CAMPOS PERSONALIZADOS">
                <f7-list media-list>
                    <!-- SCHEMA -->
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
        name: 'AllergiesDetails',
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
            console.log('-> AllergiesDetails');
            console.log('@mounted');

            axios
                .get(API_PATH + 'allergies/' + this.id, {
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

                /* We need to create first an object and then to assign the key name as an array key, because assigning
                 dynamic key names in an object does not work */
                let data = {};
                data[this.field.name] = this.field.value;

                axios({
                    method: 'PUT',
                    url: API_PATH + 'allergies/' + this.id,
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
                console.log('@updateInfoSchema');

                axios.put(API_PATH + 'allergies/' + this.id, {
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
    };
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
        background-color: #c36eb5;
    }
</style>
