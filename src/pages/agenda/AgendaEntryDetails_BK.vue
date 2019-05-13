<template>

    <f7-page hide-toolbar-on-scroll>

        <f7-navbar>
            <f7-nav-left>
                <f7-link href="/agenda">
                    <f7-icon material="arrow_back"></f7-icon>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title title="AGENDA"></f7-nav-title>
            <f7-nav-right>
                <span
                        class="navbar-icon-right"
                        @click="replicateRecord"
                ><img src="../../assets/ic_content_copy_white_24dp.png"></span>
            </f7-nav-right>
        </f7-navbar>

        <f7-block inner>

            <f7-card>
                <f7-list media-list>

                    <!-- Name -->
                    <f7-list-item header="Nombre"
                                  @click="openInputPopover($event, 'text', 'Nombre', 'name', details.name)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.name }}</span>
                    </f7-list-item>

                    <!-- Date -->
                    <f7-list-item header="Fecha" @click="openCalendarPopover()">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.date }}</span>
                    </f7-list-item>

                    <!-- Date -->
                    <f7-list-item header="Fecha" @click="openCalendarPopover()">
                        <f7-icon material="edit"></f7-icon>
                        <span><input
                                type="text"
                                :value="details.date"
                                readonly="readonly"
                                id="agenda_calendar"
                        /></span>
                    </f7-list-item>

                    <!-- Time -->
                    <f7-list-item header="Hora"
                                  @click="openInputPopover($event, 'time', 'Hora', 'time', details.time)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.time }}</span>
                    </f7-list-item>

                    <!-- Type -->
                    <f7-list-item header="Tipo"
                                  @click="openSelectPopover($event, 'agendaEntryTypeList', 'Tipo', 'type', details.type)">
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.type }}</span>
                    </f7-list-item>

                    <!-- Description -->
                    <f7-list-item header="Descripción"
                                  @click="openInputPopover($event, 'textarea', 'Descripción', 'description', details.description)"
                                  resizable>
                        <f7-icon material="edit"></f7-icon>
                        <span>{{ details.description }}</span>
                    </f7-list-item>
                </f7-list>
            </f7-card>

        </f7-block>

        <!-- Delete -->
        <f7-toolbar bottom-md>
            <f7-link></f7-link>
            <f7-link @click="deleteRecord">
                <f7-icon material="delete"></f7-icon>
            </f7-link>
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

        <!-- Calendar popover -->
        <f7-popover ref="EditCalendarField" :close="isSchema = false" class="calendar-holder">
            <f7-list>
                <f7-list-item>
                    <f7-label>Fecha</f7-label>
                </f7-list-item>
                <f7-list-item>
                    <calendar id="agenda_entry_date" :value="details.date"
                              @change="details.date = setDate($event)"></calendar>
                </f7-list-item>
            </f7-list>
            <f7-block>
                <f7-segmented round raised>
                    <f7-button round @click="$refs.EditCalendarField.close()">Cancelar</f7-button>
                    <f7-button round @click="update">Guardar</f7-button>
                </f7-segmented>
            </f7-block>
        </f7-popover>

    </f7-page>

</template>

<script>
    import axios from 'axios';
    import {
        API_PATH
    } from '../../config.js';
    import SelectList from '../../form_elements/SelectList';
    import TextInput from '../../form_elements/TextInput';
    import Calendar from '../../form_elements/Calendar';

    export default {
        name: 'AgendaEntryDetails',
        components: {
            SelectList,
            TextInput,
            'calendar': Calendar
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
                details: []
            };
        },
        mounted() {
            axios
                .get(API_PATH + 'agenda/' + this.id, {
                    params: {
                        // device_code: sessionStorage.device_code,
                        // user_id: sessionStorage.user_id
                    }
                })
                .then(response => {
                    this.details = response.data;
                });

            let calendar = this.$f7.calendar.create({
                inputEl: '#agenda_calendar',
                openIn: 'customModal',
                closeOnSelect: true,
                dateFormat: 'dd-mm-yyyy',
                monthNames: [
                    'Enero',
                    'Febrero',
                    'Marzo',
                    'Abril',
                    'Mayo',
                    'Junio',
                    'Julio',
                    'Agosto',
                    'Septiembre',
                    'Octubre',
                    'Noviembre',
                    'Diciembre'
                ],
                dayNamesShort: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                on: {
                    closed: () => {
                        this.$emit('change', calendar.getValue());
                        //calendar.destroy();
                    }
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
            openCalendarPopover() {
                this.field.name = 'date';
                this.field.value = this.details.date;
                this.$refs.EditCalendarField.open();
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

                /* We need to create first an object and then to assign the key name as an array key, because assigning
                 dynamic key names in an object does not work */
                let data = {};
                data[this.field.name] = this.field.value;

                axios({
                    method: 'PUT',
                    url: API_PATH + 'agenda/' + this.id,
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
            replicateRecord() {
                this.$f7.dialog.confirm('Se creará un nuevo registro a partir del que estás viendo y podrás editarlo inmediatamente', '¿Replicar este registro?', () => {
                    axios
                        .get(API_PATH + 'agenda/replicate/' + this.id, {
                            params: {
                                // device_code: sessionStorage.device_code,
                                // user_id: sessionStorage.user_id
                            }
                        })
                        .then(response => {
                            this.id = response.data._id; // The ID of the new record
                            this.details = response.data;

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
                        .delete(API_PATH + 'agenda/' + this.id, {
                            params: {
                                // device_code: sessionStorage.device_code,
                                // user_id: sessionStorage.user_id
                            }
                        })
                        .then(response => {
                            if (response.data.result === 'OK') {

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
                                    this.$f7router.navigate('/agenda');
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
</style>
