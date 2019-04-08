<template>
    <input
            type="text"
            placeholder="Seleccionar..."
            readonly="readonly"
            :id="id"
            @click="displayCalendar"
    />
</template>

<script>
    export default {
        name: 'Calendar',
        props: ['id'],
        methods: {
            displayCalendar() {
                let calendar = this.$f7.calendar.create({
                    inputEl: '#' + this.id,
                    openIn: 'customModal',
                    closeOnSelect: true,
                    dateFormat: 'dd-mm-yyyy',
                    monthNames: [
                        'Enero',
                        'Febrero',
                        'Marzo',
                        'Abril',
                        'Mayo',
                        'Junio',
                        'Julio',
                        'Agosto',
                        'Septiembre',
                        'Octubre',
                        'Noviembre',
                        'Diciembre'
                    ],
                    dayNamesShort: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                    on: {
                        closed: () => {
                            this.$emit('change', calendar.getValue());
                            calendar.destroy();
                        }
                    }
                });
            },
        }
    };
</script>