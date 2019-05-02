<template>
    <!-- Right Panel with Cover effect and dark layout theme -->
    <f7-panel right theme-dark effect="cover">
        <!-- <f7-view> -->
        <f7-page>
            <f7-block>
                <f7-list>
                    <f7-list-item>
                        <h3>Navegación</h3>
                    </f7-list-item>
                    <f7-list-item link="/home" title="Inicio" panel-close></f7-list-item>
                    <f7-list-item link="/new-appointment" title="Nueva cita" panel-close></f7-list-item>
                    <f7-list-item link="/new-patient" title="Nuevo paciente" panel-close></f7-list-item>
                    <f7-list-item link="/patients-list" title="Lista de pacientes" panel-close></f7-list-item>
                    <f7-list-item link="#" title="Salir" @click="logout"></f7-list-item>
                </f7-list>
            </f7-block>
        </f7-page>
        <!-- </f7-view> -->
    </f7-panel>
</template>

<script>
    export default {
        name: "RightPanel",
        methods: {
            logout() {
                /*this.$store.dispatch("setUserName", "");
                this.$store.dispatch("setUserPass", "");
                this.$store.dispatch("setDate", "");
                this.$store.dispatch("setDoctors", {});
                this.$store.dispatch("setReasonsList", {});
                this.$store.dispatch("setSchedule", {});
                this.$store.dispatch("setSpecialty", []);
                this.$store.dispatch("setTime", []);
                this.$store.dispatch("setDoctor", ["", "Seleccionar..."]);
                this.$store.dispatch("setPatient", ["", "Seleccionar..."]);
                this.$store.dispatch("setReason", ["", "Seleccionar..."]);

                // Redirect to Login Page
                this.$f7.views.main;*/
            }
        }
    };
</script>

<style scoped>
    * {
        color: #dedede !important;
    }
</style>


