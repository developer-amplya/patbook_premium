<template>

    <f7-page>

        <f7-navbar title="PRUEBAS DIAGNÓSTICAS" back-link="Volver">
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

                    <!-- Image -->
                    <f7-list-item>
                        <f7-label>Imagen</f7-label>
                        <span class="zoom-in"
                              @click="zoomImage">
                            <f7-icon material="zoom_in"></f7-icon>
                        </span>
                    </f7-list-item>
                    <f7-list-item>
                        <image-selector  :imagepath="imagepath" @image_selected="updateImage"></image-selector>
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
        API_PATH, USER_IMAGES_PATH
    } from '../../config.js';
    import SelectList from '../../form_elements/SelectList';
    import TextInput from '../../form_elements/TextInput';
    import CreateCustomField from '../../form_elements/CreateCustomField';
    import ImageSelector from '../../form_elements/ImageSelector';

    export default {
        name: 'DiagnosticTestsDetails',
        components: {
            SelectList,
            TextInput,
            'create-custom-field': CreateCustomField,
            'image-selector': ImageSelector
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
                schema_active_index: null,
                imagepath: undefined
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

                    // Check the image
                    if (this.details.image !== null) {
                        this.imagepath = USER_IMAGES_PATH + this.details.image;
                    }
                });
        },
        methods: {
            zoomImage() {
                if (this.details.image !== null) {
                    PhotoViewer.show(USER_IMAGES_PATH + this.details.image);
                }
            },
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

                axios.put(API_PATH + 'diagnostic-tests/' + this.id, {
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

                var ft = new FileTransfer();
                ft.upload(path, uri, this.success, this.error, options);
            },
            success(response) {
                //console.log(response);
            },
            error(response) {
                //console.log(response);
            },
            replicateRecord() {
                this.$f7.dialog.confirm('Se creará un nuevo registro a partir del que estás viendo y podrás editarlo inmediatamente', '¿Replicar este registro?', () => {
                    axios
                        .get(API_PATH + 'diagnostic-tests/replicate/' + this.id, {
                            params: {
                                // device_code: sessionStorage.device_code,
                                // user_id: sessionStorage.user_id
                            }
                        })
                        .then(response => {
                            this.id = response.data._id; // The ID of the new record
                            this.details = response.data;
                            this.schema = JSON.parse(response.data.schema);
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
        background-color: #FF3183;
    }

    .zoom-in {
        display: block;
        position: absolute;
        right: 10px;
        top: 5px
    }
</style>
