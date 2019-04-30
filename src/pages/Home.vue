<template>
    <f7-page>

        <div class="header-container">

            <!-- EDIT USER -->
            <div class="col">
                <f7-link href="/user-info" icon-only class="edit-user">
                    <f7-icon material="create"></f7-icon>
                </f7-link>
            </div>

            <!-- USER PIC -->
            <div class="col">
                <div class="user-pic">
                    <img ref="userProfileImg" src="../assets/profile_photo.png"/>
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
                        class="allergies"
                        title="Alergias"
                        :badge="getDocumentCounting.allergies"
                        link="/allergies">
                    <img src="../assets/icono_alergias.png" slot="media">
                </f7-list-item>

                <f7-list-item
                        class="medicines"
                        title="Medicación"
                        :badge="getDocumentCounting.medicines"
                        link="/medicines">
                    <img src="../assets/icono_medicacion.png" slot="media">
                </f7-list-item>

                <f7-list-item
                        class="medical-visit-preparations"
                        title="Preparación visita médica"
                        :badge="getDocumentCounting.medical_visit_preparations"
                        link="/medical-visit-preparations">
                    <img src="../assets/icono_preparaciondevisitamedica.png" slot="media">
                </f7-list-item>

                <f7-list-item
                        class="medical-visit"
                        title="Visita médica"
                        :badge="getDocumentCounting.medical_visits"
                        link="/medical-visits">
                    <img src="../assets/icono_visitamedica.png" slot="media">
                </f7-list-item>

                <f7-list-item
                        class="diagnostic-tests"
                        title="Pruebas diagnósticas"
                        :badge="getDocumentCounting.diagnostic_tests"
                        link="/diagnostic-tests">
                    <img src="../assets/icono_diagnosticospruebas.png" slot="media">
                </f7-list-item>

            </f7-list>
        </f7-block>
    </f7-page>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {
        USER_IMAGES_PATH
    } from '../config.js';

    export default {
        name: 'Home',
        data() {
            return {
                USER_IMAGES_PATH: USER_IMAGES_PATH,
                img_src: '../assets/profile_photo.png'
            };
        },
        computed: mapGetters(['getUserName', 'getUserProfileImg', 'getDocumentCounting']),
        mounted() {
            if (this.getUserProfileImg !== '') {
                this.$refs.userProfileImg.src = USER_IMAGES_PATH + this.getUserProfileImg;
            }

            PhotoViewer.show(USER_IMAGES_PATH + this.getUserProfileImg, 'Optional Title');
        }
    };
</script>

<style scoped>

    .list img {
        width: 50px;
        border-radius: 100%;
    }

    .allergies img {
        background-color: #c36eb5;
    }

    .medicines img {
        background-color: #F2BE4C;
    }

    .medical-visit-preparations img {
        background-color: #6F715E;
    }

    .medical-visit img {
        background-color: #FF7E3A;
    }

    .diagnostic-tests img {
        background-color: #FF3183;
    }

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
