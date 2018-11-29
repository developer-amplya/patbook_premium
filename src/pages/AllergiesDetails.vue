<template>

    <f7-page>

        <f7-navbar title="ALERGIA" back-link="Volver"></f7-navbar>

        <f7-block inner>

            <f7-list media-list>

                <f7-list-item header="Nombre"
                              @click="openPopup('edit_name')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.name }}</span>
                </f7-list-item>

                <f7-list-item header="Tipo"
                              @click="openPopup('edit_type')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.type }}</span>
                </f7-list-item>

                <f7-list-item header="Grado"
                              @click="openPopup('edit_degree')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.degree }}</span>
                </f7-list-item>

                <f7-list-item header="Reacción"
                              @click="openPopup('edit_reaction')">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.reaction }}</span>
                </f7-list-item>

                <f7-list-item v-for="(field, index) in schema"
                              :key="index"
                              :header="field.label">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ field.value }}</span>
                </f7-list-item>

            </f7-list>

        </f7-block>

        <!-- Popup -->
        <f7-popup ref="edit_name">
            <f7-button @click="closePopup('edit_name')">Cerrar</f7-button>
        </f7-popup>

        <!-- Popup -->
        <f7-popup ref="edit_type">
            <f7-button @click="closePopup('edit_type')">Cerrar</f7-button>
        </f7-popup>

        <!-- Popup -->
        <f7-popup ref="edit_degree">
            <f7-button @click="closePopup('edit_degree')">Cerrar</f7-button>
        </f7-popup>

        <!-- Popup -->
        <f7-popup ref="edit_reaction">
            <f7-button @click="closePopup('edit_reaction')">Cerrar</f7-button>
        </f7-popup>

    </f7-page>

</template>

<script>
    import axios from 'axios';
    import SelectList from '../form_elements/SelectList';
    import TextInput from '../form_elements/TextInput';
    import F7ListItem from 'framework7-vue/src/components/list-item';

    export default {
        name: 'AllergiesDetails',
        components: {
            F7ListItem,
            SelectList,
            TextInput
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
            openPopup(popup) {
                this.$refs[popup].opened = true;
            },
            closePopup(popup) {
                this.$refs[popup].opened = false;
            }
        },
        mounted() {
            axios
                .get('http://patbookapi.local/api/allergies/' + this.id, {
                    params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                    }
                })
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

<style scoped>
    li i.icon {
        position: absolute;
        right: 15px;
        top: 20px;
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

    .navbar {
        background-color: #D3698E;
    }
</style>
