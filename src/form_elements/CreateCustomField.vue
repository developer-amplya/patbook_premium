<template>
    <f7-page>
        <f7-navbar title="Crear campo personalizado" :class="getMainColor">
            <f7-nav-right>
                <f7-link popup-close>Cerrar</f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-block inner>
            <f7-list>

                <!-- Name -->
                <f7-list-item>
                    <f7-label>Nombre</f7-label>
                    <f7-input
                            type="text"
                            :name="name"
                            :value="name"
                            @input="name = $event.target.value"
                            clear-button></f7-input>
                </f7-list-item>

                <!-- Type -->
                <f7-list-item radio title="Campo de texto" :name="type" value="text" checked
                              @change="type = $event.target.value"></f7-list-item>
                <f7-list-item radio title="Área de texto" :name="type" value="textarea"
                              @change="type = $event.target.value"></f7-list-item>
                <!--f7-list-item radio title="Lista" name="type" value="select"></f7-list-item-->
                <f7-list-item radio title="Fecha" :name="type" value="date"
                              @change="type = $event.target.value"></f7-list-item>
                <f7-list-item radio title="Hora" :name="type" value="time"
                              @change="type = $event.target.value"></f7-list-item>

            </f7-list>

            <br>

            <!-- Cancel & Submit -->
            <f7-segmented round raised>
                <f7-button round popup-close>Cancelar</f7-button><!-- TODO: add cancel functionality -->
                <f7-button round @click="insert()">Crear</f7-button>
            </f7-segmented>

        </f7-block>
    </f7-page>
</template>
<script>
    import {
        mapGetters
    } from 'vuex';

    export default {
        name: 'CreateCustomField',
        props: {
            schema: Array
        },
        data() {
            return {
                name: '',
                type: 'text'
            };
        },
        mounted() {
            //console.log('-> CreateCustomField');
            //console.log(this.schema);
        },
        computed: mapGetters(['getMainColor']),
        methods: {
            insert() {
                //console.log(this.name);
                //console.log(this.type);

                let newObject = {};
                newObject.label = this.name;
                newObject.type = this.type;
                newObject.value = '';
                this.schema.push(newObject);
                this.$emit('update:schema', this.schema);

                // Clear form
                this.name = this.type = '';

                // Close popup
                this.popup = this.$f7.popup.close();
            }
        }
    };
</script>

<style scoped>
    .navbar {
        background-color: #000000;
    }
</style>
