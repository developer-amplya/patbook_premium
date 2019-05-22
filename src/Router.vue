<template>
    <f7-page></f7-page>
</template>

<script>
    export default {
        name: "Router",
        props: ['url', 'id'],
        mounted() {
            this.$f7router.navigate('/' + this.url + '/' + this.id);
        }
    }
</script>