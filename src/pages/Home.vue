<template>
    <f7-page>

        <div class="header-container">

            <!-- EDIT USER -->
            <div class="col">
                <f7-link href="#" icon-only class="edit-user">
                    <f7-icon material="create"></f7-icon>
                </f7-link>
            </div>

            <!-- USER PIC -->
            <div class="col">
                <div class="user-pic">
                    <img :src="USER_PICS_PATH + getUserPic"/>
                </div>
            </div>

            <!-- MORE FUNCTIONS -->
            <div class="col">
                <f7-link href="#" icon-only class="more">
                    <f7-icon material="more_vert"></f7-icon>
                </f7-link>
            </div>

        </div>

        <h3 class="user-name">{{ getUserName }}</h3>

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
    import {mapGetters} from 'vuex';
    import {
        USER_PICS_PATH
    } from '../config.js';

    export default {
        name: 'Home',
        data() {
            return {
                USER_PICS_PATH: USER_PICS_PATH
            };
        },
        computed: mapGetters(['getUserName', 'getUserPic', 'getDocumentCounting'])
    };
</script>

<style scoped>

    .header-container {
        display: flex;
    }

    .header-container .col {
        flex: 1;
    }

    .edit-user, .more {
        padding: 20px;
        color: #8E8E93;
    }

    .edit-user i, .more i {
        font-size: 35px !important;
    }

    .col:nth-child(3) {
        text-align: right;
    }

    .user-pic {
        width: 100px;
        height: 100px;
        margin: 20px auto 0px;
        overflow: hidden;
        border: 3px solid #1ABAD4;
        border-radius: 100%;
    }

    .user-pic img {
        width: 100%;
    }

    .user-name {
        text-align: center;
        color: #1ABAD4;
    }
</style>
