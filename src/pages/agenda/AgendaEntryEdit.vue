<template>
    <f7-page class="agenda-page">
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
                    <f7-list-item smart-select title="Tipo" :smart-select-params="{ closeOnSelect: true }">
                        <select :name="details.type" v-model="details.type">
                            <option v-for="(item, index) in agendaEntryTypeList"
                                    :key="index"
                                    :value="item"
                            >{{ item }}
                            </option>
                        </select>
                        <div class="type item-after"></div>
                    </f7-list-item>

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

            <!-- Submit -->
            <f7-button large raised fill @click="update">Guardar</f7-button>

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
                    this.$$('.type').html(this.details.type);
                    //
                    this.details.date = this.reverseDate(this.details.date);
                    this.$$('#agenda_entry_date').attr('value', this.details.date);
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
                axios.put(API_PATH + 'agenda/' + this.id, {
                    /*params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                        // TODO: encriptar las credenciales?
                    },*/
                    name: this.details.name,
                    date: this.reverseDate(this.details.date),
                    time: this.details.time,
                    type: this.details.type,
                    description: this.details.description
                })
                    .then((response) => {

                        let notification = this.$f7.toast.create({
                            position: 'top',
                            text: '¡Registro replicado! Ya puedes editarlo',
                            cssClass: "success",
                            icon: '<i class="icon material-icons">done</i>',
                            closeTimeout: 2000
                        });
                        notification.open();

                        // Returning to list
                        this.$f7router.navigate('/agenda');
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
        }
    };
</script>

<style>
    .blue-page .navbar, .blue-page .toolbar {
        background-color: #1ABAD4;
    }
</style>