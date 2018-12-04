<template>

    <f7-page>

        <f7-navbar title="ALERGIA" back-link="Volver"></f7-navbar>

        <f7-block inner>

            <f7-list media-list>

                <f7-list-item header="Nombre" ref="x1" :value="details.name"
                              v-if="!edit_name"
                              @click="openEdit">
                    <f7-icon material="edit"></f7-icon>
                    <span>{{ details.name }}</span>
                </f7-list-item>

                <f7-list-item  header="Nombre"
                               v-if="edit_name">
                    <f7-block>
                        <f7-input
                                type="text"
                                ref="t1"
                                :title="details.name"
                                :value="details.name"
                                @input="details.name = $event.target.value"
                        ></f7-input>
                        <br>
                        <f7-segmented round raised>
                            <f7-button round @click="cancelEdit()">Cancelar</f7-button>
                            <f7-button round @click="updateInfo()">Guardar</f7-button>
                        </f7-segmented>
                    </f7-block>
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
                formData: {},
                edit_name: false,
                before_editing: ''
            };
        },
        methods: {
            openEdit(event) {console.log(event.target);
                this.before_editing = this.$refs.x1.value;
                console.log(this.before_editing);
                this.edit_name = true;
            },
            cancelEdit(popup) {
                this.details.name = this.before_editing;
                this.before_editing = '';
                this.edit_name = false;
            },
            updateInfo() {
                axios.put('http://patbookapi.local/api/allergies/' + this.id, {
                    params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                    },
                    name: this.details.name
                })
                    .then((response) => {
                        console.log(response);
                        // TODO: confirm the update is OK
                        this.edit_name = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
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

    .invisible {
        display: none;
    }

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
