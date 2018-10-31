<template>
    <f7-list-item>
        <label>{{label}}</label>
        <select :multiple="multi">
            <option v-for="option in options"
                    :key="option">
                {{option}}
            </option>
        </select>
    </f7-list-item>
</template>

<script>
    export default {
        name: 'SelectList',
        props: ['multi', 'options', 'name', 'label']
    };
</script>