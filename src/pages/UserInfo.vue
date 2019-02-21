<template>
    <f7-page>

        <!-- Navbar -->
        <f7-navbar>
            <f7-nav-left>
                <f7-link href="/home">
                    <f7-icon material="arrow_back"></f7-icon>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title title="Información del usuario"></f7-nav-title>
        </f7-navbar>

        <f7-block inner>

        </f7-block>

    </f7-page>
</template>

<script>
    import axios from 'axios';
    import {
        API_PATH
    } from '../config.js';

    export default {
        name: 'UserInfo'
    };
</script>

<style scoped>

</style>