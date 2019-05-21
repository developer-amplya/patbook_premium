<template>

    <f7-page hide-toolbar-on-scroll>

        <f7-navbar back-link=""></f7-navbar>

        <f7-block inner>

            <f7-card title="REGISTRO DE SÍNTOMAS">
                <f7-list media-list>
                    <!-- Symptoms description -->
                    <f7-list-item header="Descripción de los síntomas"
                                  @click="openInputPopover($event, 'textarea', 'Descripción de los síntomas', 'symptoms_description', details.symptoms_description)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.symptoms_description }}</span>
                    </f7-list-item>

                    <!-- Intensity -->
                    <f7-list-item header="Intensidad"
                                  @click="openSelectPopover($event, 'intensityList', 'Intensidad', 'intensity', details.intensity)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.intensity }}</span>
                    </f7-list-item>

                    <!-- Frequency -->
                    <f7-list-item header="Frecuencia"
                                  @click="openInputPopover($event, 'text', 'Frecuencia', 'frequency', details.frequency)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.frequency }}</span>
                    </f7-list-item>

                    <!-- Date -->
                    <f7-list-item header="Fecha"
                                  @click="openInputPopover($event, 'date', 'Fecha', 'date', details.date)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.date }}</span>
                    </f7-list-item>

                    <!-- Actions -->
                    <f7-list-item header="Acciones preventivas"
                                  @click="openInputPopover($event, 'textarea', 'Acciones preventivas', 'actions', details.actions)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.actions }}</span>
                    </f7-list-item>

                    <!-- Notes -->
                    <f7-list-item header="Notas"
                                  @click="openInputPopover($event, 'textarea', 'Notas', 'notes', details.notes)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.notes }}</span>
                    </f7-list-item>
                </f7-list>
            </f7-card>

            <f7-card title="PREGUNTAS AL MÉDICO">
                <f7-list media-list>
                    <!-- Doctor -->
                    <f7-list-item header="Médico"
                                  @click="openInputPopover($event, 'text', 'Médico', 'doctor', details.doctor)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.doctor }}</span>
                    </f7-list-item>

                    <!-- Questions -->
                    <f7-list-item header="Preguntas"
                                  @click="openInputPopover($event, 'textarea', 'Preguntas', 'questions', details.questions)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.questions }}</span>
                    </f7-list-item>
                </f7-list>
            </f7-card>

            <f7-card title="CAMPOS PERSONALIZADOS">
                <f7-list media-list>
                    <!-- Schema -->
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

        <!-- Delete -->
        <f7-toolbar bottom-md>
            <f7-link></f7-link>
            <f7-link @click="deleteRecord"><f7-icon material="delete"></f7-icon></f7-link>
            <f7-link></f7-link>
        </f7-toolbar>

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
        API_PATH
    } from '../../config.js';
    import SelectList from '../../form_elements/SelectList';
    import TextInput from '../../form_elements/TextInput';
    import CreateCustomField from '../../form_elements/CreateCustomField';
    import ImageSelector from '../../form_elements/ImageSelector';

    export default {
        name: 'MedicalVisitPreparationsEdit',
        components: {
            SelectList,
            TextInput,
            'image-selector': ImageSelector,
            'create-custom-field': CreateCustomField
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
                schema_active_index: null
            };
        },
        mounted() {
            axios
                .get(API_PATH + 'medical-visit-preparations/' + this.id, {
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
                    url: API_PATH + 'medical-visit-preparations/' + this.id,
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

                axios.put(API_PATH + 'medical-visit-preparations/' + this.id, {
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
            replicateRecord() {
                this.$f7.dialog.confirm('Se creará un nuevo registro a partir del que estás viendo y podrás editarlo inmediatamente', '¿Replicar este registro?', () => {
                    axios
                        .get(API_PATH + 'medical-visit-preparations/replicate/' + this.id, {
                            params: {
                                // device_code: sessionStorage.device_code,
                                // user_id: sessionStorage.user_id
                            }
                        })
                        .then(response => {
                            this.id = response.data._id; // The ID of the new record
                            this.details = response.data;
                            this.schema = JSON.parse(response.data.schema);

                            // Incrementing counting state
                            this.$store.dispatch('incrementDocumentCounting', 'medical_visit_preparations');

                            let notification = this.$f7.toast.create({
                                position: 'top',
                                text: '¡Registro replicado! Ya puedes editarlo',
                                cssClass: "success",
                                icon: '<i class="icon material-icons">done</i>',
                                closeTimeout: 2000
                            });
                            notification.open();
                        });
                });
            },
            deleteRecord() {
                this.$f7.dialog.confirm('Esta acción no puede deshacerse', '¿Borrar este registro?', () => {
                    axios
                        .delete(API_PATH + 'medical-visit-preparations/' + this.id, {
                            params: {
                                // device_code: sessionStorage.device_code,
                                // user_id: sessionStorage.user_id
                            }
                        })
                        .then(response => {
                            if (response.data.result === 'OK') {
                                // Incrementing counting state
                                this.$store.dispatch('decrementDocumentCounting', 'medical_visit_preparations');

                                let notification = this.$f7.toast.create({
                                    position: 'top',
                                    text: '¡Registro borrado!',
                                    cssClass: "success",
                                    icon: '<i class="icon material-icons">done</i>',
                                    closeTimeout: 2000
                                });
                                notification.open();

                                // Returning to list
                                setTimeout(() => {
                                    this.$f7router.navigate('/medical-visit-preparations');
                                }, 2000);
                            } else {
                                this.$f7.dialog.alert('No se ha podido borrar el registro', "Error");
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            this.$f7.dialog.alert('Ha ocurrido un error', "Error");
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

    .navbar, .toolbar {
        background-color: #6F715E;
    }
</style>
