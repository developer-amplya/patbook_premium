<template>
    <f7-page>

        <f7-navbar sliding></f7-navbar>

        <f7-block-title>{{ getUserName }}</f7-block-title>
        <f7-block inner>
            <f7-list>
                <f7-list-item
                        title="Alergias"
                        :badge="getDocumentCounting.allergies"
                        link="/allergies"></f7-list-item>
                <f7-list-item
                        title="Medicación"
                        :badge="getDocumentCounting.medicines"
                        link="/medicines"></f7-list-item>
                <f7-list-item
                        title="Preparación visita médica"
                        :badge="getDocumentCounting.medical_visit_preparations"
                        link="/medical-visit-preparations"></f7-list-item>
                <f7-list-item
                        title="Visita médica"
                        :badge="getDocumentCounting.medical_visits"
                        link="/medical-visits"></f7-list-item>
                <f7-list-item
                        title="Pruebas diagnósticas"
                        :badge="getDocumentCounting.diagnostic_tests"
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
                //
            };
        },
        computed: mapGetters(['getUserName', 'getDocumentCounting'])
    };
</script>
