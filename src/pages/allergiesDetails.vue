<template>
    <f7-page>
        <f7-navbar :title="details.name" back-link="Back"></f7-navbar>
        <f7-block inner>
            <f7-list media-list>
                <f7-list-item header="Nombre" :title="details.name"></f7-list-item>
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
            </f7-list>
        </f7-block>
    </f7-page>
</template>
<script>
    import axios from 'axios';

    export default {
        name: 'AllergiesDetails',
        props: [
            'id'
        ],
        data() {
            return {
                details: [],
                selectedType: '',
                selectedDegree: '',
                typeList: ['Alimentaria', 'Ambiental', 'Estacional', 'Medicamentos', 'Química', 'Otras'],
                degreeList: ['Leve', 'Moderado', 'Severo']
            };
        },
        methods: {
            //
        },
        mounted() {
            axios
                .get('http://patbookapi.local/api/allergies/' + this.id)
                .then(response => {
                    this.details = response.data;
                    this.selectedType = this.details.type;
                    this.selectedDegree = this.details.degree;
                });
        }
    }
    ;
</script>
