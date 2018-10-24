<template>

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