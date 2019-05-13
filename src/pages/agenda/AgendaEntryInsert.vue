<template>
    <f7-page>
        <!-- Navbar -->
        <f7-navbar title="AGENDA" back-link></f7-navbar>

        <f7-block inner>

            <f7-card>
                <f7-list>
                    <!-- Name -->
                    <f7-list-item>
                        <f7-label>Nombre</f7-label>
                        <f7-input
                                type="text"
                                :value="name"
                                @input="name = $event.target.value"
                                clear-button></f7-input>
                    </f7-list-item>

                    <!-- Date & Time -->
                    <f7-list-item>
                        <f7-label>Fecha / Hora</f7-label>
                        <f7-row>
                            <f7-col>
                                <calendar
                                        id="agenda_entry_date"
                                        @change="date = setDate($event)">
                                </calendar>
                            </f7-col>
                            <f7-col>
                                <f7-input
                                        type="time"
                                        :value="time"
                                        @input="time = $event.target.value"
                                ></f7-input>
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
                    <f7-list-item>
                        <f7-label>Descripción</f7-label>
                        <f7-input
                                type="textarea"
                                :value="description"
                                @input="description = $event.target.value"
                        ></f7-input>
                    </f7-list-item>
                </f7-list>
            </f7-card>

            <br>
            <br>

            <!-- Cancel & Submit -->
            <f7-segmented round raised>
                <f7-button round @click="cancel()">Cancelar</f7-button>
                <f7-button round @click="insert()">Guardar</f7-button>
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
                    date: this.reorderDate(this.date),
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
            cancel() {
                this.$f7Router.navigate('/agenda');
            },
            reorderDate(payload) {
                let date = payload.split("-");
                let reorderedDate = [];
                reorderedDate[0] = date[1];
                reorderedDate[1] = date[0];
                reorderedDate[2] = date[2];
                reorderedDate = reorderedDate.join("-");
                return reorderedDate;
            }
        }
    };
</script>

<style scoped>
</style>
