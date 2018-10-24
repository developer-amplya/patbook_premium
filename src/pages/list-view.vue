<template>
    <f7-page>
        <f7-navbar sliding title="PATBOOK">
            <f7-link back><</f7-link>
        </f7-navbar>
        <f7-block-title>{{ category }}</f7-block-title>
        <f7-block inner>

        </f7-block>
        {{ info }}
    </f7-page>
</template>
<script>
    import axios from 'axios';
    export default {
        name: 'ListView',
        props: ['category'],
        data() {
            return {
                info: ''
            };
        },
        mounted () {
            axios
                .get('http://patbookapi.local/api/allergies')
                .then(response => (this.info = response));
        }
    }
    ;
</script>
