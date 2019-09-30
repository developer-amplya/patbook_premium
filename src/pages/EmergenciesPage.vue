<template>
    <f7-page class="emergencies-page">

        <!-- Navbar -->
        <f7-navbar back-link back-link-force back-link-url="/home" class="bg-color-red" title="EMERGENCIA"></f7-navbar>

        <f7-block inner>

            <h2 class="color-red">DATOS DEL USUARIO</h2>
            <p><strong>Nombre</strong>: {{ getUserName }} {{ getUserLastname }}</p>
            <p><strong>Número de la S.S.</strong>: {{ getSocialSecurityNumber }} </p>
            <p><strong>Fecha de nacimiento</strong>: {{ transformDate(getUserBirthdate) }}</p>
            <p><strong>Dirección</strong>: {{ getUserAddress }} {{ getUserCountry }}</p>
            <p><strong>Grupo sanguíneo</strong>: {{ getUserBloodType }}</p>

            <h2 class="color-red">DATOS DEL CONTACTO</h2>
            <p><strong>Nombre</strong>: {{ getEmergenciesContact.name }}</p>
            <p><strong>Teléfono</strong>:
                <a class="external" :href="'tel:' + getEmergenciesContact.phone">
                {{ getEmergenciesContact.phone }}
                </a>
            </p>
            <p><strong>Email</strong>: {{ getEmergenciesContact.email }}</p>

        </f7-block>

    </f7-page>
</template>

<script>
    import {
        mapGetters
    } from 'vuex';

    export default {
        name: 'EmergenciesPage',
        computed: {
            ...mapGetters([
                'getUserName',
                'getUserLastname',
                'getUserBirthdate',
                'getUserCountry',
                'getUserAddress',
                'getUserBloodType',
                'getEmergenciesContact',
                'getSocialSecurityNumber',
            ])
        },
        data() {
            return {
                months: [
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre"
                ]
            };
        },
        methods: {
            transformDate (payload) {
                if (payload === undefined || payload === null) {
                    return '';
                }

                let rawDate = new Date(payload); console.log(rawDate)
                let dd = String(rawDate.getDate()).padStart(2, "0");
                let mm = this.months[String(rawDate.getMonth())]; // January is 0!
                //const mm = rawDate.toLocaleString('es-es', { month: 'long' }).toUpperCase();
                let yyyy = rawDate.getFullYear();
                return dd + " " + mm + " " + yyyy;
            },
        },
    };
</script>

<style>
    .emergencies-page h2,
    .emergencies-page a {
        color: #ff0000;
    }

    .emergencies-page p {
        font-size: 16px;
    }
</style>
