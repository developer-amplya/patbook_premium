<template>
    <f7-page class="cover">
        <img src="../assets/logo-rectangular-patbook.png"/>

        <f7-toolbar position="bottom" no-shadow no-hairline>
            <p>
                <small>&copy; 2019 El Artesano de Ideas, S.L.</small>
            </p>

            <!-- Version -->
            <div class="version">
                <small>v. 1.0.131</small>
            </div>
        </f7-toolbar>
    </f7-page>
</template>

<script>
    export default {
        name: 'Cover',
        methods: {
            waitSomeSeconds() {
                setTimeout(() => {
                    if (localStorage.patbookDontShowTheGuide === 'true') {
                        this.$f7router.navigate('/login');
                    } else {
                        this.$f7router.navigate('/use-guide');
                    }
                }, 2000);
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
    .toolbar {
        background-color: transparent !important;
    }

    .toolbar p {
        width: 100%;
        border-top: 1px solid #ffffff;
        padding-top: 6px;
        padding-left: 6px;
        text-align: left;
        color: #ffffff;
    }

    .version {
        position: absolute;
        padding-top: 6px;
        right: 10px;
        color: #ffffff;
    }
</style>