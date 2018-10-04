<template>
    <f7-page>
        <f7-navbar sliding title="PATBOOK">
            <f7-link back><</f7-link>
        </f7-navbar>
        <f7-block-title>{{ category }}</f7-block-title>
        <f7-block inner>

        </f7-block>
    </f7-page>
</template>
<script>
    export default {
        name: 'ListView',
        props: ['category'],
        data() {
            return {
                //title: category
            };
        }
    };
</script>
