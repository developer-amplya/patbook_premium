<template>

    <f7-page>

        <f7-navbar title="ALERGIA" back-link="Volver"></f7-navbar>

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

                <!-- TYPE -->
                <f7-list-item header="Tipo"
                              v-if="!edit_type"
                              @click="openEdit($event, details.type, 'edit_type')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.type }}</span>
                </f7-list-item>

                <f7-list-item header="Tipo"
                              v-if="edit_type">
                    <f7-block>
                        <f7-list>
                            <f7-list-item radio
                                          v-for="(item, index) in typeList"
                                          :key="index"
                                          name="type"
                                          :title="item"
                                          :value="item"
                                          :checked="item === details.type"
                                          @change="details.type = $event.target.value"
                            ></f7-list-item>
                        </f7-list>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEdit($event, 'type', 'edit_type')">Cancelar</f7-button>
                            <f7-button round @click="updateInfo($event, 'type', 'edit_type')">Guardar</f7-button>
                        </f7-segmented>
                    </f7-block>
                </f7-list-item>

                <!-- DEGREE -->
                <f7-list-item header="Grado"
                              v-if="!edit_degree"
                              @click="openEdit($event, details.degree, 'edit_degree')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.degree }}</span>
                </f7-list-item>

                <f7-list-item header="Grado"
                              v-if="edit_degree">
                    <f7-block>
                        <f7-list>
                            <f7-list-item radio
                                          v-for="(item, index) in degreeList"
                                          :key="index"
                                          name="degree"
                                          :title="item"
                                          :value="item"
                                          :checked="item === details.degree"
                                          @change="details.degree = $event.target.value"
                            ></f7-list-item>
                        </f7-list>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEdit($event, 'degree', 'edit_degree')">Cancelar</f7-button>
                            <f7-button round @click="updateInfo($event, 'degree', 'edit_degree')">Guardar</f7-button>
                        </f7-segmented>
                    </f7-block>
                </f7-list-item>

                <!-- REACTION -->
                <f7-list-item header="Reacción"
                              v-if="!edit_reaction"
                              @click="openEdit($event, details.reaction, 'edit_reaction')"
                              resizable>
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.reaction }}</span>
                </f7-list-item>

                <f7-list-item header="Reacción"
                              v-if="edit_reaction">
                    <f7-block>
                        <f7-input
                                type="textarea"
                                :value="details.reaction"
                                @input="details.reaction = $event.target.value"
                        ></f7-input>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEdit($event, 'reaction', 'edit_reaction')">Cancelar
                            </f7-button>
                            <f7-button round @click="updateInfo($event, 'reaction', 'edit_reaction')">Guardar
                            </f7-button>
                        </f7-segmented>
                    </f7-block>
                </f7-list-item>

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
        name: 'AllergiesDetails',
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
                typeList: ['Alimentaria', 'Ambiental', 'Estacional', 'Medicamentos', 'Química', 'Otras'],
                degreeList: ['Leve', 'Moderado', 'Severo'],
                schema: [],
                edit_name: false,
                edit_type: false,
                edit_degree: false,
                edit_reaction: false,
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
                    url: 'http://patbookapi.local/api/allergies/' + this.id,
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
                axios.put('http://patbookapi.local/api/allergies/' + this.id, {
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
                .get('http://patbookapi.local/api/allergies/' + this.id, {
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
    };
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
        background-color: #c36eb5;
    }
</style>
