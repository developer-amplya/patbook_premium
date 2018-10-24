<template>
    <f7-page>
        <f7-navbar sliding title="PATBOOK"></f7-navbar>
        <f7-block-title>{{ title }}</f7-block-title>
        <f7-block inner>
            <f7-link href="/list-view/usuario">Datos del usuario</f7-link>
            <br>
            <f7-link href="/allergies">Alergias</f7-link>
            <br>
            <f7-link href="/list-view/medicacion">Medicación</f7-link>
            <br>
            <f7-link href="/list-view/preparacion-visita-medica">Preparación vista médica</f7-link>
            <br>
            <f7-link href="/list-view/visita-medica">Visita médica</f7-link>
            <br>
            <f7-link href="/list-view/pruebas-diagnosticas">Pruebas diagnósticas</f7-link>
            <br>
            <f7-link href="/list-view/emergencia">Emergencia</f7-link>
        </f7-block>
    </f7-page>
</template>
<script>
    export default {
        name: 'Home',
        data() {
            return {
                title: 'Inicio'
            };
        }
    };
</script>
