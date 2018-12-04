<template>
    <f7-page>
        <img src="./icono_alergias.png">
        <f7-navbar sliding title="PATBOOK"></f7-navbar>
        <f7-block-title>{{ title }}</f7-block-title>
        <f7-block inner>
            <f7-list>
                <f7-list-item
                        media="./icono_alergias.png"
                        title="Alergias"
                        badge="2"
                        link="/allergies"></f7-list-item>
                <f7-list-item
                        title="Medicación"
                        link="/medicines"></f7-list-item>
                <f7-list-item
                        title="Preparación visita médica"
                        link="/medical_visit_preparations"></f7-list-item>
                <f7-list-item
                        title="Visita médica"
                        link="/medical_visits"></f7-list-item>
                <f7-list-item
                        title="Pruebas diagnósticas"
                        link="/diagnostic_tests"></f7-list-item>
            </f7-list>
        </f7-block>
    </f7-page>
</template>
<script>
    export default {
        name: 'Home',
        data() {
            return {
                title: 'Francisco'
            };
        }
    };
</script>
