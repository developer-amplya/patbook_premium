<template>

    <f7-page-content>
        <f7-block>

            <f7-list>

                <f7-list-item radio
                              v-for="(option, index) in options[type]"
                              :key="index"
                              :name="name"
                              :title="option"
                              :value="option"
                              :checked="option === value"
                              @change="$emit('select',$event.target.value)"></f7-list-item>
            </f7-list>

        </f7-block>
    </f7-page-content>

</template>

<script>
    import lists from '../config.js';

    export default {
        name: 'SelectList',
        props: ['type', 'name', 'label', 'value'],
        data() {
            return {
                options: lists // Got an object containing an array
            };
        }
    };
</script>