<template>
    <f7-page id="home">

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
                <f7-link panel-open="right" icon-only class="more">
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

        <!-- Toolbar -->
        <f7-toolbar position="bottom">
            <f7-link class="agenda no-ripple" href="/agenda">
                <span><img src="../assets/icono_agenda.png"></span>
                <span>AGENDA</span>
            </f7-link>
            <f7-link class="emergencia no-ripple" href="">
                <span><img src="../assets/icono_emergencias.png"></span>
                <span>EMERGENCIA</span>
            </f7-link>
        </f7-toolbar>

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
        }
    };
</script>

<style>

    #home .list img {
        width: 50px;
        border-radius: 100%;
    }

    #home .allergies img {
        background-color: #c36eb5;
    }

    #home .medicines img {
        background-color: #F2BE4C;
    }

    #home .medical-visit-preparations img {
        background-color: #6F715E;
    }

    #home .medical-visit img {
        background-color: #FF7E3A;
    }

    #home .diagnostic-tests img {
        background-color: #FF3183;
    }

    #home .header-container {
        display: flex;
    }

    #home .header-container .col {
        flex: 1;
    }

    #home .edit-user, .more {
        padding: 20px;
        color: #8E8E93;
    }

    #home .edit-user i, .more i {
        font-size: 35px !important;
    }

    #home .col:nth-child(3) {
        text-align: right;
    }

    #home .user-pic {
        width: 100px;
        height: 100px;
        margin: 20px auto 0px;
        overflow: hidden;
        border: 3px solid #1ABAD4;
        border-radius: 100%;
    }

    #home .user-pic img {
        width: 100%;
    }

    #home .user-name {
        text-align: center;
        color: #1ABAD4;
    }

    #home .agenda, .emergencia {
        width: 50%;
    }

    #home .agenda > span:first-child, .emergencia > span:first-child {
        display: flex;
        align-items: center;
        width: 35px;
    }

    #home .agenda > span > img, .emergencia > span > img {
        width: 100%;
    }

    #home .agenda {
        background-color: var(--f7-theme-color);
        color: #ffffff;
    }

    #home .emergencia {
        background-color: #ff0000;
        color: #ffffff;
    }
</style>
