<template>
    <f7-input type="text" readonly="readonly" id="calendar-modal"></f7-input>
</template>

<script>
    export default {
        name: 'Calendar',
        props: [],
        data() {
            return {
                //
            };
        },
        mounted() {
            self.calendarDefault = self.$f7.calendar.create({
                inputEl: '#calendar-modal',
            });
        },
        methods: {}
    };
</script>

<style></style>