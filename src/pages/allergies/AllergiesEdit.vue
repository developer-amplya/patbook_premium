<template>

    <f7-page>

        <f7-navbar back-link title="ALERGIAS"></f7-navbar>

        <f7-block inner>

            <f7-card title="REGISTRO DE ALERGIA">
                <f7-list no-hairlines no-hairlines-between>

                    <!-- Name -->
                    <f7-list-input
                            type="text"
                            label="Nombre"
                            :value="details.name"
                            @input="details.name = $event.target.value"
                            clear-button>
                    </f7-list-input>

                    <!-- Type -->
                    <f7-list-item smart-select title="Tipo" :smart-select-params="{ closeOnSelect: true }">
                        <select :name="details.type" v-model="details.type">
                            <option v-for="(item, index) in typeList"
                                    :key="index"
                                    :value="item"
                            >{{ item }}
                            </option>
                        </select>
                        <div class="type item-after"></div>
                    </f7-list-item>

                    <!-- Degree -->
                    <f7-list-item smart-select title="Grado" :smart-select-params="{ closeOnSelect: true }">
                        <select :name="details.degree" v-model="details.degree">
                            <option v-for="(item, index) in degreeList"
                                    :key="index"
                                    :value="item"
                            >{{ item }}
                            </option>
                        </select>
                        <div class="degree item-after"></div>
                    </f7-list-item>

                    <!-- Start date -->
                    <f7-list-item title="Fecha de inicio"></f7-list-item>
                    <f7-list-item class="date-picker">
                        <calendar
                                id="symptoms_start"
                                @change="details.symptoms_start = setDate($event)">
                        </calendar>
                    </f7-list-item>

                    <!-- Reaction -->
                    <f7-list-input
                            type="textarea"
                            label="Reacción"
                            resizable
                            :value="details.reaction"
                            @input="details.reaction = $event.target.value"
                            clear-button>
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
                <f7-list media-list>
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
            <f7-button large raised fill @click="update" class="purple">Guardar</f7-button>

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
        API_PATH, USER_IMAGES_PATH
    } from '../../config.js';
    import CreateCustomField from '../../form_elements/CreateCustomField';
    import ImageSelector from '../../form_elements/ImageSelector';
    import Calendar from '../../form_elements/Calendar';

    export default {
        name: 'AllergiesEdit',
        components: {
            'image-selector': ImageSelector,
            'create-custom-field': CreateCustomField,
            'calendar': Calendar,
        },
        props: [
            'record_id'
        ],
        data() {
            return {
                typeList: ['Alimentaria', 'Ambiental', 'Estacional', 'Medicamentos', 'Química', 'Otras'],
                degreeList: ['Leve', 'Moderado', 'Severo'],
                id: this.record_id,
                field: {
                    type: '',
                    label: '',
                    name: '',
                    value: ''
                },
                details: [],
                schema: [],
                initial_image: null
            };
        },
        mounted() {
            // Fetch data
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

                    // Manually modifying DOM, otherwise select lists don't show the selected value because when data is
                    // mounted there is not fetched data yet
                    this.$$('.type').html(this.details.type);
                    this.$$('.degree').html(this.details.degree);

                    //
                    this.details.symptoms_start = this.reverseDate(this.details.symptoms_start);
                    this.$$('#symptoms_start').attr('value', this.details.symptoms_start);

                    // Setting the initial image value so we can know later if the image was updated
                    this.initial_image = this.details.image;

                    //
                    if(this.details.image !== '' && this.details.image !== null) {
                        this.$$('.image img').attr('src', USER_IMAGES_PATH + this.details.image)
                    }
                });
        },
        methods: {
            setDate: (payload) => {
                let rawDate = payload[0];
                let dd = String(rawDate.getDate()).padStart(2, '0');
                let mm = String(rawDate.getMonth() + 1).padStart(2, '0'); // January is 0!
                let yyyy = rawDate.getFullYear();
                return dd + '-' + mm + '-' + yyyy;
            },
            update() {
                axios.put(API_PATH + 'allergies/' + this.id, {
                /*params: {
                    device_code: sessionStorage.device_code,
                    user_id: sessionStorage.user_id
                    // TODO: encriptar las credenciales?
                },*/
                name: this.details.name,
                type: this.details.type,
                degree: this.details.degree,
                symptoms_start: this.reverseDate(this.details.symptoms_start),
                reaction: this.details.reaction,
                image: this.details.image,
                schema: JSON.stringify(this.schema)
            })
                .then((response) => {

                    // After insert check the existence of an image and different from the initial one
                    if (this.details.image !== '' && this.details.image !== this.initial_image) {
                        this.updateImage();
                    }

                    // Returning to details
                    this.$f7router.navigate('/allergies/' + this.id);
                })
                .catch(function (error) {
                    //console.log(error);
                });
            },
            reverseDate(payload) {
                let date = payload.split("-");
                return date.reverse().join("-");
            },
            setImageURI(e) {
                //console.log('@setImageURI');
                this.details.image = e;
            },
            updateImage(record_id) {
                let uri = encodeURI(API_PATH + 'allergies/update-image');
                let options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = this.details.image.substr(this.details.image.lastIndexOf('/') + 1);
                options.mimeType = "image/jpeg";
                options.httpMethod = "POST";
                options.chunkedMode = true;
                options.params = {
                    id: this.id
                };

                let ft = new FileTransfer();
                ft.upload(this.details.image, uri, this.success, this.error, options);
            },
            success(response) {
                //console.log(response);
            },
            error(response) {
                //console.log(response);
            },
        }
    };
</script>

<style scoped>
    .navbar, .toolbar {
        background-color: #c36eb5;
    }
</style>
