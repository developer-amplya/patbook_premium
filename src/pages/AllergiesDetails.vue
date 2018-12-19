<template>

    <f7-page>

        <f7-navbar title="ALERGIA" back-link="Volver"></f7-navbar>

        <f7-block inner>

            <f7-list media-list>

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
                            <f7-button round @click="updateInfo()">Guardar</f7-button>
                        </f7-segmented>
                    </f7-block>
                </f7-list-item>

                <f7-list-item header="Tipo"
                              @click="openPopup('edit_type')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.type }}</span>
                </f7-list-item>

                <f7-list-item header="Grado"
                              @click="openPopup('edit_degree')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.degree }}</span>
                </f7-list-item>

                <f7-list-item header="Reacción"
                              @click="openPopup('edit_reaction')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.reaction }}</span>
                </f7-list-item>

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
                selectedType: '',
                selectedDegree: '',
                typeList: ['Alimentaria', 'Ambiental', 'Estacional', 'Medicamentos', 'Química', 'Otras'],
                degreeList: ['Leve', 'Moderado', 'Severo'],
                schema: [],
                formData: {},
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
                console.log(param2);
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
                console.log(this.before_editing);
                this.schema[index].is_editing = true;
            },
            cancelEditSchema(event, index) {
                this.schema[index].value = this.before_editing
                this.before_editing = '';
                this.schema[index].is_editing = false;
            },
            updateInfo() {
                axios.put('http://patbookapi.local/api/allergies/' + this.id, {
                    params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                    },
                    name: this.details.name
                })
                    .then((response) => {
                        console.log(response);
                        // TODO: confirm the update is OK
                        this.edit_name = false;
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
                        this.edit_name = false;
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
                    //console.log(JSON.parse(response.data.schema));
                    this.details = response.data;
                    this.selectedType = this.details.type;
                    this.selectedDegree = this.details.degree;
                    this.schema = JSON.parse(response.data.schema);
                    console.log(this.schema);
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
        background-color: #D3698E;
    }
</style>
