<template>
    <f7-page class="cover">
        <img src="../assets/logo-rectangular-patbook.png"/>
    </f7-page>
</template>

<script>
    export default {
        methods: {
            waitSomeSeconds() {
                setTimeout(() => {
                    this.$f7router.navigate('/login');
                    //alert('4s');
                }, 4000);
            }
        },
        mounted() {
            this.waitSomeSeconds();
        }
    };
</script>

<style scoped>
    .cover {
        background-color: #1ABAD4;
        text-align: center;
    }
    @keyframes change-opacity {
        from {opacity: 0;}
        to {opacity: 1;}
    }
    .page-content > img {
        width: 200px;
        margin-top: 100px;
        animation-name: change-opacity;
        animation-duration: 4s;
    }
</style>