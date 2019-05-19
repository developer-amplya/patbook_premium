<template>
    <f7-page>
        <f7-navbar title="PRUEBAS DIAGNÓSTICAS" back-link="Volver"></f7-navbar>
        <f7-block inner>


            <f7-card title="REGISTRO DE PRUEBA DIAGNÓSTICA">
                <f7-list no-hairlines no-hairlines-between>

                    <!-- Name -->
                    <f7-list-item smart-select title="Nombre" :smart-select-params="{ closeOnSelect: true }">
                        <select :name="name" v-model="name">
                            <option v-for="(item, index) in testsList"
                                    :key="index"
                                    :value="item"
                            >{{ item }}
                            </option>
                        </select>
                    </f7-list-item>

                    <!-- Date & Time -->
                    <f7-list-item>
                        <f7-row>
                            <f7-col>
                                <calendar
                                        id="diagnostic_test_date"
                                        label="Fecha"
                                        @change="date = setDate($event)">
                                </calendar>
                            </f7-col>
                            <f7-col>
                                <f7-list-input
                                        type="time"
                                        label="Hora"
                                        :value="time"
                                        @input="time = $event.target.value"
                                ></f7-list-input>
                            </f7-col>
                        </f7-row>
                    </f7-list-item>

                    <!-- Cause -->
                    <f7-list-input
                            type="text"
                            label="Motivo"
                            :value="cause"
                            @input="cause = $event.target.value"
                            clear-button>
                    </f7-list-input>

                    <!-- Requirements -->
                    <f7-list-input
                            type="text"
                            label="Requisitos previos"
                            :value="requirements"
                            @input="requirements = $event.target.value"
                            clear-button>
                    </f7-list-input>

                    <!-- Location -->
                    <f7-list-input
                            type="text"
                            label="Lugar"
                            :value="location"
                            @input="location = $event.target.value"
                            clear-button>
                    </f7-list-input>

                    <!-- Address -->
                    <f7-list-input
                            type="text"
                            label="Dirección"
                            :value="address"
                            @input="address = $event.target.value"
                            clear-button>
                    </f7-list-input>

                    <!-- Phone -->
                    <f7-list-input
                            type="text"
                            label="Teléfono"
                            :value="phone"
                            @input="phone = $event.target.value"
                            clear-button>
                    </f7-list-input>

                    <!-- Doctor -->
                    <f7-list-input
                            type="text"
                            label="Médico"
                            :value="doctor"
                            @input="doctor = $event.target.value"
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
                            :value="results"
                            @input="results = $event.target.value"
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
            <f7-button large raised fill class="pink" @click="insert()">Guardar</f7-button>

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
        name: 'DiagnosticTestsInsert',
        components: {
            'create-custom-field': CreateCustomField,
            'image-selector': ImageSelector,
            'calendar': Calendar
        },
        data() {
            return {
                testsList: ['Análisis de sangre', 'Análisis de orina', 'Endoscopia', 'Mamografía', 'Rayos X', 'TAC', 'PET', 'Colonoscopia', 'Densiometría ósea', 'IRM', 'ECG', 'EEF', 'Ultrasonido', 'Espirometría', 'Otros'],
                name: '',
                date: '',
                time: '',
                cause: '',
                requirements: '',
                location: '',
                address: '',
                phone: '',
                doctor: '',
                results: '',
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
                axios.post(API_PATH + 'diagnostic-tests', {
                    /*params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                        // TODO: encriptar las credenciales?
                    },*/
                    user_id: this.getUserID,
                    name: this.name,
                    date: this.reverseDate(this.date),
                    time: this.time,
                    cause: this.cause,
                    requirements: this.requirements,
                    location: this.location,
                    address: this.address,
                    phone: this.phone,
                    doctor: this.doctor,
                    results: this.results,
                    image: this.image,
                    schema: JSON.stringify(this.schema)
                })
                    .then((response) => {
                        // Incrementing counting state
                        this.$store.dispatch('incrementDocumentCounting', 'diagnostic_tests');

                        // After insert check the existence of an image
                        if (this.image !== '') {
                            this.uploadImage(response.data.recordID.$oid);
                        }

                        // Returning to list
                        this.$f7router.navigate('/diagnostic-tests');
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
                this.image = e;
            },
            uploadImage(record_id) {
                let uri = encodeURI(API_PATH + 'diagnostic-tests/update-image');
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
            },
        }
    };
</script>

<style scoped>
    .navbar {
        background-color: #FF3183;
    }
</style>
