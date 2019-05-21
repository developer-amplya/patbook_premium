<template>

    <f7-page hide-toolbar-on-scroll>

        <f7-navbar back-link title="PRUEBAS DIAGNÓSTICAS"></f7-navbar>

        <f7-block inner>

            <f7-card title="REGISTRO DE PRUEBA DIAGNÓSTICA">
                <f7-list no-hairlines no-hairlines-between>

                    <!-- Name -->
                    <f7-list-item smart-select title="Nombre" :smart-select-params="{ closeOnSelect: true }">
                        <select :name="details.name" v-model="details.name">
                            <option v-for="(item, index) in testsList"
                                    :key="index"
                                    :value="item"
                            >{{ item }}
                            </option>
                        </select>
                        <div class="dt-name item-after"></div>
                    </f7-list-item>

                    <!-- Date & Time -->
                    <f7-list-item>
                        <f7-row>
                            <f7-col>
                                <calendar
                                        id="diagnostic_test_date"
                                        label="Fecha"
                                        @change="details.date = setDate($event)">
                                </calendar>
                            </f7-col>
                            <f7-col>
                                <f7-list-input
                                        type="time"
                                        label="Hora"
                                        :value="details.time"
                                        @input="details.time = $event.target.value"
                                ></f7-list-input>
                            </f7-col>
                        </f7-row>
                    </f7-list-item>

                    <!-- Cause -->
                    <f7-list-input
                            type="text"
                            label="Motivo"
                            :value="details.cause"
                            @input="details.cause = $event.target.value"
                            clear-button>
                    </f7-list-input>

                    <!-- Requirements -->
                    <f7-list-input
                            type="text"
                            label="Requisitos previos"
                            :value="details.requirements"
                            @input="details.requirements = $event.target.value"
                            clear-button>
                    </f7-list-input>

                    <!-- Location -->
                    <f7-list-input
                            type="text"
                            label="Lugar"
                            :value="details.location"
                            @input="details.location = $event.target.value"
                            clear-button>
                    </f7-list-input>

                    <!-- Address -->
                    <f7-list-input
                            type="text"
                            label="Dirección"
                            :value="details.address"
                            @input="details.address = $event.target.value"
                            clear-button>
                    </f7-list-input>

                    <!-- Phone -->
                    <f7-list-input
                            type="text"
                            label="Teléfono"
                            :value="details.phone"
                            @input="details.phone = $event.target.value"
                            clear-button>
                    </f7-list-input>

                    <!-- Doctor -->
                    <f7-list-input
                            type="text"
                            label="Médico"
                            :value="details.doctor"
                            @input="details.doctor = $event.target.value"
                            clear-button>
                    </f7-list-input>
                </f7-list>
            </f7-card>

            <br>

            <f7-card title="RESULTADOS">
                <f7-list>
                    <!-- Results -->
                    <f7-list-input
                            type="textarea"
                            label="Resultados"
                            :value="details.results"
                            @input="details.results = $event.target.value"
                    >
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
                            @input="field.value = $event.target.value"
                    >
                    </f7-list-input>

                </f7-list>

                <f7-button popup-open=".custom-field">NUEVO CAMPO PERSONALIZADO</f7-button>
            </f7-card>

            <br>

            <!-- Submit -->
            <f7-button large raised fill class="pink" @click="update">Guardar</f7-button>

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
        name: 'DiagnosticTestsEdit',
        components: {
            'create-custom-field': CreateCustomField,
            'image-selector': ImageSelector,
            'calendar': Calendar
        },
        props: [
            'record_id'
        ],
        data() {
            return {
                testsList: ['Análisis de sangre', 'Análisis de orina', 'Endoscopia', 'Mamografía', 'Rayos X', 'TAC', 'PET', 'Colonoscopia', 'Densiometría ósea', 'IRM', 'ECG', 'EEF', 'Ultrasonido', 'Espirometría', 'Otros'],
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

                    //
                    this.$$('.dt-name').html(this.details.name);

                    //
                    this.details.date = this.reverseDate(this.details.date);
                    this.$$('#diagnostic_test_date').attr('value', this.details.date);

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
                axios.put(API_PATH + 'diagnostic-tests/' + this.id, {
                    /*params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                        // TODO: encriptar las credenciales?
                    },*/
                    name: this.details.name,
                    date: this.reverseDate(this.details.date),
                    time: this.details.time,
                    cause: this.details.cause,
                    requirements: this.details.requirements,
                    location: this.details.location,
                    address: this.details.address,
                    phone: this.details.phone,
                    doctor: this.details.doctor,
                    results: this.details.results,
                    image: this.details.image,
                    schema: JSON.stringify(this.schema)
                })
                    .then((response) => {

                        // After insert check the existence of an image and different from the initial one
                        if (this.details.image !== '' && this.details.image !== this.initial_image) {
                            this.updateImage();
                        }

                        // Returning to details
                        this.$f7router.navigate('/diagnostic-tests/' + this.id);
                    })
                    .catch(function (error) {
                        //console.log(error);
                    });
            },
            reverseDate(payload) {
                if(payload === undefined || payload === null) {
                    return;
                }
                let date = payload.split("-");
                return date.reverse().join("-");
            },
            setImageURI(e) {
                //console.log('@setImageURI');
                this.details.image = e;
            },
            updateImage(path) {
                let uri = encodeURI(API_PATH + 'diagnostic-tests/update-image');
                let options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = path.substr(path.lastIndexOf('/') + 1);
                options.mimeType = "image/jpeg";
                options.httpMethod = "POST";
                options.chunkedMode = true;
                options.params = {
                    id: this.id
                };

                let ft = new FileTransfer();
                ft.upload(path, uri, this.success, this.error, options);
            },
            success(response) {
                //console.log(response);
            },
            error(response) {
                //console.log(response);
            },
        }
    }
    ;
</script>

<style scoped>
    .navbar, .toolbar {
        background-color: #FF3183;
    }
</style>
