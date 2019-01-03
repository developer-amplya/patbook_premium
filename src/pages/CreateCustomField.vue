<template>
    <f7-page>
        <f7-navbar title="CREAR CAMPO PERSONALIZADO" back-link="Volver"></f7-navbar>
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

            </f7-list>

            <br>

            <!-- Cancel & Submit -->
            <f7-segmented round raised>
                <f7-button round @click="cancel()">Cancelar</f7-button><!-- TODO: add cancel functionality -->
                <f7-button round @click="insert()">Crear</f7-button>
            </f7-segmented>

        </f7-block>
    </f7-page>
</template>
<script>
    import axios from 'axios';

    export default {
        name: 'CreateCustomField',
        props: [],
        data() {
            return {
                typeList: ['Campo de texto', 'Área de texto', 'Lista', 'Fecha', 'Hora'],
                name: '',
                type: ''
            };
        },
        methods: {
            //
        },
        mounted() {
            //
        }
    };
</script>

<style scoped>
    .navbar {
        background-color: #000000;
    }
</style>
