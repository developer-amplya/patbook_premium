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
                            :value="name"
                            @input="name = $event.target.value"
                            clear-button>
                    </f7-list-input>

                    <!-- Date & Time -->
                    <f7-list-item>
                        <f7-row>
                            <f7-col>
                                <calendar
                                        id="agenda_entry_date"
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

                    <!-- Type -->
                    <f7-list-item smart-select title="Tipo" :smart-select-params="{ closeOnSelect: true }">
                        <select :name="type" v-model="type">
                            <option v-for="(item, index) in agendaEntryTypeList"
                                    :key="index"
                                    :value="item"
                            >{{ item }}
                            </option>
                        </select>
                    </f7-list-item>

                    <!-- Description -->
                    <f7-list-input
                            type="textarea"
                            label="Descripción"
                            resizable
                            :value="description"
                            @input="description = $event.target.value"
                    ></f7-list-input>
                </f7-list>
            </f7-card>

            <br>

            <!-- Submit -->
            <f7-button large raised fill @click="insert()">Guardar</f7-button>

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
        name: 'AgendaEntryInsert',
        components: {
            'calendar': Calendar
        },
        data() {
            return {
                name: '',
                date: '',
                time: '',
                type: '',
                agendaEntryTypeList: ['Cita médica', 'Prueba diagnóstica'],
                description: ''
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
                axios.post(API_PATH + 'agenda', {
                    /*params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                        // TODO: encriptar las credenciales?
                    },*/
                    user_id: this.getUserID,
                    name: this.name,
                    date: this.reverseDate(this.date),
                    time: this.time,
                    type: this.type,
                    description: this.description
                })
                    .then((response) => {
                        // Returning to list
                        this.$f7router.navigate('/agenda');
                    })
                    .catch(function (error) {
                        //console.log(error);
                    });
            },
            reverseDate(payload) {
                let date = payload.split("-");
                return date.reverse().join("-");
            },
        }
    };
</script>

<style scoped>
</style>
