<template>
    <f7-page>
        <f7-navbar title="CREAR ALERGIA" back-link="Volver"></f7-navbar>
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

                <!-- Type -->
                <f7-list-item smart-select title="Tipo" :smart-select-params="{ closeOnSelect: true }">
                    <select :name="type" v-model="type">
                        <option v-for="(item, index) in typeList"
                                :key="index"
                                :value="item"
                        >{{ item }}
                        </option>
                    </select>
                </f7-list-item>

                <!-- Degree -->
                <f7-list-item smart-select title="Grado" :smart-select-params="{ closeOnSelect: true }">
                    <select :name="degree" v-model="degree">
                        <option v-for="(item, index) in degreeList"
                                :key="index"
                                :value="item"
                        >{{ item }}
                        </option>
                    </select>
                </f7-list-item>

                <!-- Reaction -->
                <f7-list-item>
                    <f7-label>Reacción</f7-label>
                    <f7-input
                            type="textarea"
                            :value="reaction"
                            @input="reaction = $event.target.value"
                    ></f7-input>
                </f7-list-item>

                <!-- SCHEMA -->
                <f7-list-item v-for="(field, index) in schema"
                              :key="index">
                    <f7-label>{{ field.label }}</f7-label>
                    <f7-input
                            :type="field.fieldType"
                            :title="field.name"
                            :value="field.value"
                            @input="field.value = $event.target.value"
                    ></f7-input>
                </f7-list-item>

            </f7-list>

            <f7-button @click="createCustomField()">NUEVO CAMPO PERSONALIZADO</f7-button>

            <br>
            <br>

            <!-- Cancel & Submit -->
            <f7-segmented round raised>
                <f7-button round @click="cancel()">Cancelar</f7-button><!-- TODO: add cancel functionality -->
                <f7-button round @click="insert()">Guardar</f7-button>
            </f7-segmented>

        </f7-block>
    </f7-page>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'AllergiesInsert',
        props: [],
        data() {
            return {
                typeList: ['Alimentaria', 'Ambiental', 'Estacional', 'Medicamentos', 'Química', 'Otras'],
                degreeList: ['Leve', 'Moderado', 'Severo'],
                name: '',
                type: '',
                degree: '',
                reaction: '',
                schema: []
            };
        },
        methods: {
            insert() {
                axios.post('http://patbookapi.local/api/allergies', {
                    /*params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                        // TODO: encriptar las credenciales?
                    },*/
                    user_id: sessionStorage.user_id,
                    name: this.name,
                    type: this.type,
                    degree: this.degree,
                    reaction: this.reaction,
                    schema: JSON.stringify(this.schema)
                })
                    .then((response) => {
                        console.log(response);
                        this.$store.dispatch('incrementDocumentCounting', 'allergies');
                        this.$f7router.navigate('/allergies');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            createCustomField() {
                let nowInsertingDetails = {};
                nowInsertingDetails.name = this.name;
                nowInsertingDetails.type = this.type;
                nowInsertingDetails.degree = this.degree;
                nowInsertingDetails.reaction = this.reaction;
                sessionStorage.currentInsertingDetails = JSON.stringify(nowInsertingDetails);
                console.log(this.schema);
                sessionStorage.currentInsertingSchema = JSON.stringify(this.schema);
                this.$f7router.navigate('/create-custom-field');
            }
        },
        beforeMount() {
            if (typeof sessionStorage.currentInsertingDetails !== 'undefined') {
                let details = JSON.parse(sessionStorage.currentInsertingDetails);
                this.name = details.name;
                this.type = details.type;
                this.degree = details.degree;
                this.reaction = details.reaction;
            }

            if (typeof sessionStorage.currentInsertingSchema !== 'undefined') {
                this.schema = JSON.parse(sessionStorage.currentInsertingSchema);
                console.log(this.schema);
            }
        }
    }
    ;
</script>

<style scoped>
    .navbar {
        background-color: #c36eb5;
    }
</style>
