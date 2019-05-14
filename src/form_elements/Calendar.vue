<template>
    <div class="list">
        <ul>
            <li class="item-content item-input">
                <div class="item-inner">
                    <div class="item-title item-label">{{ label }}</div>
                    <div class="item-input-wrap">
                        <input
                                type="text"
                                placeholder="Seleccionar..."
                                readonly="readonly"
                                :id="id">
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Calendar',
        props: ['id', 'label'],
        mounted() {
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
                        //calendar.destroy();
                    }
                }
            });
        }
    };
</script>

<style scoped>
    ul, li {
        padding: 0 !important;
    }
</style>