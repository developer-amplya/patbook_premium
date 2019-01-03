<template>
    <f7-page>

        <!--img src="../assets/icono_alergias.png" height="133" width="133"/-->
        <f7-navbar sliding title="PATBOOK"></f7-navbar>
        <f7-block-title>{{ getMessage }}</f7-block-title>
        <f7-block inner>
            <f7-list>
                <f7-list-item
                        title="Alergias"
                        badge="2"
                        link="/allergies"></f7-list-item>
                <f7-list-item
                        title="Medicación"
                        badge="1"
                        link="/medicines"></f7-list-item>
                <f7-list-item
                        title="Preparación visita médica"
                        badge="1"
                        link="/medical-visit-preparations"></f7-list-item>
                <f7-list-item
                        title="Visita médica"
                        badge="1"
                        link="/medical-visits"></f7-list-item>
                <f7-list-item
                        title="Pruebas diagnósticas"
                        badge="1"
                        link="/diagnostic-tests"></f7-list-item>
            </f7-list>
        </f7-block>
    </f7-page>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        name: 'Home',
        data() {
            return {
                title: 'Francisco'
            };
        },
        computed: mapGetters(['getMessage'])
    };
</script>
