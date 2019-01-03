<template>
    <f7-page>
        <f7-navbar title="CREAR PREPARACIÓN VISITA MÉDICA" back-link="Volver"></f7-navbar>
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

                <!-- Symptoms description -->
                <f7-list-item>
                    <f7-label>Descripción de los síntomas</f7-label>
                    <f7-input
                            type="textarea"
                            :value="symptoms_description"
                            @input="symptoms_description = $event.target.value"
                    ></f7-input>
                </f7-list-item>

                <!-- Intensity -->
                <f7-list-item smart-select title="Intensidad" :smart-select-params="{ closeOnSelect: true }">
                    <select :name="intensity" v-model="intensity">
                        <option v-for="(item, index) in intensityList"
                                :key="index"
                                :value="item"
                        >{{ item }}
                        </option>
                    </select>
                </f7-list-item>

                <!-- Frequency -->
                <f7-list-item>
                    <f7-label>Frecuencia</f7-label>
                    <f7-input
                            type="text"
                            :value="frequency"
                            @input="frequency = $event.target.value"
                            clear-button></f7-input>
                </f7-list-item>

                <!-- Date -->

                <!-- Actions -->
                <f7-list-item>
                    <f7-label>Acciones preventivas</f7-label>
                    <f7-input
                            type="textarea"
                            :value="actions"
                            @input="actions = $event.target.value"
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

                <!-- Questions -->
                <f7-list-item>
                    <f7-label>Preguntas</f7-label>
                    <f7-input
                            type="textarea"
                            :value="questions"
                            @input="questions = $event.target.value"
                    ></f7-input>
                </f7-list-item>

            </f7-list>

            <f7-button>NUEVO CAMPO PERSONALIZADO</f7-button>

            <br>
            <br>

            <!-- Cancel & Submit -->
            <f7-segmented round raised>
                <f7-button round @click="insert()">Guardar</f7-button>
            </f7-segmented>

        </f7-block>
    </f7-page>
</template>
<script>
    import axios from 'axios';

    export default {
        name: 'MedicalVisitsPreparationInsert',
        props: [],
        data() {
            return {
                intensityList: ['Leve', 'Moderada', 'Severa'],
                name: '',
                symptoms_description: '',
                intensity: '',
                frequency: '',
                date: '',
                actions: '',
                notes: '',
                doctor: '',
                questions: '',
                schema: []
            };
        },
        methods: {
            insert() {
                axios.post('http://patbookapi.local/api/medical-visit-preparations', {
                    /*params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                        // TODO: encriptar las credenciales?
                    },*/
                    user_id: sessionStorage.user_id,
                    name: this.name,
                    symptoms_description: this.name,
                    intensity: this.name,
                    frequency: this.name,
                    date: this.name,
                    actions: this.name,
                    notes: this.name,
                    doctor: this.name,
                    questions: this.name,
                    schema: this.schema
                })
                    .then((response) => {
                        console.log(response);
                        this.$f7router.navigate('/medical-visit-preparations');
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
        background-color: #6F715E;
    }
</style>
