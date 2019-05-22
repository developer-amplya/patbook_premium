<template>
    <f7-page class="allergies-page">
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

                    <!-- Start date -->
                    <f7-list-item title="Fecha de inicio"></f7-list-item>
                    <f7-list-item class="date-picker">
                        <calendar
                                id="symptoms_start"
                                @change="symptoms_start = setDate($event)">
                        </calendar>
                    </f7-list-item>

                    <!-- Reaction -->
                    <f7-list-input
                            type="textarea"
                            label="Reacción"
                            resizable
                            :value="reaction"
                            @input="reaction = $event.target.value">
                    </f7-list-input>

                    <!-- Image -->
                    <f7-list-item title="Imagen"></f7-list-item>
                    <f7-list-item>
                        <image-selector @image_selected="setImageURI"></image-selector>
                    </f7-list-item>
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
    import ImageSelector from '../../form_elements/ImageSelector';
    import Calendar from '../../form_elements/Calendar';

    export default {
        name: 'AllergiesInsert',
        components: {
            'create-custom-field': CreateCustomField,
            'image-selector': ImageSelector,
            'calendar': Calendar
        },
        data() {
            return {
                typeList: ['Alimentaria', 'Ambiental', 'Estacional', 'Medicamentos', 'Química', 'Otras'],
                degreeList: ['Leve', 'Moderado', 'Severo'],
                name: '',
                type: '',
                degree: '',
                symptoms_start: '',
                reaction: '',
                image: '',
                schema: []
            };
        },
        computed: mapGetters(['getUserID']),
        methods: {
            setDate: (payload) => {
                let rawDate = payload[0];
                let dd = String(rawDate.getDate()).padStart(2, '0');
                let mm = String(rawDate.getMonth() + 1).padStart(2, '0'); // January is 0!
                let yyyy = rawDate.getFullYear();
                return dd + '-' + mm + '-' + yyyy;
            },
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
                    symptoms_start: this.reverseDate(this.symptoms_start),
                    reaction: this.reaction,
                    image: this.image,
                    schema: JSON.stringify(this.schema)
                })
                    .then((response) => {
                        // Incrementing counting state
                        this.$store.dispatch('incrementDocumentCounting', 'allergies');

                        // After insert check the existence of an image
                        if (this.image !== '') {
                            this.uploadImage(response.data.recordID.$oid);
                        }

                        // Returning to list
                        this.$f7router.navigate('/allergies');
                    })
                    .catch(function (error) {
                        //console.log(error);
                    });
            },
            reverseDate(payload) {
                if (payload === undefined || payload === null) {
                    return;
                }
                let date = payload.split("-");
                return date.reverse().join("-");
            },
            setImageURI(e) {
                //console.log('@setImageURI');
                this.image = e;
            },
            uploadImage(record_id) {
                let uri = encodeURI(API_PATH + 'allergies/update-image');
                let options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = this.image.substr(this.image.lastIndexOf('/') + 1);
                options.mimeType = "image/jpeg";
                options.httpMethod = "POST";
                options.chunkedMode = true;
                options.params = {
                    id: record_id
                };

                var ft = new FileTransfer();
                ft.upload(this.image, uri, this.success, this.error, options);
            },
            success(response) {
                //console.log(response);
            },
            error(response) {
                //console.log(response);
            }
        }
    };
</script>

<style>
    .purple-page .navbar, .purple-page .toolbar {
        background-color: #c36eb5;
    }
</style>
