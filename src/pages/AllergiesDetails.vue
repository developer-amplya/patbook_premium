<template>

    <f7-page>

        <f7-navbar :title="details.name" back-link="Back"></f7-navbar>

        <f7-block inner>

            <f7-list no-hairlines-md>

                <f7-list-input
                        label="Nombre"
                        type="text"
                        :title="details.name"
                        clear-button
                ></f7-list-input>

                <f7-list-item title="Tipo" smart-select :after="details.type">
                    <select name="type" v-model="selectedType">
                        <option
                                v-for="typeCase in typeList"
                                :value="typeCase"> {{ typeCase }}
                        </option>
                    </select>
                </f7-list-item>
                <f7-list-item title="Grado" smart-select :after="details.degree">
                    <select name="type" v-model="selectedDegree">
                        <option
                                v-for="degreeCase in degreeList"
                                :value="degreeCase">{{ degreeCase }}
                        </option>
                    </select>
                </f7-list-item>
                <f7-list-item header="Reacción" :text="details.reaction"></f7-list-item>


                <component v-for="(field, index) in schema"
                           :key="index"
                           :is="field.fieldType"
                           v-model="formData[field.name]"
                           v-bind="field">
                </component>

            </f7-list>

        </f7-block>

    </f7-page>

</template>

<script>
    import axios from 'axios';
    import SelectList from '../form_elements/SelectList';
    import TextInput from '../form_elements/TextInput';

    export default {
        name: 'AllergiesDetails',
        components: {
            SelectList, TextInput
        },
        props: [
            'id'
        ],
        data() {
            return {
                details: [],
                selectedType: '',
                selectedDegree: '',
                typeList: ['Alimentaria', 'Ambiental', 'Estacional', 'Medicamentos', 'Química', 'Otras'],
                degreeList: ['Leve', 'Moderado', 'Severo'],
                schema: [],
                formData: {}
            };
        },
        methods: {
            //
        },
        mounted() {
            axios
                .get('http://patbookapi.local/api/allergies/' + this.id)
                .then(response => {
                    console.log(JSON.parse(response.data.schema));
                    this.details = response.data;
                    this.selectedType = this.details.type;
                    this.selectedDegree = this.details.degree;
                    this.schema = JSON.parse(response.data.schema);
                });
        }
    }
    ;
</script>
