<template>
    <f7-page>
        <f7-navbar title="ALERGIAS" back-link></f7-navbar>
        <f7-block inner>

            <f7-card title="REGISTRO DE ALERGIA">
                <f7-list>
                    <!-- Name -->
                    <f7-list-input
                            type="text"
                            label="Nombre"
                            :value="name"
                            @input="name = $event.target.value"
                            clear-button>
                    </f7-list-input>

                    <!-- Type -->
                    <f7-list-item smart-select title="Tipo" :smart-select-params="{ closeOnSelect: true }">
                        <select :name="type" v-model="type">
                            <option v-for="(item, index) in typeList"
                                    :key="index"
                                    :value="item"
                            >{{ item }}
                            </option>
                        </select>
                    </f7-list-item>

                    <!-- Degree -->
                    <f7-list-item smart-select title="Grado" :smart-select-params="{ closeOnSelect: true }">
                        <select :name="degree" v-model="degree">
                            <option v-for="(item, index) in degreeList"
                                    :key="index"
                                    :value="item"
                            >{{ item }}
                            </option>
                        </select>
                    </f7-list-item>

                    <!-- Reaction -->
                    <f7-list-input
                            type="textarea"
                            label="Reacción"
                            resizable
                            :value="reaction"
                            @input="reaction = $event.target.value">
                    </f7-list-input>
                </f7-list>
            </f7-card>

            <br>

            <f7-card title="CAMPOS PERSONALIZADOS">
                <f7-list>
                    <!-- SCHEMA -->
                    <f7-list-input
                            v-for="(field, index) in schema"
                            :key="index"
                            :label="field.label"
                            :type="field.type"
                            :value="field.value"
                            @input="field.value = $event.target.value">
                    </f7-list-input>
                </f7-list>

                <f7-button popup-open=".custom-field">NUEVO CAMPO PERSONALIZADO</f7-button>
            </f7-card>

            <br>

            <!-- Submit -->
            <f7-button large raised fill class="purple" @click="insert()">Guardar</f7-button>

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

    export default {
        name: 'AllergiesInsert',
        components: {
            'create-custom-field': CreateCustomField
        },
        data() {
            return {
                typeList: ['Alimentaria', 'Ambiental', 'Estacional', 'Medicamentos', 'Química', 'Otras'],
                degreeList: ['Leve', 'Moderado', 'Severo'],
                name: '',
                type: '',
                degree: '',
                reaction: '',
                schema: []
            };
        },
        computed: mapGetters(['getUserID']),
        methods: {
            insert() {
                axios.post(API_PATH + 'allergies', {
                    /*params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                        // TODO: encriptar las credenciales?
                    },*/
                    user_id: this.getUserID,
                    name: this.name,
                    type: this.type,
                    degree: this.degree,
                    reaction: this.reaction,
                    schema: JSON.stringify(this.schema)
                })
                    .then((response) => {
                        // Incrementing counting state
                        this.$store.dispatch('incrementDocumentCounting', 'allergies');
                        // Returning to list
                        this.$f7router.navigate('/allergies');
                    })
                    .catch(function (error) {
                        //console.log(error);
                    });
            },
        }
    };
</script>

<style scoped>
    .navbar {
        background-color: #c36eb5;
    }
</style>
