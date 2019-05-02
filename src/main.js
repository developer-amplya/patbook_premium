/* eslint-disable no-unused-vars */
// Import Vue
import Vue from 'vue';

// Import F7
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js';

// Import F7 Styles
import Framework7Styles from 'framework7/dist/css/framework7.css';

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';

// Import Routes
import Routes from './routes.js';

// Import App Component
import App from './app';

// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7);

import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

// Init App
const baseApp = new Vue({

    // App Root Element
    el: '#app',

    template: '<app/>',
    // Init Framework7 by passing parameters here
    framework7: {
        id: 'com.patbook.app', // App bundle ID
        name: 'Patbook', // App name
        theme: 'auto', // Automatic theme detection,
        touch: {
            tapHold: true,
            fastClicks: true,
            materialRipple: true,
            activeState: true,
            disableContextMenu: false

        },
        dialog: {
            buttonOk: 'ACEPTAR',
            buttonCancel: 'CANCELAR'
        },
        // App routes
        routes: Routes
    },
    // Register App Component
    components: {
        app: App
    },

    // App root methods
    methods: {}
});
