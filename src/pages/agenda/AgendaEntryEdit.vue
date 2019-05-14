<template>
    <f7-page>
        <!-- Navbar -->
        <f7-navbar title="AGENDA" back-link></f7-navbar>

        <f7-block inner>

            <f7-card>
                <f7-list>
                    <!-- Name -->
                    <f7-list-input
                            type="text"
                            label="Nombre"
                            :value="details.name"
                            @input="details.name = $event.target.value"
                    ></f7-list-input>

                    <!-- Date & Time -->
                    <f7-list-item>
                        <f7-row>
                            <f7-col>
                                <calendar
                                        id="agenda_entry_date"
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

                    <!-- Type -->
                    <!--
                    <f7-list-item smart-select title="Tipo" :smart-select-params="{ closeOnSelect: true }">
                        <span v-html="selectHtml"></span>
                    </f7-list-item>
                    -->

                    <!-- Description -->
                    <f7-list-input
                            type="textarea"
                            label="Descripción"
                            resizable
                            :value="details.description"
                            @input="details.description = $event.target.value"
                    ></f7-list-input>
                </f7-list>
            </f7-card>

            <br>
            <br>

            <!-- Cancel & Submit -->
            <f7-segmented round raised>
                <f7-button round large @click="cancel()">Cancelar</f7-button>
                <f7-button round large fill @click="update()">Guardar</f7-button>
            </f7-segmented>

        </f7-block>

    </f7-page>
</template>

<script>
    import axios from 'axios';
    import {
        API_PATH
    } from '../../config.js';
    import {mapGetters} from 'vuex';
    import Calendar from '../../form_elements/Calendar';

    export default {
        name: 'AgendaEntryEdit',
        components: {
            'calendar': Calendar
        },
        props: [
            'record_id'
        ],
        data() {
            return {
                id: this.record_id,
                details: [],
                agendaEntryTypeList: ['Cita médica', 'Prueba diagnóstica'],
                selectHtml: null
            };
        },
        computed: {
            ...mapGetters(['getUserID'])
        },
        created() {
            axios
                .get(API_PATH + 'agenda/' + this.id, {
                    params: {
                        // device_code: sessionStorage.device_code,
                        // user_id: sessionStorage.user_id
                    }
                })
                .then(response => {
                    this.details = response.data;

                    this.selectHtml = `
                    <select :name="details.type" v-model="details.type">
                            <option v-for="(item, index) in agendaEntryTypeList"
                                    :key="index"
                                    :value="item"
                            >{{ item }}
                            </option>
                        </select>
                    `;
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
            update() {
                axios({
                    method: 'PUT',
                    url: API_PATH + 'agenda/' + this.id,
                    params: {
                        // device_code: sessionStorage.device_code,
                        // user_id: sessionStorage.user_id
                    },
                    data: {
                        user_id: this.getUserID,
                        name: this.details.name,
                        date: this.details.date,
                        time: this.details.time,
                        type: this.details.type,
                        description: this.details.description
                    }
                })
                    .then((response) => {
                        if (response.data.result === 'OK') {
                            // redirect
                            this.$f7Router.navigate('/agenda/' + this.id);
                        } else {
                            // TODO ??
                        }
                    })
                    .catch(function (error) {
                        //console.log(error);
                    });
            },
            cancel() {
                this.$f7Router.navigate('/agenda/' + this.id);
            }
        }
    };
</script>

<style scoped>
</style>
