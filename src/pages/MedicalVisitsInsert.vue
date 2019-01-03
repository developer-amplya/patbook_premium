<template>
    <f7-page>
        <f7-navbar title="VISITA MÉDICA" back-link="Volver"></f7-navbar>
        <f7-block inner>
            <f7-list>
                <f7-list-item
                        v-for="listItem in list"
                        :key="listItem._id"
                        :link="/medical-visits/ + listItem._id"
                        :header="listItem.type"
                        :title="listItem.name"
                        :footer="listItem.degree"></f7-list-item>
            </f7-list>
        </f7-block>
    </f7-page>
</template>
<script>
    import axios from 'axios';

    export default {
        name: 'MedicalVisits',
        props: [],
        data() {
            return {
                list: []
            };
        },
        methods: {
            //
        },
        mounted() {
            axios
                .get('http://patbookapi.local/api/medical-visits', {
                    params: {
                        device_code: sessionStorage.device_code,
                        user_id: sessionStorage.user_id
                        // TODO: encriptar las credenciales?
                    }
                })
                .then(response => (this.list = response.data))
                .catch(error => (console.log(error)));
        }
    }
    ;
</script>

<style scoped>
    .navbar {
        background-color: #FF7E3A;
    }
</style>
