<template>
    <f7-list>
        <f7-list-input
                :type="type"
                :label="label"
                :name="name"
                :value="value"
                @input="$emit('input',$event.target.value)">
        </f7-list-input>
    </f7-list>
</template>

<script>
    export default {
        name: 'TextInput',
        props: ['type', 'label', 'name', 'value']
    };
</script>