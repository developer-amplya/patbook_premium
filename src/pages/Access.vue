<template>
    <f7-page>
        <f7-navbar title="INICIO"></f7-navbar>
        <f7-block inner>

        </f7-block>
    </f7-page>
</template>

<script>
    export default {
        name: 'Access',
        props: [],
        mounted() {
            console.log('App mounted!');
            if (localStorage.getItem('isRegisteredDevice')) {
                this.$f7router.navigate('login');
            } else {
                this.$f7router.navigate('register');
            }
        }
    };
</script>