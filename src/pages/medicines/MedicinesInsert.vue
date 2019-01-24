<template>
    <f7-page>
        <f7-navbar title="CREAR MEDICACIÓN" back-link="Volver"></f7-navbar>
        <f7-block inner>
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

                <!-- Image -->

                <!-- Laboratory -->
                <f7-list-item>
                    <f7-label>Laboratorio</f7-label>
                    <f7-input
                            type="text"
                            :value="lab"
                            @input="lab = $event.target.value"
                            clear-button></f7-input>
                </f7-list-item>

                <!-- Content -->
                <f7-list-item>
                    <f7-label>Miligramos/Mililitros</f7-label>
                    <f7-input
                            type="text"
                            :value="content"
                            @input="content = $event.target.value"
                            clear-button></f7-input>
                </f7-list-item>

                <!-- Dose -->
                <f7-list-item>
                    <f7-label>Dosis</f7-label>
                    <f7-input
                            type="text"
                            :value="dose"
                            @input="dose = $event.target.value"
                            clear-button></f7-input>
                </f7-list-item>

                <!-- Frequency -->
                <f7-list-item smart-select title="Frecuencia" :smart-select-params="{ closeOnSelect: true }">
                    <select :name="frequency" v-model="frequency">
                        <option v-for="(item, index) in frequencyList"
                                :key="index"
                                :value="item"
                        >{{ item }}
                        </option>
                    </select>
                </f7-list-item>

                <!-- Time -->
                <f7-list-item>
                    <f7-label>Hora/Pauta</f7-label>
                    <f7-input
                            type="text"
                            :value="time"
                            @input="time = $event.target.value"
                            clear-button></f7-input>
                </f7-list-item>

                <!-- Day time -->
                <f7-list-item smart-select title="Momento del día" :smart-select-params="{ closeOnSelect: true }">
                    <select :name="day_time" v-model="day_time">
                        <option v-for="(item, index) in dayTimeList"
                                :key="index"
                                :value="item"
                        >{{ item }}
                        </option>
                    </select>
                </f7-list-item>

                <!-- Start date -->

                <!-- Ending date -->

                <!-- Cause -->
                <f7-list-item>
                    <f7-label>Motivo</f7-label>
                    <f7-input
                            type="text"
                            :value="cause"
                            @input="cause = $event.target.value"
                            clear-button></f7-input>
                </f7-list-item>

                <!-- Effects -->
                <f7-list-item>
                    <f7-label>Efectos</f7-label>
                    <f7-input
                            type="textarea"
                            :value="effects"
                            @input="effects = $event.target.value"
                    ></f7-input>
                </f7-list-item>

                <!-- Notes -->
                <f7-list-item>
                    <f7-label>Notas</f7-label>
                    <f7-input
                            type="textarea"
                            :value="notes"
                            @input="notes = $event.target.value"
                    ></f7-input>
                </f7-list-item>

                <!-- Doctor -->
                <f7-list-item>
                    <f7-label>Médico</f7-label>
                    <f7-input
                            type="text"
                            :value="doctor"
                            @input="doctor = $event.target.value"
                            clear-button></f7-input>
                </f7-list-item>

            </f7-list>

            <f7-button>NUEVO CAMPO PERSONALIZADO</f7-button>

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

    export default {
        name: 'MedicinesInsert',
        props: [],
        data() {
            return {
                frequencyList: ['Diaria', 'Semanal', 'Mensual', 'Bimensual', 'Trimestral', 'Otros'],
                dayTimeList: ['Mañana', 'Tarde', 'Noche'],
                name: '',
                image: '',
                lab: '',
                content: '',
                dose: '',
                frequency: '',
                time: '',
                day_time: '',
                start: '',
                end: '',
                cause: '',
                effects: '',
                notes: '',
                doctor: '',
                schema: []
            };
        },
        methods: {
            insert() {
                axios.post('http://patbookapi.local/api/medicines', {
                    /*params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                        // TODO: encriptar las credenciales?
                    },*/
                    user_id: sessionStorage.user_id,
                    name: this.name,
                    image: this.name,
                    lab: this.name,
                    content: this.name,
                    dose: this.name,
                    frequency: this.name,
                    time: this.name,
                    day_time: this.name,
                    start: this.name,
                    end: this.name,
                    cause: this.name,
                    effects: this.name,
                    notes: this.name,
                    doctor: this.name,
                    schema: this.schema
                })
                    .then((response) => {
                        console.log(response);
                        this.$f7router.navigate('/medicines');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted() {
            //
        }
    };
</script>

<style scoped>
    .navbar {
        background-color: #F2BE4C;
    }
</style>
